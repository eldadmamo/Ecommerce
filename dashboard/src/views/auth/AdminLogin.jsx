import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { admin_login } from "../../store/Reducers/authReducer";

const AdminLogin = () => {

    const dispatch = useDispatch()

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
                
                                    <button className="bg-slate-800 w-full hover:shadow-blue-950 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                                        Sign In
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