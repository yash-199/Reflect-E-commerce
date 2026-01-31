import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const MiniCheckout = ({ setopenMinCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      {/* Overlay (mobile + tablet) */}
      <div
        onClick={() => setopenMinCheckout(false)}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />

      {/* Drawer / Dropdown */}
      <div
        className="
        fixed z-50 bg-white text-black shadow-xl

        /* 📱 Mobile */
        top-0 right-0 h-screen w-full

        /* 💻 Desktop */
        md:absolute md:top-16 md:right-6 md:h-[32rem] md:w-[22rem] md:rounded-lg
        flex flex-col
      "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-sm font-medium">
            You have {cartItems.length} items in your cart
          </p>
          <IoMdClose
            className="cursor-pointer text-xl"
            onClick={() => setopenMinCheckout(false)}
          />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-sm py-6 text-gray-500">
              Cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm line-clamp-2">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>

                <FaRegTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer Button */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <Link to="/checkout" onClick={() => setopenMinCheckout(false)}>
              <button className="w-full bg-black text-white py-2 rounded-lg">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCheckout;
