// src/features/example/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import * as ACTIONS from "./actionTypes";
import data from "../data.json";
const initialValues = {
    selectedLabel: "some value",
    selectedColor: "#3357FF",
    selectedShapeType: "rect",
    currentShape: {},
    shapeTypes: data.shapeTypes,
    shapes: data.shapes,
    isDrawing: false,
    isResizing: false,
    isDragging: false,
    isLoading: false,
    error: null
};

const slice = createSlice({
    name: "example",
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
            state.shapes.push(action.payload);
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
        setShapeType: (state, action) => {
            state.selectedShapeType = action.payload;
        },
        deleteLabel: (state, { payload }) => {
            state.shapes = state.shapes.filter(item => payload.id !== item.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTIONS.LOAD_SHAPES_REQUEST, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(ACTIONS.LOAD_SHAPES_SUCCESS, (state, action) => {
                state.isLoading = false;
                state.shapes = action.payload;
            })
            .addCase(ACTIONS.LOAD_SHAPES_FAILURE, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Export actions and reducer
const { actions, reducer } = slice;
export { actions };
export default reducer;
