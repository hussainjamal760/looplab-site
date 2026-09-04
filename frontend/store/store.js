import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/features/navigation/uiSlice';
import cursorReducer from '@/features/effects-and-cursor/cursorSlice';
import navReducer from '@/store/slices/navSlice';
import galleryPageReducer from '@/store/slices/galleryPageSlice';
import wallModalReducer from '@/store/slices/wallModalSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            // existing looplab slices
            ui: uiReducer,
            cursor: cursorReducer,
            // loopverse page slices
            nav: navReducer,
            galleryPage: galleryPageReducer,
            wallModal: wallModalReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
};

export const store = makeStore();
