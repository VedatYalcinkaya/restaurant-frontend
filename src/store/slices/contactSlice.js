import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const BASE = '/contact-messages';

const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public: mesaj gönder
export const sendContactMessage = createAsyncThunk(
  'contact/send',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${BASE}`, payload);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Mesaj gönderilemedi');
    }
  }
);

// Admin: liste
export const listContactMessages = createAsyncThunk(
  'contact/list',
  async ({ page = 0, size = 20 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Mesajlar getirilemedi');
    }
  }
);

export const listContactMessagesByStatus = createAsyncThunk(
  'contact/listByStatus',
  async ({ status, page = 0, size = 20 }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/status/${encodeURIComponent(status)}?${qs({ page, size })}`);
      return { status, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Mesajlar getirilemedi');
    }
  }
);

export const markContactMessageRead = createAsyncThunk(
  'contact/markRead',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/read`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Okundu olarak işaretlenemedi');
    }
  }
);

export const replyContactMessage = createAsyncThunk(
  'contact/reply',
  async ({ id, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/reply?${qs({ adminNotes })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Cevaplanamadı');
    }
  }
);

export const deleteContactMessage = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Mesaj silinemedi');
    }
  }
);

// Başlangıç durumu
const initialState = {
  contactForm: { loading: false, success: false, error: null, data: null },
  list: { content: [], totalPages: 0, totalElements: 0, page: 0, size: 20, loading: false, error: null },
  byStatus: {},
};

// Contact Slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: { resetContactForm: (state) => { state.contactForm = initialState.contactForm; } },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.contactForm.loading = true;
        state.contactForm.success = false;
        state.contactForm.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.contactForm.loading = false;
        state.contactForm.success = true;
        state.contactForm.data = action.payload;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.contactForm.loading = false;
        state.contactForm.error = action.payload;
      })

      // Admin list
      .addCase(listContactMessages.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listContactMessages.fulfilled, (state, action) => {
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
      .addCase(listContactMessages.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })

      .addCase(listContactMessagesByStatus.pending, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 20, loading: false, error: null };
        state.byStatus[status].loading = true;
        state.byStatus[status].error = null;
      })
      .addCase(listContactMessagesByStatus.fulfilled, (state, action) => {
        const { status, data } = action.payload || {};
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 20, loading: false, error: null };
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
      .addCase(listContactMessagesByStatus.rejected, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], totalPages: 0, totalElements: 0, page: 0, size: 20, loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].error = action.payload;
      })

      .addCase(markContactMessageRead.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list.content = (state.list.content || []).map(m => m.id === updated?.id ? { ...m, ...updated } : m);
        Object.keys(state.byStatus).forEach(k => {
          state.byStatus[k].content = (state.byStatus[k].content || []).map(m => m.id === updated?.id ? { ...m, ...updated } : m);
        });
      })
      .addCase(replyContactMessage.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list.content = (state.list.content || []).map(m => m.id === updated?.id ? { ...m, ...updated } : m);
        Object.keys(state.byStatus).forEach(k => {
          state.byStatus[k].content = (state.byStatus[k].content || []).map(m => m.id === updated?.id ? { ...m, ...updated } : m);
        });
      })
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.content = (state.list.content || []).filter(m => m.id !== id);
        Object.keys(state.byStatus).forEach(k => {
          state.byStatus[k].content = (state.byStatus[k].content || []).filter(m => m.id !== id);
        });
      });
  }
});

export const { resetContactForm } = contactSlice.actions;

// Selector'lar
export const selectContactFormState = (state) => state.contact.contactForm;
export const selectContactList = (state) => state.contact.list;
export const selectContactByStatus = (state, status) => state.contact.byStatus[status] || { content: [], loading: false, error: null };

export default contactSlice.reducer; 