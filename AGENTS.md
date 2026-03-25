# AGENTS.md

## Kanonik Özet

Bu repo, `Ala Söğüş` için geliştirilen `Vite + React` tabanlı bir frontend uygulamasıdır. Tek kod tabanında iki ana yüz bulunur:

- Public restoran sitesi
- Giriş ve rol kontrolü ile korunan admin paneli

Ana teknik yapı:

- UI: `React 19`
- Build: `Vite`
- State: `Redux Toolkit`
- Routing: `react-router-dom`
- API: `axios`
- Stil: `Tailwind CSS v4`

## Dokümantasyon Rolleri

- `README.md`: public repo için kısa proje özeti, kurulum ve temel çalışma bilgileri
- `AGENTS.md`: yeni sohbette hızlı yön bulmak için mimari ve dosya haritası

## Önce Buraya Bak

Yeni bir görevde ilk açılacak dosyalar:

- `src/main.jsx`: bootstrap, `Provider`, `BrowserRouter`
- `src/App.jsx`: üst seviye route kompozisyonu
- `src/Dashboard.jsx`: public site shell
- `src/admin/AdminPage.jsx`: admin shell
- `src/store/index.js`: aktif slice kayıtları
- `src/services/api.js`: API tabanı ve token/refresh akışı

## Route Haritası

### Public

Public route ağacı `src/Dashboard.jsx` içinde:

- `/` -> `src/pages/HomePage.jsx`
- `/menu` -> `src/pages/MenuPage.jsx`
- `/about` -> `src/pages/AboutPage.jsx`
- `/reservation` -> `src/pages/ReservationPage.jsx`
- `/contact` -> `src/pages/ContactPage.jsx`
- `/careers` -> `src/pages/CareerPage.jsx`
- `/careers/:id` -> `src/pages/JobDetailPage.jsx`
- `*` -> `src/pages/NotFound.jsx`

### Admin ve Üst Seviye

Üst seviye route ağacı `src/App.jsx` içinde:

- `/*` -> `Dashboard + Footer`
- `/login` -> `src/login/LoginPage.jsx`
- `/admin` -> `RoleGuard` ile korunan alan
- `/admin` index -> `src/admin/AdminDashboard.jsx`
- `/admin/menus` -> `src/admin/menu/AdminMenuPage.jsx`
- `/admin/menus/new` -> `src/admin/menu/AdminMenuForm.jsx`
- `/admin/menus/edit/:id` -> `src/admin/menu/AdminMenuForm.jsx`
- `/admin/categories` -> `src/admin/category/AdminCategoryPage.jsx`
- `/admin/categories/new` -> `src/admin/category/AdminCategoryForm.jsx`
- `/admin/categories/edit/:id` -> `src/admin/category/AdminCategoryForm.jsx`
- `/admin/reservations` -> `src/admin/reservation/AdminReservationPage.jsx`
- `/admin/jobs` -> `src/admin/career/AdminJobsPage.jsx`
- `/admin/jobs/new` -> `src/admin/career/AdminJobForm.jsx`
- `/admin/jobs/edit/:id` -> `src/admin/career/AdminJobForm.jsx`
- `/admin/applications` -> `src/admin/career/AdminJobApplicationsPage.jsx`
- `/admin/contact-messages` -> `src/admin/contact/AdminContactMessagesPage.jsx`

## Klasör Sahipliği

- `src/pages`: public ekranlar
- `src/components`: ortak/public bileşenler
- `src/components/ui`: düşük seviye UI parçaları
- `src/admin`: admin ekranları
- `src/login`: giriş ekranı
- `src/store/slices`: domain bazlı thunk/reducer/selector mantığı
- `src/services`: API istemcisi
- `src/guards`: route korumaları
- `src/assets`: görseller ve statik varlıklar
- `src/data`: sabit veri dosyaları
- `src/utils`: yardımcı fonksiyonlar
- `src/hooks`: custom hook’lar
- `src/lib`: küçük yardımcı util’ler

Kaynak olmayan klasörler:

- `dist/`: build çıktısı
- `node_modules/`: bağımlılıklar
- `public/`: doğrudan servis edilen statik dosyalar

## State ve API Haritası

Aktif slice kayıtları `src/store/index.js` içindedir.

- `authSlice` -> `/auth/*`
  Giriş, çıkış, oturum kontrolü, kullanıcı ve rol bilgisi
  Kullanım: `src/App.jsx`, `src/login/LoginPage.jsx`, `src/admin/AdminPage.jsx`, `src/guards/RoleGuard.jsx`, `src/components/Navbar.jsx`
