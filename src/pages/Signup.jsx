import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignupUserMutation } from "../redux/apis/authApi";
import { toast } from "sonner";

const Signup = () => {
  const [registerUser, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = form;
      if (!name || !email || !password) {
        toast.error("Please enter all required fields");
        return;
      }
      const res = await registerUser(form).unwrap();
      if (res.success) {
        toast.success(res.message || "You registered successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while signing up");
      console.log("error while signing up ", error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleFormSubmit}>
          <InputField
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Your Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            text={isLoading ? "Signing up..." : "Sign Up"}
            className="bg-black"
            disabled={isLoading}
          />
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
