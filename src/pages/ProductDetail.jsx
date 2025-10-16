import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import BackPage from "../components/Shared/BackPage";
import { Button } from "../components/Shared/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );
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
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-black">
                ${product.price}
              </span>
              <span className="text-sm font-semibold text-gray-400">
                {product.rating?.count > 0 ? "Available" : "Out of stock"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 truncate text-xs md:text-sm">
              <Button
                text="Add to Cart"
                className="bg-black font-medium py-2 px-6 rounded-lg w-fit transition duration-200"
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
