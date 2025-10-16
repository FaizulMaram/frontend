import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar/Navbar";
import { Button } from "../components/Shared/Button";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalBill = items
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-5">
        {" "}
        <Navbar />
      </div>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex gap-4 items-center">
                  <img src={item.image} className="w-20 h-20 object-contain" />
                  <div className="overflow-hidden">
                    <p>{item.title}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-3 items-center text-center">
                  <p>${(item.price * item.qty).toFixed(2)}</p>
                  <MdDelete
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 text-2xl cursor-pointer"
                  />
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <p className="text-xl font-semibold text-right">
              Total: ${totalBill}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <Link to="/checkout">
                <Button
                  text="Checkout"
                  className="bg-black text-white px-5 py-2 rounded-md"
                />
              </Link>
              <Button
                text="Clear Cart"
                onClick={() => dispatch(clearCart())}
                className="bg-gray-200 text-black px-5 py-2 rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
