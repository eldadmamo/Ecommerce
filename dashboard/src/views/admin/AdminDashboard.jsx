import React from 'react';
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom";

function AdminDashboard() {
  const state = {
    series: [
      {
        name: 'Orders',
        data: [23,34,45,56,76,34,23,76,87,78,34,45]
      },
      {
        name: 'Revenue',
        data: [67,39,45,56,90,56,23,56,87,78,67,78]
      },
      {
        name: 'Sellers',
        data: [34,39,56,56,80,67,23,56,98,78,45,56]
      }
    ],
    options: {
      colors: ['#6366f1', '#8b5cf6', '#ec4899'],
      chart: {
        background: 'transparent',
        foreColor: '#94a3b8',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      grid: {
        borderColor: '#334155',
        strokeDashArray: 5
      },
      tooltip: {
        theme: 'dark'
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="p-6 max-w-[1600px] mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Revenue', value: '$434', icon: MdCurrencyExchange, color: 'from-pink-500 to-rose-500' },
            { title: 'Products', value: '50', icon: MdProductionQuantityLimits, color: 'from-violet-500 to-purple-500' },
            { title: 'Sellers', value: '60', icon: FaUsers, color: 'from-emerald-500 to-teal-500' },
            { title: 'Orders', value: '434', icon: FaCartShopping, color: 'from-blue-500 to-indigo-500' }
          ].map((stat, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl bg-slate-800 p-6 shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color}" />
            </div>
          ))}
        </div>

        {/* Charts and Messages Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>
              <Chart options={state.options} series={state.series} type="area" height={400} />
            </div>
          </div>

          {/* Messages */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-slate-800 p-6 shadow-lg h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Messages</h2>
                <Link to="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-6 h-6">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Admin</span>
                        <span className="text-xs text-slate-400">2 days ago</span>
                      </div>
                      <p className="text-sm text-slate-300">How are you?</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link to="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 font-medium">Order ID</th>
                  <th className="text-left py-4 px-6 font-medium">Price</th>
                  <th className="text-left py-4 px-6 font-medium">Payment Status</th>
                  <th className="text-left py-4 px-6 font-medium">Order Status</th>
                  <th className="text-left py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/25 transition-colors">
                    <td className="py-4 px-6">#34344</td>
                    <td className="py-4 px-6">$454</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300">
                        Pending
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                        Processing
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link to="#" className="text-indigo-400 hover:text-indigo-300">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;