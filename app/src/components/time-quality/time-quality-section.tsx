"use client";

import { Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoraTimeline } from "./hora-timeline";
import { ChoghadiyaTimeline } from "./choghadiya-timeline";
import type { Hora, Choghadiya } from "@/schemas/panchang";

interface TimeQualitySectionProps {
  hora: Hora;
  choghadiya: Choghadiya;
}

export function TimeQualitySection({
  hora,
  choghadiya,
}: TimeQualitySectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#003636]" />
        <h2 className="text-xl font-bold text-[#003636]">
          Time Quality
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <Tabs defaultValue="hora" className="w-full">
          <div className="border-b px-3 pt-4 sm:px-5">
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="hora">Hora</TabsTrigger>
              <TabsTrigger value="choghadiya">Choghadiya</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hora" className="p-3 sm:p-5">
            <HoraTimeline hora={hora} />
          </TabsContent>

          <TabsContent value="choghadiya" className="p-3 sm:p-5">
            <ChoghadiyaTimeline choghadiya={choghadiya} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Nature legend */}
      <div className="flex flex-wrap items-center gap-3 px-1 text-xs text-muted-foreground">
        <span className="font-medium">Legend:</span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-nature-auspicious)]" />
          Auspicious
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-nature-neutral)]" />
          Neutral
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-nature-inauspicious)]" />
          Inauspicious
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-saffron)]" />
          Current
        </span>
      </div>
    </section>
  );
}
