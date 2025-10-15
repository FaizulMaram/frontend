import { useEffect, useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">Loading products...</div>
    );

  return (
    <>
      <h1 className="font-bold text-center text-3xl mt-10">PRODUCTS</h1>
      <div className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="items-center bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto my-4 w-48 h-48 object-contain"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {/* Add to cart icon */}
                <TbShoppingBagPlus className="hover:text-blue-500 cursor-pointer duration-200" />

                {/* View details */}
                <Link to={`/product/${product.id}`}>
                  <FaEye className="hover:text-red-500 cursor-pointer duration-200" />
                </Link>
              </div>
              <p className="text-sm text-gray-600 font-semibold">
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
