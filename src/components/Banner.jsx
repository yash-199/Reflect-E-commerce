import React, { useEffect, useState } from "react";
import SliderOne from "./../assets/SliderEight.jpg";
import SliderTwo from "./../assets/SliderTwo.jpg";
import SliderThree from "./../assets/SliderThree.jpg";
import SliderFour from "./../assets/SliderFour.jpg";
import SliderFive from "./../assets/SliderFive.jpg";
import { FaPlay, FaPause } from "react-icons/fa";

const slides = [
  SliderOne,
  SliderTwo,
  SliderThree,
  SliderFour,
  SliderFive,
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
   <div className="relative w-full overflow-hidden h-[300px] sm:h-[00px] md:h-[500px] lg:h-[600px]">
      {/* SLIDES */}
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          className={`
            absolute inset-0 w-full sm:h-[600px] object-cover top-20
            transition-all duration-1000 ease-in-out
            ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        />
      ))}

      {/* APPLE CONTROL BAR */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-2 rounded-full">

        {/* DOTS */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300
                ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}
              `}
            />
          ))}
        </div>

        {/* PLAY / PAUSE */}
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
        >
          {autoPlay ? (
            <FaPause className="text-white text-xs" />
          ) : (
            <FaPlay className="text-white text-xs" />
          )}
        </button>
      </div>

    </div>
  );
};

export default Banner;
