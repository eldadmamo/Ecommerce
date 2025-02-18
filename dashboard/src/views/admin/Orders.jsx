import { useEffect, useState } from "react";


import { LuSquareArrowDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/OrderReducer";

const Orders = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false);

    const {myOrders, totalOrder} = useSelector(state => state.order)

    useEffect(()=> {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_admin_orders(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className="px-4 lg:px-8 pt-6">
            <div className="w-full p-6 bg-indigo-700 rounded-md shadow-lg">
                <div className="flex justify-between items-center">
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-700 border border-slate-600 rounded-md text-white">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-700 border border-slate-600 rounded-md text-white" type="text" placeholder="Search orders" />
                </div>

                <div className="relative mt-6 overflow-x-auto">
                    <div className="w-full text-sm text-left text-white">
                        <div className="text-sm text-white uppercase border-b border-slate-600">
                            <div className="flex justify-between items-center">
                                <div className="py-3 w-[25%] font-bold">Order ID</div>
                                <div className="py-3 w-[13%] font-bold">Price</div>
                                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                                <div className="py-3 w-[18%] font-bold">Order Status</div>
                                <div className="py-3 w-[18%] font-bold">Action</div>
                                <div className="py-3 w-[8%] font-bold"><LuSquareArrowDown /></div>
                            </div>
                        </div>
                    </div>

                    {
                        myOrders.map((o, i) =>
                            <div className="text-white">

                                <div className="flex justify-between items-start border-b border-slate-600">
                                    <div className="py-3 w-[25%] font-medium whitespace-nowrap">#{o._id}</div>
                                    <div className="py-3 w-[13%] font-medium">${o.price}</div>
                                    <div className="py-3 w-[18%] font-medium">{o.payment_status}</div>
                                    <div className="py-3 w-[18%] font-medium">{o.delivery_status}</div>
                                    <div className="py-3 w-[18%] font-medium">
                                        <Link to={`/admin/dashboard/order/details/${o._id}`} className="text-blue-400 hover:text-blue-600">View</Link>
                                    </div>
                                    <div onClick={() => setShow(o._id)} className="py-3 w-[8%] font-medium cursor-pointer text-indigo-400 hover:text-indigo-600"><LuSquareArrowDown /></div>
                                </div>

                                <div className={show === o._id ? 'block border-b border-slate-600 bg-indigo-500' : 'hidden'}>

                                    {
                                        o.suborder.map((so, i) =>
                                            <div className="flex justify-start items-start border-b border-slate-600">
                                                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">#{so._id}</div>
                                                <div className="py-3 w-[13%] font-medium">${so.price}</div>
                                                <div className="py-3 w-[18%] font-medium">{so.payment_status}</div>
                                                <div className="py-3 w-[18%] font-medium">{so.delivery_status}</div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }

                </div>

                {
                    totalOrder <= parPage ? "" :
                        <div className="w-full flex justify-end mt-6">
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={totalOrder}
                                parPage={parPage}
                                showItem={4}
                            />
                        </div>
                }

            </div>
        </div>
    );
};

export default Orders;