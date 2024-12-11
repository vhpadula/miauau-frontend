"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
  labels: string[];
  data: number[];
}

const PieChart: React.FC<{ data: PieChartData }> = ({ data }) => {
  console.log(data);
  const generateColors = (count: number): string[] => {
    return Array.from(
      { length: count },
      (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`
    );
  };

  const colors = generateColors(data.labels.length);
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("60%", "50%")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: R$ ${context.raw.toLocaleString("pt-BR")}`,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
