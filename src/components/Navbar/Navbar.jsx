import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { InputField } from "../Shared/InputField";
import { Button } from "../Shared/Button";
import { RiGiftFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../redux/apis/authApi";
import { useGetAllProductsQuery } from "../../redux/apis/productApi";
import { useViewCartQuery } from "../../redux/apis/cartApi";
import { useEffect } from "react";
import { toast } from "sonner";

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
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: localCartItems } = useSelector((state) => state.cart);

  // API queries
  const { data: allProducts = {}, error: productsError } =
    useGetAllProductsQuery();
  const { data: apiCart, error: cartError } = useViewCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [logoutUser] = useLogoutUserMutation();

  // Handle API errors
  useEffect(() => {
    if (productsError) {
      toast.error(
        productsError?.data?.message || "Failed to load products for search"
      );
    }
  }, [productsError]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError?.data?.message || "Failed to load cart count");
    }
  }, [cartError]);

  // Calculate cart count
  const cartItems = isAuthenticated
    ? apiCart?.cart?.products || []
    : localCartItems;
  const cartCount = cartItems.reduce((total, item) => {
    const quantity = item.quantity || item.qty || 0;
    return total + quantity;
  }, 0);

  // Get products array from API response
  const productsArray = allProducts?.products || [];

  // Search
  const searchedData = productsArray.filter(
    (item) =>
      (item.title || item.name) &&
      searchData &&
      (item.title || item.name).toLowerCase().includes(searchData.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      setModalOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout anyway
      setModalOpen(false);
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-evenly items-center mt-5 relative">
      <Link to="/home">
        <h1 className="font-extrabold text-3xl hidden sm:flex">SHOP.FU</h1>
      </Link>

      {/* Search bar */}
      <div className="relative sm:w-1/3">
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
                  key={item._id || item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  onClick={() => {
                    navigate(`/product/${item._id || item.id}`);
                    setSearchData("");
                  }}
                >
                  <span>{item.title || item.name}</span>
                  <img
                    src={item.image?.secureUrl || item.photo || item.image}
                    className="h-10 w-8 object-contain"
                    alt={item.title || item.name}
                  />
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-sm">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex gap-1 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/orders" className="text-2xl hover:underline">
              <RiGiftFill />
            </Link>
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
              className="text-2xl text-gray-700 hover:text-black cursor-pointer"
            />

            <UserLogoutModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleLogout}
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link to="/login">
              <Button
                text="Login"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm"
              />
            </Link>
            <Link to="/signup">
              <Button
                text="Sign Up"
                className="bg-gray-200 text-black px-4 py-2 rounded-lg text-sm truncate"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
