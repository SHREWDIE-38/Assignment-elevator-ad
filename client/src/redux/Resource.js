import React from 'react';
import { createSlice } from '@reduxjs/toolkit';



export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        advertisements: [],
        userInfo: {}
    },
    reducers: {
        setAdvertisements: (state, action) => {
            state.advertisements = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const {setAdvertisements, setUserInfo} = resourceSlice.actions;
export default resourceSlice.reducer;
