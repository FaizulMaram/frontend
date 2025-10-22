import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/apis/productApi";
import { useAddToCartMutation } from "../../redux/apis/cartApi";
import { addToCart } from "../../redux/slices/cartSlice";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetAllProductsQuery({}, { skip: !isAuthenticated });
  const [addToCartAPI] = useAddToCartMutation();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [error]);

  // Get products array from API response
  const products = productsData?.products;

  const handleAddToCart = async (product) => {
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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return null; // Error is handled by toast above

  return (
    <>
      <p className="text-center font-extrabold text-2xl md:text-3xl mt-10 mb-10">
        Products
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 hover:scale-105 duration-300 shadow rounded-lg"
          >
            <img
              src={product.image?.secureUrl || product.photo || product.image}
              alt={product.title || product.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-sm font-medium mb-2 truncate">
              {product.title || product.name}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <TbShoppingBagPlus
                  onClick={() => handleAddToCart(product)}
                  className="cursor-pointer hover:text-blue-500"
                />
                <Link to={`/product/${product._id}`}>
                  <FaEye className="hover:text-red-500 text-lg cursor-pointer" />
                </Link>
              </div>
              <p className="text-sm text-indigo-600 font-semibold">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
