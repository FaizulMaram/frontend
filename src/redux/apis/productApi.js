import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/product`,
        credentials: "include",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        // Get all products
        getAllProducts: builder.query({
            query: () => "/allProducts",
            providesTags: ["Product"],
        }),

        // Get single product
        getSingleProduct: builder.query({
            query: (id) => `/singleProduct/${id}`,
            providesTags: (result, error, id) => [{ type: "Product", id }],
        }),

        // Create product (Admin only)
        createProduct: builder.mutation({
            query: (formData) => ({
                url: "/add",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),

        // Update product (Admin only)
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateProduct/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),

        // Delete product (Admin only)
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;