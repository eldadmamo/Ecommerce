import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_seller_order, seller_order_status_update } from "../../store/Reducers/OrderReducer";
import toast from "react-hot-toast";
import { messageClear } from "../../store/Reducers/chatReducer";

const OrderDetails = () => {
    const {orderId} = useParams()
    const dispatch = useDispatch()
    const [status,setStatus] = useState('')

    const {order,successMessage, errorMessage} = useSelector(state => state.order)
    useEffect(()=> {
        dispatch(get_seller_order(orderId))
    },[orderId]) 

    const status_update = (e) => {
            dispatch(seller_order_status_update({orderId, info: {status: e.target.value} }))
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
        <div className="w-full p-4 bg-indigo-600 rounded-md">
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl text-gray-100">Order Details</h2>
                <select onChange={status_update} value={status} name="" id="" className="px-4 py-2 focus:border-indigo-500 outline-none bg-gray-700 border-gray-600 rounded-md text-gray-100">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="p-4">
                <div className="flex gap-2 text-lg text-gray-100">
                    <h2>#{order._id}</h2>
                    <span>{order.date}</span>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-[30%]">
                         <div className="pr-3 text-gray-100 text-lg">
                            <div className="flex flex-col gap-1">
                                <h2 className="pb-2 font-semibold">Deliver To: {order.shippingInfo}</h2>
                            </div>
                            <div className="flex justify-start items-center gap-3">
                                <h2>Payment Status</h2>
                                <span className="text-base">{order.payment_status}</span>
                            </div>
                            <span>Price : ${order.price} </span>

                        

                            {order?.products?.map((p,i) => 
                            <div key={i} className="mt-4 flex flex-col gap-4 bg-indigo-500 rounded-md">
                                <div className="text-gray-100">
                                    <div className="flex gap-3 text-md">
                                        <img className="w-[50px] h-[50px]" src={p.images[0]} alt="" />
                                        <div className="">
                                            <h2>{p.name}</h2>
                                            <p>
                                                <span>Brand: </span>
                                                <span>{p.brand}</span>
                                                <span className="text-lg">Quantity : {p.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default OrderDetails;