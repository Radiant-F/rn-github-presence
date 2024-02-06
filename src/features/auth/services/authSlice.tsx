import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  user: Object;
  credentials: Object;
}

const initialState: AuthState = {
  token: '',
  user: {},
  credentials: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserCredentials: (state, action) => {
      const payload = action.payload;
      if (payload.credentials) state.credentials = payload.credentials;
      state.user = action.payload.credentials;
    },
  },
});

export const {setToken, setUserCredentials} = authSlice.actions;

export default authSlice.reducer;
