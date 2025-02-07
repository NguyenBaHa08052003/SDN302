import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService/auth.service";
const user = JSON.parse(localStorage.getItem("user")) || null;
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      return await authService.login(email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    isLoading: true,
    isAuthenticated: !!user,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = true;
        if(action.payload.data){
            state.user = action.payload.data;
            state.isAuthenticated = true;
        } else {
            state.user = null;
            state.isAuthenticated = false;
        }
        console.log(state.isAuthenticated);
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Xử lý logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
