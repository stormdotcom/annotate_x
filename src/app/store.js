import { configureStore } from '@reduxjs/toolkit';
import editorSlice from '../components/slice';
import logger from 'redux-logger';

const store = configureStore({
    reducer: {
        "editor": editorSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
