import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProducts,
  clearRelated,
} from "../../redux/relatedProductSlice";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/wishlistSlice";

const RelatedProduct = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // related products
  const relatedProducts = useSelector((state) => state.related.items);

  // wishlist items
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchRelatedProducts(product.category));
    }

    return () => dispatch(clearRelated());
  }, [dispatch, product?.category]);

  // remove current product from related list
  const filteredRelated = relatedProducts.filter(
    (item) => item.id !== product?.id
  );

  return (
    <div className="sm:px-20 px-2 mt-10">
      <h1 className="text-2xl font-semibold mb-6">
        Related Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRelated.map((p) => {
          // ✅ check current product is in wishlist or not
          const isInWishlist = wishlistItems.some(
            (item) => item.id === p.id
          );

          return (
            <div
              key={p.id}
              className="bg-white p-3 shadow-md rounded-lg cursor-pointer"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              {/* Image */}
              <div className="relative group bg-gray-50 rounded-md overflow-hidden">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-[260px] object-cover"
                />

                {/* Wishlist */}
                <div className="absolute top-3 right-3">
                  <button className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center">
                    <CiHeart
                      className={`text-2xl cursor-pointer transition
                        ${
                          isInWishlist
                            ? "text-red-500"
                            : "text-black"
                        }
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        isInWishlist
                          ? dispatch(removeFromWishlist(p.id))
                          : dispatch(addToWishlist(p));
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="mt-3">
                <p className="font-semibold text-sm line-clamp-1">
                  {p.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 capitalize">
                  {p.category}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <p className="font-semibold text-sm">
                    ${p.price}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ${(p.price + 40).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;
