import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Otp from "./Otp";

const ForgetPassword = ({ setForgetPassword }) => {
  const [otp,setOtp] = useState(false);
  return (
    <div className="flex-1 py-10 md:py-20 px-2">
      {otp ? (
 <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
             <Otp/>
            </motion.div>
      ):(
      <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setForgetPassword(false)}
        className="flex items-center w-fit gap-2 bg-white text-black p-2 rounded-md shadow-lg my-5 cursor-pointer"
      >
        <IoIosArrowBack />
        <p>Back</p>
      </motion.div>

      <h1 className="font-bold text-4xl">Forgot Password</h1>
      <p className="text-gray-400 w-10/12 my-2">
        Enter your registered email address. We'll send you a reset code.
      </p>

      <form className="mt-6">
        <div className="my-4">
          <p>Email Address</p>
          <input
            type="email"
            className="w-10/12 border-2 border-black rounded-lg py-2 px-2"
          />
        </div>

        <button className="w-10/12 bg-black text-white py-2 rounded-lg" onClick={()=>setOtp(true)}>
          Send OTP
        </button>
      </form>

      </>
      )}
    </div>
  );
};

export default ForgetPassword;
