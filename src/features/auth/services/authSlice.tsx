import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  user: Object;
  credentials: Object;
}

const initialState: AuthState = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDMwNTQ4NDYsImV4cCI6MTcwMzY1OTY0Nn0.St0nXb-zGFVIA8Oq68Msb-hRYfIMNAKWfNxwqoU5JmQ',
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
