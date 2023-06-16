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
export const getAgent = createAsyncThunk("agent", async (agent_id, thunkAPI) => {
  try {
    return await agentService.getAgent(agent_id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAgent.fulfilled, (state, action) => {
        // debugger;
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

export const { reset } = agentSlice.actions;
export default agentSlice.reducer;
