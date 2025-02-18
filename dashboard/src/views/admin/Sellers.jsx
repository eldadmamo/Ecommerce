import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_active_sellers } from "../../store/Reducers/sellerReducer";

const Sellers = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false);
    const {sellers,totalSeller} = useSelector(state => state.seller)

    useEffect(()=> {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_active_sellers(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className="px-2 lg:px-7 pt-5">

            <h1 className="text-[20px] font-bold mb-3 text-gray-800">Sellers</h1>
            

            <div className="w-full p-4 bg-indigo-600 rounded-md">
            <div className="flex justify-between items-center">
                    <select onChange={(e)=> setParPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-700 border border-indigo-500 rounded-md text-white">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className="px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-700 border border-indigo-500 rounded-md text-white" type="text" placeholder="search"/>
            </div>

            <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-white">
                                        <thead className="text-sm text-white uppercase border-b border-indigo-500">
                                        <tr>
                                            <th scope="col" className="py-3 px-4">No</th>
                                            <th scope="col" className="py-3 px-4">Image</th>
                                            <th scope="col" className="py-3 px-4">Name</th>
                                            <th scope="col" className="py-3 px-4">Shop Name</th>
                                            <th scope="col" className="py-3 px-4">Payment Status</th>
                                            <th scope="col" className="py-3 px-4">Email</th>
                                            <th scope="col" className="py-3 px-4">Devision</th>
                                            <th scope="col" className="py-3 px-4">District</th>
                                            <th scope="col" className="py-3 px-4">Action</th>
                                        </tr>
                                        </thead>
                
                                        <tbody>
                                           {
                                           sellers.map((d,i) => 
                                           <tr key={i} className="border-b border-indigo-500">
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{i+1}</td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                                <img className="w-[45px] h-[45px] rounded-sm" src={d.image}  alt="" />
                                            </td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.name}</td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.shopInfo?.shopName}</td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                                <span>{d.payment}</span>
                                            </td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.email}</td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.status}</td>
                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.shopInfo?.district}</td>

                                            <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-4">
                                                <Link to={`/admin/dashboard/sellers/details/${d._id}`} className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
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
            
            {
                totalSeller <= parPage ? <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                <Pagination 
                    pageNumber = {currentPage}
                    setPageNumber = {setCurrentPage}
                    totalItem = {totalSeller}
                    parPage = {parPage}
                    showItem = {2}
                />
         </div>: ''
            }
                
            

            </div>
        </div>
    );
};

export default Sellers;