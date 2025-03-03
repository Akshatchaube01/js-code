"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/UI/chart";

export const description = "A stacked bar chart with a legend";

interface BarChartProps {
  title: string;
  description: string;
  data: { month: string; desktop: number; mobile: number }[];
  config: ChartConfig;
}

export function BarChartFrame({ title, description, data, config }: BarChartProps) {
  const [isVertical, setIsVertical] = useState(false);

  return (
    <Card className="w-full items-center justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button onClick={() => setIsVertical((prev) => !prev)} className="mb-4">
          Switch to {isVertical ? "Horizontal" : "Vertical"}
        </Button>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          {isVertical ? (
            // Vertical Bar Chart
            <BarChart key="vertical" layout="vertical" width={500} height={400} data={data}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
              <XAxis type="number" domain={[0, "dataMax"]} />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill={config.desktop.color}
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill={config.mobile.color}
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          ) : (
            // Horizontal Bar Chart
            <BarChart key="horizontal" layout="horizontal" width={500} height={400} data={data}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
              <YAxis type="number" domain={[0, "dataMax"]} />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill={config.desktop.color}
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill={config.mobile.color}
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
