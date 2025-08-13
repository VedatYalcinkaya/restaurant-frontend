import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Asenkron işlemler
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      // Token ve kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      
      // Kullanıcı bilgisini normalize et ve kaydet
      const userData = response.data.data;
      let role = userData.role;
      if (role && role.startsWith('ROLE_')) {
        role = role.substring(5);
      }
      
      const user = {
        id: userData.userId,
        username: userData.username,
        email: userData.email,
        role: role
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        user,
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.'
      );
    }
  }
);

// Oturum durumunu kontrol et
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return rejectWithValue('Token bulunamadı');
      }
      
      // Token varsa kullanıcı bilgilerini getir
      return dispatch(getCurrentUser()).unwrap();
    } catch (error) {
      // Hata durumunda çıkış yap
      dispatch(logout());
      return rejectWithValue('Oturum süresi dolmuş');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', {
        fullName,
        email,
        password
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kayıt yapılamadı. Lütfen tekrar deneyin.'
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken });
    }
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return null;
  } catch (error) {
    // Hata olsa bile tokenleri temizle
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return rejectWithValue(
      error.response?.data?.message || 'Çıkış yapılırken bir hata oluştu'
    );
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return rejectWithValue('Token bulunamadı');
      }

      const response = await api.get('/auth/validate');
      
      // Role değerini normalize et
      const userData = response.data.data;
      if (userData.role && userData.role.startsWith('ROLE_')) {
        userData.role = userData.role.substring(5);
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Oturum kontrolü başarısız'
      );
    }
  }
);

// Başlangıç durumu
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const { clearError, clearSuccess } = authSlice.actions;

// Selector'lar
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer; 