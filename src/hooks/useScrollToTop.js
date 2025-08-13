import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Sayfa değiştiğinde sayfayı en üste kaydıran hook
 * @returns {null} Herhangi bir değer döndürmez
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default useScrollToTop; 