import React from 'react';
import {FaRegImage} from 'react-icons/fa'
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_banner,get_banner, update_banner } from '../../store/Reducers/bannerReducer';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { messageClear } from '../../store/Reducers/productReducer';


const AddBanner = () => {

    const {productId} = useParams()
    const dispatch = useDispatch()
    const {loader,successMessage, errorMessage, banner} = useSelector(state => state.banner)

    const [imageShow, setImageShow] = useState('')
    const [image, setImage] = useState('')

    const imageHandle = (e) => {
        const files = e.target.files;
        const length = files.length 
        
        if (length  > 0){
            setImage(files[0])
            setImageShow(URL.createObjectURL(files[0]))
        }
    }

    useEffect(()=> {
        dispatch(get_banner(productId))
    },[productId])

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productId', productId)
        formData.append('mainban', image)
        dispatch(add_banner(formData))

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

    const update = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('mainban', image)
        dispatch(update_banner({info: formData, bannerId: banner._id} ))
    }

    return (
        <div className='px-4 lg:px-8 pt-6'>
            <h1 className='text-gray-800 font-semibold text-xl mb-4'>
                Add Banner
            </h1>
            <div className='w-full p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg shadow-xl'>
                {
                    !banner && <div>
                        <form onSubmit={add}>
                            <div className='mb-5'>
                                <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border-4 border-dashed border-gray-300 hover:border-yellow-500 w-full text-white rounded-lg'>
                                    <span className='text-5xl'><FaRegImage/></span>
                                    <span>Select Banner Image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type='file' id='image'/>
                            </div>

                            {
                                imageShow && <div className='mb-5'>
                                    <img className='w-full h-[300px] object-cover rounded-lg' src={imageShow} alt='' />
                                </div>
                            }

                            <button disabled={loader ? true : false} className="bg-yellow-500 w-[280px] hover:shadow-lg hover:shadow-yellow-300 text-white font-semibold rounded-lg px-7 py-3 mb-4">
                                {
                                   loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle}/> :  'Add Banner'
                                }
                            </button>
                        </form>
                    </div>
                }

                {
                    banner &&  <div>
                        {
                            <div className='mb-5'>
                                <img className='w-full h-[300px] object-cover rounded-lg' src={banner.banner} alt='' />
                            </div>
                        }
                        <form onSubmit={update}>
                            <div className='mb-5'>
                                <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border-4 border-dashed border-gray-300 hover:border-yellow-500 w-full text-white rounded-lg'>
                                    <span className='text-5xl'><FaRegImage/></span>
                                    <span>Select Banner Image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type='file' id='image'/>
                            </div>

                            {
                                imageShow && <div className='mb-5'>
                                    <img className='w-full h-[300px] object-cover rounded-lg' src={imageShow} alt='' />
                                </div>
                            }

                            <button disabled={loader ? true : false} className="bg-yellow-500 w-[280px] hover:shadow-lg hover:shadow-yellow-300 text-white font-semibold rounded-lg px-7 py-3 mb-4">
                                {
                                    loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle}/> :  'Update Banner'
                                }
                            </button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddBanner;