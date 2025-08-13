import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const BASE = '/menu-categories';

const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public GET Endpoints
export const listAllMenuCategories = createAsyncThunk(
  'menuCategories/listAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategoriler getirilemedi');
    }
  }
);

export const listMenuCategoriesPaginated = createAsyncThunk(
  'menuCategories/listPaginated',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/paginated?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategoriler getirilemedi');
    }
  }
);

export const listActiveMenuCategories = createAsyncThunk(
  'menuCategories/listActive',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/active`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Aktif kategoriler getirilemedi');
    }
  }
);

export const listActiveMenuCategoriesPaginated = createAsyncThunk(
  'menuCategories/listActivePaginated',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/active/paginated?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Aktif kategoriler getirilemedi');
    }
  }
);

export const getMenuCategoryById = createAsyncThunk(
  'menuCategories/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategori getirilemedi');
    }
  }
);

// Protected Admin/Editor Endpoints
export const createMenuCategory = createAsyncThunk(
  'menuCategories/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${BASE}`, payload);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({
          message: resp.message || 'Kategori oluşturulamadı',
          details: resp.data || null,
        });
      }
      return rejectWithValue({ message: 'Kategori oluşturulamadı' });
    }
  }
);

export const updateMenuCategory = createAsyncThunk(
  'menuCategories/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${BASE}/${id}`, payload);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({
          message: resp.message || 'Kategori güncellenemedi',
          details: resp.data || null,
        });
      }
      return rejectWithValue({ message: 'Kategori güncellenemedi' });
    }
  }
);

export const deleteMenuCategory = createAsyncThunk(
  'menuCategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategori silinemedi');
    }
  }
);

export const activateMenuCategory = createAsyncThunk(
  'menuCategories/activate',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/activate/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategori aktifleştirilemedi');
    }
  }
);

export const deactivateMenuCategory = createAsyncThunk(
  'menuCategories/deactivate',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/deactivate/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategori pasifleştirilemedi');
    }
  }
);

const initialState = {
  list: {
    content: [],
    loading: false,
    error: null,
  },
  paginated: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 10,
    loading: false,
    error: null,
  },
  activeList: {
    content: [],
    loading: false,
    error: null,
  },
  activePaginated: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 10,
    loading: false,
    error: null,
  },
  current: null,
  creating: false,
  createSuccess: false,
  createError: null,
  updating: false,
  updateSuccess: false,
  updateError: null,
  deleting: false,
};

