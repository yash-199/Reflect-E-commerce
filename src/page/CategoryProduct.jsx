import React, { useEffect } from "react";
import ProductCategories from "../components/ProductCategories";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../redux/singleCategory";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.singleCategory
  );

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchCategoryProducts(categoryName));
    }
  }, [dispatch, categoryName]);

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-12">

      {/* ===== Main Layout ===== */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ================= Sidebar ================= */}
        <div
          className="
            w-full lg:w-72
            shadow-md p-4 rounded bg-white
            sticky lg:top-24 h-fit
          "
        >
          <ProductCategories />
        </div>

        {/* ================= Products ================= */}
        <div className="flex-1 shadow-sm p-4 sm:p-6 rounded bg-white">

          {/* Loading */}
          {loading && (
            <p className="text-center py-10 text-gray-500">
              Loading products...
            </p>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="text-center py-10 text-red-500">
              Something went wrong
            </p>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No products found
            </p>
          )}

          {/* ================= Grid ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {!loading &&
              products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="
                    bg-white shadow-lg rounded-xl
                    p-3 cursor-pointer
                    hover:shadow-xl transition
                  "
                >
                  {/* Image */}
                  <div className="relative group bg-gray-50 rounded-md overflow-hidden">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="
                        w-full
                        h-40 sm:h-52 lg:h-64
                        object-cover
                      "
                    />

                    {/* Wishlist */}
                    <button
                      className="
                        absolute top-2 right-2
                        w-8 h-8 bg-white rounded-full shadow
                        flex items-center justify-center
                        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                        transition
                      "
                    >
                      <CiHeart className="text-lg" />
                    </button>

                    {/* Add to cart */}
                    <div
                      className="
                        absolute bottom-0 left-0 right-0 p-2
                        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                        transition
                      "
                    >
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="
                          w-full bg-white rounded-md shadow
                          py-2 text-xs sm:text-sm
                          hover:bg-black hover:text-white transition
                        "
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-3">
                    <p className="font-semibold text-xs sm:text-sm line-clamp-2">
                      {prod.title}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                      {prod.category}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <p className="font-semibold text-sm">
                        ${prod.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        ${(prod.price * 1.2).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
