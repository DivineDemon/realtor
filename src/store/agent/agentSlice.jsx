import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agentService from "./agentService";

const initialState = {
  agent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Agent
export const getAgent = createAsyncThunk("/", async (user_id, thunkAPI) => {
  try {
    return await agentService.getAgent(user_id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.agent = action.payload;
      })
      .addCase(getAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.agent = null;
      });
  },
});

export default agentSlice.reducer;
