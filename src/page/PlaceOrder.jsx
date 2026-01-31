import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.details);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleConfirmOrder = () => {
    alert("Order Placed Successfully ✅");

    dispatch(clearCart());
    navigate("/order-success");
  };

  if (!user) {
    return (
      <p className="text-center pt-32 text-gray-500">
        No user details found
      </p>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-12">

      {/* ================= Card ================= */}
      <div
        className="
          max-w-3xl mx-auto bg-white shadow-xl
          p-4 sm:p-6 lg:p-8 rounded-xl
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          Order Summary
        </h2>

        {/* ================= User Info ================= */}
        <div className="text-sm sm:text-base space-y-1">
          <p><b>Name:</b> {user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p>
            <b>Address:</b> {user.address}, {user.city}, {user.state} - {user.pincode}
          </p>
        </div>

        <hr className="my-6" />

        {/* ================= Items ================= */}
        <h3 className="font-semibold mb-4">Items</h3>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-3"
            >
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Button ================= */}
        <button
          onClick={handleConfirmOrder}
          className="
            mt-6 w-full py-3 rounded-lg
            bg-green-600 text-white font-medium
            hover:opacity-90 transition
          "
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
