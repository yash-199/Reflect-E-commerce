import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const WishlistProduct = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-center">
            Your wishlist is empty 💔
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="
                bg-white shadow-md rounded-xl
                p-3 relative
                hover:shadow-lg transition
              "
            >
              {/* Remove */}
              <FaRegTrashAlt
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-3 right-3 text-lg sm:text-xl text-red-500 cursor-pointer"
              />

              {/* Image */}
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="
                  w-full
                  h-40 sm:h-52 lg:h-64
                  object-cover
                  rounded-lg
                "
              />

              {/* Details */}
              <div className="mt-3">
                <p className="text-xs sm:text-sm font-semibold line-clamp-2">
                  {item.title}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  ${item.price}
                </p>
              </div>

              {/* Move to Cart */}
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.images[0],
                    })
                  );
                  dispatch(removeFromWishlist(item.id));
                }}
                className="
                  mt-3 w-full
                  bg-black text-white
                  py-2 rounded-md
                  text-xs sm:text-sm
                  hover:opacity-90 transition
                "
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistProduct;
