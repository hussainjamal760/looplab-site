import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/features/navigation/uiSlice';
import cursorReducer from '@/features/effects-and-cursor/cursorSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            ui: uiReducer,
            cursor: cursorReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
};

export const store = makeStore();
