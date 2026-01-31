import React, { useState } from "react";

const data = [
  {
    label: "Descriptions",
    value: "Descriptions",
    desc: `It really matters and then like it really doesn't matter.
What matters is the people who are sparked by it.`,
  },
  {
    label: "Additional Information",
    value: "Additional Information",
    desc: `Because it's about motivating the doers.
Inspire other people to follow their dreams, too.`,
  },
  {
    label: "Reviews",
    value: "Reviews",
    desc: `We're constantly growing, making mistakes,
and trying to actualize our dreams.`,
  },
];

const ProductDesc = () => {
  const [activeTab, setActiveTab] = useState(data[0]);

  return (
    <div className="pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-20">

      {/* ================= Tabs ================= */}
      <div
        className="
          flex gap-6 border-b mb-6
          overflow-x-auto whitespace-nowrap
          scrollbar-hide
        "
      >
        {data.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item)}
            className={`
              pb-2 font-medium transition shrink-0 text-sm sm:text-base
              ${
                activeTab.value === item.value
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= Content ================= */}
      <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
        {activeTab.desc}
      </div>
    </div>
  );
};

export default ProductDesc;