- `menuSlice` -> `/menus`
  Public menü listeleme + admin menü yönetimi
  Kullanım: `src/pages/MenuPage.jsx`, `src/admin/menu/*`, `src/admin/AdminDashboard.jsx`
- `menuCategorySlice` -> `/menu-categories`
  Public kategori listeleme + admin kategori yönetimi
  Kullanım: `src/pages/MenuPage.jsx`, `src/admin/category/*`, `src/admin/AdminDashboard.jsx`
- `reservationSlice` -> `/reservations`
  Public rezervasyon oluşturma + admin rezervasyon yönetimi
  Kullanım: `src/pages/ReservationPage.jsx`, `src/admin/reservation/AdminReservationPage.jsx`, `src/admin/AdminDashboard.jsx`
- `jobSlice` -> `/jobs`
  Public kariyer listesi/detayı + admin ilan yönetimi
  Kullanım: `src/pages/CareerPage.jsx`, `src/pages/JobDetailPage.jsx`, `src/admin/career/AdminJobsPage.jsx`, `src/admin/career/AdminJobForm.jsx`
- `jobApplicationSlice` -> `/job-applications`
  Başvuru oluşturma + admin başvuru yönetimi
  Kullanım: `src/pages/JobDetailPage.jsx`, `src/admin/career/AdminJobApplicationsPage.jsx`
- `contactSlice` -> `/contact-messages`
  İletişim formu + admin mesaj yönetimi
  Kullanım: `src/components/Contact.jsx`, `src/admin/contact/AdminContactMessagesPage.jsx`

## Auth ve Oturum Akışı

- Tokenlar `localStorage` içinde `accessToken` ve `refreshToken` olarak tutulur.
- `src/App.jsx` açılışta `checkAuthStatus()` dispatch eder.
- `src/services/api.js` isteklerde `Authorization: Bearer <token>` ekler.
- 401 durumunda refresh akışı çalışır.
- Refresh başarısız olursa local storage temizlenir ve kullanıcı `/login` sayfasına yönlendirilir.
- Admin alanı `src/guards/RoleGuard.jsx` ile korunur.
- İzin verilen roller: `ADMIN`, `EDITOR`
- Başarılı login sonrası varsayılan yön: `/admin`

Son davranış notları:

- `src/components/Navbar.jsx` içinde yetkili kullanıcı için `Admin Panel` butonu görünür.
- `src/admin/AdminPage.jsx` içinde `Siteyi Görüntüle` bağlantısı public alanı yeni sekmede açar.

## Tasarım ve Tema Notları

- Tema merkez dosyası: `src/index.css`
- Public tarafta İngilizce isimli tema tokenları kullanılır:
  `brand-red`, `brand-red-deep`, `brand-red-soft`, `canvas`, `paper`, `blush`, `shell`, `ink`, `smoke`, `accent`
- Admin paneli ayrı koyu görsel dil kullanır.
- Animasyon importları karışık yapıdadır:
  Bazı dosyalar `motion/react`, bazıları `framer-motion` kullanır.

## Temizlik Sonrası Notlar

Bu repoda eski projelerden kalmış bazı dosyalar kaldırıldı. Yeni bir sohbette bunları aramaya gerek yok:

- `src/components/AboutMe.jsx`
- `src/components/AnimatedPage.jsx`
- `src/components/ContactModal.jsx`
- `src/components/FlipWordsDemo.jsx`
- `src/components/Loader.jsx`
- `src/components/ui/background-boxes.jsx`
- `src/components/ui/timeline.jsx`
- `src/data/restaurantData.js`
- `src/guards/AuthGuard.jsx`
- `src/hooks/useScrollToTop.js`
- `src/utils/colorPalette.js`
- `src/utils/dateUtils.js`
- `src/App.css`

Benzer bir temizlik tekrar yapılacaksa önce `rg` ile gerçek import ve route kullanımını doğrula.

## Hızlı Arama Rehberi

1. Sorunun route, state veya API tarafında mı olduğunu belirle.
2. Route ise `src/App.jsx` veya `src/Dashboard.jsx` üzerinden ilgili sayfayı bul.
3. Veri/form sorunuysa ilgili `src/store/slices/*Slice.js` dosyasına git.
4. Auth veya istek sorunuysa `src/services/api.js` ve `authSlice` tarafına bak.
5. Admin işi ise `src/admin/*`, public işi ise `src/pages/*` ve `src/components/*` altında ilerle.
