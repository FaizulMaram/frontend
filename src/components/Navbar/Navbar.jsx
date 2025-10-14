import { InputField } from "../Shared/InputField";
import { CiSearch } from "react-icons/ci";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-evenly items-center mt-5">
      <div className="">
        <h1 className="font-extrabold text-3xl">SHOP.FU</h1>{" "}
      </div>
      <div className="text-xs sm:text-s ml-2 sm:ml-0 mr-2 sm:mr-0">
        <InputField
          type="text"
          placeholder="Search Here"
          className="w-[100%]! border-0 sm:border truncate"
        />
      </div>
      <div className="flex gap-4">
        <IoCartSharp />
        <FaUserCircle />
      </div>
    </div>
  );
};

export default Navbar;
