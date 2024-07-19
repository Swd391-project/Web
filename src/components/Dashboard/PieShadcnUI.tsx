"use client";

import { useState, useEffect } from "react";
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

// Định nghĩa kiểu dữ liệu cho item
interface ChartDataItem {
  browser: string;
  bookings: number;
  fill: string;
}

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
  Deleted: {
    label: "Deleted",
    color: "#D9534F",
  },
  Expired: {
    label: "Expired",
    color: "#A2636C",
  },
} satisfies ChartConfig;

const PieShadcnUI = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [thisMonthBooking, setThisMonthBooking] = useState<number>(0);
  const [thisYearBooking, setThisYearBooking] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://swdbbmsapi.azurewebsites.net/api/booking/bookings-dashboard-piechart"
      );
      const data: ChartDataItem[] = await response.json();
      setChartData(data);

      // Giả sử `thisMonthBooking` được lấy từ API khác hoặc tính toán
      const monthBooking = 10; // Dữ liệu mẫu
      const yearBooking = data.reduce(
        (total: number, item: ChartDataItem) => total + item.bookings,
        0
      );
      setThisMonthBooking(monthBooking);
      setThisYearBooking(yearBooking);
    };

    fetchData();
  }, []);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const bookingPercentage = (
    (thisMonthBooking / thisYearBooking) *
    100
  ).toFixed(2);

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
            <Pie data={chartData} dataKey="bookings" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This month accounts for {bookingPercentage}% for this year{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total booking of system
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieShadcnUI;
