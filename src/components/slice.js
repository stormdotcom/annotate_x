
import { createSlice } from "@reduxjs/toolkit";
import { STATE_SLICE_KEY } from "./constants";

const initialValues = {
    selectedLabel: "some value",
    selectedColor: "pink",
    currentShape: {},
    shapes: [],
    isDrawing: false,
    isResizing: false,
    isDragging: false,
};

const slice = createSlice({
    name: STATE_SLICE_KEY,
    initialState: initialValues,
    reducers: {
        setSelectedLabel: (state, action) => {
            state.selectedLabel = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload;
        },
        setCurrentShape: (state, action) => {
            state.currentShape = action.payload;
        },
        setShapes: (state, action) => {
            state.shapes = action.payload;
        },
        setIsDrawing: (state, action) => {
            state.isDrawing = action.payload;
        },
        setIsResizing: (state, action) => {
            state.isResizing = action.payload;
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase('INITIAL_LOADING', (state, action) => {
                // Logic for initial loading, e.g., setting initial data from an API
                state.shapes = action.payload.shapes || [];
            })
            .addCase('SET_SHAPES', (state, action) => {
                // Logic for setting shapes, can be used in multiple scenarios
                state.shapes = action.payload;
            });
    },
});

// Export actions and reducer
const { actions, reducer } = slice;
export { actions };
export default reducer;