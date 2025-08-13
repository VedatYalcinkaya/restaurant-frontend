import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const BASE = '/job-applications';

const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public apply (JSON)
export const applyForJob = createAsyncThunk('jobApplications/apply', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`${BASE}`, payload);
    return data?.data ?? data;
  } catch (error) {
    const resp = error.response?.data;
    return rejectWithValue(resp?.message || 'Başvuru gönderilemedi');
  }
});

// Public apply with resume (multipart)
export const applyForJobWithResume = createAsyncThunk('jobApplications/applyWithResume', async ({ applicationData, resumeFile }, { rejectWithValue }) => {
  try {
    const fd = new FormData();
    fd.append('applicationData', JSON.stringify(applicationData));
    if (resumeFile) fd.append('resume', resumeFile);
    const { data } = await api.post(`${BASE}/apply-with-resume`, fd);
    return data?.data ?? data;
  } catch (error) {
    const resp = error.response?.data;
    return rejectWithValue(resp?.message || 'Başvuru gönderilemedi');
  }
});

// Admin list
export const listJobApplications = createAsyncThunk('jobApplications/list', async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE}?${qs({ page, size })}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Başvurular getirilemedi');
  }
});

export const listJobApplicationsByStatus = createAsyncThunk('jobApplications/listByStatus', async ({ status, page = 0, size = 10 }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE}/status/${encodeURIComponent(status)}?${qs({ page, size })}`);
    return { status, data: data?.data ?? data };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Başvurular getirilemedi');
  }
});

export const getJobApplicationById = createAsyncThunk('jobApplications/getById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE}/${id}`);
    return data?.data ?? data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Başvuru getirilemedi');
  }
});

export const updateJobApplicationStatus = createAsyncThunk('jobApplications/updateStatus', async ({ id, status, notes }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`${BASE}/${id}/status`, { status, notes });
    return data?.data ?? data;
  } catch (error) {
    const resp = error.response?.data;
    return rejectWithValue(resp?.message || 'Durum güncellenemedi');
  }
});

export const deleteJobApplication = createAsyncThunk('jobApplications/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${BASE}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Başvuru silinemedi');
  }
});

const initialState = {
  list: { content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null },
  byStatus: {},
  current: null,
  applying: false,
  applySuccess: false,
  applyError: null,
};

const jobApplicationSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {
    clearApplyState: (state) => {
      state.applying = false;
      state.applyError = null;
      state.applySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.applying = true;
        state.applyError = null;
        state.applySuccess = false;
      })
      .addCase(applyForJob.fulfilled, (state) => {
        state.applying = false;
        state.applySuccess = true;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.applying = false;
        state.applyError = action.payload;
      })
      .addCase(applyForJobWithResume.pending, (state) => {
        state.applying = true;
        state.applyError = null;
        state.applySuccess = false;
      })
      .addCase(applyForJobWithResume.fulfilled, (state) => {
        state.applying = false;
        state.applySuccess = true;
      })
      .addCase(applyForJobWithResume.rejected, (state, action) => {
        state.applying = false;
        state.applyError = action.payload;
      })
      .addCase(listJobApplications.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listJobApplications.fulfilled, (state, action) => {
        state.list.loading = false;
        const data = action.payload || {};
        if (Array.isArray(data)) {
          state.list.content = data;
          state.list.totalPages = 1;
          state.list.totalElements = data.length;
          state.list.page = 0;
          state.list.size = data.length;
        } else {
          state.list.content = data.content || data.items || [];
          state.list.totalPages = data.totalPages || 0;
          state.list.totalElements = data.totalElements || state.list.content.length;
          state.list.page = data.number ?? data.page ?? 0;
          state.list.size = data.size ?? state.list.size;
        }
      })
      .addCase(listJobApplications.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })
      .addCase(listJobApplicationsByStatus.pending, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null };
        state.byStatus[status].loading = true;
        state.byStatus[status].error = null;
      })
      .addCase(listJobApplicationsByStatus.fulfilled, (state, action) => {
        const { status, data } = action.payload || {};
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null };
        state.byStatus[status].loading = false;
        if (Array.isArray(data)) {
          state.byStatus[status].content = data;
          state.byStatus[status].totalPages = 1;
          state.byStatus[status].totalElements = data.length;
          state.byStatus[status].page = 0;
          state.byStatus[status].size = data.length;
        } else {
          state.byStatus[status].content = data.content || data.items || [];
          state.byStatus[status].totalPages = data.totalPages || 0;
          state.byStatus[status].totalElements = data.totalElements || state.byStatus[status].content.length;
          state.byStatus[status].page = data.number ?? data.page ?? 0;
          state.byStatus[status].size = data.size ?? state.byStatus[status].size;
        }
      })
      .addCase(listJobApplicationsByStatus.rejected, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].error = action.payload;
      })
      .addCase(getJobApplicationById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(updateJobApplicationStatus.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(deleteJobApplication.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.content = state.list.content.filter((a) => a.id !== id);
      });
  },
});

export const { clearApplyState } = jobApplicationSlice.actions;

export const selectJobApplicationList = (state) => state.jobApplications.list;
export const selectJobApplicationByStatus = (state, status) => state.jobApplications.byStatus[status] || { content: [], loading: false, error: null };
export const selectJobApplicationCurrent = (state) => state.jobApplications.current;
export const selectJobApplicationApplying = (state) => state.jobApplications.applying;
export const selectJobApplicationApplySuccess = (state) => state.jobApplications.applySuccess;
export const selectJobApplicationApplyError = (state) => state.jobApplications.applyError;

export default jobApplicationSlice.reducer;


