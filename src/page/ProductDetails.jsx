import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import ProductDesc from "../components/Prodoct Details/ProductDesc";
import RelatedProduct from "../components/Prodoct Details/RelatedProduct";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/productListSlice";
import {
  addToCart,
  incrementQty,
  decrementQty,
} from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === Number(id))
  );

  const product = products.find((p) => p.id === Number(id));

  const wishlistItem = useSelector((state) =>
    state.wishlist.items.find((i) => i.id === product?.id)
  );

  const [activeImage, setActiveImage] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  /* ================= FETCH ================= */
  useEffect(() => {
    if (products.length === 0) dispatch(fetchProduct());
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      {/* ================= MAIN LAYOUT ================= */}
      <div className="w-full pt-24 px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ================= LEFT (Images) ================= */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4">

            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={`
                    w-20 h-20 sm:w-24 sm:h-24 object-cover bg-white p-1
                    rounded-md shadow cursor-pointer shrink-0
                    ${activeImage === img ? "ring-2 ring-black" : ""}
                  `}
                />
              ))}
            </div>

            {/* Main Image */}
            <div
              className="w-full lg:max-w-[450px] aspect-square overflow-hidden rounded-lg mx-auto"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-200"
                style={{
                  transformOrigin: `${position.x}% ${position.y}%`,
                  transform: zoom ? "scale(2)" : "scale(1)",
                }}
              />
            </div>
          </div>

          {/* ================= RIGHT (Details) ================= */}
          <div className="flex-1">

            <h1 className="text-xl sm:text-2xl font-semibold">
              {product.title}
            </h1>

            <p className="text-base sm:text-lg my-2 capitalize">
              {product.category}
            </p>

            <p className="text-gray-400 text-sm">5.0 (121 Reviews)</p>

            {/* Price */}
            <div className="flex items-center gap-4 my-4">
              <p className="text-2xl font-semibold">${product.price}</p>
              <p className="line-through text-gray-400">$89.00</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {/* Quantity */}
              <div className="flex gap-6 items-center border-2 border-black px-4 py-2 rounded-md w-fit">
                <button onClick={() => dispatch(decrementQty(product.id))}>
                  −
                </button>

                <span>{cartItem?.quantity || 0}</span>

                <button onClick={() => dispatch(incrementQty(product.id))}>
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                disabled={!!cartItem}
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                    })
                  )
                }
                className={`
                  px-8 py-3 rounded-lg border-2 transition w-full sm:w-auto
                  ${
                    cartItem
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-black text-white border-black hover:bg-white hover:text-black"
                  }
                `}
              >
                {cartItem ? "Added ✔" : "Add to Bag"}
              </button>

              {/* Wishlist */}
              <CiHeart
                className={`
                  text-4xl p-2 rounded-full cursor-pointer
                  ${wishlistItem ? "bg-red-500 text-white" : "bg-white"}
                `}
                onClick={() =>
                  wishlistItem
                    ? dispatch(removeFromWishlist(product.id))
                    : dispatch(addToWishlist(product))
                }
              />
            </div>
          </div>
        </div>
      </div>

      <ProductDesc />
      <RelatedProduct product={product} />
    </>
  );
};

export default ProductDetails;
