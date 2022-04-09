import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // just logging results for now
    console.log(user);
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  // just logging results for now
  console.log(user);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// aka authReducer
export default authSlice.reducer;
