import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  user: Object;
}

const initialState: AuthState = {
  token: '',
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setToken} = authSlice.actions;

export default authSlice.reducer;
