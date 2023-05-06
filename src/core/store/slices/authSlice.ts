import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
	loggedIn: boolean;
	token: string;
}

const initialState: AuthState = {
	loggedIn: false,
	token: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.loggedIn = true;
			state.token = action.payload;
		},
		logout: () => initialState,
	},
});

export const getAuthState = (state: RootState) => ({ loggedIn: state.auth.loggedIn, username: state.auth.token });

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
