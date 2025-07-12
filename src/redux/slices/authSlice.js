import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axiosInstance, { storeAuthData } from '@/utils/axiosInstance';


// ✅ Signup Thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, phoneNumber, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        name,
        phoneNumber,
        email,
        password,
      });
      return response.data.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Signin Thunk
export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/signin', {
        email,
        password,
      });
      return response.data.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/logout"); // Hit logout API to remove HttpOnly token
    return true;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


// ✅ Initial State
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('user');
      Cookies.remove('userRole');
      Cookies.remove('userId');
      Cookies.remove('userName');
    },

    // Load from cookies
    loadUserFromCookie: (state) => {
      const token = Cookies.get('token');
      const user = Cookies.get('user');

      if (token) state.token = token;
      if (user) {
        try {
          state.user = JSON.parse(user);
        } catch {
          state.user = null;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        storeAuthData({ user, token });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })

      // Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
        storeAuthData({ user });
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signin failed';
      });
  },
});


export const { logout, loadUserFromCookie } = authSlice.actions;
export default authSlice.reducer;
