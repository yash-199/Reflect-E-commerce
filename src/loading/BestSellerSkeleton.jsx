import React from "react";

const BestSellerSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-xl p-2 animate-pulse">
          {/* Image */}
          <div className="bg-gray-200 h-[280px] w-full rounded-md mb-3"></div>

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>

          {/* Category */}
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

          {/* Price */}
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>

          {/* Button */}
          <div className="mt-2 h-8 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default BestSellerSkeleton;
