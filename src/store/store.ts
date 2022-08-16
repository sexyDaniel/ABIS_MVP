import { commonApi } from '../services/commonService';
import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './reducers/TokenSlice';
import UserSlice from './reducers/UserSlice';

export const store = configureStore({
    reducer: {
        token: TokenSlice,
        user: UserSlice,
        [commonApi.reducerPath]: commonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
