import React, { useEffect } from 'react'
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProduct } from '../redux/productListSlice';

const AllProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { selectedCategory } = useSelector((state) => state.category);

  // ✅ IMPORTANT
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const filteredProducts =
    selectedCategory.length === 0
      ? products
      : products.filter((p) =>
          selectedCategory.includes(p.category)
        );

  return (
    <div className='w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => navigate(`/product/${prod.id}`)}
            className="bg-white shadow-xl rounded-xl p-2 cursor-pointer"
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="w-full h-[280px] object-cover"
            />

            <div className="mt-3">
              <p className="font-semibold text-sm">{prod.title}</p>
              <p className="text-xs text-gray-500">{prod.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
