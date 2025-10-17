import { Button } from "../Shared/Button";

export const CartList = ({ item, removeFromCart }) => {
  return (
    <li className="cart-item-container bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row justify-between items-center mb-4">
      {/* Product Image */}
      <img
        src={item.image?.secureUrl || item.photo || item.image}
        className="w-24 h-24 object-contain rounded-lg bg-gray-100 mb-4 sm:mb-0"
      />

      {/* Product Details */}
      <div className="cart-item-details flex-1 sm:ml-6 text-center sm:text-left">
        <p className="text-lg font-semibold text-gray-800">{item.title || item.productId?.name}</p>
        <p className="text-gray-500 text-sm mt-1">Quantity: {item.qty || item.quantity}</p>
        <p className="text-gray-500 text-sm">Price: ${item.price || item.productId?.price}</p>
        <p className="text-gray-800 font-semibold mt-2">
          Total: ${((item.price || item.productId?.price) * (item.qty || item.quantity)).toFixed(2)}
        </p>
      </div>
      {/* Remove Button */}
      <Button
        onClick={() => removeFromCart(item.id)}
        className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200"
        text="Remove"
      />
    </li>
  );
};
