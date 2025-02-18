import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { admin_order_status_update, get_admin_order } from "../../store/Reducers/OrderReducer";
import toast from "react-hot-toast";
import { messageClear } from "../../store/Reducers/chatReducer";

const OrderDetails = () => {


    const dispatch = useDispatch()
    const {orderId} = useParams()
    const [status,setStatus] = useState('')

    const { order,errorMessage, successMessage } = useSelector(state => state.order)


    useEffect(()=> {
        dispatch(get_admin_order(orderId))
    },[orderId])
    
    const status_update = (e) => {
        dispatch(admin_order_status_update({orderId, info: {status: e.target.value} }))
        setStatus(e.target.value)
    }

    useEffect(()=> {
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }

    },[successMessage,errorMessage])

    useEffect(()=> {
        setStatus(order?.delivery_status)
    },[order])

    return (
        <div className="px-2 lg:px-7 py-5">
        <div className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md shadow-lg">
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl text-white">Order Details</h2>
                <select 
                    onChange={status_update} 
                    value={status} 
                    className="px-4 py-2 focus:border-purple-500 outline-none bg-gray-700 border-gray-600 rounded-md text-white"
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="p-4">
                <div className="flex gap-2 text-lg text-white">
                    <h2>#{order._id}</h2>
                    <span>{order.date}</span>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-[30%]">
                        <div className="pr-3 text-white text-lg">
                            <div className="flex flex-col gap-1">
                                <h2 className="pb-2 font-semibold">Deliver To: {order.shippingInfo?.name}</h2>
                                <p>
                                    <span className="text-sm">
                                        {order.shippingInfo?.address}, {order.shippingInfo?.province}, {order.shippingInfo?.city}, {order.shippingInfo?.area}
                                    </span>
                                </p>
                            </div>
                            <div className="flex justify-start items-center gap-3 mt-2">
                                <h2 className="font-semibold">Payment Status:</h2>
                                <span className="text-base">{order.payment_status}</span>
                            </div>
                            <span className="block mt-2">Price: <span className="font-semibold">{order.price}</span></span>

                            <div className="mt-4 flex flex-col gap-4 bg-purple-500 rounded-md p-4 shadow-md">
                                {
                                    order.products && order.products.map((p, i) => 
                                    <div key={i} className="flex gap-3 text-md">
                                        <img className="w-[50px] h-[50px] rounded-md" src={p.images[0]} alt="" />
                                        <div>
                                            <h2 className="font-semibold">{p.name}</h2>
                                            <p>
                                                <span>Brand: {p.brand}</span>
                                                <span className="text-lg ml-2">Quantity: {p.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-[70%]">
                        <div className="pl-3">
                            <div className="mt-4 flex flex-col bg-purple-500 rounded-md p-4 shadow-md">
                                {
                                    order?.suborder?.map((o, i) => 
                                    <div key={i + 20} className="text-white mt-2">
                                        <div className="flex justify-start items-center gap-3">
                                            <h2 className="font-semibold">Sellers {i + 1} Order:</h2>
                                            <span>{o.delivery_status}</span>
                                        </div>

                                        {
                                            o.products?.map((p, i) => 
                                            <div key={i} className="text-white m-2">
                                                <div className="flex gap-3 text-md">
                                                    <img className="w-[50px] h-[50px] rounded-md" src={p.images[0]} alt="" />
                                                    <div>
                                                        <h2 className="font-semibold">{p.name}</h2>
                                                        <p>
                                                            <span>Brand: {p.brand}</span>
                                                            <span className="text-lg ml-2">Quantity: {p.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        }
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default OrderDetails;