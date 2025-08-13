import axios from 'axios';

// API temel URL'ini ayarla - ortam değişkeninden alarak
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api/v1';

// Token işlemleri için yardımcı fonksiyonlar
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token yenileme için değişkenler
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// İstek gönderilmeden önce token kontrolü
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // FormData işlemleri için Content-Type header'ını değiştirme
    if (config.data instanceof FormData) {
      // Axios'un otomatik multipart/form-data sınır eklemesi için Content-Type'ı kaldır
      delete config.headers['Content-Type']; 
      console.log('FormData isteği için Content-Type kaldırıldı');
      
      // Debug amaçlı
      if (process.env.NODE_ENV !== 'production') {
        console.log('İstek Headers:', config.headers);
        
        // FormData içeriğini debugger için logla
        try {
          const formDataEntries = Array.from(config.data.entries());
          const formDataContent = {};
          
          formDataEntries.forEach(([key, value]) => {
            if (value instanceof File) {
              formDataContent[key] = `File: ${value.name} (${value.size} bytes)`;
            } else {
              formDataContent[key] = value;
            }
          });
          
          console.log('FormData içeriği:', formDataContent);
        } catch (e) {
          console.log('FormData içeriği log edilemedi:', e);
        }
      }
    } else {
      // JSON istekleri için Content-Type'ı explicit olarak ayarla
      config.headers['Content-Type'] = 'application/json';
      
      // Debug amaçlı
      if (process.env.NODE_ENV !== 'production' && config.data) {
        console.log('JSON isteği gönderiliyor:', config.url);
        console.log('İstek Headers:', config.headers);
        console.log('İstek verisi:', config.data);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cevap alındığında hata kontrolü
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 401 hatası (Unauthorized) ve token yenileme girişimi yapılmamışsa
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('Refresh token bulunamadı');
        }
        
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Token yenileme başarısız');
        }
        
        const data = response.data.data;
        const accessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        
        setTokens(accessToken, newRefreshToken);
        
        // Tüm API isteklerine otomatik olarak token ekle
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeTokens();
        
        // Oturum sonlandığında login sayfasına yönlendir
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // 401 dışındaki hatalar veya token yenileme başarısız olursa
    return Promise.reject(error);
  }
);

export default api; 