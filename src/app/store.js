import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "../pages/editor/components/slice";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { STATE_SLICE_KEY } from "../pages/editor/components/constants";

const defaultMiddleware = {
    serializableCheck: {
        ignoredActions: ["example/setContext"],
        ignoredPaths: ["editor.context"]
    }
};

const store = configureStore({
    reducer: {
        [STATE_SLICE_KEY]: editorSlice
    },
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV === "development"
            ? getDefaultMiddleware(defaultMiddleware).concat(logger, thunk)
            : getDefaultMiddleware(defaultMiddleware).concat(thunk)
});

export default store;
