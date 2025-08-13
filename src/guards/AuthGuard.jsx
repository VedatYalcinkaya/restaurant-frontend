import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../store/slices/authSlice';

// Sadece giriş yapmış kullanıcıların erişebileceği route'ları koruyan bileşen
const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Eğer kullanıcı state'de yok ama token varsa kullanıcı bilgisini getir
    if (!user && localStorage.getItem('accessToken')) {
      dispatch(getCurrentUser());
    }
  }, [user, dispatch]);
  
  // Eğer kullanıcı kimliği doğrulanmamışsa login sayfasına yönlendir
  if (!isAuthenticated && !localStorage.getItem('accessToken')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default AuthGuard; 