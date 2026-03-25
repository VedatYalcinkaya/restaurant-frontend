# Ala Söğüş Restaurant Frontend

Bu repo, `Ala Söğüş` için geliştirilen `Vite + React` tabanlı frontend uygulamasını içerir. Aynı kod tabanında hem public restoran sitesi hem de rol bazlı erişimle korunan admin paneli bulunur.

## Kapsam

- Ziyaretçi arayüzü ve ana sayfa akışı
- Menü, hakkımızda, rezervasyon, iletişim ve kariyer sayfaları
- Menü ve kategori yönetimi (admin)
- Rezervasyon yönetimi (admin)
- Kariyer ilanları ve başvurular (admin)
- İletişim mesajları yönetimi (admin)
- Rol bazlı yetkilendirme ve oturum yönetimi

## Teknolojiler

- React 19
- Vite 6
- Redux Toolkit
- React Router
- Tailwind CSS v4
- Axios
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

Uygulama varsayılan olarak `http://localhost:8082/api/v1` API adresini kullanır. Farklı bir backend adresi için `.env` dosyasında aşağıdaki değişkeni tanımlayabilirsiniz:

```env
VITE_API_URL=http://localhost:8082/api/v1
```

## Scriptler

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Proje Yapısı

- `src/pages`: ziyaretçi tarafı sayfaları
- `src/components`: ortak ve public bileşenler
- `src/admin`: yönetim paneli ekranları
- `src/services`: API istemcisi
- `src/store`: Redux store ve slice yapısı
- `src/guards`: auth ve rol korumaları

## Uygulama Akışı

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

Repo içinde daha detaylı kod navigasyonu ve mimari referans için `AGENTS.md` dosyası bulunur. README dışarıya dönük hızlı özet içindir; `AGENTS.md` ise geliştirme sırasında hızlı yön bulma dokümanıdır.
