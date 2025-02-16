import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lodgingService from "../../../services/lodgingService.js/lodging.service";
const initialState = {
  lodgings: [],
  status: "idle",
  error: null,
};

export const fetchLodgings = createAsyncThunk(
  "lodging/fetchLodgings",
  async (_ ,{ rejectWithValue }) => {
    try {
      const response = await lodgingService.getAllLodging();
        return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const lodgingSlice = createSlice({
  name: "lodging",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLodgings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLodgings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lodgings = action.payload;
        state.error = action.payload?.error_text;
      })
      .addCase(fetchLodgings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default lodgingSlice.reducer;
