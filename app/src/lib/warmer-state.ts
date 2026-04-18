/**
 * Shared warmer progress state. Module-level so both the trigger
 * endpoint and the status endpoint see the same object in the same
 * Node process.
 *
 * Semantics:
 * - One warming run at a time per container. Second trigger hits 409
 *   until the first completes or times out.
 * - If the container restarts mid-run, state resets to idle. The next
 *   cron tick starts a fresh warm. No stuck-locked state.
 * - The fire-and-forget async task mutates this object; HTTP responses
 *   read it. No other coordination needed.
 */
export interface WarmerState {
  running: boolean;
  mode: string | null;
  completed: number;
  total: number;
  startedAt: string | null;
  lastCompletedUrl: string | null;
  lastError: string | null;
  finishedAt: string | null;
}

// globalThis keeps the singleton alive across Next.js dev HMR cycles
// where modules get re-evaluated. In production this is a one-time init.
const g = globalThis as unknown as { __vastucartWarmerState?: WarmerState };

export function getWarmerState(): WarmerState {
  if (!g.__vastucartWarmerState) {
    g.__vastucartWarmerState = {
      running: false,
      mode: null,
      completed: 0,
      total: 0,
      startedAt: null,
      lastCompletedUrl: null,
      lastError: null,
      finishedAt: null,
    };
  }
  return g.__vastucartWarmerState;
}

export function startWarmerRun(mode: string, total: number): void {
  const s = getWarmerState();
  s.running = true;
  s.mode = mode;
  s.completed = 0;
  s.total = total;
  s.startedAt = new Date().toISOString();
  s.lastCompletedUrl = null;
  s.lastError = null;
  s.finishedAt = null;
}

export function recordUrlComplete(url: string): void {
  const s = getWarmerState();
  s.completed += 1;
  s.lastCompletedUrl = url;
}

export function finishWarmerRun(errorMessage?: string): void {
  const s = getWarmerState();
  s.running = false;
  s.finishedAt = new Date().toISOString();
  if (errorMessage) s.lastError = errorMessage;
}
