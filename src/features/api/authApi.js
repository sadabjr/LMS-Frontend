import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      //to send data to api use mutation
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }), //to get data from api use query
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
} = authApi;
