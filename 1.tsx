"use client";

import { 
  TrendingUp, Expand, Shrink, RotateCcw, 
  LineChart as LineIcon, BarChart as BarIcon, 
  ArrowUpDown, ArrowLeftRight
} from "lucide-react"; 

import { useState, useRef } from "react";
import { 
  Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Brush, 
  Line, LineChart
} from "recharts";
import screenfull from "screenfull";
import { Button } from "@/components/UI/button";
import {
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle
} from "@/components/UI/card";

import {
  ChartContainer, ChartConfig, ChartLegendContent, ChartTooltipContent
} from "@/components/UI/chart";

export function BarChartFrame({ title, description, data, config }: { 
  title: string; 
  description: string; 
  data: { month: string; desktop: number; mobile: number }[]; 
  config: ChartConfig; 
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [chartKey, setChartKey] = useState(0); // Used for re-rendering
  const chartRef = useRef<HTMLDivElement>(null);

  const ToggleFullScreen = () => {
    if (screenfull.isEnabled && chartRef.current) {
      screenfull.toggle(chartRef.current);
      setIsFullScreen((prev) => !prev);
    }
  };

  return (
    <Card
      ref={chartRef}
      className={`w-full hover:shadow-lg overflow-hidden p-6 flex flex-col items-center justify-center ${
        isFullScreen ? "fixed top-0 left-0 w-screen h-screen bg-white" : ""
      }`}
    >
      {/* Header */}
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          {/* Title */}
          <CardTitle>{title}</CardTitle>

          {/* Buttons */}
          <div className="flex gap-2">
            {/* Chart Type Switch */}
            <Button onClick={() => { setChartType(chartType === "bar" ? "line" : "bar"); setChartKey((prev) => prev + 1); }} className="flex items-center gap-1">
              {chartType === "bar" ? <LineIcon className="h-5 w-5" /> : <BarIcon className="h-5 w-5" />}
            </Button>

            {/* Orientation Switch */}
            <Button onClick={() => { setLayout(layout === "horizontal" ? "vertical" : "horizontal"); setChartKey((prev) => prev + 1); }} className="flex items-center gap-1">
              {layout === "horizontal" ? <ArrowLeftRight className="h-5 w-5" /> : <ArrowUpDown className="h-5 w-5" />}
            </Button>

            {/* Fullscreen Toggle */}
            <Button onClick={ToggleFullScreen} className="flex items-center gap-1">
              {isFullScreen ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
            </Button>

            {/* Reset Button */}
            <Button onClick={() => { setChartType("bar"); setLayout("horizontal"); setChartKey((prev) => prev + 1); }} className="bg-red-500 text-white flex items-center gap-1">
              <RotateCcw className="h-5 w-5" /> Reset
            </Button>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* Chart Content */}
      <CardContent className="w-full flex justify-center min-h-[400px]">
        <ChartContainer config={config} className="w-full h-[400px]">
          {chartType === "bar" ? (
            <BarChart 
              key={chartKey} // Forces re-render
              layout={layout} 
              width={600} height={400} data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {layout === "vertical" ? (
                <>
                  <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} axisLine tickLine />
                  <XAxis type="number" domain={[0, "dataMax"]} axisLine tickLine />
                </>
              ) : (
                <>
                  <XAxis dataKey="month" type="category" tick={{ fontSize: 12 }} axisLine tickLine />
                  <YAxis type="number" domain={[0, "dataMax"]} axisLine tickLine />
                </>
              )}
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[4, 4, 0, 0]} barSize={30} />
              <Brush dataKey="month" height={20} stroke="gray" />
            </BarChart>
          ) : (
            <LineChart 
              key={chartKey} // Forces re-render
              layout={layout} 
              width={600} height={400} data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {layout === "vertical" ? (
                <>
                  <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} axisLine tickLine />
                  <XAxis type="number" domain={[0, "dataMax"]} axisLine tickLine />
                </>
              ) : (
                <>
                  <XAxis dataKey="month" type="category" tick={{ fontSize: 12 }} axisLine tickLine />
                  <YAxis type="number" domain={[0, "dataMax"]} axisLine tickLine />
                </>
              )}
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="desktop" stroke={config.desktop.color} strokeWidth={2} />
              <Line type="monotone" dataKey="mobile" stroke={config.mobile.color} strokeWidth={2} />
              <Brush dataKey="month" height={20} stroke="gray" />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
