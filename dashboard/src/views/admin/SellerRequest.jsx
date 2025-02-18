import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { get_seller_request } from "../../store/Reducers/sellerReducer";
import Search from "../components/Search";


const SellerRequest = () => {

    const dispatch = useDispatch()
    const {sellers,totalSeller} = useSelector(state => state.seller)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false);


    useEffect(()=> {
        dispatch(get_seller_request({
            parPage,
            searchValue,
            page: currentPage
        }))
         
    },[parPage,searchValue,currentPage])

    return (
        <div className="px-4 lg:px-8 pt-6">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Seller Request</h1>
            <div className="w-full p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-lg">

                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className="relative overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left text-gray-200">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                            <tr>
                                <th scope="col" className="py-3 px-6">No</th>
                                <th scope="col" className="py-3 px-6">Name</th>
                                <th scope="col" className="py-3 px-6">Email</th>
                                <th scope="col" className="py-3 px-6">Payment Status</th>
                                <th scope="col" className="py-3 px-6">Status</th>
                                <th scope="col" className="py-3 px-6">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                sellers.map((d, i) =>
                                    <tr className="border-b border-gray-600" key={i}>
                                        <td className="py-2 px-6 font-medium whitespace-nowrap text-gray-300">{i + 1}</td>
                                        <td className="py-2 px-6 font-medium whitespace-nowrap text-gray-200">{d.name}</td>
                                        <td className="py-2 px-6 font-medium whitespace-nowrap text-gray-200">{d.email}</td>
                                        <td className="py-2 px-6 font-medium whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-sm ${d.payment === "Paid" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-900"}`}>{d.payment}</span>
                                        </td>
                                        <td className="py-2 px-6 font-medium whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-sm ${d.status === "Active" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}`}>{d.status}</span>
                                        </td>

                                        <td className="py-2 px-6 font-medium whitespace-nowrap">
                                            <div className="flex justify-start items-center gap-4">
                                                <Link to={`/admin/dashboard/sellers/details/${d._id}`} className="p-2 bg-green-500 rounded-lg hover:shadow-lg hover:shadow-green-400/50 text-white">
                                                    <FaEye />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

                <div className="w-full flex justify-end mt-4">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>

            </div>
        </div>
    );
};

export default SellerRequest;