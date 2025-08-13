import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../store/slices/authSlice';

// Belirli rollere sahip kullanıcıların erişebileceği route'ları koruyan bileşen
const RoleGuard = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Eğer user null ama token varsa kullanıcı bilgisini almaya çalış
  useEffect(() => {
    if (!user && localStorage.getItem('accessToken')) {
      dispatch(getCurrentUser());
    }
  }, [user, dispatch]);
  
  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!isAuthenticated && !localStorage.getItem('accessToken')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Kullanıcı bilgisi henüz yüklenmediyse bekle
  if (!user && localStorage.getItem('accessToken')) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>;
  }
  
  // Eğer kullanıcı var ama gerekli rollere sahip değilse ana sayfaya yönlendir
  if (user) {
    const hasPermission = allowedRoles.includes(user.role);
    
    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

export default RoleGuard; 