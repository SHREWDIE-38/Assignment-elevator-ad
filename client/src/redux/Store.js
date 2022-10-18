import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import resourceReducer from'./Resource.js';



export const store = configureStore({
    reducer: {
        resource: resourceReducer,
    },
});
