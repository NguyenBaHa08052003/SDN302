import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProvince: localStorage.getItem("selectedProvince") || "",
  selectedDistrict: localStorage.getItem("selectedDistrict") || "",
  selectedWard: localStorage.getItem("selectedWard") || "",
  price: JSON.parse(localStorage.getItem("selectedPrices")) || [],
  area: JSON.parse(localStorage.getItem("selectedAreas")) || [],
  page: 1,
  limit: 10,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.selectedProvince = action.payload.selectedProvince || "";
      state.selectedDistrict = action.payload.selectedDistrict || "";
      state.selectedWard = action.payload.selectedWard || "";
      state.price = action.payload.price || [];
      state.area = action.payload.area || [];
      state.page = action.payload.page || 1;
      state.limit = action.payload.limit || 10;

      // Lưu vào localStorage để giữ trạng thái khi reload trang
      localStorage.setItem("selectedProvince", state.selectedProvince);
      localStorage.setItem("selectedDistrict", state.selectedDistrict);
      localStorage.setItem("selectedWard", state.selectedWard);
      localStorage.setItem("selectedPrices", JSON.stringify(state.price));
      localStorage.setItem("selectedAreas", JSON.stringify(state.area));
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
