import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { InputField } from "../Shared/InputField";
import { Button } from "../Shared/Button";
import { useSelector } from "react-redux";

// Logout modal
const UserLogoutModal = ({ open, onClose, onConfirm }) => (
  <Popup open={open} onClose={onClose}>
    <div className="p-8 rounded-2xl shadow-2xl text-center bg-white">
      <h2 className="text-xl font-bold mb-5">Do you want to Log Out?</h2>
      <div className="flex justify-center gap-4">
        <Button
          text="Yes"
          onClick={onConfirm}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        />
        <Button
          text="No"
          onClick={onClose}
          className="bg-black text-white px-5 py-2 rounded-lg"
        />
      </div>
    </div>
  </Popup>
);

const Navbar = () => {
  const [searchData, setSearchData] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // Fetch from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Search
  const searchedData = allProducts.filter(
    (item) =>
      item.title &&
      searchData &&
      item.title.toLowerCase().includes(searchData.toLowerCase())
  );

  const handleLogout = () => {
    setModalOpen(false);
    navigate("/");
  };

  return (
    <div className="flex justify-evenly items-center mt-5 relative">
      <Link to="/home">
        <h1 className="font-extrabold text-3xl">SHOP.FU</h1>
      </Link>

      {/* Search bar */}
      <div className="relative w-1/3">
        <InputField
          type="text"
          placeholder="Search Here"
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        {searchData && (
          <div className="absolute bg-white shadow-md mt-2 w-full rounded-md z-10">
            {searchedData.length > 0 ? (
              searchedData.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    setSearchData("");
                  }}
                >
                  <span>{item.title}</span>
                  <img src={item.image} className="h-10 w-8 object-contain" />
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-sm">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex gap-4 items-center">
        <Link to="/cart" className="relative">
          <IoCartSharp className="text-2xl text-gray-700 hover:text-black cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <FaUserCircle
          onClick={() => setModalOpen(true)}
          className="text-3xl text-gray-700 hover:text-black cursor-pointer"
        />

        <UserLogoutModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
