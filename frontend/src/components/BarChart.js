import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const BarChart = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Price Range Distribution</h2>
            <Bar
                data={{
                    labels: data.map(d => d.range),
                    datasets: [
                        {
                            label: "Items",
                            data: data.map(d => d.count),
                            backgroundColor: "#3b82f6",
                        },
                    ],
                }}
            />
        </div>
    );
};

export default BarChart;
