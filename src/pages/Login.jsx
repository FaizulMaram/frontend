import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <form>
          <InputField type="email" name="email" placeholder="Enter Email" />
          <InputField
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <Button text="Login" className="bg-black" />
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
