import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { categoryAdd,messageClear,get_category,updateCategory,deleteCategory } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
import Search from '../components/Search'

const Category = () => {

    const dispatch = useDispatch()
    const {loader, successMessage, errorMessage,categorys} = useSelector(state => state.category)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false);
    const [imageShow, setImage] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)

    const [state,setState] = useState({
        name: '',
        image:''
    })

    const imageHandle = (e) => {
        let files = e.target.files
        if(files.length > 0){
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }

    const addOrUpdateCategory = (e) => {
        e.preventDefault()
        if(isEdit){
            dispatch(updateCategory({ id: editId, ...state}))
        } else {
            dispatch(categoryAdd(state))
        }   
    }

    useEffect(()=> {

        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
            setState({
                name:'',
                image:''
            })
            setImage('')
            setIsEdit(false)
            setEditId(null)
        }

        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        } 

    },[successMessage, errorMessage,dispatch])

    useEffect(()=> {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))
    },[searchValue,currentPage,parPage])

    const handleEdit = (category) => {
        setState({
            name: category.name,
            image: category.image
        })
        setImage(category.image)
        setEditId(category._id)
        setIsEdit(true)
        setShow(true)
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure to delete category?')){
            console.log("delete category id", id);
            dispatch(deleteCategory(id))
        }
    }

    return (
        <div className="px-2 lg:px-7 pt-5">

            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#4F46E5] rounded-md">
                <h1 className="text-[#F3F4F6] font-semibold text-lg">Category</h1>
                <button onClick={() => setShow(true)} className="bg-[#EF4444] shadow-lg hover:shadow-[#EF4444]/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm">Add</button>
            </div>
            <div className="flex flex-wrap w-full">

                <div className="w-full lg:w-7/12">
                    <div className="w-full p-4 bg-[#4F46E5] rounded-md">

                        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-[#F3F4F6] ">
                                <thead className="text-sm text-[#F3F4F6] uppercase border-b border-[#6B7280]">
                                    <tr>
                                        <th scope="col" className="py-3 px-4">No</th>
                                        <th scope="col" className="py-3 px-4">Image</th>
                                        <th scope="col" className="py-3 px-4">Name</th>
                                        <th scope="col" className="py-3 px-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        categorys.map((d, i) =>
                                            <tr key={i}>
                                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{i + 1} </td>
                                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                                    <img className="w-[45px] h-[45px] rounded-sm" src={d.image} alt="" />
                                                </td>
                                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">{d.name}</td>

                                                <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                                                    <div className="flex justify-start items-center gap-4">
                                                        <Link onClick={() => handleEdit(d)} className="p-[6px] bg-[#F59E0B] rounded hover:shadow-lg hover:shadow-[#F59E0B]/50">
                                                            <FaEdit />
                                                        </Link>
                                                        <Link onClick={() => handleDelete(d._id)} className="p-[6px] bg-[#EF4444] rounded hover:shadow-lg hover:shadow-[#EF4444]/50">
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

                        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
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

                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                    <div className="w-full pl-5 ">
                        <div className="bg-[#4F46E5] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#F3F4F6]">

                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-[#F3F4F6] font-semibold text-xl mb-4 w-full text-center">{isEdit ? 'Edit Category' : 'Add Category'} </h1>

                                <div onClick={() => setShow(false)} className="block lg:hidden">
                                    <IoMdCloseCircle />
                                </div>
                            </div>

                            <form onSubmit={addOrUpdateCategory}>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="name">Category Name</label>
                                    <input value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} className="px-4 py-2 focus:border-[#4F46E5] outline-none bg-[#F3F4F6] border border-[#6B7280] rounded-md text-[#111827]" type="text" id="name" name="category_name" placeholder="Category Name" />
                                </div>

                                <div>
                                    <label htmlFor="image" className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-[#EF4444] w-full border-[#6B7280]">
                                        {
                                            imageShow ? <img className="w-full h-full" src={imageShow} /> : <>
                                                <span><FaImage /></span>
                                                <span>Select Image</span>
                                            </>
                                        }

                                    </label>
                                    <input value={state.value} onChange={imageHandle} className="hidden" type="file" name="image"
                                        id="image" />
                                    <div className="mt-4">
                                        <button disabled={loader ? true : false} className="bg-[#EF4444] w-full hover:shadow-[#EF4444]/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                                            {
                                                loader ? <PropagateLoader color="#fff"
                                                    cssOverride={overrideStyle} /> : isEdit ? 'Update Category' : 'Add Category'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;