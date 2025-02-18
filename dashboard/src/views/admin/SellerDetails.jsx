import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_seller,seller_status_update } from "../../store/Reducers/sellerReducer";
import { useParams } from "react-router-dom";
import { messageClear } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";

const SellerDetails = () => {

    const dispatch  = useDispatch()
    const  {seller,successMessage} = useSelector(state => state.seller)
    const {sellerId} = useParams()

    useEffect(() => {
       dispatch(get_seller(sellerId)) 
    },[sellerId])

    const [status, setStatus] = useState('') 
    const submit = (e) => {
        e.preventDefault();
        dispatch(seller_status_update({
            sellerId,
            status
        }))
    }

    useEffect(()=> {
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
        }

    },[successMessage])

    useEffect(()=> {
        if(seller){
            setStatus(seller.status)
        }
    },[seller])

    return (
        <div className="px-4 lg:px-8 pt-6">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Seller Details</h1>
            <div className="w-full p-6 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-md shadow-lg">
                <div className="w-full flex flex-wrap text-white">
                    <div className="w-3/12 flex justify-center items-center py-4">
                        <div>
                            {
                                seller?.image ? <img className="w-full h-[230px] rounded-lg object-cover" src="http://localhost:5173/images/admin.png"
                                    alt="" /> : <span className="text-gray-300">Image Not Uploaded</span>
                            }
                        </div>
                    </div>
                    <div className="w-4/12">
                        <div className="px-4 py-3">
                            <div className="py-3 text-lg text-indigo-100">
                                <h2>Basic Info</h2>
                            </div>

                            <div className="flex justify-between text-sm flex-col gap-2 p-6 bg-indigo-700 rounded-md">
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Name :</span>
                                    <span>{seller?.name}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Email :</span>
                                    <span>{seller?.email}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Role :</span>
                                    <span>{seller?.role}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Status :</span>
                                    <span>{seller?.status}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Payment Status :</span>
                                    <span>{seller?.payment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/12">
                        <div className="px-4 py-3">
                            <div className="py-3 text-lg text-indigo-100">
                                <h2>Address</h2>
                            </div>

                            <div className="flex justify-between text-sm flex-col gap-2 p-6 bg-indigo-700 rounded-md">
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Shop Name :</span>
                                    <span>{seller?.shopInfo?.shopName}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>Division:</span>
                                    <span>{seller?.shopInfo?.division}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>District :</span>
                                    <span>{seller?.shopInfo?.district}</span>
                                </div>
                                <div className="flex gap-2 font-bold text-white">
                                    <span>State :</span>
                                    <span>{seller?.shopInfo?.sub_district}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <form onSubmit={submit}>
                        <div className="flex gap-4 py-4">
                            <select onChange={(e) => setStatus(e.target.value)} value={status} className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-800 border border-indigo-500 rounded-md text-white" name="" id="" required>
                                <option value="">--Select Status--</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="deactive">Deactivate</option>
                            </select>
                            <button className="bg-red-600 w-[170px] hover:bg-red-700 text-white rounded-md px-7 py-2 shadow-md">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerDetails;