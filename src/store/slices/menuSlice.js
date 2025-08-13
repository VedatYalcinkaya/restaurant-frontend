import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const BASE = '/menus';

const qs = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

// Public GET Endpoints
export const listAllMenus = createAsyncThunk(
  'menus/listAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menüler getirilemedi');
    }
  }
);

export const listMenusPaginated = createAsyncThunk(
  'menus/listPaginated',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/paginated?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menüler getirilemedi');
    }
  }
);

export const listActiveMenusPaginated = createAsyncThunk(
  'menus/listActivePaginated',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/active?${qs({ page, size })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Aktif menüler getirilemedi');
    }
  }
);

export const listAvailableMenus = createAsyncThunk(
  'menus/listAvailable',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/available`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Uygun menüler getirilemedi');
    }
  }
);

export const listMenusByCategory = createAsyncThunk(
  'menus/listByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/category/${categoryId}`);
      return { categoryId, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Kategori menüleri getirilemedi');
    }
  }
);

export const listActiveMenusByCategoryPaginated = createAsyncThunk(
  'menus/listActiveByCategoryPaginated',
  async ({ categoryId, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/category/${categoryId}/active?${qs({ page, size })}`);
      return { categoryId, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Aktif kategori menüleri getirilemedi');
    }
  }
);

export const listAvailableMenusByCategory = createAsyncThunk(
  'menus/listAvailableByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/category/${categoryId}/available`);
      return { categoryId, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Uygun kategori menüleri getirilemedi');
    }
  }
);

export const getMenuById = createAsyncThunk(
  'menus/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü getirilemedi');
    }
  }
);

export const searchMenus = createAsyncThunk(
  'menus/search',
  async ({ name, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/search?${qs({ name, page, size })}`);
      return { query: name, data: data?.data ?? data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Arama başarısız');
    }
  }
);

export const getMenusByPriceRange = createAsyncThunk(
  'menus/priceRange',
  async ({ minPrice, maxPrice }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/price-range?${qs({ minPrice, maxPrice })}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fiyat aralığına göre menüler getirilemedi');
    }
  }
);

// Admin/Editor Mutations (JSON)
export const createMenu = createAsyncThunk(
  'menus/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${BASE}`, payload);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({
          message: resp.message || 'Menü oluşturulamadı',
          details: resp.data || null,
        });
      }
      return rejectWithValue({ message: 'Menü oluşturulamadı' });
    }
  }
);

export const updateMenu = createAsyncThunk(
  'menus/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${BASE}/${id}`, payload);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({
          message: resp.message || 'Menü güncellenemedi',
          details: resp.data || null,
        });
      }
      return rejectWithValue({ message: 'Menü güncellenemedi' });
    }
  }
);

export const deleteMenu = createAsyncThunk(
  'menus/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü silinemedi');
    }
  }
);

export const activateMenu = createAsyncThunk(
  'menus/activate',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/activate/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü aktifleştirilemedi');
    }
  }
);

export const deactivateMenu = createAsyncThunk(
  'menus/deactivate',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/deactivate/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü pasifleştirilemedi');
    }
  }
);

export const makeMenuAvailable = createAsyncThunk(
  'menus/makeAvailable',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/make-available/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü uygun hale getirilemedi');
    }
  }
);

