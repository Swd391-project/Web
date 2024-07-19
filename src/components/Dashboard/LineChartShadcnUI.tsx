"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "6M", desktop: 186, mobile: 80 },
  { month: "5M", desktop: 305, mobile: 200 },
  { month: "4M", desktop: 237, mobile: 120 },
  { month: "3M", desktop: 73, mobile: 190 },
  { month: "2M", desktop: 209, mobile: 130 },
  { month: "1M", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "red",
  },
  mobile: {
    label: "Mobile",
    color: "blue",
  },
} satisfies ChartConfig;
const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentDate = new Date();
const last6MonthDate = new Date(
  currentDate.setMonth(currentDate.getMonth() - 6)
);
const last6Month = last6MonthDate.toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();
export function LineChartShadcnUI() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>
          {" "}
          {last6Month} - {`${currentMonth}`} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="natural"
                stroke={`var(--color-${key})`}
                strokeWidth={3}
                dot={{
                  fill: `var(--color-${key})`,
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            ))}
            {/* 
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line> */}
          </LineChart>
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
export default LineChartShadcnUI;
