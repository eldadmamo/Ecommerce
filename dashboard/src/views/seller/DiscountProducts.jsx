import { useState } from "react";
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination";
import { FaEdit,FaEye,FaTrash } from "react-icons/fa";

const DiscountProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)

    return (
        <div className="px-4 lg:px-8 pt-5">
            <h1 className="text-gray-800 font-semibold text-2xl mb-4">
                Discount Products
            </h1>
            <div className="w-full p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-md">
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                 
                <div className="relative overflow-x-auto mt-6">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-sm text-gray-300 uppercase border-b border-gray-700">
                            <tr>
                                <th scope="col" className="py-3 px-5">No</th>
                                <th scope="col" className="py-3 px-5">Image</th>
                                <th scope="col" className="py-3 px-5">Name</th>
                                <th scope="col" className="py-3 px-5">Category</th>
                                <th scope="col" className="py-3 px-5">Brand</th>
                                <th scope="col" className="py-3 px-5">Price</th>
                                <th scope="col" className="py-3 px-5">Discount</th>
                                <th scope="col" className="py-3 px-5">Stock</th>
                                <th scope="col" className="py-3 px-5">Action</th>
                            </tr>
                        </thead>
                
                        <tbody>
                            {
                                [1, 2, 3, 4, 5].map((d, i) => 
                                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">
                                            <img className="w-[45px] h-[45px] rounded-md" src={`http://localhost:5173/images/products/${d}.webp`} alt="" />
                                        </td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">Men Full Sleeve</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">T-Shirt</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">Nike</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">$232</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">10%</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">20</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">
                                            <div className="flex justify-start items-center gap-4">
                                                <Link className="p-[6px] bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50 transition-colors">
                                                    <FaEdit />
                                                </Link>
                                                <Link className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50 transition-colors">
                                                    <FaEye />
                                                </Link>
                                                <Link className="p-[6px] bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-colors">
                                                    <FaTrash />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )                       
                            }
                        </tbody>
                    </table>
                </div>

                <div className="w-full flex justify-end mt-6">
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

export default DiscountProducts;