import {
  configureStore,
} from '@reduxjs/toolkit';

import uiReducer from '@/features/navigation/uiSlice';

import cursorReducer from '@/features/effects-and-cursor/cursorSlice';

import navReducer from '@/store/slices/navSlice';

import galleryPageReducer from '@/store/slices/galleryPageSlice';

import wallModalReducer from '@/store/slices/wallModalSlice';

import { baseApi } from '@/store/api/baseApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      cursor: cursorReducer,
      nav: navReducer,
      galleryPage:
        galleryPageReducer,
      wallModal: wallModalReducer,

      [baseApi.reducerPath]:
        baseApi.reducer,
    },

    middleware: (
      getDefaultMiddleware
    ) =>
      getDefaultMiddleware().concat(
        baseApi.middleware
      ),

    devTools:
      process.env.NODE_ENV !==
      'production',
  });
};

export const store = makeStore();