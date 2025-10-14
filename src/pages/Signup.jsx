import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Account
        </h2>
        <form>
          <InputField type="text" name="name" placeholder="Your Name" />
          <InputField type="email" name="email" placeholder="Your Email" />
          <InputField
            type="password"
            name="password"
            placeholder="Your Password"
          />
          <Button text="Sign Up" className="bg-black" />
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
