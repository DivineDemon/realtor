import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import houseService from "./houseService";

const initialState = {
  houses: [],
  house: {},
  country: "Location (any)",
  property: "Property type (any)",
  price: "Price range (any)",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Houses
export const getHouses = createAsyncThunk("house", async (_, thunkAPI) => {
  try {
    return await houseService.getHouses();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setProperty: (state, action) => {
      state.property = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHouses: (state, action) => {
      state.houses = action.payload;
    },
    getHouse: (state, action) => {
      const house = state.houses.find((house) => {
        return house.id === action.payload;
      });

      state.house = house;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.houses = action.payload;
      })
      .addCase(getHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.houses = null;
      });
  },
});

export const {
  setCountry,
  setProperty,
  setPrice,
  setIsLoading,
  setHouses,
  getHouse,
} = houseSlice.actions;
export default houseSlice.reducer;
