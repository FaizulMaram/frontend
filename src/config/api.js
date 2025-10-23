// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    PROFILE: "/auth/myProfile",
    LOGOUT: "/auth/logout",
  },
  // Product endpoints
  PRODUCTS: {
    ALL: "/product/allProducts",
    SINGLE: "/product/singleProduct",
    CREATE: "/product/add",
    UPDATE: "/product/updateProduct",
    DELETE: "/product/delete",
  },
  // Cart endpoints
  CART: {
    ADD: "/cart/add",
    VIEW: "/cart/viewCart",
    REMOVE_ITEM: "/cart/removeItem",
    DELETE: "/cart/deletecart",
  },
  // Order endpoints
  ORDERS: {
    PLACE: "/order/placeOrder",
    MY_ORDERS: "/order/myOrders",
    CANCEL: "/order/cancelOrder",
    // PAYMENT: "/payment/createpayment",
  },
};

// Request configuration
export const requestConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
