import React, { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const { categories } = useSelector((state) => state.category);

  const [isOpen, setIsOpen] = useState(true); // ⭐ toggle state

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {/* Header */}
      <div
        className="flex pt-2 px-1 items-center justify-between pb-2 cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <p className="text-sm font-semibold">Product Categories</p>

        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      <hr />

      {/* Collapse Section */}
      {isOpen && (
        <div className="mt-2">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex gap-2 py-2 items-center">
                <input
                  type="checkbox"
                  checked={categoryName === category}
                  onChange={() => navigate(`/category/${category}`)}
                />

                <p
                  className="capitalize cursor-pointer"
                  onClick={() => navigate(`/category/${category}`)}
                >
                  {category.replace("-", " ")}
                </p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
