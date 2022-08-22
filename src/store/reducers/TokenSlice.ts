import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commonApi } from '../../services/commonService';
import { CompaniesSlice } from './CompaniesSlice';
import { AppDispatch } from '../store';
import { UserSlice } from './UserSlice';

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: localStorage.getItem('accessToken'),
};

export const TokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const setToken = (token: string) => (dispatch: AppDispatch) => {
    dispatch(TokenSlice.actions.setToken(token));
    localStorage.setItem('accessToken', token);
};

export const clearToken = () => (dispatch: AppDispatch) => {
    dispatch(TokenSlice.actions.clearToken());
    dispatch(UserSlice.actions.clearUser());
    dispatch(CompaniesSlice.actions.clearCompanies());
    dispatch(commonApi.util.resetApiState());
    localStorage.removeItem('accessToken');
};

export default TokenSlice.reducer;
