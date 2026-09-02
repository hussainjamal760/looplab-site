import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: false,
    isScrolled: false,
    activeSection: 'home',
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload;
        },
        setIsScrolled: (state, action) => {
            state.isScrolled = action.payload;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
    },
});

export const { toggleMenu, setMenuOpen, setIsScrolled, setActiveSection } = uiSlice.actions;

export default uiSlice.reducer;
