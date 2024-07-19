"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

interface ChartData {
  month: number;
  thisMonthBooking: number;
  thisYearBooking: number;
}

const chartConfig = {
  thisMonthBooking: {
    label: "This month bookings",
    color: "#E23670",
  },
  thisYearBooking: {
    label: "This year bookings",
    color: "#2762D9",
  },
} satisfies ChartConfig;

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

export function RadialChartShadcnUI() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "https://swdbbmsapi.azurewebsites.net/api/booking/bookings-dashboard-radialchart"
        );
        const data = await response.json();
        setChartData({
          month: data.month,
          thisMonthBooking: data["this-month-booking"],
          thisYearBooking: data["this-year-booking"],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const { thisMonthBooking, thisYearBooking } = chartData;
  const totalVisitors = thisYearBooking;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <CardDescription>
          {`January - ${currentMonth} ${currentYear}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={[chartData]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Bookings
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>

            <RadialBar
              dataKey="thisYearBooking"
              fill="var(--color-thisYearBooking)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="thisMonthBooking"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-thisMonthBooking)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This month accounts for{" "}
          {`${((thisMonthBooking / thisYearBooking) * 100).toFixed(2)}%`} for
          this year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displays the booking rate this month compared to this year
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadialChartShadcnUI;
