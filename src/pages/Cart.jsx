import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import {
  useViewCartQuery,
  useRemoveFromCartMutation,
  useDeleteCartMutation,
} from "../redux/apis/cartApi";
import Navbar from "../components/Navbar/Navbar";
import { Button } from "../components/Shared/Button";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: localItems } = useSelector((state) => state.cart);
  const {
    data: apiCart,
    isLoading,
    error,
  } = useViewCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [removingId, setRemovingId] = useState(null);

  const [removeFromCartAPI] = useRemoveFromCartMutation();
  const [deleteCartAPI] = useDeleteCartMutation();
  const dispatch = useDispatch();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load cart");
    }
  }, [error]);

  // Use API cart if authenticated, otherwise use local cart
  const items = isAuthenticated ? apiCart?.cart?.products || [] : localItems;

  const totalBill = items
    .reduce((acc, item) => {
      const price = item.product?.price || item.productId?.price || item.price;
      const quantity = item.quantity || item.qty;
      return acc + price * quantity;
    }, 0)
    .toFixed(2);

  const handleRemoveItem = async (item) => {
    if (isAuthenticated) {
      try {
        setRemovingId(item.product._id); // disable delete btn
        await removeFromCartAPI({ productId: item.product._id }).unwrap();
        await refetch();
        toast.success("Item removed from cart");
      } catch (error) {
        toast.error("Failed to remove item");
      } finally {
        setRemovingId(null);
      }
    } else {
      dispatch(removeFromCart(item.id));
      toast.success("Item removed from cart");
    }
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      try {
        if (apiCart?._id) {
          await deleteCartAPI(apiCart._id).unwrap();
          toast.success("Cart cleared successfully");
        }
      } catch (error) {
        console.error("Failed to clear cart:", error);
        toast.error("Failed to clear cart");
      }
    } else {
      dispatch(clearCart());
      toast.success("Cart cleared successfully");
    }
  };

  if (isAuthenticated && isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated && error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-5">
          <Navbar />
        </div>
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="text-center text-red-500">
            Error loading cart. Please try again.
          </div>
        </div>
      </div>
    );
  }

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
            {items.map((item, index) => {
              // For API cart items, product data is in item.product
              // For local cart items, product data is directly in item
              const product = isAuthenticated ? item.product : item;
              const itemId = item._id || item.id;
              const itemKey = itemId || index;

              return (
                <div key={itemKey} className="flex justify-between mb-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={
                        product?.image?.secureUrl ||
                        product?.photo ||
                        product?.image ||
                        item.image
                      }
                      className="w-20 h-20 object-contain"
                      alt={product?.name || product?.title || item.title}
                    />
                    <div className="overflow-hidden">
                      <p>{product?.name || product?.title || item.title}</p>
                      <p>Qty: {item.quantity || item.qty}</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 items-center text-center">
                    <p>
                      $
                      {(
                        (product?.price || item.price) *
                        (item.quantity || item.qty)
                      ).toFixed(2)}
                    </p>
                    <MdDelete
                      onClick={() => {
                        if (removingId !== item.product._id)
                          handleRemoveItem(item);
                      }}
                      className={`text-2xl cursor-pointer transition 
    ${
      removingId === item.product._id
        ? "text-gray-400 cursor-not-allowed"
        : "text-red-500 hover:text-red-600"
    }
  `}
                    />
                  </div>
                </div>
              );
            })}
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
                onClick={handleClearCart}
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
