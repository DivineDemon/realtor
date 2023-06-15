import { configureStore } from "@reduxjs/toolkit";
import houseReducer from "./house/houseSlice";

export const store = configureStore({
  reducer: {
    house: houseReducer,
  },
});
