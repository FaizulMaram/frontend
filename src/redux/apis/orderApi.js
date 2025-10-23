import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/order`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Place order
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/placeOrder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // Get my orders
    getMyOrders: builder.query({
      query: () => "/myOrders",
      providesTags: ["Order"],
    }),

    // Cancel order
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/cancelOrder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    //Create Payment
    //Create Payment
    createPaymentIntent: builder.mutation({
      query: ({ orderId, amount }) => ({
        url: `${API_BASE_URL}/payment/createpayment`,
        method: "POST",
        body: { orderId, amount },
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useCancelOrderMutation,
  useCreatePaymentIntentMutation,
} = orderApi;
