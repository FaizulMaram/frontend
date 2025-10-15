import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import BackPage from "../components/Shared/BackPage";

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    apt: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-5 py-10">
        <BackPage to="/cart" text="Back" />
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Checkout
        </h1>

        <form
          onSubmit={handleCheckout}
          className="bg-white p-8 rounded-2xl shadow-md space-y-5"
        >
          <InputField
            type="text"
            name="email"
            label="Email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="text"
            name="address"
            label="Address"
            placeholder="House number, street number, area"
            value={formData.address}
            onChange={handleChange}
          />

          <InputField
            type="text"
            name="apt"
            label="Apt, Suite, Unit, Building (optional)"
            placeholder="Apt, Suite, Unit, Building (optional)"
            value={formData.apt}
            onChange={handleChange}
          />

          <InputField
            type="text"
            name="city"
            label="City"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
          />

          <InputField
            type="number"
            name="zip"
            label="Zip"
            placeholder="Enter Zip Code"
            value={formData.zip}
            onChange={handleChange}
          />

          <div className="pt-4 text-center">
            <Button
              type="submit"
              text="Place Order"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
