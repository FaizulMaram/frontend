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
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("Auth state:", isAuthenticated, user);

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

  // Email saved
  useEffect(() => {
    if (isAuthenticated && user?.data?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.data.email,
      }));
    }
  }, [isAuthenticated, user]);

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
      return acc + price * quantity;
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
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="mb-6">
          <BackPage to="/cart" text="Back" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-2">
              {items.map((item, index) => {
                const product = isAuthenticated ? item.product : item;
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm border-b border-gray-100 pb-2"
                  >
                    <span>
                      {product.name || product.title} x
                      {item.quantity || item.qty}
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        (product.price || item.price) *
                        (item.quantity || item.qty)
                      ).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between font-semibold text-lg mt-4 pt-3 border-t">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </div>
          {/* Right: Checkout Form */}
          <form
            onSubmit={handleCheckout}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Checkout
            </h2>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                type="text"
                name="apt"
                label="Apt / Suite (optional)"
                placeholder="Apt, Suite, Unit"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <div className="pt-4 text-center">
              <Button
                type="submit"
                text={isLoading ? "Placing Order..." : "Place Order"}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200 w-full"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
