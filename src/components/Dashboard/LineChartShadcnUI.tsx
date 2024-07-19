"use client";

import { useState, useEffect } from "react";
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

// Mảng màu sử dụng cho các nhóm sân mới
const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FFCD1A",
];

// Hàm để ánh xạ thiết bị với màu
const getColor = (index: number) => colors[index % colors.length];

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentDate = new Date();
const last6MonthDate = new Date(
  currentDate.setMonth(currentDate.getMonth() - 6)
);
const last6Month = last6MonthDate.toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

export function LineChartShadcnUI() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    fetch(
      "https://swdbbmsapi.azurewebsites.net/api/booking/bookings-dashboard-linechart"
    )
      .then((response) => response.json())
      .then((data) => {
        // Chuyển đổi dữ liệu thành định dạng recharts
        const transformedData = data.map((monthData: any) => {
          const monthRecord: any = { month: monthData.month };
          monthData["court-groups"].forEach((group: any) => {
            monthRecord[group["court-group-name"]] = group["booking-amount"];
          });
          return monthRecord;
        });
        setChartData(transformedData);

        // Tạo cấu hình biểu đồ động
        const newChartConfig: ChartConfig = {};
        if (data.length > 0 && data[0]["court-groups"].length > 0) {
          data[0]["court-groups"].forEach((group: any, index: number) => {
            newChartConfig[group["court-group-name"]] = {
              label: group["court-group-name"],
              color: getColor(index),
            };
          });
        }
        setChartConfig(newChartConfig);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>
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
                stroke={chartConfig[key].color}
                strokeWidth={3}
                dot={{
                  fill: chartConfig[key].color,
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
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total bookings of court groups for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default LineChartShadcnUI;
