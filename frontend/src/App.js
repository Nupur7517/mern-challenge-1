import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import Stats from "./components/Stats";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./App.css";

const App = () => {
    const [month, setMonth] = useState("March");
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({});
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    const fetchData = async () => {
        const transRes = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);
        const statsRes = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
        const barRes = await axios.get(`http://localhost:5000/api/barchart?month=${month}`);
        const pieRes = await axios.get(`http://localhost:5000/api/piechart?month=${month}`);

        setTransactions(transRes.data);
        setStats(statsRes.data);
        setBarData(barRes.data);
        setPieData(pieRes.data);
    };

    const handleInit = async () => {
      setLoading(true);
      try {
          const response = await axios.get("http://localhost:5000/api/init");
          alert(response.data.message); // Show success message
          fetchData(); // Reload data after initialization
      } catch (error) {
          alert("Failed to initialize data!");
          console.error("Error initializing database:", error);
      }
      setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto my-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-bold text-center py-6 text-primary-600 border-b border-gray-100">
                MERN Transactions Dashboard
            </h1>
            
            <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                    {/* Initialization Button */}
                    <button 
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow transition-all duration-200
                                  hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
                                  disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                        onClick={handleInit}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Initializing...
                            </span>
                        ) : "Initialize Data"}
                    </button>

                    {/* Month Selector */}
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700
                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                appearance-none bg-white"
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
                                backgroundPosition: `right 0.5rem center`, 
                                backgroundRepeat: `no-repeat`, 
                                backgroundSize: `1.5em 1.5em`,
                                paddingRight: `2.5rem`}}
                    >
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                
                <Stats stats={stats} />
                <Table transactions={transactions} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                        <BarChart data={barData} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                        <PieChart data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;