import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserDetails } from "../redux/userSlice";

const UserDetails = ({ setUserDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(saveUserDetails(form));
    setUserDetails(false);
    navigate("/place-order");
  };

  return (
    /* ================= Overlay ================= */
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      {/* ================= Modal Card ================= */}
      <div
        className="
          bg-white rounded-xl shadow-xl
          w-full sm:w-[90%] md:w-[700px] lg:w-[800px]
          max-h-[90vh] overflow-y-auto
          p-5 sm:p-8
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg sm:text-xl font-bold">REFLECT</p>
          <button
            onClick={() => setUserDetails(false)}
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <hr className="mb-6" />

        {/* ================= Form ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input label="First Name" name="firstName" onChange={handleChange} />
          <Input label="Last Name" name="lastName" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Phone" name="phone" type="number" onChange={handleChange} />

          {/* Full width address */}
          <div className="md:col-span-2">
            <Input label="Address" name="address" onChange={handleChange} />
          </div>

          <Input label="State" name="state" onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="Pincode" name="pincode" type="number" onChange={handleChange} />

          {/* Submit full width */}
          <div className="md:col-span-2 mt-3">
            <button
              onClick={handleSubmit}
              className="bg-black text-white w-full py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= Reusable Input ================= */
const Input = ({ label, name, type = "text", onChange }) => (
  <div>
    <p className="text-sm mb-1">{label}</p>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

export default UserDetails;
