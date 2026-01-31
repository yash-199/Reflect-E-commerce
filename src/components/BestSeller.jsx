import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/productListSlice";
import BestSellerSkeleton from "../loading/BestSellerSkeleton";

const BestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  // ⭐ Local state for showing skeleton for 5 seconds
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    dispatch(fetchProduct());

    // Set timer for skeleton
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, [dispatch]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center text-4xl my-10">Our Bestseller</h1>

      {showSkeleton ? (
        <BestSellerSkeleton count={10} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(75, 90).map((prod) => (
            <div
              key={prod.id}
              className="bg-[#fff] cursor-pointer shadow-xl rounded-xl p-2"
              onClick={() => navigate(`/product/${prod.id}`)}
            >
              <div className="relative group bg-gray-50 rounded-md overflow-hidden">
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="py-2 w-full h-[280px] shadow-xl object-cover bg-[#f3edea]"
                />

                <div className="absolute left-0 right-0 bottom-0 p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                  <button className="w-full bg-white rounded-md shadow py-2 text-sm font-medium hover:bg-black hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <p className="font-semibold text-sm">{prod.title}</p>
                <p className="text-xs text-gray-500 mt-1">{prod.category}</p>

                <div className="mt-2 flex items-center gap-2">
                  <p className="font-semibold text-sm">${prod.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 line-through">
                    ${(prod.price * 1.2).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center p-3 my-6">
        <button
          onClick={() => navigate("/productlist")}
          className="sm:w-1/5 px-10 bg-black text-white rounded-md shadow py-2 text-sm font-medium hover:bg-white hover:text-black transition"
        >
          View Products
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
