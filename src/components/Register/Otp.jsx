import React, { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import SignupImage from "../../assets/SignupImage.png"

const Otp = ({ setForgetPassword }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRef = useRef([]);

  // Handle input change
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // allow only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // Handle backspace
 const handleBackspace = (e, index) => {
  if (e.key !== "Backspace") return;

  const newOtp = [...otp];

  // Case 1: If current box has value → clear it
  if (newOtp[index]) {
    newOtp[index] = "";
    setOtp(newOtp);
    return;
  }

  // Case 2: If empty → move to previous box
  if (index > 0) {
    inputRef.current[index - 1].focus();
  }
};


  return (
    <div className="flex-1 py-10 md:py-0 px-2">
      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setForgetPassword(false)}
        className="flex items-center w-fit gap-2 bg-white text-black p-2 rounded-md shadow-lg my-5 cursor-pointer"
      >
        <IoIosArrowBack />
        <p>Back</p>
      </motion.div>

      <h1 className="font-bold text-4xl">Enter OTP</h1>
      <p className="text-gray-400 w-10/12 my-2">
        We have shared a code on your registered email address
      </p>

      <form className="mt-6">
        <div className="flex gap-3 my-4">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-12 h-12 border-2 border-black rounded-lg text-center text-lg"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-10/12 bg-black text-white py-2 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Otp;
