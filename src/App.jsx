import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { Toaster } from 'react-hot-toast';

// Layouts ve koruma bileşenleri
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';

// Ana sayfa ve genel bileşenler
import Dashboard from './Dashboard';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

// Admin bileşenleri
import AdminPage from './admin/AdminPage';
import AdminDashboard from './admin/AdminDashboard';
import AdminMenuPage from './admin/menu/AdminMenuPage';
import AdminMenuForm from './admin/menu/AdminMenuForm';
import AdminCategoryPage from './admin/category/AdminCategoryPage';
import AdminCategoryForm from './admin/category/AdminCategoryForm';
import AdminReservationPage from './admin/reservation/AdminReservationPage';
import CareerPage from './pages/CareerPage';
import JobDetailPage from './pages/JobDetailPage';
import AdminJobApplicationsPage from './admin/career/AdminJobApplicationsPage';
import AdminJobsPage from './admin/career/AdminJobsPage';
import AdminJobForm from './admin/career/AdminJobForm';

// Kimlik doğrulama sayfaları
import LoginPage from './login/LoginPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Token kontrolü yaparak oturum durumunu kontrol et
    dispatch(checkAuthStatus());
    
    // Sayfa title'ını ayarla
    document.title = "Esszimmer Köln - Restaurant";
  }, [dispatch]);

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2D3748',
            color: '#fff',
          },
        }}
      />
      
      <Routes>
        {/* Ana Sayfa ve Genel Rotalar */}
        <Route path="/*" element={
          <>
            <Dashboard />
            <Footer />
          </>
        } />
        {/* Public Kariyer */}
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/careers/:id" element={<JobDetailPage />} />
        
        {/* Kimlik Doğrulama Rotaları */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Paneli Rotaları */}
        <Route path="/admin" element={
          <RoleGuard allowedRoles={['ADMIN', 'EDITOR']}>
            <AdminPage />
          </RoleGuard>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="menus" element={<AdminMenuPage />} />
          <Route path="menus/new" element={<AdminMenuForm />} />
          <Route path="menus/edit/:id" element={<AdminMenuForm />} />
          <Route path="categories" element={<AdminCategoryPage />} />
          <Route path="categories/new" element={<AdminCategoryForm />} />
          <Route path="categories/edit/:id" element={<AdminCategoryForm />} />
          <Route path="reservations" element={<AdminReservationPage />} />
          <Route path="applications" element={<AdminJobApplicationsPage />} />
          <Route path="jobs" element={<AdminJobsPage />} />
          <Route path="jobs/new" element={<AdminJobForm />} />
          <Route path="jobs/edit/:id" element={<AdminJobForm />} />
        </Route>
        
        {/* 404 Sayfası */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
