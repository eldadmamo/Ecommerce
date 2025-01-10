import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const RatingTemp = ({rating}) => {
    if(rating === 5){
        return (
            <>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            </>
        )
    }

    else if(rating === 4){
        return (
            <>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            </>
        )
    }

    else if(rating === 3){
        return (
            <>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            </>
        )
    }

    else if(rating === 2){
        return (
            <>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            </>
        )
    }

    else if(rating === 1){
        return (
            <>
            <span className="text-[#edbb0e]"><FaStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            </>
        )
    }

    else {
        return (
            <>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            <span className="text-[#edbb0e]"><CiStar/></span>
            </>
        )
    }


    
};

export default RatingTemp;