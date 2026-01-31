import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { categoryImages } from "../assets/categoryImages.js";
import CategoriesSkeleton from "../loading/CategoriesSkeleton.jsx";

const Category = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);

  // ⭐ local skeleton timer state
  const [showSkeleton, setShowSkeleton] = useState(true);

  /* ================= FETCH + TIMER ================= */
  useEffect(() => {
    dispatch(fetchCategories());

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 5000); // 5 seconds skeleton

    return () => clearTimeout(timer);
  }, [dispatch]);

  /* ================= SCROLL ================= */
  const scrollByAmount = (direction = "right") => {
    const el = sliderRef.current;
    if (!el) return;

    const card = el.querySelector("[data-card='true']");
    const step = card ? card.getBoundingClientRect().width + 16 : 320;

    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div className=" px-4 sm:px-10 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl py-2 font-semibold my-6">
          Shop by Categories
        </h1>

        <div className="flex items-center gap-3">
          <button onClick={() => scrollByAmount("left")} className="btn">
            <IoIosArrowBack />
          </button>

          <button onClick={() => scrollByAmount("right")} className="btn">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-3 scrollbar-hide"
      >
        {/* ⭐ Show skeleton first OR redux loading */}
        {showSkeleton || loading ? (
          <CategoriesSkeleton />
        ) : (
          categories.map((category, index) => (
            <div
              key={category}
              data-card="true"
              className="relative bg-[#C6CED1] shadow-xl rounded-xl h-[22rem]
                         flex flex-col items-center justify-between p-4 overflow-hidden
                         shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%]"
            >
              {/* Index */}
              <p className="text-gray-400 text-5xl font-bold self-end opacity-40">
                {index + 1}
              </p>

              {/* Image */}
              <img
                src={categoryImages[category]}
                loading="loading"
                alt={category}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              {/* Button */}
              <button
                onClick={() => navigate(`/category/${category}`)}
                className="bg-white text-black shadow-lg py-2 px-4 rounded-md capitalize z-20 relative"
              >
                {category.replace("-", " ")}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
