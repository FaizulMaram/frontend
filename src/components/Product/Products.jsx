import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <p className="text-center font-extrabold text-2xl md:text-3xl mt-10 mb-10">
        Products
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {items.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-2"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <TbShoppingBagPlus
                  onClick={() => dispatch(addToCart(product))}
                  className="cursor-pointer hover:text-blue-500"
                />
                <Link to={`/product/${product.id}`}>
                  <FaEye className="hover:text-red-500 cursor-pointer" />
                </Link>
              </div>
              <p className="text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
