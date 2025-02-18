import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FixedSizeList as List} from "react-window"
import { confirm_payment_request, get_payment_request, messageClear } from "../../store/Reducers/PaymentReducer";
import moment from "moment";
import toast from "react-hot-toast";

function handleOnWheel({deltaY}){
    console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props,ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}/>
))

const PaymentRequest = () => {

    const dispatch = useDispatch()

    const {successMessage,errorMessage, pendingWithdraws, loader} = useSelector(state => state.payment)
    const [paymentId, setPaymentId] = useState('')

    useEffect(()=> {
        dispatch(get_payment_request())
    },[])
    
    const confirm_request = (id) => {
        setPaymentId(id)
        dispatch(confirm_payment_request(id))
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

    

    // const array = [1,2,3,4,5,6,7,8,9,10]

    const Row = ({index,style}) => {
       return (
        <div style={style} className="flex text-sm text-white font-medium">
            <div className="w-[25%] p-2 whitespace-nowrap">
                {index + 1}
            </div>
            <div className="w-[25%] p-2 whitespace-nowrap">
                ${pendingWithdraws[index]?.amount}
            </div>
            <div className="w-[25%] p-2 whitespace-nowrap">
                <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
                ${pendingWithdraws[index]?.status}
                </span>
            </div>
            <div className="w-[25%] p-2 whitespace-nowrap">
                {moment(pendingWithdraws[index]?.createdAt).format('LL')}
            </div>
            <div className="w-[25%] p-2 whitespace-nowrap">
                <button disabled={loader} onClick={() => confirm_request(pendingWithdraws[index]?._id)} className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]">
                    {(loader && paymentId === pendingWithdraws[index]?._id) ? 'loading...': 'Confirm'}
                    </button>
            </div>

        </div>
       )
    }

    return (
        <div className='px-4 lg:px-8 pt-5'>
            <div className='w-full p-6 bg-indigo-700 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold pb-5 text-white'>Withdrawal Request</h2>
                <div className='w-full'>
                    <div className='w-full overflow-x-auto'>
                        <div className='flex bg-indigo-600 text-white uppercase text-xs font-bold rounded-md'>
                            <div className='w-[20%] p-3'>No</div>
                            <div className='w-[20%] p-3'>Amount</div>
                            <div className='w-[20%] p-3'>Status</div>
                            <div className='w-[20%] p-3'>Date</div>
                            <div className='w-[20%] p-3'>Action</div>
                        </div>
                        <List
                            style={{ minWidth: '340px' }}
                            className='List'
                            height={350}
                            itemCount={pendingWithdraws.length}
                            itemSize={50}
                            outerElementType={outerElementType}
                        >
                            {Row}
                        </List>
                    </div>
                </div>
            </div>
        </div>
            );
};

export default PaymentRequest;