# Ala Söğüş Restaurant Frontend

Bu repo, `Ala Söğüş` için geliştirilen `Vite + React` tabanlı frontend uygulamasını içerir. Aynı kod tabanında hem public restoran sitesi hem de rol bazlı erişimle korunan admin paneli bulunur.

## Kapsam

- Public site: ana sayfa, menü, hakkımızda, rezervasyon, iletişim, kariyer ve ilan detayları
- Admin paneli: menü, kategori, rezervasyon, iş ilanı, başvuru ve iletişim mesajı yönetimi
- Kimlik doğrulama: access token + refresh token akışı
- State yönetimi: `Redux Toolkit`
- Stil sistemi: `Tailwind CSS v4`

## Teknolojiler

- React 19
- Vite 6
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS v4
- Motion / Framer Motion
- React Hot Toast

## Geliştirme Ortamı

Projeyi lokal ortamda çalıştırmak için:

```bash
git clone <repo-url>
cd restarurant-frontend
npm install
npm run dev
```

Varsayılan geliştirme adresi:

```bash
http://localhost:5173
```

## Ortam Değişkenleri

API adresi `src/services/api.js` içinde `VITE_API_URL` üzerinden okunur. `.env` dosyası oluşturarak override edebilirsiniz.

```env
VITE_API_URL=http://localhost:8082/api/v1
```

Eğer bu değişken verilmezse uygulama varsayılan olarak şu adresi kullanır:

```env
http://localhost:8082/api/v1
```

## Scriptler

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Uygulama Yapısı

- Public shell: `src/Dashboard.jsx`
- Admin shell: `src/admin/AdminPage.jsx`
- Route kompozisyonu: `src/App.jsx`
- Store kurulumu: `src/store/index.js`
- API istemcisi: `src/services/api.js`

## Auth ve Admin Notları

- Admin alanı `RoleGuard` ile korunur.
- İzin verilen roller şu an `ADMIN` ve `EDITOR`.
- Yetkili kullanıcı public alandayken navbar üzerinde `Admin Panel` butonunu görür.
- Admin panelindeki `Siteyi Görüntüle` bağlantısı public siteyi yeni sekmede açar.

## Build Durumu

Projede `npm run build` komutu başarıyla çalışmaktadır. Vite tarafında büyük chunk uyarısı görülebilir; bu şu anda bilinen bir optimizasyon konusu, build hatası değildir.

## Not

Repo içinde daha detaylı kod navigasyonu ve mimari referansı için `AGENTS.md` dosyası bulunur. README dışarıya dönük hızlı özet içindir; `AGENTS.md` ise geliştirme sırasında hızlı yön bulma dokümanıdır.
