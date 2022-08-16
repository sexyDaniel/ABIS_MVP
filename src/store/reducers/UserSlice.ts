import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { AppDispatch } from '../store';

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const setUser = (user: User) => (dispatch: AppDispatch) => {
    dispatch(UserSlice.actions.setUser(user));
};

export const clearUser = () => (dispatch: AppDispatch) => {
    dispatch(UserSlice.actions.clearUser());
};

export default UserSlice.reducer;
