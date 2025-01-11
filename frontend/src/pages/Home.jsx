import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import { useEffect } from "react";
import { get_category,get_products } from "../store/reducers/homeReducer";


const Home = () => {

    const dispatch = useDispatch()
    const {categorys,products, latest_product, topRated_product, discount_product} = useSelector(state => state.home)
    
    useEffect(() => {
        dispatch(get_category())
        dispatch(get_products())
    }, [])


    return (
        <div className="w-full">
            <Header categorys={categorys}/>
            <Banner/>
            <Categorys categorys={categorys}/>
           <div className="py-[45px]">
            <FeatureProducts products={products}/>
           </div>
           <div className="py-10">
            <div className="w-[85%] flex flex-wrap mx-auto">
                <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                    <div className="overflow-hidden">
                        <Products products={latest_product}  title='Latest Product'/>
                    </div>
                    <div className="overflow-hidden">
                        <Products products={topRated_product} title='Top Rated Product'/>
                    </div>
                    <div className="overflow-hidden">
                        <Products products={discount_product} title='Discount Product'/>
                    </div>
                </div>
            </div>
            <Footer/>
           </div>
        </div>
    );
};

export default Home;