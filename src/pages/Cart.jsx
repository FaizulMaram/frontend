import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import productdata from "../DummyData/data";
import { CartList } from "../components/Cart/CartList";
import { Button } from "../components/Shared/Button";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { ...productdata[0], qty: 1 },
    { ...productdata[1], qty: 2 },
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalBill = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">
            Your cart is currently empty
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Your Cart Items:
            </h2>

            <ul className="space-y-6">
              {cartItems.map((item) => (
                <CartList
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>

            {/* Total Bill */}
            <div className="mt-10 text-right">
              <span className="text-xl font-semibold text-gray-800">
                Total Bill: <span className="text-red-600">${totalBill}</span>
              </span>
              <Button text="Checkout" className="bg-black text-xs sm:text-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