const menuCategorySlice = createSlice({
  name: 'menuCategories',
  initialState,
  reducers: {
    clearMenuCategoryCreateState: (state) => {
      state.creating = false;
      state.createError = null;
      state.createSuccess = false;
    },
    clearMenuCategoryUpdateState: (state) => {
      state.updating = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // List all
      .addCase(listAllMenuCategories.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listAllMenuCategories.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.content = Array.isArray(action.payload) ? action.payload : (action.payload?.items || []);
      })
      .addCase(listAllMenuCategories.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })

      // List paginated
      .addCase(listMenuCategoriesPaginated.pending, (state) => {
        state.paginated.loading = true;
        state.paginated.error = null;
      })
      .addCase(listMenuCategoriesPaginated.fulfilled, (state, action) => {
        state.paginated.loading = false;
        const data = action.payload || {};
        state.paginated.content = data.content || data.items || [];
        state.paginated.totalPages = data.totalPages || 0;
        state.paginated.totalElements = data.totalElements || (state.paginated.content?.length || 0);
        state.paginated.page = data.number ?? data.page ?? 0;
        state.paginated.size = data.size ?? state.paginated.size;
      })
      .addCase(listMenuCategoriesPaginated.rejected, (state, action) => {
        state.paginated.loading = false;
        state.paginated.error = action.payload;
      })

      // List active
      .addCase(listActiveMenuCategories.pending, (state) => {
        state.activeList.loading = true;
        state.activeList.error = null;
      })
      .addCase(listActiveMenuCategories.fulfilled, (state, action) => {
        state.activeList.loading = false;
        state.activeList.content = Array.isArray(action.payload) ? action.payload : (action.payload?.items || []);
      })
      .addCase(listActiveMenuCategories.rejected, (state, action) => {
        state.activeList.loading = false;
        state.activeList.error = action.payload;
      })

      // List active paginated
      .addCase(listActiveMenuCategoriesPaginated.pending, (state) => {
        state.activePaginated.loading = true;
        state.activePaginated.error = null;
      })
      .addCase(listActiveMenuCategoriesPaginated.fulfilled, (state, action) => {
        state.activePaginated.loading = false;
        const data = action.payload || {};
        state.activePaginated.content = data.content || data.items || [];
        state.activePaginated.totalPages = data.totalPages || 0;
        state.activePaginated.totalElements = data.totalElements || (state.activePaginated.content?.length || 0);
        state.activePaginated.page = data.number ?? data.page ?? 0;
        state.activePaginated.size = data.size ?? state.activePaginated.size;
      })
      .addCase(listActiveMenuCategoriesPaginated.rejected, (state, action) => {
        state.activePaginated.loading = false;
        state.activePaginated.error = action.payload;
      })

      // Get by id
      .addCase(getMenuCategoryById.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Create
      .addCase(createMenuCategory.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createMenuCategory.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        state.current = action.payload;
        // Opsiyonel: listeye ekleme (server sıralaması bozulmasın diye yeniden fetch tercih edilir)
      })
      .addCase(createMenuCategory.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Update
      .addCase(updateMenuCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateMenuCategory.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.current = action.payload;
        // Listelerde eşleşen kaydı güncelle
        const updated = action.payload;
        const updateInArray = (arr) => arr.map((it) => (it.id === updated?.id ? { ...it, ...updated } : it));
        state.list.content = updateInArray(state.list.content);
        state.paginated.content = updateInArray(state.paginated.content);
        state.activeList.content = updateInArray(state.activeList.content);
        state.activePaginated.content = updateInArray(state.activePaginated.content);
      })
      .addCase(updateMenuCategory.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      // Activate / Deactivate
      .addCase(activateMenuCategory.fulfilled, (state, action) => {
        state.current = action.payload;
        const updated = action.payload;
        const updateInArray = (arr) => arr.map((it) => (it.id === updated?.id ? { ...it, ...updated } : it));
        state.list.content = updateInArray(state.list.content);
        state.paginated.content = updateInArray(state.paginated.content);
        state.activeList.content = updateInArray(state.activeList.content);
        state.activePaginated.content = updateInArray(state.activePaginated.content);
      })
      .addCase(deactivateMenuCategory.fulfilled, (state, action) => {
        state.current = action.payload;
        const updated = action.payload;
        const updateInArray = (arr) => arr.map((it) => (it.id === updated?.id ? { ...it, ...updated } : it));
        state.list.content = updateInArray(state.list.content);
        state.paginated.content = updateInArray(state.paginated.content);
        state.activeList.content = updateInArray(state.activeList.content);
        state.activePaginated.content = updateInArray(state.activePaginated.content);
      })

      // Delete
      .addCase(deleteMenuCategory.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteMenuCategory.fulfilled, (state, action) => {
        const id = action.payload;
        state.deleting = false;
        state.list.content = state.list.content.filter((c) => c.id !== id);
        state.paginated.content = state.paginated.content.filter((c) => c.id !== id);
        state.activeList.content = state.activeList.content.filter((c) => c.id !== id);
        state.activePaginated.content = state.activePaginated.content.filter((c) => c.id !== id);
        if (state.current?.id === id) {
          state.current = null;
        }
      })
      .addCase(deleteMenuCategory.rejected, (state) => {
        state.deleting = false;
      });
  },
});

export const { clearMenuCategoryCreateState, clearMenuCategoryUpdateState } = menuCategorySlice.actions;

// Selectors
export const selectMenuCategoryList = (state) => state.menuCategories.list;
export const selectMenuCategoryPaginated = (state) => state.menuCategories.paginated;
export const selectActiveMenuCategoryList = (state) => state.menuCategories.activeList;
export const selectActiveMenuCategoryPaginated = (state) => state.menuCategories.activePaginated;
export const selectCurrentMenuCategory = (state) => state.menuCategories.current;

export const selectMenuCategoryCreating = (state) => state.menuCategories.creating;
export const selectMenuCategoryCreateSuccess = (state) => state.menuCategories.createSuccess;
export const selectMenuCategoryCreateError = (state) => state.menuCategories.createError;

export const selectMenuCategoryUpdating = (state) => state.menuCategories.updating;
export const selectMenuCategoryUpdateSuccess = (state) => state.menuCategories.updateSuccess;
export const selectMenuCategoryUpdateError = (state) => state.menuCategories.updateError;

export const selectMenuCategoryDeleting = (state) => state.menuCategories.deleting;

export default menuCategorySlice.reducer;


