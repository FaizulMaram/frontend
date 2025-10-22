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
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/authSlice";

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
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: localCartItems } = useSelector((state) => state.cart);

  // API queries
  const {
    data: allProducts = {},
    error: productsError,
    refetch,
  } = useGetAllProductsQuery();
  const { data: apiCart, error: cartError } = useViewCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [logoutUser] = useLogoutUserMutation();

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
      dispatch(clearUser());
      await refetch();
      return navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout anyway
      setModalOpen(false);
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4 shadow-sm bg-white relative">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
          SHOP<span className="text-red-500">.FU</span>
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
        <InputField
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        {searchData && (
          <div className="absolute bg-white shadow-lg mt-2 w-full rounded-md z-10 max-h-64 overflow-auto">
            {searchedData.length > 0 ? (
              searchedData.map((item) => (
                <div
                  key={item._id || item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center transition-colors"
                  onClick={() => {
                    navigate(`/product/${item._id || item.id}`);
                    setSearchData("");
                  }}
                >
                  <span className="text-sm font-medium text-gray-800">
                    {item.title || item.name}
                  </span>
                  <img
                    src={item.image?.secureUrl || item.photo || item.image}
                    className="h-8 w-8 object-contain"
                    alt={item.title || item.name}
                  />
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-sm text-center">
                No results found
              </p>
            )}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
        {isAuthenticated ? (
          <>
            <Link
              to="/orders"
              className="hover:text-gray-900 transition-colors"
            >
              <RiGiftFill className="sm:text-2xl text-xl text-gray-700" />
            </Link>

            <Link
              to="/cart"
              className="relative hover:text-gray-900 transition-colors"
            >
              <IoCartSharp className="sm:text-2xl text-xl text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-light md:font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <FaUserCircle
              onClick={() => setModalOpen(true)}
              className="sm:text-2xl text-xl text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
            />

            <UserLogoutModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleLogout}
            />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/login")}
              text="Login"
              className="bg-gray-900 text-white px-4 py-2 text-sm rounded-full hover:bg-gray-800 transition-colors"
            />
            <Link to="/signup">
              <Button
                text="Sign Up"
                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-full hover:bg-gray-300 transition-colors"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
