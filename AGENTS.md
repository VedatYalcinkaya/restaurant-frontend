# AGENTS.md

## Kanonik Özet

Bu repo, `Ala Söğüş` için geliştirilmiş tek paketli bir `Vite + React` frontend uygulamasıdır. Aynı kod tabanında hem public restoran sitesi hem de giriş korumalı admin paneli bulunur.

- Public taraf: ana sayfa, menü, hakkımızda, rezervasyon, iletişim, kariyer ve ilan detayları
- Admin taraf: menü, kategori, rezervasyon, iş ilanı, başvuru ve iletişim mesajı yönetimi
- State yönetimi: `Redux Toolkit`
- Routing: `react-router-dom`
- API katmanı: token yenilemeli `axios` istemcisi
- Stil altyapısı: `Tailwind CSS v4` + proje içi tema değişkenleri

Not: Kök dizindeki mevcut `README.md` eski bir hukuk bürosu projesini tarif ediyor; bu repo gerçekte restoran + admin paneli frontend’idir.

## Önce Buraya Bak

Yeni bir sohbette kodu hızlı bulmak için önce şu dosyalara bak:

- `src/main.jsx`: uygulama bootstrap, `Redux Provider`, `BrowserRouter`
- `src/App.jsx`: üst seviye route kompozisyonu, toaster, admin route koruması, açılışta `checkAuthStatus()`
- `src/Dashboard.jsx`: public site shell, navbar + footer + public route ağacı
- `src/admin/AdminPage.jsx`: admin shell, sidebar, logout akışı, adminden public siteye geçiş linki, `<Outlet />`
- `src/store/index.js`: aktif slice kayıtları
- `src/services/api.js`: `VITE_API_URL`, `Authorization` header, refresh token akışı

## Route Haritası

### Public

Public route ağacı `src/Dashboard.jsx` içinde tanımlı:

- `/` -> `src/pages/HomePage.jsx`
- `/menu` -> `src/pages/MenuPage.jsx`
- `/about` -> `src/pages/AboutPage.jsx`
- `/reservation` -> `src/pages/ReservationPage.jsx`
- `/contact` -> `src/pages/ContactPage.jsx`
- `/careers` -> `src/pages/CareerPage.jsx`
- `/careers/:id` -> `src/pages/JobDetailPage.jsx`
- `*` -> `src/pages/NotFound.jsx`

### Üst Seviye ve Admin

Üst seviye route ağacı `src/App.jsx` içinde:

- `/*` -> public shell olarak `Dashboard + Footer`
- `/login` -> `src/login/LoginPage.jsx`
- `/admin` -> `RoleGuard` ile korunan admin alanı
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

Kaynak kodun ana merkezi `src/` klasörüdür. Yeni işlerde genelde aşağıdaki eşleşme yeterlidir:

- `src/pages`: public route ekranları
- `src/components`: tekrar kullanılan public bileşenler ve ortak UI parçaları
- `src/components/ui`: daha düşük seviye UI blokları, özellikle sidebar ve özel animasyon yardımcıları
- `src/admin`: admin paneli ekranları ve domain bazlı admin sayfaları
- `src/login`: giriş ekranı
- `src/store/slices`: domain bazlı async thunk, reducer, selector mantığı
- `src/services`: API istemcisi
- `src/guards`: auth ve rol tabanlı route koruma bileşenleri
- `src/assets`: statik görseller/logolar
- `src/data`: sabit veri dosyaları
- `src/utils`: yardımcı fonksiyonlar
- `src/hooks`: custom hook’lar
- `src/lib`: küçük yardımcı util’ler

Genelde kaynak olmayan klasörler:

- `dist/`: build çıktısı
- `node_modules/`: bağımlılıklar
- `public/`: doğrudan servis edilen statik dosyalar

## State ve API Haritası

Aktif slice kayıtları `src/store/index.js` içinde. Domain sahipliği şu şekilde:

- `authSlice` -> `/auth/*`
  Giriş, çıkış, oturum kontrolü, kullanıcı doğrulama ve rol bilgisi.
  Başlıca kullanım: `src/App.jsx`, `src/login/LoginPage.jsx`, `src/admin/AdminPage.jsx`, `src/guards/RoleGuard.jsx`, `src/components/Navbar.jsx`
- `menuSlice` -> `/menus`
  Public menü listeleme ve admin menü CRUD/aktiflik/görsel yükleme.
  Başlıca kullanım: `src/pages/MenuPage.jsx`, `src/admin/menu/*`, `src/admin/AdminDashboard.jsx`
- `menuCategorySlice` -> `/menu-categories`
  Public kategori listeleme ve admin kategori CRUD/aktiflik yönetimi.
  Başlıca kullanım: `src/pages/MenuPage.jsx`, `src/admin/category/*`, `src/admin/AdminDashboard.jsx`
