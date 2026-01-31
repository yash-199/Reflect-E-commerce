import Girl from "../assets/Girls.png";
import Men from "../assets/Men.png";
import GirlWinter from "../assets/GirlWinters.png";
import BoyWinter from "../assets/MenWinter.png";
import { useEffect, useState } from "react";
import CollectionSkeleton from "../loading/CollectionSkeleton";

const Collection = () => {
    const [showSkeleton,setShowSkeleton] = useState(true);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowSkeleton(false);
        },800);
        return ()=>clearTimeout(timer)
    },[])

    if(showSkeleton){
        return <CollectionSkeleton/>
    }
    return (
        <div className="w-full max-w-[66rem] mx-auto py-10">
            <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-8 px-10">

                {/* Card 1 */}
                <div className="relative bg-[#C6CED1] rounded-2xl h-[24rem] overflow-hidden p-6 group cursor-pointer">

                    <img
                        src={Girl}
                        alt=""
                        className="
      absolute bottom-0 left-1/2 -translate-x-1/2
      h-[24rem] object-cover
      transition-transform duration-700 ease-out
      group-hover:scale-[1.5]
    "
                    />

                    <button className="absolute bottom-6 left-1/4 bg-white px-6 py-2 rounded-full shadow ">
                        Explore Now
                    </button>

                </div>


                {/* Card 2 */}
                <div className="relative bg-[#C6CED1] rounded-2xl h-[24rem] overflow-hidden p-6 group cursor-pointer">

                    <img
                        src={Men}
                        alt=""
                        className="
      absolute bottom-0 left-1/2 -translate-x-1/2
      h-[24rem] object-cover
      transition-transform duration-700 ease-out
      group-hover:scale-[1.5]
    "
                    />

                    <button className="absolute bottom-6 left-1/4 bg-white px-6 py-2 rounded-full shadow">
                        Explore Now
                    </button>

                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6 cursor-pointer">

                    {/* Small Card 1 */}
                    <div className="relative flex bg-[#C6CED1]  rounded-2xl h-[11rem] overflow-hidden p-4 group ">
                        <div className="flex-1 flex flex-col justify-between">
                            <p className="uppercase text-sm font-bold ">Women Collection</p>
                            <p className="text-lg font-medium ">Stylish Winter T-Shirt <br /> for Women</p>
                            <button className="text-black bg-white px-5 py-2 rounded-lg w-fit ">
                                Check Now
                            </button>
                        </div>
                        <img
                            src={GirlWinter}
                            alt=""
                            className="h-full object-fit absolute right-0 transition-transform duration-700 ease-out
      group-hover:scale-[1.5]"
                        />
                    </div>

                    {/* Small Card 2 */}
                    <div className="relative flex bg-[#C6CED1]  rounded-2xl h-[11rem] overflow-hidden p-4 cursor-pointer group">
                        <div className="flex-1 flex flex-col justify-between">
                            <p className="uppercase text-sm font-bold">Men Collection</p>
                            <p className="text-lg font-medium">Stylish Winter Jacket <br /> for Men</p>
                            <button className="text-black bg-white px-5 py-2 rounded-lg w-fit">
                                Check Now
                            </button>
                        </div>
                        <img
                            src={BoyWinter}
                            alt=""
                            className="h-full object-cover absolute right-0 transition-transform duration-700 ease-out
      group-hover:scale-[1.5]"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Collection;
