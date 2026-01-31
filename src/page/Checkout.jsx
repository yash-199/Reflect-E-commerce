import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDetails from "../components/userDetails";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [showDetails, setUserDetails] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* ================= MAIN WRAPPER ================= */}
      <div className="w-full min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-12">

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ================= LEFT : CART ================= */}
          <div className="flex-[2] bg-white p-4 sm:p-6 rounded-xl shadow">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Shopping Cart ({cartItems.length})
            </h2>

            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-4 text-gray-500 font-medium border-b pb-3 mb-4">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center py-10 text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-b py-4
                    md:grid md:grid-cols-4 md:items-center
                    flex flex-col gap-3
                  "
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p className="font-medium text-sm sm:text-base">
                      {item.title}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="md:block text-sm sm:text-base">
                    Price: ${item.price}
                  </p>

                  {/* Quantity */}
                  <p className="md:block text-sm sm:text-base">
                    Qty: {item.quantity}
                  </p>

                  {/* Subtotal */}
                  <p className="font-semibold text-sm sm:text-base">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* ================= RIGHT : SUMMARY ================= */}
          <div className="lg:w-96 bg-white p-4 sm:p-6 rounded-xl shadow h-fit sticky lg:top-24">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-sm sm:text-base">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>

            <div className="flex justify-between mb-3 text-sm sm:text-base">
              <p>Shipping</p>
              <p>${shipping}</p>
            </div>

            <div className="flex justify-between border-t pt-4 text-base sm:text-lg font-semibold">
              <p>Total</p>
              <p>${total}</p>
            </div>

            {cartItems.length > 0 && (
              isAuthenticated ? (
                <button
                  onClick={() => setUserDetails(true)}
                  className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                  Login to Continue
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ================= SLIDE PANEL ================= */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
          >
            <div className="w-full sm:w-[420px] bg-white h-full">
              <UserDetails setUserDetails={setUserDetails} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Checkout;