export const makeMenuUnavailable = createAsyncThunk(
  'menus/makeUnavailable',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${BASE}/make-unavailable/${id}`);
      return data?.data ?? data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Menü uygun olmayan hale getirilemedi');
    }
  }
);

// Multipart
export const uploadMenuImage = createAsyncThunk(
  'menus/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post(`${BASE}/upload-image`, formData);
      return data?.data ?? data; // beklenen: URL string
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({ message: resp.message || 'Görsel yüklenemedi' });
      }
      return rejectWithValue({ message: 'Görsel yüklenemedi' });
    }
  }
);

export const createMenuWithImage = createAsyncThunk(
  'menus/createWithImage',
  async ({ menuData, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('menuData', JSON.stringify(menuData));
      if (imageFile) formData.append('image', imageFile);
      const { data } = await api.post(`${BASE}/create-with-image`, formData);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({ message: resp.message || 'Menü oluşturulamadı', details: resp.data || null });
      }
      return rejectWithValue({ message: 'Menü oluşturulamadı' });
    }
  }
);

export const updateMenuWithImage = createAsyncThunk(
  'menus/updateWithImage',
  async ({ id, menuData, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('menuData', JSON.stringify(menuData));
      if (imageFile) formData.append('image', imageFile);
      const { data } = await api.post(`${BASE}/${id}/update-with-image`, formData);
      return data?.data ?? data;
    } catch (error) {
      const resp = error.response?.data;
      if (resp && typeof resp === 'object') {
        return rejectWithValue({ message: resp.message || 'Menü güncellenemedi', details: resp.data || null });
      }
      return rejectWithValue({ message: 'Menü güncellenemedi' });
    }
  }
);

const createEmptyListState = () => ({ content: [], loading: false, error: null });
const createEmptyPaginatedState = () => ({ content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null });

const initialState = {
  list: createEmptyListState(),
  paginated: createEmptyPaginatedState(),
  activePaginated: createEmptyPaginatedState(),
  availableList: createEmptyListState(),
  byCategory: {}, // { [categoryId]: ListState }
  byCategoryActivePaginated: {}, // { [categoryId]: PaginatedState }
  byCategoryAvailable: {}, // { [categoryId]: ListState }
  search: { query: '', ...createEmptyPaginatedState() },
  priceRange: { items: [], loading: false, error: null },
  current: null,
  creating: false,
  createSuccess: false,
  createError: null,
  updating: false,
  updateSuccess: false,
  updateError: null,
  deleting: false,
  imageUploading: false,
  imageUrl: null,
  imageError: null,
};

const applyUpdateEverywhere = (state, updated) => {
  const mapUpdate = (arr) => arr.map((it) => (it.id === updated?.id ? { ...it, ...updated } : it));

  state.list.content = mapUpdate(state.list.content);
  state.paginated.content = mapUpdate(state.paginated.content);
  state.activePaginated.content = mapUpdate(state.activePaginated.content);
  state.availableList.content = mapUpdate(state.availableList.content);

  Object.keys(state.byCategory).forEach((k) => {
    state.byCategory[k].content = mapUpdate(state.byCategory[k].content);
  });
  Object.keys(state.byCategoryActivePaginated).forEach((k) => {
    state.byCategoryActivePaginated[k].content = mapUpdate(state.byCategoryActivePaginated[k].content);
  });
  Object.keys(state.byCategoryAvailable).forEach((k) => {
    state.byCategoryAvailable[k].content = mapUpdate(state.byCategoryAvailable[k].content);
  });
};

const applyDeleteEverywhere = (state, id) => {
  const filterOut = (arr) => arr.filter((it) => it.id !== id);

  state.list.content = filterOut(state.list.content);
  state.paginated.content = filterOut(state.paginated.content);
  state.activePaginated.content = filterOut(state.activePaginated.content);
  state.availableList.content = filterOut(state.availableList.content);

  Object.keys(state.byCategory).forEach((k) => {
    state.byCategory[k].content = filterOut(state.byCategory[k].content);
  });
  Object.keys(state.byCategoryActivePaginated).forEach((k) => {
    state.byCategoryActivePaginated[k].content = filterOut(state.byCategoryActivePaginated[k].content);
  });
  Object.keys(state.byCategoryAvailable).forEach((k) => {
    state.byCategoryAvailable[k].content = filterOut(state.byCategoryAvailable[k].content);
  });
  if (state.current?.id === id) state.current = null;
};

const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    clearMenuCreateState: (state) => {
      state.creating = false;
      state.createError = null;
      state.createSuccess = false;
    },
    clearMenuUpdateState: (state) => {
      state.updating = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
    clearMenuImageState: (state) => {
      state.imageUploading = false;
      state.imageUrl = null;
      state.imageError = null;
    },
    clearMenuSearch: (state) => {
      state.search = { query: '', ...createEmptyPaginatedState() };
    },
  },
  extraReducers: (builder) => {
    builder
      // List all
      .addCase(listAllMenus.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(listAllMenus.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.content = Array.isArray(action.payload) ? action.payload : (action.payload?.items || []);
      })
      .addCase(listAllMenus.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      })

      // Paginated
      .addCase(listMenusPaginated.pending, (state) => {
        state.paginated.loading = true;
        state.paginated.error = null;
      })
      .addCase(listMenusPaginated.fulfilled, (state, action) => {
        state.paginated.loading = false;
        const data = action.payload || {};
        state.paginated.content = data.content || data.items || [];
        state.paginated.totalPages = data.totalPages || 0;
        state.paginated.totalElements = data.totalElements || (state.paginated.content?.length || 0);
        state.paginated.page = data.number ?? data.page ?? 0;
        state.paginated.size = data.size ?? state.paginated.size;
      })
      .addCase(listMenusPaginated.rejected, (state, action) => {
        state.paginated.loading = false;
        state.paginated.error = action.payload;
      })

      // Active paginated
      .addCase(listActiveMenusPaginated.pending, (state) => {
        state.activePaginated.loading = true;
        state.activePaginated.error = null;
      })
      .addCase(listActiveMenusPaginated.fulfilled, (state, action) => {
        state.activePaginated.loading = false;
        const data = action.payload || {};
        state.activePaginated.content = data.content || data.items || [];
        state.activePaginated.totalPages = data.totalPages || 0;
        state.activePaginated.totalElements = data.totalElements || (state.activePaginated.content?.length || 0);
        state.activePaginated.page = data.number ?? data.page ?? 0;
        state.activePaginated.size = data.size ?? state.activePaginated.size;
      })
      .addCase(listActiveMenusPaginated.rejected, (state, action) => {
        state.activePaginated.loading = false;
        state.activePaginated.error = action.payload;
      })

      // Available list
      .addCase(listAvailableMenus.pending, (state) => {
        state.availableList.loading = true;
        state.availableList.error = null;
      })
      .addCase(listAvailableMenus.fulfilled, (state, action) => {
        state.availableList.loading = false;
        state.availableList.content = Array.isArray(action.payload) ? action.payload : (action.payload?.items || []);
      })
      .addCase(listAvailableMenus.rejected, (state, action) => {
        state.availableList.loading = false;
        state.availableList.error = action.payload;
      })

      // By category
      .addCase(listMenusByCategory.pending, (state, action) => {
        const categoryId = action.meta.arg;
        if (!state.byCategory[categoryId]) state.byCategory[categoryId] = createEmptyListState();
        state.byCategory[categoryId].loading = true;
        state.byCategory[categoryId].error = null;
      })
      .addCase(listMenusByCategory.fulfilled, (state, action) => {
        const { categoryId, data } = action.payload || {};
        if (!state.byCategory[categoryId]) state.byCategory[categoryId] = createEmptyListState();
        state.byCategory[categoryId].loading = false;
        state.byCategory[categoryId].content = Array.isArray(data) ? data : (data?.items || []);
      })
      .addCase(listMenusByCategory.rejected, (state, action) => {
        const categoryId = action.meta.arg;
        if (!state.byCategory[categoryId]) state.byCategory[categoryId] = createEmptyListState();
        state.byCategory[categoryId].loading = false;
        state.byCategory[categoryId].error = action.payload;
      })

      // Active by category paginated
      .addCase(listActiveMenusByCategoryPaginated.pending, (state, action) => {
        const { categoryId } = action.meta.arg;
        if (!state.byCategoryActivePaginated[categoryId]) state.byCategoryActivePaginated[categoryId] = createEmptyPaginatedState();
        state.byCategoryActivePaginated[categoryId].loading = true;
        state.byCategoryActivePaginated[categoryId].error = null;
      })
      .addCase(listActiveMenusByCategoryPaginated.fulfilled, (state, action) => {
        const { categoryId, data } = action.payload || {};
        if (!state.byCategoryActivePaginated[categoryId]) state.byCategoryActivePaginated[categoryId] = createEmptyPaginatedState();
        state.byCategoryActivePaginated[categoryId].loading = false;
        state.byCategoryActivePaginated[categoryId].content = data.content || data.items || [];
        state.byCategoryActivePaginated[categoryId].totalPages = data.totalPages || 0;
        state.byCategoryActivePaginated[categoryId].totalElements = data.totalElements || (state.byCategoryActivePaginated[categoryId].content?.length || 0);
        state.byCategoryActivePaginated[categoryId].page = data.number ?? data.page ?? 0;
        state.byCategoryActivePaginated[categoryId].size = data.size ?? state.byCategoryActivePaginated[categoryId].size;
      })
      .addCase(listActiveMenusByCategoryPaginated.rejected, (state, action) => {
        const { categoryId } = action.meta.arg;
        if (!state.byCategoryActivePaginated[categoryId]) state.byCategoryActivePaginated[categoryId] = createEmptyPaginatedState();
        state.byCategoryActivePaginated[categoryId].loading = false;
        state.byCategoryActivePaginated[categoryId].error = action.payload;
      })

      // Available by category
      .addCase(listAvailableMenusByCategory.pending, (state, action) => {
        const categoryId = action.meta.arg;
        if (!state.byCategoryAvailable[categoryId]) state.byCategoryAvailable[categoryId] = createEmptyListState();
        state.byCategoryAvailable[categoryId].loading = true;
        state.byCategoryAvailable[categoryId].error = null;
      })
      .addCase(listAvailableMenusByCategory.fulfilled, (state, action) => {
        const { categoryId, data } = action.payload || {};
        if (!state.byCategoryAvailable[categoryId]) state.byCategoryAvailable[categoryId] = createEmptyListState();
        state.byCategoryAvailable[categoryId].loading = false;
        state.byCategoryAvailable[categoryId].content = Array.isArray(data) ? data : (data?.items || []);
      })
      .addCase(listAvailableMenusByCategory.rejected, (state, action) => {
        const categoryId = action.meta.arg;
        if (!state.byCategoryAvailable[categoryId]) state.byCategoryAvailable[categoryId] = createEmptyListState();
        state.byCategoryAvailable[categoryId].loading = false;
        state.byCategoryAvailable[categoryId].error = action.payload;
      })

      // Get by id
      .addCase(getMenuById.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Search
      .addCase(searchMenus.pending, (state, action) => {
        const { name } = action.meta.arg || {};
        state.search.loading = true;
        state.search.error = null;
        state.search.query = name || '';
      })
      .addCase(searchMenus.fulfilled, (state, action) => {
        const { query, data } = action.payload || {};
        state.search.loading = false;
        state.search.query = query || '';
        state.search.content = data.content || data.items || [];
        state.search.totalPages = data.totalPages || 0;
        state.search.totalElements = data.totalElements || (state.search.content?.length || 0);
        state.search.page = data.number ?? data.page ?? 0;
        state.search.size = data.size ?? state.search.size;
      })
      .addCase(searchMenus.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.payload;
      })

      // Price range
      .addCase(getMenusByPriceRange.pending, (state) => {
        state.priceRange.loading = true;
        state.priceRange.error = null;
      })
      .addCase(getMenusByPriceRange.fulfilled, (state, action) => {
        state.priceRange.loading = false;
        const data = action.payload;
        state.priceRange.items = Array.isArray(data) ? data : (data?.items || []);
      })
      .addCase(getMenusByPriceRange.rejected, (state, action) => {
        state.priceRange.loading = false;
        state.priceRange.error = action.payload;
      })

      // Create
      .addCase(createMenu.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        state.current = action.payload;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Create with image
      .addCase(createMenuWithImage.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createMenuWithImage.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        state.current = action.payload;
      })
      .addCase(createMenuWithImage.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Update
      .addCase(updateMenu.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      // Update with image
      .addCase(updateMenuWithImage.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateMenuWithImage.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })
      .addCase(updateMenuWithImage.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      // Upload image only
      .addCase(uploadMenuImage.pending, (state) => {
        state.imageUploading = true;
        state.imageError = null;
        state.imageUrl = null;
      })
      .addCase(uploadMenuImage.fulfilled, (state, action) => {
        state.imageUploading = false;
        state.imageUrl = typeof action.payload === 'string' ? action.payload : action.payload?.url || null;
      })
      .addCase(uploadMenuImage.rejected, (state, action) => {
        state.imageUploading = false;
        state.imageError = action.payload;
      })

      // Status toggles
      .addCase(activateMenu.fulfilled, (state, action) => {
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })
      .addCase(deactivateMenu.fulfilled, (state, action) => {
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })
      .addCase(makeMenuAvailable.fulfilled, (state, action) => {
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })
      .addCase(makeMenuUnavailable.fulfilled, (state, action) => {
        state.current = action.payload;
        applyUpdateEverywhere(state, action.payload);
      })

      // Delete
      .addCase(deleteMenu.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.deleting = false;
        applyDeleteEverywhere(state, action.payload);
      })
      .addCase(deleteMenu.rejected, (state) => {
        state.deleting = false;
      });
  },
});

export const { clearMenuCreateState, clearMenuUpdateState, clearMenuImageState, clearMenuSearch } = menuSlice.actions;

// Selectors
export const selectMenuList = (state) => state.menus.list;
export const selectMenuPaginated = (state) => state.menus.paginated;
export const selectActiveMenuPaginated = (state) => state.menus.activePaginated;
export const selectAvailableMenuList = (state) => state.menus.availableList;

export const selectMenusByCategory = (state, categoryId) => state.menus.byCategory[categoryId] || { content: [], loading: false, error: null };
export const selectActiveMenusByCategoryPaginated = (state, categoryId) => state.menus.byCategoryActivePaginated[categoryId] || { content: [], totalPages: 0, totalElements: 0, page: 0, size: 10, loading: false, error: null };
export const selectAvailableMenusByCategory = (state, categoryId) => state.menus.byCategoryAvailable[categoryId] || { content: [], loading: false, error: null };

export const selectMenuSearch = (state) => state.menus.search;
export const selectMenuPriceRange = (state) => state.menus.priceRange;
export const selectCurrentMenu = (state) => state.menus.current;

export const selectMenuCreating = (state) => state.menus.creating;
export const selectMenuCreateSuccess = (state) => state.menus.createSuccess;
export const selectMenuCreateError = (state) => state.menus.createError;

export const selectMenuUpdating = (state) => state.menus.updating;
export const selectMenuUpdateSuccess = (state) => state.menus.updateSuccess;
export const selectMenuUpdateError = (state) => state.menus.updateError;

export const selectMenuDeleting = (state) => state.menus.deleting;

export const selectMenuImageUploading = (state) => state.menus.imageUploading;
export const selectMenuImageUrl = (state) => state.menus.imageUrl;
export const selectMenuImageError = (state) => state.menus.imageError;

export default menuSlice.reducer;


