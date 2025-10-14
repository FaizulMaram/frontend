import { TbShoppingBagPlus } from "react-icons/tb";
import { FaEye } from "react-icons/fa";

import productdata from "../../DummyData/data";
const Products = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl mt-10">PRODUCTS</h1>
      <div className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {productdata.map((product, index) => (
          <div
            key={index}
            className="items-center bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto my-4 w-48 h-48 object-cover"
            />
            <p className="text-center">{product.name}</p>
            <div className="flex gap-3">
              <TbShoppingBagPlus className="hover:text-blue-500 cursor-pointer duration-200" />
              <FaEye className="hover:text-red-500  cursor-pointer duration-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
