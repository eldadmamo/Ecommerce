import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_seller_message, messageClear, send_message_seller_admin, updateAdminMessage } from "../../store/Reducers/chatReducer";

import { socket } from "../../utils/utils";
import { useRef } from "react";

const SellerToAdmin = () => {

    const [show,setShow] = useState(false);
    const scrollRef = useRef()
    const sellerId = 65
    
    const {userInfo} = useSelector(state => state.auth)
    const {sellers, activeSeller, seller_admin_message, currentSeller, successMessage} = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const [text,setText] = useState('')

    useEffect(()=> {
        dispatch(get_seller_message())
    },[])

    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
                senderId: userInfo._id,
                receverId: '',
                message: text,
                senderName: userInfo.name
        }))
          setText('') 
       }

       useEffect (()=> {
              socket.on('receved_admin_message',msg => {
                   dispatch(updateAdminMessage(msg))
               })
           },[])
    
    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_seller_to_admin',seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }
       },[successMessage])
    
    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    },[seller_admin_message])

    return (
        <div className="px-4 lg:px-8 py-5">
            <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 px-4 py-4 rounded-md h-[calc(100vh-140px)]">
                <div className="flex w-full h-full relative">
                    <div className="w-full md:pl-4">
                        <div className="flex justify-between items-center"> 
                            {
                                sellerId && <div className="flex justify-start items-center gap-3">
                                    <div className="relative">
                                    <img className="w-[45px] h-[45px] border-2 border-green-500 p-[2px] rounded-full" alt="" src="http://localhost:5173/images/user.png" />
                                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                    </div>
                                    <h2 className="text-xl text-white font-semibold">Support</h2>
                                </div>
                            }
                        </div>

                        <div className="py-4">
                            <div className="bg-gray-800 h-[calc(100vh-280px)] rounded-md p-3 overflow-y-auto">
                                 {
                                    seller_admin_message.map((m,i) => {
                                        if(userInfo._id === m.senderId){
                                            return (
                                        <div key={i} ref={scrollRef} className="w-full flex justify-start items-center">
                                                <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                    <div>
                                                        <img className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]" src="http://localhost:5174/images/admin.png" alt=""/> 
                                                    </div>
                                                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-md">
                                                    <span>{m.message}</span>
                                                    </div>
                                                </div>
                                        </div> 
                                            )
                                        } else {
                                            return (
                                <div key={i} ref={scrollRef} className="w-full flex justify-end items-center">
                                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                    <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-md">
                                        <span>{m.message}</span>
                                        </div>
                                        <div>
                                            <img className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]" src="http://localhost:5174/images/user.png" alt=""/> 
                                        </div>
                                    </div>
                                </div>
                                            )
                                        }
                                    })
                                 }
                            </div>
                        </div>

                        <form onSubmit={send} className="flex gap-3">
                            <input value={text} onChange={(e) => setText(e.target.value)} className="w-full flex justify-between px-4 py-2 border border-gray-700 items-center focus:border-blue-500 rounded-md outline-none bg-transparent text-gray-200" type="text" placeholder="Type Your Message" />
                            <button className="shadow-lg bg-cyan-400 hover:bg-cyan-500 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerToAdmin;