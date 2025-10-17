import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/cart`,
        credentials: "include",
    }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        // Add to cart
        addToCart: builder.mutation({
            query: (data) => ({
                url: "/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),

        // View cart
        viewCart: builder.query({
            query: () => "/viewCart",
            providesTags: ["Cart"],
        }),

        // Remove item from cart
        removeFromCart: builder.mutation({
            query: (data) => ({
                url: "/removeItem",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),

        // Delete entire cart
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/deletecart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useViewCartQuery,
    useRemoveFromCartMutation,
    useDeleteCartMutation,
} = cartApi;