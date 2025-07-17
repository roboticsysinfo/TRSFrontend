import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance'; 

// 🔁 Thunks for API calls


// Create company
export const createCompany = createAsyncThunk(
  'company/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/list-compnay', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Create failed');
    }
  }
);


// Fetch all companies
export const fetchCompanies = createAsyncThunk(
  'company/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/companies');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Fetch failed');
    }
  }
);


// Fetch company by company ID
export const fetchCompanyById = createAsyncThunk(
  'company/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company/by-cid/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Fetch by ID failed');
    }
  }
);


// Fetch company by user ID
export const fetchCompanyByUserId = createAsyncThunk(
  'company/fetchByUserId',
  async (userId, { rejectWithValue }) => {
    try {

      const res = await axiosInstance.get(`/company/by-user/${userId}`);

      return res.data.data;
      
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Fetch by User ID failed');
    }
  }
);



// Update company
export const updateCompany = createAsyncThunk(
  'company/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/update/company/${id}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Update failed');
    }
  }
);


// Delete company
export const deleteCompany = createAsyncThunk(
  'company/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/delete/company/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Delete failed');
    }
  }
);


// 🧩 Initial State
const initialState = {
  companies: [],
  selectedCompany: null,
  userCompany: null,
  loading: false,
  error: null,
};



// 🧠 Slice
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearCompanyState: (state) => {
      state.selectedCompany = null;
      state.userCompany = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by User ID
      .addCase(fetchCompanyByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userCompany = action.payload;
      })
      .addCase(fetchCompanyByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.map((company) =>
          company._id === action.payload._id ? action.payload : company
        );
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ⛳️ Export
export const { clearCompanyState } = companySlice.actions;
export default companySlice.reducer;
