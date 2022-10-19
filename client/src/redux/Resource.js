import React from 'react';
import { createSlice } from '@reduxjs/toolkit';



export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        allAds: [],
        currentAd: {},
        userInfo: {}
    },
    reducers: {
        setAllAds: (state, action) => {
            state.allAds = action.payload;
        },
        setCurrentAd: (state, action) => {
            state.currentAd = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const {setAllAds, setCurrentAd, setUserInfo} = resourceSlice.actions;
export default resourceSlice.reducer;
