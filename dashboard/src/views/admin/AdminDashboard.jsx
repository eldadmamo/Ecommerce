import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import Chart from 'react-apexcharts';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_admin_dashboard_data } from "../../store/Reducers/dashboardReducer";
import seller from '../../../public/images/user.png';
import moment from "moment";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { totalSale, totalOrder, totalProduct, totalSeller, recentOrder, recentMessage } = useSelector(state => state.dashboard);
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(get_admin_dashboard_data());
    }, []);

    const state = {
        series: [
            { name: 'Orders', data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45] },
            { name: 'Revenue', data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78] },
            { name: 'Sellers', data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56] }
        ],
        options: {
            color: ['#181ee8', '#181ee8'],
            plotOptions: { radius: 30 },
            chart: { background: 'transparent', foreColor: '#d0d2d6' },
            dataLabels: { enabled: false },
            stroke: {
                show: true,
                curve: ['smooth', 'straight', 'stepline'],
                lineCap: 'butt',
                colors: '#f0f0f0',
                width: 0.5,
                dashArray: 0
            },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
            legend: { position: 'top' },
            responsive: [
                {
                    breakpoint: 565,
                    yaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
                    options: {
                        plotOptions: { bar: { horizontal: true } },
                        chart: { height: "550px" }
                    }
                }
            ]
        }
    };

    return (
        <div className="px-2 md:px-7 py-5">
    {/* Top Cards Section */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-7">
        {/* Total Sale Card */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#fbc2eb] to-[#a18cd1] rounded-md shadow-md gap-3">
            <div className="flex flex-col justify-start items-start text-white">
                <h2 className="text-3xl font-bold">${totalSale}</h2>
                <span className="text-md font-medium">Orders</span>
            </div>
            <div className="w-10 h-12 rounded-full bg-[#8e44ad] flex justify-center items-center text-xl">
                <MdCurrencyExchange className="text-white" />
            </div>
        </div>

        {/* Total Order Card */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] rounded-md shadow-md gap-3">
            <div className="flex flex-col justify-start items-start text-white">
                <h2 className="text-3xl font-bold">{totalOrder}</h2>
                <span className="text-md font-medium">Products</span>
            </div>
            <div className="w-10 h-12 rounded-full bg-[#e74c3c] flex justify-center items-center text-xl">
                <MdCurrencyExchange className="text-white" />
            </div>
        </div>

        {/* Total Seller Card */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] rounded-md shadow-md gap-3">
            <div className="flex flex-col justify-start items-start text-white">
                <h2 className="text-3xl font-bold">{totalSeller}</h2>
                <span className="text-md font-medium">Sellers</span>
            </div>
            <div className="w-10 h-12 rounded-full bg-[#2980b9] flex justify-center items-center text-xl">
                <FaUsers className="text-white" />
            </div>
        </div>

        {/* Total Product Card */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-md shadow-md gap-3">
            <div className="flex flex-col justify-start items-start text-gray-800">
                <h2 className="text-3xl font-bold">{totalProduct}</h2>
                <span className="text-md font-medium">Orders</span>
            </div>
            <div className="w-10 h-12 rounded-full bg-[#2c3e50] flex justify-center items-center text-xl">
                <FaCartShopping className="text-white" />
            </div>
        </div>
    </div>

    {/* Chart Section */}
    <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
            <div className="w-full bg-white p-4 rounded-md shadow-md">
                <Chart options={state.options} series={state.series} type="bar" height={400} />
            </div>
        </div>

        {/* Recent Sellers Section */}
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
            <div className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-4 rounded-md text-white shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg pb-3">Recent Sellers Message</h2>
                    <Link className="font-semibold text-sm text-[#c2e9fb]">View All</Link>
                </div>
                <div className="flex flex-col gap-2 pt-6">
                    <ol className="relative border-l-2 border-slate-300 ml-4">
                        {recentMessage.map((m, i) => (
                            <li key={i} className="mb-3 ml-6">
                                <div className="flex absolute -left-5 shadow-md justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                                    {m.sellerId === userInfo._id ? (
                                        <img className="w-full rounded-full h-full shadow-md" src={userInfo.image} alt="" />
                                    ) : (
                                        <img className="w-full rounded-full h-full shadow-md" src={seller} alt="" />
                                    )}
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
                                    <div className="flex justify-between items-center mb-2">
                                        <Link className="text-md font-normal">{m.senderName}</Link>
                                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                            {moment(m.createdAt).startOf('hour').fromNow()}
                                        </time>
                                    </div>
                                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                        {m.message}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    </div>

    {/* Recent Orders Section */}
    <div className="w-full p-4 bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] rounded-md mt-6 shadow-md">
        <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800 pb-3">Recent Orders</h2>
            <Link className="font-semibold text-sm text-[#c06c84]">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-sm uppercase border-b border-gray-300">
                    <tr>
                        <th scope="col" className="py-3 px-4">Order Id</th>
                        <th scope="col" className="py-3 px-4">Price</th>
                        <th scope="col" className="py-3 px-4">Payment Status</th>
                        <th scope="col" className="py-3 px-4">Order Status</th>
                        <th scope="col" className="py-3 px-4">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrder.map((d, i) => (
                        <tr key={i}>
                            <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">#{d._id}</td>
                            <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">{d.price}</td>
                            <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">{d.payment_status}</td>
                            <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">{d.delivery_status}</td>
                            <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                                <Link to={`/admin/dashboard/order/details/${d._id}`} className="text-[#3498db] hover:underline">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    );
};

export default AdminDashboard;