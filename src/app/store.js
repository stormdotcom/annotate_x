import { configureStore } from '@reduxjs/toolkit';
import editorSlice from '../components/slice';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { STATE_SLICE_KEY } from '../components/constants';

const store = configureStore({
    reducer: {
        [STATE_SLICE_KEY]: editorSlice,
    },
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV === 'development'
            ? getDefaultMiddleware().concat(logger, thunk)
            : getDefaultMiddleware().concat(thunk),
});

export default store;
