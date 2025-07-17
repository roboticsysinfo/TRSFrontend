import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/axiosInstance';

// Add story
export const addStory = createAsyncThunk('story/addStory', async (storyData, { rejectWithValue }) => {
  try {
    const res = await api.post('/add-story', storyData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Delete story
export const deleteStory = createAsyncThunk('story/deleteStory', async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete(`/delete-story/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Update story
export const updateStory = createAsyncThunk('story/updateStory', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/update-story/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Get all stories
export const getAllStories = createAsyncThunk('story/getAllStories', async ({ page = 1, limit = 10, search = '', categoryId = '' }, { rejectWithValue }) => {
  try {
    let url = `/stories?page=${page}&limit=${limit}&search=${search}`;
    if (categoryId) url += `&category=${categoryId}`;
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Get story by ID
export const getStoryById = createAsyncThunk('story/getStoryById', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/single-story/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Get stories by user ID
export const getStoriesByUserId = createAsyncThunk('story/getStoriesByUserId', async ({ userId, page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/user/stories/${userId}?page=${page}&limit=${limit}&search=${search}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Verify story
export const verifyStory = createAsyncThunk('story/verifyStory', async (id, { rejectWithValue }) => {
  try {
    const res = await api.put(`/verify-story/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Get startup stories
export const getStartupStories = createAsyncThunk('story/getStartupStories', async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/startup-stories?page=${page}&limit=${limit}&search=${search}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Initial state
const initialState = {
  stories: [],           // All stories (except startup)
  startupStories: [],    // Only startup category stories
  singleStory: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  message: '',
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    clearStoryMessage: (state) => {
      state.message = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Add
      .addCase(addStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.stories.unshift(action.payload.data);
      })
      .addCase(addStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Add failed';
      })

      // Delete
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.stories = state.stories.filter(s => s._id !== action.meta.arg);
        state.message = action.payload.message;
      })

      // Update
      .addCase(updateStory.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.stories = state.stories.map(story => story._id === updated._id ? updated : story);
        state.message = action.payload.message;
      })

      // Get all stories
      .addCase(getAllStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload.data.stories;
        state.total = action.payload.data.total;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch stories';
      })

      // Get by ID
      .addCase(getStoryById.fulfilled, (state, action) => {
        state.singleStory = action.payload.data;
      })

      // Get by user
      .addCase(getStoriesByUserId.fulfilled, (state, action) => {
        state.stories = action.payload.data.stories;
        state.total = action.payload.data.total;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })

      // Verify
      .addCase(verifyStory.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.stories = state.stories.map(story =>
          story._id === updated._id ? updated : story
        );
        state.message = action.payload.message;
      })

      // Get startup stories
      .addCase(getStartupStories.pending, (state) => {
        state.loading = true;
      })

      .addCase(getStartupStories.fulfilled, (state, action) => {
        state.loading = false;
        state.startupStories = action.payload.data.stories;
        state.total = action.payload.data.total;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(getStartupStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch startup stories';
      });
}
});

export const { clearStoryMessage } = storySlice.actions;
export default storySlice.reducer;
