import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../../types/Company';
import { AppDispatch } from '../store';

interface CompaniesState {
    companies: Company[] | null;
}

const initialState: CompaniesState = {
    companies: null,
};

export const CompaniesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies: (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        clearCompanies: (state) => {
            state.companies = null;
        },
    },
});

export const setUser = (companies: Company[]) => (dispatch: AppDispatch) => {
    dispatch(CompaniesSlice.actions.setCompanies(companies));
};

export const clearUser = () => (dispatch: AppDispatch) => {
    dispatch(CompaniesSlice.actions.clearCompanies());
};

export default CompaniesSlice.reducer;
