"use client";

import { 
  TrendingUp, Expand, Shrink, RotateCcw, 
  LineChart as LineIcon, BarChart as BarIcon 
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
  ChartConfig, ChartLegendContent, ChartTooltipContent
} from "@/components/UI/chart";

export function ChartFrame({ title, description, data, config }: { 
  title: string; 
  description: string; 
  data: { month: string; desktop: number; mobile: number }[]; 
  config: ChartConfig; 
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLineChart, setIsLineChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Store brush range
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const [brushEndIndex, setBrushEndIndex] = useState(data.length - 1);

  // Reset Chart
  const resetChart = () => {
    setIsLineChart(false);
    setBrushStartIndex(0);
    setBrushEndIndex(data.length - 1);
  };

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
            <Button onClick={() => setIsLineChart(!isLineChart)} className="flex items-center gap-1">
              {isLineChart ? <BarIcon className="h-5 w-5" /> : <LineIcon className="h-5 w-5" />}
            </Button>
            <Button onClick={ToggleFullScreen} className="flex items-center gap-1">
              {isFullScreen ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
            </Button>
            <Button onClick={resetChart} className="bg-red-500 text-white flex items-center gap-1">
              <RotateCcw className="h-5 w-5" /> Reset
            </Button>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* Chart Content */}
      <CardContent className="w-full flex justify-center">
        {isLineChart ? (
          // Line Chart
          <LineChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, "dataMax"]} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="desktop" stroke={config.desktop.color} strokeWidth={2} />
            <Line type="monotone" dataKey="mobile" stroke={config.mobile.color} strokeWidth={2} />
            <Brush
              dataKey="month"
              height={20}
              stroke="gray"
              startIndex={brushStartIndex}
              endIndex={brushEndIndex}
              onChange={(range) => {
                setBrushStartIndex(range.startIndex ?? 0);
                setBrushEndIndex(range.endIndex ?? (data.length - 1));
              }}
            />
          </LineChart>
        ) : (
          // Bar Chart
          <BarChart width={600} height={400} data={data}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, "dataMax"]} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" stackId="a" fill={config.desktop.color} radius={[4, 4, 0, 0]} barSize={30} />
            <Bar dataKey="mobile" stackId="a" fill={config.mobile.color} radius={[4, 4, 0, 0]} barSize={30} />
            <Brush
              dataKey="month"
              height={20}
              stroke="gray"
              startIndex={brushStartIndex}
              endIndex={brushEndIndex}
              onChange={(range) => {
                setBrushStartIndex(range.startIndex ?? 0);
                setBrushEndIndex(range.endIndex ?? (data.length - 1));
              }}
            />
          </BarChart>
        )}
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
