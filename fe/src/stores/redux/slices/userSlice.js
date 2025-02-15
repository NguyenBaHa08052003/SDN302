// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService/auth.service";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token, { rejectWithValue }) => {
  try {
    const response = await authService.getCurrentUser(token);
    if(response.data.success){
      return response.data;
    }
    return rejectWithValue(response.data);
  } catch (error) {
    if(error.response.status === 404){
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
