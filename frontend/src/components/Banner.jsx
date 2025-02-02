import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";


const Banner = () => {

    const dispatch = useDispatch()
    const {banners} = useSelector(state => state.home)


    useEffect(()=> {
        dispatch(get_banners())
    },[])

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
    ]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className="w-full md-lg:mt-6">
            <div className="w-[85%] lg:w-[90%] mx-auto">
                <div className="w-full flex flex-wrap md-lg:gap-8">
                    <div className="w-full">
                    <div className="my-8 relative">
                        {/* Carousel */}
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {
                               banners.length > 0 && banners.map((b, i) => (
                                    <div  className="flex-[0_0_100%]">
                                        <Link key={i} to={`/product/details/${b.link}`} className="block w-full">
                                            <img
                                                src={b.banner}
                                                className="w-full h-[400px] object-cover"
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Arrow Navigation */}
                        <button
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center shadow-lg"
                            onClick={scrollPrev}
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center shadow-lg"
                            onClick={scrollNext}
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;