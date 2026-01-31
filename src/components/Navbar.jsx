import React, { useState, useEffect } from "react";
import { CiSearch, CiUser, CiShoppingCart, CiHeart } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import MiniCheckout from "./MiniCheckout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import useDebounce from "../hook/useDebounce";
import { setSearchQuery } from "../redux/searchSlice";

const Navbar = () => {
  const [openMinCheckout, setopenMinCheckout] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false); // ✅ mobile toggle
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 400);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedText));
  }, [debouncedText, dispatch]);

  const filteredProduct =
    debouncedText.length > 0
      ? products.filter((item) =>
          item.title.toLowerCase().includes(debouncedText.toLowerCase())
        )
      : [];

  const handleClick = (categoryName) => {
    setText("");
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="fixed w-full bg-white shadow-xl px-4 sm:px-6 py-3 z-50">
      <div className="flex items-center justify-between">

        {/* MOBILE HAMBURGER */}
        <div className="flex items-center gap-4 sm:hidden">
          <button onClick={() => setMobileMenu((prev) => !prev)}>
            {mobileMenu ? <HiX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
          <Link to="/" className="text-xl font-bold">REFLECT</Link>
        </div>

        {/* LEFT MENU - Desktop */}
        <ul className={`hidden sm:flex items-center gap-6 font-medium uppercase`}>
          <Link to="/"><li className="text-sm cursor-pointer">Home</li></Link>
          <Link to="/productlist"><li className="text-sm cursor-pointer">Shop</li></Link>
          <Link to=""><li className="text-sm cursor-pointer">Sale</li></Link>
          <Link to=""><li className="text-sm cursor-pointer">About Us</li></Link>
        </ul>

        {/* CENTER LOGO - Desktop */}
        <div className="hidden sm:flex flex-1 justify-center">
          <Link to="/">
            <p className="text-xl font-bold">REFLECT</p>
          </Link>
        </div>

        {/* RIGHT Icons */}
        <div className="flex items-center gap-3 text-xl ml-auto relative">

          {/* SEARCH */}
          <div className="relative w-full max-w-[300px] hidden sm:block">
            <div className="flex items-center gap-2 bg-[#F0F5FF] px-2 py-2 rounded">
              <CiSearch />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-[#F0F5FF] w-full px-2 outline-none"
                type="text"
                placeholder="Search items.."
              />
            </div>
            {/* Dropdown */}
            {debouncedText.length > 0 && (
              <div className="absolute bg-white h-full min-h-[22rem] overflow-y-auto shadow-lg w-full z-50">
                {filteredProduct.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(item.category)}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <img src={item.images?.[0]} alt={item.title} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CART */}
          <div className="relative">
            <CiShoppingCart className="cursor-pointer text-2xl" onClick={() => setopenMinCheckout(prev => !prev)} />
            {cartItems.length > 0 && (
              <p className="absolute -top-2 -right-2 bg-black text-white px-2 rounded-full text-[10px]">{cartItems.length}</p>
            )}
            {openMinCheckout && <MiniCheckout setopenMinCheckout={setopenMinCheckout} />}
          </div>

          {/* WISHLIST */}
          <Link to="/wishlist">
            <CiHeart className="cursor-pointer text-2xl" />
          </Link>

          {/* USER */}
          {isAuthenticated ? (
            <div className="relative group">
              <CiUser className="cursor-pointer text-2xl" />
              <div className="absolute right-0 top-6 hidden w-32 rounded-md bg-white p-3 shadow-lg group-hover:block">
                <p className="text-sm cursor-pointer hover:text-black">Profile</p>
                <hr className="my-2" />
                <p className="text-sm cursor-pointer hover:text-red-600" onClick={() => { dispatch(logout()); navigate('/login'); }}>Logout</p>
              </div>
            </div>
          ) : (
            <CiUser className="cursor-pointer text-2xl" onClick={() => navigate("/login")} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <ul className="sm:hidden flex flex-col gap-4 mt-4 bg-white shadow-lg p-4 rounded">
          <Link to="/" onClick={() => setMobileMenu(false)}><li className="text-sm cursor-pointer">Home</li></Link>
          <Link to="/productlist" onClick={() => setMobileMenu(false)}><li className="text-sm cursor-pointer">Shop</li></Link>
          <Link to="" onClick={() => setMobileMenu(false)}><li className="text-sm cursor-pointer">Sale</li></Link>
          <Link to="" onClick={() => setMobileMenu(false)}><li className="text-sm cursor-pointer">About Us</li></Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
