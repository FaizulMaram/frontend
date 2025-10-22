import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import BackPage from "../components/Shared/BackPage";
import { GradientSpinner } from "../components/Shared/GradientSpinner";
import { Button } from "../components/Shared/Button";
import { useGetSingleProductQuery } from "../redux/apis/productApi";
import { useAddToCartMutation } from "../redux/apis/cartApi";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";
import { useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: productData, isLoading, error } = useGetSingleProductQuery(id);
  const [addToCartAPI] = useAddToCartMutation();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load product");
    }
  }, [error]);

  // Get product from API response
  const product = productData?.product;

  const handleAddToCart = async () => {
    if (!product) return;

    if (isAuthenticated) {
      try {
        await addToCartAPI({
          productId: product._id,
          quantity: 1,
        }).unwrap();
        toast.success("Product added to cart!");
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error("Failed to add to cart");
      }
    } else {
      // Add to local cart if not authenticated
      dispatch(addToCart(product));
      toast.success("Product added to cart!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GradientSpinner />
      </div>
    );
  }

  if (error) {
    return null; // Error is handled by toast above
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-10">
        <BackPage to="/home" text="Back to Home" />

        <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 flex items-center justify-center p-6">
            <img
              src={product.image?.secureUrl || product.photo || product.image}
              alt={product.title || product.name}
              className="w-80 h-80 object-contain rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title || product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-black">
                ${product.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 truncate text-xs md:text-sm">
              <Button
                onClick={handleAddToCart}
                text="Add to Cart"
                className="bg-black font-medium py-2 px-6 rounded-lg w-fit transition duration-200"
                disabled={product.stock <= 0}
              />

              <Link to="/cart">
                <Button
                  text="View Cart"
                  className="bg-gray-100 text-black! font-light rounded-lg w-fit transition duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
