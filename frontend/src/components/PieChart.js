
// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ data }) => {
//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-bold mb-2">Category Distribution</h2>
//             <Pie
//                 data={{
//                     labels: data.map(d => d._id),
//                     datasets: [
//                         {
//                             data: data.map(d => d.count),
//                             backgroundColor: ["#f87171", "#fb923c", "#facc15", "#34d399", "#3b82f6"],
//                         },
//                     ],
//                 }}
//             />
//         </div>
//     );
// };

// export default PieChart;


import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        setChartData({
            labels: data.map(d => d._id),
            datasets: [
                {
                    data: data.map(d => d.count),
                    backgroundColor: ["#f87171", "#fb923c", "#facc15", "#34d399", "#3b82f6"],
                },
            ],
        });
    }, [data]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Category Distribution</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
