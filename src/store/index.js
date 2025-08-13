import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contactReducer from './slices/contactSlice';
import reservationReducer from './slices/reservationSlice';
import menuCategoryReducer from './slices/menuCategorySlice';
import menuReducer from './slices/menuSlice';
import jobReducer from './slices/jobSlice';
import jobApplicationReducer from './slices/jobApplicationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    reservations: reservationReducer,
    menuCategories: menuCategoryReducer,
    menus: menuReducer,
    jobs: jobReducer,
    jobApplications: jobApplicationReducer,
    // Diğer reducer'lar buraya eklenecek
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Serileştirme kontrolünü devre dışı bırakıyoruz
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export default store; 