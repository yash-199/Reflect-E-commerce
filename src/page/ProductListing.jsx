import React from "react";
import ProductCategories from "../components/ProductCategories";
import AllProduct from "../components/AllProduct";

const ProductListing = () => {
  return (
    <div className="w-full pt-24 px-4 sm:px-6 lg:px-10">
      
      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 relative">
        
        {/* ================= Sidebar ================= */}
        <div className="lg:w-72 w-full shrink-0">
          <div className="shadow-md p-3 rounded bg-white">
            <ProductCategories />
          </div>
        </div>

        {/* ================= Products ================= */}
        <div className="flex-1">
          <div className="shadow-sm p-3 rounded bg-white">
            <AllProduct />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductListing;
