"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
  { bookingStatus: "Confirmed", bookings: 275, fill: "var(--color-Confirmed)" },
  { bookingStatus: "Cancelled", bookings: 200, fill: "var(--color-Cancelled)" },
  { bookingStatus: "Completed", bookings: 187, fill: "var(--color-Completed)" },
  {
    bookingStatus: "InProgress",
    bookings: 173,
    fill: "var(--color-InProgress)",
  },
  { bookingStatus: "Expired", bookings: 90, fill: "var(--color-Expired)" },
];

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();
const chartConfig = {
  bookings: {
    label: "bookings",
  },
  Confirmed: {
    label: "Confirmed",
    color: "#02b2af",
  },
  Cancelled: {
    label: "Cancelled",
    color: "#E6DB74",
  },
  Completed: {
    label: "Completed",
    color: "#CA7AFF",
  },
  InProgress: {
    label: "InProgress",
    color: "#2D96FF",
  },
  Expired: {
    label: "Expired",
    color: "#A2636C",
  },
} satisfies ChartConfig;

export function PieShadcnUI() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>
          January - {`${currentMonth}`} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="bookings" nameKey="bookingStatus" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Booking's types this year
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total booking of system
        </div>
      </CardFooter>
    </Card>
  );
}
export default PieShadcnUI;
