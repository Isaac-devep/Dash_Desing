import React from 'react';
import Sidebar from './components/SideBar';
import StatCard from './components/StatCard';
import LineChart from './components/LineChart';
import { Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';

function App() {
  // Sample data for the line chart
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1),
    value: Math.random() * 100 + 50,
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="2,543"
            change="+12.5%"
            isPositive={true}
            icon={Users}
          />
          <StatCard
            title="Revenue"
            value="$45,234"
            change="+8.2%"
            isPositive={true}
            icon={DollarSign}
          />
          <StatCard
            title="Conversion Rate"
            value="3.24%"
            change="-2.1%"
            isPositive={false}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Sales"
            value="1,234"
            change="+15.3%"
            isPositive={true}
            icon={ShoppingCart}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Performance Analytics</h2>
              <p className="text-gray-600">Daily performance metrics over time</p>
            </div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[400px]">
            <LineChart data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;