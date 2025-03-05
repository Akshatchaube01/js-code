"use client";

import { TrendingUp, Expand, Shrink, LineChart as LineIcon, BarChart as BarIcon, RotateCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import { 
  Bar, Line, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

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

export const description = "A stacked bar and line chart with fullscreen options.";

interface ChartProps {
  title: string;
  description: string;
  data: { month: string; desktop: number; mobile: number }[];
  config: ChartConfig;
}

export function ChartFrame({ title, description, data, config }: ChartProps) {
  const [chartType, setChartType] = useState<"bar-horizontal" | "bar-vertical" | "line">("bar-horizontal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 600, height: 400 });

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (screenfull.isEnabled && chartRef.current) {
      screenfull.toggle(chartRef.current);
      setIsFullscreen((prev) => !prev);
    }
  };

  // Adjust chart size when fullscreen mode changes
  useEffect(() => {
    const updateSize = () => {
      if (isFullscreen) {
        setChartSize({ width: window.innerWidth - 40, height: window.innerHeight - 100 });
      } else {
        setChartSize({ width: 600, height: 400 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isFullscreen]);

  return (
    <Card ref={chartRef} className={`relative w-full items-center justify-center ${isFullscreen ? "fixed top-0 left-0 w-screen h-screen bg-white p-4" : ""}`}>
      {/* Title and Buttons in Same Row */}
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            {/* Toggle Between Bar Horizontal, Bar Vertical, and Line Chart */}
            <Button
              onClick={() => setChartType("bar-horizontal")}
              className={`p-2 rounded-full ${chartType === "bar-horizontal" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <BarIcon className="h-5 w-5" /> H
            </Button>
            <Button
              onClick={() => setChartType("bar-vertical")}
              className={`p-2 rounded-full ${chartType === "bar-vertical" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <BarIcon className="h-5 w-5 rotate-90" /> V
            </Button>
            <Button
              onClick={() => setChartType("line")}
              className={`p-2 rounded-full ${chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <LineIcon className="h-5 w-5" />
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              {isFullscreen ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Chart Content */}
      <CardContent>
        <ChartContainer config={config}>
          <ResponsiveContainer width={chartSize.width} height={chartSize.height}>
            {chartType === "line" ? (
              /* LINE CHART */
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                <YAxis domain={[0, "dataMax"]} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="desktop" stroke={config.desktop.color} strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="mobile" stroke={config.mobile.color} strokeWidth={3} dot={false} />
              </LineChart>
            ) : chartType === "bar-horizontal" ? (
              /* HORIZONTAL BAR CHART */
              <BarChart layout="horizontal" data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" type="category" tick={{ fontSize: 14 }} />
                <YAxis type="number" domain={[0, "dataMax"]} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            ) : (
              /* VERTICAL BAR CHART */
              <BarChart layout="vertical" data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="month" type="category" tick={{ fontSize: 14 }} />
                <XAxis type="number" domain={[0, "dataMax"]} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      {/* Footer */}
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
