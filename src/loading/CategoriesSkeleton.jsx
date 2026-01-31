import React from "react";

const CategoriesSkeleton = () => {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="
              shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%]
              h-[22rem]
              rounded-xl
              bg-gray-200
              animate-pulse
              p-4
              flex flex-col justify-end
            "
          >
            {/* fake button skeleton */}
            <div className="h-10 w-28 bg-gray-300 rounded-md"></div>
          </div>
        ))}
    </>
  );
};

export default CategoriesSkeleton;
