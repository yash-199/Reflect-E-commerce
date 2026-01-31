import React from 'react'

const CollectionSkeleton = () => {
  return (
    <div className="w-full max-w-[66rem] mx-auto py-10 animate-pulse">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-8 px-10">

        {/* LEFT CARD */}
        <div className="bg-gray-200 rounded-2xl h-[24rem] relative">
          <div className="absolute bottom-6 left-1/4 w-32 h-10 bg-gray-300 rounded-full"></div>
        </div>

        {/* CENTER CARD */}
        <div className="bg-gray-200 rounded-2xl h-[24rem] relative">
          <div className="absolute bottom-6 left-1/4 w-32 h-10 bg-gray-300 rounded-full"></div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* SMALL CARD 1 */}
          <div className="bg-gray-200 rounded-2xl h-[11rem] p-4 flex justify-between">
            <div className="space-y-3">
              <div className="w-28 h-4 bg-gray-300 rounded"></div>
              <div className="w-44 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded-lg mt-4"></div>
            </div>
            <div className="w-24 h-full bg-gray-300 rounded-xl"></div>
          </div>

          {/* SMALL CARD 2 */}
          <div className="bg-gray-200 rounded-2xl h-[11rem] p-4 flex justify-between">
            <div className="space-y-3">
              <div className="w-28 h-4 bg-gray-300 rounded"></div>
              <div className="w-44 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded-lg mt-4"></div>
            </div>
            <div className="w-24 h-full bg-gray-300 rounded-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollectionSkeleton;
