import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginImage from "../assets/LoginImage.png";
import SignupImage from "../assets/SignupImage.png";
import ForgetPassword from "../components/Register/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const {isAuthenticated, user} = useSelector((state)=>state.auth)
  const [formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(signUp){
      dispatch(register(formData))
    }else{
      dispatch(
        login({
          email:formData.email,
          password:formData.password,
        })
      )
    }
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
    }
  },[isAuthenticated])

  return (
    <div className="pt-24 px-4 md:px-20 w-11/12 md:w-10/12 mx-auto overflow-hidden h-fit">
      <div className="flex flex-col md:flex-row bg-white p-2 rounded-md shadow-lg gap-10 min-h-[35rem] overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="flex-1 relative">
          <p className="uppercase font-extrabold absolute top-4 left-4 text-xl">
            Reflect
          </p>

          <img
            src={signUp ? SignupImage : LoginImage}
            className="rounded-md h-full w-full object-cover"
            alt="auth"
          />
        </div>

        {/* RIGHT SECTION */}
        <AnimatePresence mode="wait">
          {forgetPassword ? (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              <ForgetPassword setForgetPassword={setForgetPassword} />
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="flex-1 py-10 md:py-20 px-2"
            >
              {/* HEADER */}
              <AnimatePresence mode="wait">
                {!signUp ? (
                  <motion.div
                    key="login-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="font-bold text-4xl text-black">
                      Welcome
                    </h1>
                    <p className="text-lg text-gray-400">
                      Please login here
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="font-bold text-4xl text-black">
                      Create New Account
                    </h1>
                    <p className="text-lg text-gray-400">
                      Please enter details
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={signUp ? "signup-form" : "login-form"}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="mt-8"
                >
                  {signUp && (
                    <>
                      <div className="my-4">
                        <p>First Name</p>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          className="w-10/12 border-2 border-black rounded-lg py-2 px-2"
                        />
                      </div>

                      <div className="my-4">
                        <p>Last Name</p>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          className="w-10/12 border-2 border-black rounded-lg py-2 px-2"
                        />
                      </div>
                    </>
                  )}

                  <div className="my-4">
                    <p>Email Address</p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-10/12 border-2 border-black rounded-lg py-2 px-2"
                    />
                  </div>

                  <div className="my-4">
                    <p>Password</p>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-10/12 border-2 border-black rounded-lg py-2 px-2"
                    />
                  </div>

                  {/* OPTIONS */}
                  {/* Options Row */} <div className="w-full md:w-10/12 flex flex-col md:flex-row md:justify-between md:items-center gap-3 my-4"> {!signUp && (<label className="inline-flex items-center cursor-pointer"> <input type="checkbox" className="w-5 h-5 accent-black" /> <span className="ml-2 text-sm">Remember Me</span> </label>)} {signUp && (<label className="inline-flex items-center cursor-pointer"> <input type="checkbox" className="w-5 h-5 accent-black" /> <span className="ml-2 text-sm">I agree to the Terms & Conditions</span> </label>)} {!signUp && (<p type="button" onClick={() => setForgetPassword(true)} className="text-sm underline text-black text-left md:text-right cursor-pointer"> Forgot Password? </p>)} </div>

                  <button className="w-10/12 bg-black text-white py-2 rounded-lg">
                    {signUp ? "Sign Up" : "Login"}
                  </button>

                  <p className="mt-4 text-sm">
                    {signUp
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setSignUp(!signUp)}
                      className="underline font-semibold"
                    >
                      {signUp ? "Login" : "Sign Up"}
                    </motion.button>
                  </p>
                </motion.form>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
