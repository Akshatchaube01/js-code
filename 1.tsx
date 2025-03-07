"use client";

import { 
  TrendingUp, Expand, Shrink, RotateCcw, 
  BarChart2Icon as BarIcon, LineChartIcon as LineIcon 
} from "lucide-react";
import { useState, useRef } from "react";
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, 
  Legend, Brush, Line, LineChart, ResponsiveContainer 
} from "recharts";
import screenfull from "screenfull";
import { Button } from "@/components/UI/button";

import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/UI/card";

import {
  ChartConfig, ChartContainer, 
  ChartLegendContent, ChartTooltipContent
} from "@/components/UI/chart";

export const description = "A stacked bar chart with a legend";

interface BarChartProps {
  title: string;
  description: string;
  config: ChartConfig;
  data: { month: string; desktop: number; mobile: number }[];
}

export function BarChartFrame({ title, description, data, config }: BarChartProps) {
  const [isVertical, setIsVertical] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const [brushEndIndex, setBrushEndIndex] = useState(data.length - 1);
  const chartRef = useRef<HTMLDivElement>(null);

  // State to control the visibility of desktop and mobile data
  const [visibleSeries, setVisibleSeries] = useState<{ desktop: boolean; mobile: boolean }>({
    desktop: true,
    mobile: true
  });

  const resetChart = () => {
    setChartType("bar");
    setIsVertical(false);
    setBrushStartIndex(0);
    setBrushEndIndex(data.length - 1);
    setVisibleSeries({ desktop: true, mobile: true });
  };

  const toggleFullScreen = () => {
    if (screenfull.isEnabled && chartRef.current) {
      screenfull.toggle(chartRef.current);
      setIsFullScreen((prev) => !prev);
    }
  };

  // Toggle visibility of a dataset when clicking the legend
  const handleLegendClick = (payload: any) => {
    if (payload && payload.dataKey) {
      setVisibleSeries((prev) => ({
        ...prev,
        [payload.dataKey]: !prev[payload.dataKey],
      }));
    }
  };

  return (
    <Card ref={chartRef} className={`w-full hover:shadow-lg overflow-hidden mt-6 align-space-between items-center justify-center ${isFullScreen ? "fixed top-0 left-0 w-screen h-screen bg-white" : ""}`}>
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}>
              {chartType === "bar" ? <LineIcon className="h-5 w-5" /> : <BarIcon className="h-5 w-5" />}
            </Button>

            <Button onClick={resetChart}>
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button onClick={toggleFullScreen} className="mb-4">
              {isFullScreen ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <CardDescription>{description}</CardDescription>

        <Button onClick={() => setIsVertical((prev) => !prev)} className="mb-4 transition-all duration-300 ease-in-out">
          Switch to {isVertical ? "Horizontal" : "Vertical"}
        </Button>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          {chartType === "bar" ? (
            isVertical ? (
              <BarChart key="vertical" layout="vertical" width={500} height={400} data={data}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
                <XAxis type="number" domain={[0, "dataMax"]} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend onClick={handleLegendClick} content={<ChartLegendContent />} />
                {visibleSeries.desktop && <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[8, 4, 4, 0]} barSize={30} />}
                {visibleSeries.mobile && <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[0, 4, 4, 8]} barSize={30} />}
                <Brush dataKey="month" height={20} stroke="gray" startIndex={brushStartIndex} endIndex={brushEndIndex} onChange={(range) => {
                  setBrushStartIndex(range.startIndex ?? 0);
                  setBrushEndIndex(range.endIndex ?? data.length - 1);
                }} />
              </BarChart>
            ) : (
              <BarChart key="horizontal" layout="horizontal" width={500} height={400} data={data}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
                <YAxis type="number" domain={[0, "dataMax"]} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend onClick={handleLegendClick} content={<ChartLegendContent />} />
                {visibleSeries.desktop && <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[4, 4, 0, 0]} barSize={30} />}
                {visibleSeries.mobile && <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[4, 4, 0, 0]} barSize={30} />}
                <Brush dataKey="month" height={20} stroke="gray" startIndex={brushStartIndex} endIndex={brushEndIndex} onChange={(range) => {
                  setBrushStartIndex(range.startIndex ?? 0);
                  setBrushEndIndex(range.endIndex ?? data.length - 1);
                }} />
              </BarChart>
            )
          ) : (
            <LineChart key={isVertical ? "vertical-line" : "horizontal-line"} layout={isVertical ? "vertical" : "horizontal"} width={500} height={400} data={data}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {isVertical ? <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} /> : <XAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />}
              {isVertical ? <XAxis type="number" domain={[0, "dataMax"]} /> : <YAxis type="number" domain={[0, "dataMax"]} />}
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend onClick={handleLegendClick} content={<ChartLegendContent />} />
              {visibleSeries.desktop && <Line dataKey="desktop" stroke={config.desktop.color} />}
              {visibleSeries.mobile && <Line dataKey="mobile" stroke={config.mobile.color} />}
              <Brush dataKey="month" height={20} stroke="gray" startIndex={brushStartIndex} endIndex={brushEndIndex} onChange={(range) => {
                setBrushStartIndex(range.startIndex ?? 0);
                setBrushEndIndex(range.endIndex ?? data.length - 1);
              }} />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
