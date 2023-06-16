import { configureStore } from "@reduxjs/toolkit";

import agentReducer from "./agent/agentSlice";
import houseReducer from "./house/houseSlice";

export const store = configureStore({
  reducer: {
    house: houseReducer,
    agent: agentReducer,
  },
});
