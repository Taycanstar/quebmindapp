import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../index';

interface UserState {
  data?: {
    name?: string;
    email?: string;
    id?: string;
    registrationStep?: string; // Add registrationStep to the user data
  } | null;

  status: 'idle' | 'loading' | 'loggedIn' | 'error';
  error?: string | null;
  token: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    userData: {
      email?: string;
      username?: string;
      password: string;
      registrationToken?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await api.post(`/u/login`, userData);

      await AsyncStorage.setItem('token', response.data.token); // Save the token to AsyncStorage
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    await AsyncStorage.removeItem('token'); // Remove the token from AsyncStorage
    // We return a resolved promise because there's no actual API request here
    return Promise.resolve();
  } catch (error) {
    // There's no API request, so we don't have a response to rejectWithValue
    throw error;
  }
});

export const fetchUserData = createAsyncThunk(
  'user/fetch',
  async (_, {rejectWithValue, getState}) => {
    try {
      const response = await api.get('/api/get-user');
      const {data} = response;

      // Get the existing user data from the state
      const {registrationStep} = (getState() as RootState).user.data || {};

      // Merge the fetched data with the existing data, including the registrationStep
      const userData = {
        ...data,
        registrationStep,
      };

      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserByValue = createAsyncThunk(
  'user/fetchByValue',
  async (value: string, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/get-user-by-value?value=${value}`);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'loggedIn';
        state.data = action.payload;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.status = 'idle';
        state.data = null;
        state.error = null;
      })
      .addCase(fetchUserData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loggedIn';
        state.error = null;
        (state.data as {registrationStep?: string}).registrationStep =
          action.payload?.registrationStep ?? '';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
