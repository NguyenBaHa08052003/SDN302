import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    lodgings: [],
    loading: false,
    error: null,
    currentLodging: null,
    message: null,
};

const lodgingSlice = createSlice({
    name: 'lodging',
    initialState,
    reducers: {},
    extraReducers: {},
})