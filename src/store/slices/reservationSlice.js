import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Base path for reservations
const BASE = '/reservations';

// Helper to build query string
const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public Endpoints
export const createReservation = createAsyncThunk(
  'reservations/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${BASE}`, payload);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({
          message: resp.message || 'Rezervasyon oluşturulamadı',
          details: resp.data || null,
        });
      }
      return rejectWithValue({ message: 'Rezervasyon oluşturulamadı' });
    }
  }
);

export const getCustomerReservationsByEmail = createAsyncThunk(
  'reservations/getByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/customer/email/${encodeURIComponent(email)}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyonlar getirilemedi');
    }
  }
);

export const getCustomerReservationsByPhone = createAsyncThunk(
  'reservations/getByPhone',
  async (phone, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/customer/phone/${encodeURIComponent(phone)}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyonlar getirilemedi');
    }
  }
);

// Admin/Editor Endpoints (örnek kullanım için yaygın olanlar)
export const getReservationById = createAsyncThunk(
  'reservations/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon getirilemedi');
    }
  }
);

export const listReservations = createAsyncThunk(
  'reservations/list',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon listesi getirilemedi');
    }
  }
);

// Duruma göre liste
export const listReservationsByStatus = createAsyncThunk(
  'reservations/listByStatus',
  async ({ status }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/status/${encodeURIComponent(status)}`);
      return { status, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Duruma göre rezervasyonlar getirilemedi');
    }
  }
);

// Tarih aralığına göre liste
export const listReservationsByDateRange = createAsyncThunk(
  'reservations/listByDateRange',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/date-range?${qs({ startDate, endDate })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Tarih aralığına göre rezervasyonlar getirilemedi');
    }
  }
);

// Tarih aralığı ve duruma göre liste
export const listReservationsByDateRangeAndStatus = createAsyncThunk(
  'reservations/listByDateRangeAndStatus',
  async ({ startDate, endDate, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/date-range/status/${encodeURIComponent(status)}?${qs({ startDate, endDate })}`);
      return { status, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Tarih aralığı ve duruma göre rezervasyonlar getirilemedi');
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${BASE}/${id}`, payload);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon güncellenemedi');
    }
  }
);

export const patchReservationStatus = createAsyncThunk(
  'reservations/patchStatus',
  async ({ id, status, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/status`, { status, adminNotes });
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Durum güncellenemedi');
    }
  }
);

export const confirmReservation = createAsyncThunk(
  'reservations/confirm',
  async ({ id, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/confirm`, adminNotes ? { adminNotes } : {});
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon onaylanamadı');
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancel',
  async ({ id, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/cancel`, adminNotes ? { adminNotes } : {});
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon iptal edilemedi');
    }
  }
);

export const completeReservation = createAsyncThunk(
  'reservations/complete',
  async ({ id, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/complete`, adminNotes ? { adminNotes } : {});
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon tamamlanamadı');
    }
  }
);

export const noShowReservation = createAsyncThunk(
  'reservations/noShow',
  async ({ id, adminNotes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/${id}/no-show`, adminNotes ? { adminNotes } : {});
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'No-show işlemi uygulanamadı');
    }
  }
);

export const deleteReservation = createAsyncThunk(
  'reservations/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon silinemedi');
    }
  }
);

// Finalize edilmiş (COMPLETED, CANCELLED, NO_SHOW) tüm rezervasyonları topluca sil
export const deleteFinalizedReservations = createAsyncThunk(
  'reservations/deleteFinalized',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`${BASE}/finalized`);
      return data?.data ?? data; // mesaj/ek bilgi dönebilir
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Final durumdaki rezervasyonlar silinemedi');
    }
  }
);

const initialState = {
  creating: false,
  createError: null,
  createSuccess: false,

  customerReservations: [],
  list: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 10,
    loading: false,
    error: null,
  },
  byStatus: {
    // PENDING, CONFIRMED, CANCELED, COMPLETED, NO_SHOW
  },

  current: null,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    clearCreateState: (state) => {
      state.creating = false;
      state.createError = null;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createReservation.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        state.current = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Customer lists
      .addCase(getCustomerReservationsByEmail.fulfilled, (state, action) => {
        state.customerReservations = action.payload || [];
      })
      .addCase(getCustomerReservationsByPhone.fulfilled, (state, action) => {
        state.customerReservations = action.payload || [];
      })

      // List
      .addCase(listReservations.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listReservations.fulfilled, (state, action) => {
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
          state.list.totalElements = data.totalElements || (state.list.content?.length || 0);
          state.list.page = data.number ?? data.page ?? 0;
          state.list.size = data.size ?? state.list.size;
        }
      })
      .addCase(listReservations.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })

      // By Status
      .addCase(listReservationsByStatus.pending, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = true;
        state.byStatus[status].error = null;
      })
      .addCase(listReservationsByStatus.fulfilled, (state, action) => {
        const { status, data } = action.payload || {};
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].content = Array.isArray(data) ? data : (data?.content || data?.items || []);
      })
      .addCase(listReservationsByStatus.rejected, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].error = action.payload;
      })

      // By Date Range
      .addCase(listReservationsByDateRange.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listReservationsByDateRange.fulfilled, (state, action) => {
        state.list.loading = false;
        const data = action.payload || [];
        state.list.content = Array.isArray(data) ? data : (data.content || data.items || []);
        state.list.totalPages = 1;
        state.list.totalElements = state.list.content.length;
        state.list.page = 0;
        state.list.size = state.list.content.length;
      })
      .addCase(listReservationsByDateRange.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })

      // By Date Range + Status
      .addCase(listReservationsByDateRangeAndStatus.pending, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = true;
        state.byStatus[status].error = null;
      })
      .addCase(listReservationsByDateRangeAndStatus.fulfilled, (state, action) => {
        const { status, data } = action.payload || {};
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].content = Array.isArray(data) ? data : (data?.content || data?.items || []);
      })
      .addCase(listReservationsByDateRangeAndStatus.rejected, (state, action) => {
        const { status } = action.meta.arg;
        if (!state.byStatus[status]) state.byStatus[status] = { content: [], loading: false, error: null };
        state.byStatus[status].loading = false;
        state.byStatus[status].error = action.payload;
      })

      // Get by id
      .addCase(getReservationById.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Update
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Status changes
      .addCase(patchReservationStatus.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(confirmReservation.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(completeReservation.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(noShowReservation.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Delete
      .addCase(deleteReservation.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.content = state.list.content.filter((r) => r.id !== id);
      });

      // Delete finalized (bulk)
      builder.addCase(deleteFinalizedReservations.fulfilled, (state) => {
        const isFinal = (s) => ['COMPLETED', 'CANCELLED', 'CANCELED', 'NO_SHOW'].includes(String(s || '').toUpperCase());
        state.list.content = (state.list.content || []).filter((r) => !isFinal(r.status));
        // byStatus temizlik
        ['COMPLETED', 'CANCELLED', 'CANCELED', 'NO_SHOW'].forEach((st) => {
          if (state.byStatus[st]) {
            state.byStatus[st].content = [];
          }
        });
      });
  },
});

export const { clearCreateState } = reservationSlice.actions;

// Selectors
export const selectReservationCreating = (state) => state.reservations.creating;
export const selectReservationCreateError = (state) => state.reservations.createError;
export const selectReservationCreateSuccess = (state) => state.reservations.createSuccess;
export const selectCustomerReservations = (state) => state.reservations.customerReservations;
export const selectReservationList = (state) => state.reservations.list;
export const selectCurrentReservation = (state) => state.reservations.current;

export default reservationSlice.reducer;


