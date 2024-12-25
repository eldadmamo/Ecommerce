import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { admin_login,messageClear } from "../../store/Reducers/authReducer";
import {PropagateLoader} from 'react-spinners';
import toast from "react-hot-toast";

const AdminLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loader,errorMessage,successMessage} = useSelector(state => state.auth)

    const [state, setState] = useState({
        email: "",
        password:""
    });

    const inputHandle = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(admin_login(state))
        console.log(state)
    }

    const overrideStyle ={
        display: 'flex',
        margin: '0 auto',
        height: '24px',
        justifyContent : 'center',
        alignItem: 'center'
    }

    useEffect(() => {
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }

        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/')
        }
    },[errorMessage,successMessage])

    return (
        <div className="min-w-screen min-h-screen bg-[#cdcae9]
                        flex justify-center items-center
                        ">
                            <div className="w-[350px] text-[#ffffff] p-2">
                              <div className="bg-[#6f68d1] p-4 rounded-md">
                                 
                                <div className="h-[70px] flex justify-center items-center">
                                    <div className="w-[180px] h-[50px]">
                                        <img className="w-full h-full" src="http://localhost:5173/images/admin.png"alt="image" />
                                    </div>
                                </div>

                                <form onSubmit={submit}>
        
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={inputHandle} value={state.email} className="px-3 py-2 outline-none border
                                        border-slate-400 bg-transparent rounded-md" type="text" name="email" 
                                        placeholder="Email" id="email" required/>
                                    </div>
                
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={inputHandle} value={state.password} className="px-3 py-2 outline-none border
                                        border-slate-400 bg-transparent rounded-md" type="password" name="password" 
                                        placeholder="password" id="password" required/>
                                    </div>
                                    <div className="flex items-center w-full gap-3 mb-3">
                                    <input className="w-4 h-4 text-blue-600 overflow-hidden
                                     bg-gray-200 rounded border-gray-300 focus:ring-blue-300
                                     " type="checkbox" name="checkbox" id="checkbox" />
                                    <label htmlFor="checkbox">i agree to privacy policy & terms</label>
                                    </div>
                
                                    <button disabled={loader ? true : false} className="bg-slate-800 w-full hover:shadow-blue-950 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                                        {
                                            loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle}/>:  'Login'
                                        }
                                    </button>
                
                                    <div className="flex items-center mb-3 gap-3 justify-center">
                                        <p>Already Have an account ?  
                                            <Link className="font-bold" to="/register"
                                    > Login </Link> </p>
                                    </div>
                
                                    
                                </form>
                             </div>
                            </div>
                        </div>
    );
};

export default AdminLogin;