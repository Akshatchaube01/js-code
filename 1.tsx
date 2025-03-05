"use client";

import { 
  TrendingUp, Expand, Shrink, RotateCcw, 
  LineChart as LineIcon, BarChart as BarIcon, ArrowsUpDown 
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
  ChartConfig, ChartContainer, ChartLegendContent, ChartTooltipContent
} from "@/components/UI/chart";

export const description = "A stacked bar & line chart with a legend";

interface ChartProps {
  title: string;
  description: string;
  data: { month: string; desktop: number; mobile: number }[];
  config: ChartConfig;
}

export function ChartFrame({ title, description, data, config }: ChartProps) {
  const [isVertical, setIsVertical] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLineChart, setIsLineChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Store brush range
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const [brushEndIndex, setBrushEndIndex] = useState(data.length - 1);

  // Reset Chart to Horizontal & Reset Brush Range
  const resetChart = () => {
    setIsVertical(false);
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
      {/* Header with Title on Left, Buttons on Right */}
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          {/* Chart Title */}
          <CardTitle>{title}</CardTitle>

          {/* Buttons Section */}
          <div className="flex gap-2">
            {/* Toggle Chart Type (Icon Switches) */}
            <Button 
              onClick={() => setIsLineChart((prev) => !prev)}
              className="flex items-center gap-1"
            >
              {isLineChart ? <BarIcon className="h-5 w-5" /> : <LineIcon className="h-5 w-5" />}
            </Button>

            {/* Fullscreen Button */}
            <Button onClick={ToggleFullScreen} className="flex items-center gap-1">
              {isFullScreen ? <Sh
