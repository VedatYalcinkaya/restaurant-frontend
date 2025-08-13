import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const BASE = '/jobs';

const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public
export const listActiveJobs = createAsyncThunk('jobs/listActive', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'İlanlar getirilemedi');
  }
});

export const getJobById = createAsyncThunk('jobs/getById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE}/${id}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'İlan getirilemedi');
  }
});

// Admin/Editor
export const createJob = createAsyncThunk('jobs/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`${BASE}`, payload);
    return data?.data ?? data;
  } catch (error) {
    const resp = error.response?.data;
    return rejectWithValue(resp?.message || 'İlan oluşturulamadı');
  }
});

export const updateJob = createAsyncThunk('jobs/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`${BASE}/${id}`, payload);
    return data?.data ?? data;
  } catch (error) {
    const resp = error.response?.data;
    return rejectWithValue(resp?.message || 'İlan güncellenemedi');
  }
});

export const activateJob = createAsyncThunk('jobs/activate', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`${BASE}/activate/${id}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'İlan aktifleştirilemedi');
  }
});

export const deactivateJob = createAsyncThunk('jobs/deactivate', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`${BASE}/deactivate/${id}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'İlan pasifleştirilemedi');
  }
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${BASE}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'İlan silinemedi');
  }
});

const initialState = {
  activeList: { content: [], loading: false, error: null },
  current: null,
  creating: false,
  updating: false,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listActiveJobs.pending, (state) => {
        state.activeList.loading = true;
        state.activeList.error = null;
      })
      .addCase(listActiveJobs.fulfilled, (state, action) => {
        state.activeList.loading = false;
        const data = action.payload;
        state.activeList.content = Array.isArray(data) ? data : (data?.items || []);
      })
      .addCase(listActiveJobs.rejected, (state, action) => {
        state.activeList.loading = false;
        state.activeList.error = action.payload;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.creating = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createJob.rejected, (state) => {
        state.creating = false;
      })
      .addCase(updateJob.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.updating = false;
        state.current = action.payload;
      })
      .addCase(updateJob.rejected, (state) => {
        state.updating = false;
      })
      .addCase(activateJob.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(deactivateJob.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        // No-op; list yeniden fetch edilmeli
      });
  },
});

export const selectActiveJobs = (state) => state.jobs.activeList;
export const selectCurrentJob = (state) => state.jobs.current;

export default jobSlice.reducer;