- `reservationSlice` -> `/reservations`
  Public rezervasyon oluşturma ve admin rezervasyon listeleme/durum yönetimi.
  Başlıca kullanım: `src/pages/ReservationPage.jsx`, `src/admin/reservation/AdminReservationPage.jsx`, `src/admin/AdminDashboard.jsx`
- `jobSlice` -> `/jobs`
  Public kariyer ilanları ve admin iş ilanı yönetimi.
  Başlıca kullanım: `src/pages/CareerPage.jsx`, `src/pages/JobDetailPage.jsx`, `src/admin/career/AdminJobsPage.jsx`, `src/admin/career/AdminJobForm.jsx`
- `jobApplicationSlice` -> `/job-applications`
  Kariyer başvurusu, CV yükleme, admin başvuru listeleme ve durum güncelleme.
  Başlıca kullanım: `src/pages/JobDetailPage.jsx`, `src/admin/career/AdminJobApplicationsPage.jsx`
- `contactSlice` -> `/contact-messages`
  İletişim formu gönderimi, admin mesaj listeleme/okundu/yanıt/durum işlemleri.
  Başlıca kullanım: `src/components/Contact.jsx`, `src/admin/contact/AdminContactMessagesPage.jsx`

## Auth ve Oturum Akışı

- Tokenlar `localStorage` içinde `accessToken` ve `refreshToken` olarak tutulur.
- `src/App.jsx` açılışta `checkAuthStatus()` dispatch eder.
- `src/services/api.js` tüm isteklerde varsa `Authorization: Bearer <token>` header’ını ekler.
- 401 alınırsa `api.js` refresh token ile `/auth/refresh` çağrısı yapmayı dener.
- Refresh başarısızsa local storage temizlenir ve kullanıcı `/login` sayfasına yönlendirilir.
- Admin alanı `src/guards/RoleGuard.jsx` ile korunur.
- İzin verilen roller şu an `ADMIN` ve `EDITOR`.
- `src/login/LoginPage.jsx` başarılı login sonrası varsayılan olarak `/admin` alanına döner.
- Public navbar’da oturumu açık ve yetkili (`ADMIN` / `EDITOR`) kullanıcı için `Admin Panel` butonu görünür.
- Admin panelindeki `Siteyi Görüntüle` bağlantısı public alanı aynı sekmede bozmak yerine yeni sekmede açar.

## Tasarım ve Tema Notları

- Tema renklerinin ana kaynağı `src/index.css`.
- Public tarafta kırmızı, kırık beyaz ve sıcak nötr tonlardan oluşan İngilizce isimli tema tokenları kullanılıyor:
  `brand-red`, `brand-red-deep`, `brand-red-soft`, `canvas`, `paper`, `blush`, `shell`, `ink`, `smoke`, `accent`
- Admin paneli ayrı bir koyu tema diline sahip.
- Animasyon importları kod tabanında karışık:
  Bazı dosyalar `motion/react`, bazıları `framer-motion` kullanıyor.
  Yeni iş yaparken önce ilgili dosyanın mevcut stilini takip et; standardizasyon ayrı bir refactor konusu olabilir.

## Dikkat Edilmesi Gerekenler

### Eski Kod Kalıntıları

Önceki cleanup turlarında aktif akışta görünmeyen eski proje kalıntılarının bir kısmı kaldırıldı. Benzer bir temizlik tekrar yapılacaksa önce `rg` ile gerçek import/route kullanımını doğrula; özellikle eski tema dili, yardımcı bileşenler ve kullanılmayan guard/hook parçaları bu repoda geçmişte birikmişti.

### Repo İçinde Dikkat Çeken Diğer Noktalar

- `README.md` güncel proje kimliğini yansıtmıyor.
- Kod tabanında eski iterasyonlardan kalmış tema/dil izleri vardı; yeni değişikliklerde önce ilgili akışın güncel merkezi bulunmalı.
- Public taraf için bir sorun araştırırken çoğu zaman başlangıç noktası `src/Dashboard.jsx` ve ilgili `src/pages/*` dosyalarıdır.
- Admin taraf için bir sorun araştırırken çoğu zaman başlangıç noktası `src/App.jsx`, `src/admin/AdminPage.jsx` ve ilgili slice dosyalarıdır.

## Hızlı Arama Rehberi

Yeni bir görev geldiğinde genelde şu sırayı izlemek yeterlidir:

1. Route mu, state mi, API mi sorunu olduğunu belirle.
2. Route ise `src/App.jsx` veya `src/Dashboard.jsx` üzerinden ilgili sayfayı bul.
3. Form/list data sorunuysa ilgili `src/store/slices/*Slice.js` dosyasını aç.
4. İstek/kimlik doğrulama sorunuysa `src/services/api.js` ve `authSlice` tarafına bak.
5. Admin UI ise `src/admin/*`, public UI ise `src/pages/*` ve `src/components/*` altında ilerle.
