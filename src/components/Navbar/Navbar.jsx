import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { InputField } from "../Shared/InputField";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setModalOpen(false);
    navigate("/login");
  };

  const UserLogoutModal = ({ open, onClose }) => {
    return (
      <Popup open={open} onClose={onClose}>
        <div className="p-5 text-center bg-white">
          <h2 className="text-xl font-bold mb-5">Do you want to Log Out?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </Popup>
    );
  };

  return (
    <div className="flex justify-evenly items-center mt-5">
      <h1 className="font-extrabold text-3xl">SHOP.FU</h1>

      <div className="text-xs sm:text-sm ml-2 sm:ml-0 mr-2 sm:mr-0">
        <InputField
          type="text"
          placeholder="Search Here"
          className="w-[100%]! border-0 sm:border truncate"
        />
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/cart">
          <IoCartSharp className="text-2xl text-gray-700 hover:text-black cursor-pointer" />
        </Link>

        <FaUserCircle
          onClick={() => setModalOpen(true)}
          className="text-3xl text-gray-700 hover:text-black cursor-pointer"
        />

        <UserLogoutModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default Navbar;
