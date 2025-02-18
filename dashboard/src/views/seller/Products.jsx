import { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination";
import { FaEdit,FaEye,FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";
import {LuImageMinus} from "react-icons/lu"

const Products = () => {

    const dispatch = useDispatch()
    const {products,totalProduct} = useSelector(state => state.product);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)

    useEffect(()=> {
     const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
        }
     dispatch(get_products(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className="px-4 lg:px-8 pt-6">
            <h1 className="text-gray-900 font-semibold text-xl mb-4">
                All Products
            </h1>
            <div className="w-full p-5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
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
                                products.map((d, i) =>
                                    <tr key={i} className="border-b border-gray-600 hover:bg-gray-700">
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{i + 1}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">
                                            <img className="w-[45px] h-[45px] rounded-md" src={d.images[0]} alt="" />
                                        </td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d?.name?.slice(0, 15)}...</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d.category}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d.brand}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d.price}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">
                                            {
                                                d.discount === 0 ? <span>No Discount</span> :
                                                    <span className="text-yellow-400">{d.discount}%</span>
                                            }
                                        </td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">{d.stock}</td>
                                        <td scope="row" className="py-2 px-5 font-medium whitespace-nowrap">
                                            <div className="flex justify-start items-center gap-4">
                                                <Link to={`/seller/dashboard/edit-product/${d._id}`} className="p-2 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                                                    <FaEdit />
                                                </Link>
                                                <Link to={`/seller/dashboard/add-banner/${d._id}`} className="p-2 bg-sky-500 rounded hover:shadow-lg hover:shadow-sky-500/50">
                                                    <LuImageMinus />
                                                </Link>
                                                <Link className="p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                                                    <FaEye />
                                                </Link>
                                                <Link className="p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
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

                {
                    totalProduct <= parPage ? "" : <div className="w-full flex justify-end mt-6">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={50}
                            parPage={parPage}
                            showItem={3}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Products;