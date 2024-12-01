import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  themeMode: 'dark' | 'light';
};

const initialState: AppState = {
  themeMode: 'light',
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {},
});

const { reducer: appReducer } = appSlice;

export default appReducer;
