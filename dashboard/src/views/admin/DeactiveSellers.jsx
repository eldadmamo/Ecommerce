import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_deactive_sellers } from "../../store/Reducers/sellerReducer";

const DeactiveSellers = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()
    const {sellers,totalSeller} = useSelector(state => state.seller)

    useEffect(()=> {
            const obj = {
                parPage: parseInt(parPage),
                page: parseInt(currentPage),
                searchValue
            }
            dispatch(get_deactive_sellers(obj))
        },[searchValue,currentPage,parPage])

    return (
        <div className="px-2 lg:px-7 pt-5">
    <h1 className="text-[22px] font-bold mb-4 text-gray-800">Deactive Sellers</h1>
    
    <div className="w-full p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <select onChange={(e)=> setParPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-purple-300 outline-none bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <input onChange={e => setSearchValue(e.target.value)} className="px-4 py-2 focus:border-purple-300 outline-none bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm" type="text" placeholder="Search"/>
        </div>

        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <thead className="text-xs text-white uppercase  border-b">
                    <tr>
                        <th scope="col" className="py-3 px-4">No</th>
                        <th scope="col" className="py-3 px-4">Image</th>
                        <th scope="col" className="py-3 px-4">Name</th>
                        <th scope="col" className="py-3 px-4">Status</th>
                        <th scope="col" className="py-3 px-4">Action</th>
                        <th scope="col" className="py-3 px-4">Email</th>
                        <th scope="col" className="py-3 px-4">Payment Status</th>
                        <th scope="col" className="py-3 px-4">Status</th>
                        <th scope="col" className="py-3 px-4">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        sellers.map((d, i) => 
                        <tr key={i} className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                            <td className="py-2 px-4 font-medium text-white">{i+1}</td>
                            <td className="py-2 px-4">
                                <img className="w-[45px] h-[45px] rounded-full border border-gray-200 shadow-sm" src={d.image} alt="" />
                            </td>
                            <td className="py-2 px-4 font-medium text-white">{d.name}</td>
                            <td className="py-2 px-4 text-white">{d.shopInfo?.shopName}</td>
                            <td className="py-2 px-4">
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-md">{d.payment}</span>
                            </td>
                            <td className="py-2 px-4 text-white">{d.email}</td>
                            <td className="py-2 px-4">
                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${d.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {d.status}
                                </span>
                            </td>
                            <td className="py-2 px-4 text-white">{d.shopInfo?.district}</td>
                            <td className="py-2 px-4">
                                <div className="flex items-center gap-3">
                                    <Link to={`/admin/dashboard/sellers/details/${d._id}`} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md">
                                        <FaEye />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

        <div className="w-full flex justify-end mt-4">
            <Pagination 
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSeller}
                parPage={parPage}
                showItem={3}
            />
        </div>
    </div>
</div>

    );
};

export default DeactiveSellers;