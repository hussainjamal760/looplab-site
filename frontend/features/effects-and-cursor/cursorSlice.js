import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cursorText: '',
    isHovered: false,
    cursorVariant: 'default', // 'default' | 'video' | 'card' | 'link'
    isTransitionActive: false,
};

export const cursorSlice = createSlice({
    name: 'cursor',
    initialState,
    reducers: {
        setCursorState: (state, action) => {
            const { text = '', isHovered = false, variant = 'default' } = action.payload;
            state.cursorText = text;
            state.isHovered = isHovered;
            state.cursorVariant = variant;
        },
        resetCursor: (state) => {
            state.cursorText = '';
            state.isHovered = false;
            state.cursorVariant = 'default';
        },
        setTransitionActive: (state, action) => {
            state.isTransitionActive = action.payload;
        },
    },
});

export const { setCursorState, resetCursor, setTransitionActive } = cursorSlice.actions;

export default cursorSlice.reducer;
