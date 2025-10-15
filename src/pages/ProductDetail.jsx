import Navbar from "../components/Navbar/Navbar";
import { Button } from "../components/Shared/Button";
import productdata from "../DummyData/data";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = productdata.find((item) => item.id === parseInt(id));

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Back button */}
        <Link
          to="/home"
          className="text-red-400 hover:underline text-sm flex items-center gap-2 mb-5"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/*  */}
          <div className="md:w-1/2 flex items-center justify-center p-6">
            <img
              src={product.image}
              className="w-80 h-80 object-contain rounded-xl shadow-md"
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-black">
                {product.price}
              </span>
              <span className="text-s font-semibold text-gray-400">
                Available
              </span>
            </div>
            {/* Buttons */}
            <div className="flex gap-2 truncate text-xs md:text-sm">
              <Button
                text="Add to Cart"
                className="bg-black font-medium py-2 px-6 rounded-lg w-fit transition duration-200"
              />
              <Button
                text="View Cart"
                className="bg-gray-100 text-black! font-light rounded-lg w-fit transition duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
