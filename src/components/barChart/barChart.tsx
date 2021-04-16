import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  data: Array<number>;
}

export function BarChart({ data }: BarChartProps) {
  const chartData = {
    labels: data,
    datasets: [
      {
        data,
        label: 'Temperature',
      },
    ],
  };

  return <Bar data={chartData} />;
}
