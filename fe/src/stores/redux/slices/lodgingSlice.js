import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lodgingService from "../../../services/lodgingService.js/lodging.service";

const initialState = {
  lodgings: [],
  status: "idle",
  error: null,
  isSearching: false, //Kiểm soát trạng thái tìm kiếm
};

//Fetch tất cả hoặc tìm kiếm theo params
export const fetchLodgings = createAsyncThunk(
  "lodging/fetchLodgings",
  async (params = null, { rejectWithValue }) => {
    try {
      const response = await lodgingService.getAllLodging(params);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const lodgingSlice = createSlice({
  name: "lodging",
  initialState,
  reducers: {
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLodgings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLodgings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lodgings = action.payload;
        state.error = null;
      })
      .addCase(fetchLodgings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setIsSearching } = lodgingSlice.actions;
export default lodgingSlice.reducer;
