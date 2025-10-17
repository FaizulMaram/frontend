import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/Shared/InputField";
import { Button } from "../components/Shared/Button";
import BackPage from "../components/Shared/BackPage";
import { usePlaceOrderMutation } from "../redux/apis/orderApi";
import { useViewCartQuery } from "../redux/apis/cartApi";
import { toast } from "sonner";
import { useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: localItems } = useSelector((state) => state.cart);
  const { data: apiCart, error } = useViewCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load cart for checkout");
    }
  }, [error]);
  
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    apt: "",
    city: "",
    zip: "",
    phone: "",
  });

  // Use API cart if authenticated, otherwise use local cart
  const items = isAuthenticated ? apiCart?.cart?.products || [] : localItems;
  
  const totalAmount = items
    .reduce((acc, item) => {
      const price = item.product?.price || item.productId?.price || item.price;
      const quantity = item.quantity || item.qty;
      return acc + (price * quantity);
    }, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!formData.address || !formData.city || !formData.phone) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const orderData = {
        address: formData.address,
        city: formData.city,
        phoneNumber: formData.phone,
      };

      await placeOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    }
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

          <InputField
            type="tel"
            name="phone"
            label="Phone Number"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-1">
              {items.map((item, index) => {
                const product = isAuthenticated ? item.product : item;
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{product.name || product.title} x {item.quantity || item.qty}</span>
                    <span>${((product.price || item.price) * (item.quantity || item.qty)).toFixed(2)}</span>
                  </div>
                );
              })}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total: ${totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              text={isLoading ? "Placing Order..." : "Place Order"}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
