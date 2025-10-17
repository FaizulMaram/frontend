import { useGetMyOrdersQuery } from "../redux/apis/orderApi";
import { useCancelOrderMutation } from "../redux/apis/orderApi";
import { toast } from "sonner";
import { useEffect } from "react";

const Orders = () => {
  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load orders");
    }
  }, [error]);

  // Get orders array from API response
  const orders = ordersData?.orders;

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId).unwrap();
      toast.success("Order cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return null; // Error is handled by toast above
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        My Orders
      </h1>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order._id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Status:</span> {order.status}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Address:</span>{" "}
                    {order.address}, {order.city}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {order.phoneNumber}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-gray-800">
                    ${order.totalPrice}
                  </p>
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Items:</h4>
                <div className="divide-y divide-gray-100">
                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 text-sm sm:text-base"
                    >
                      <span className="text-gray-700">
                        {item.product?.name}{" "}
                        <span className="text-gray-500">
                          (x{item.quantity})
                        </span>
                      </span>
                      <span className="text-gray-800 font-medium">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
