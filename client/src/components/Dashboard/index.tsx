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

const Main = ({ children }: ChildrenType) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default Main;
