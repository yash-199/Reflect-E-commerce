import React, { useEffect, useState } from 'react'
import CK from "./../assets/CalvinKlein.png"
import Chanel from "./../assets/Chanel.png"
import Denim from "./../assets/Denim.png"
import Louis from "./../assets/Louis.png"
import Prada from "./../assets/Prada.png"
const BrandName = () => {
    const BrandImage = [
        Chanel,
        Louis,
        Prada,
        CK,
        Denim,
    ]
    const [loaded, setLoaded] = useState(Array(BrandImage.length).fill(false));
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 500);
        return () => clearTimeout(timer)
    }, [])
    const handleLoad = (index) => {
        setLoaded((prev) => {
            const copy = [...prev];
            copy[index] = true;
            return copy;
        })
    }
    return (
        <div className='sm:flex sm:mx-auto mt-10 items-center justify-between px-10 '>
            {BrandImage.map((img, i) => (
                <div className='flex my-10 mx-12' key={i}>
                    {(showSkeleton || !!loaded[i]) && (
                        <div className='w-32 h-16 bg-gray-200 rounded-md animate-pulse'></div>
                    )}
                    <img src={img} alt="brand" onLoad={() => handleLoad(i)}
                        className={`${!showSkeleton && loaded[i] ? "block" : "hidden"} object-contain`}
                    />
                </div>
            ))}
        </div>
    )
}

export default BrandName