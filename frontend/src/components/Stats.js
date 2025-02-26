import React from "react";

const Stats = ({ stats }) => {
    if (!stats || Object.keys(stats).length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-300">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </div>
                ))}
            </div>
        );
    }

    const statItems = [
        { label: "Total Income", value: `$${stats.totalIncome?.toFixed(2) || '0.00'}`, color: "border-green-500" },
        { label: "Total Expenses", value: `$${stats.totalExpenses?.toFixed(2) || '0.00'}`, color: "border-red-500" },
        { label: "Balance", value: `$${stats.balance?.toFixed(2) || '0.00'}`, color: stats.balance >= 0 ? "border-blue-500" : "border-orange-500" },
        { label: "Transactions", value: stats.transactionCount || 0, color: "border-purple-500" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((stat, index) => (
                <div key={index} className={`bg-white p-4 rounded-lg shadow-sm ${stat.color} border-l-4 hover:shadow-md transition-shadow duration-300`}>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default Stats;