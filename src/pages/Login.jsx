import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/apis/authApi";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = form;
      if (!email || !password) {
        toast.error("Please check the entered information.");
        return;
      }
      const res = await loginUser(form).unwrap();
      if (res.success) {
        toast.success(res.message || "Login successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while logging in");
      console.log("Error while logging in ", error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleLoginSubmit}>
          <InputField
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter Email"
          />
          <InputField
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter Password"
          />
          <Button 
            type="submit" 
            text={isLoading ? "Logging in..." : "Login"} 
            className="bg-black"
            disabled={isLoading}
          />
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
