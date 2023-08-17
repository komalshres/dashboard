"use client";

import React from "react";

import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/state";
import ThemeProvider from "./ThemeProvider";
import { ChildrenType } from "@/types/index.types";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const Main = ({ children }: ChildrenType) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default Main;
