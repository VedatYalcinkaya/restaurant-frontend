# MiPueblo Köln – Restaurant Frontend

MiPueblo Köln restoranı için geliştirilen modern, yönetim panelli React arayüzü. Proje; ziyaretçi tarafında menüler, rezervasyon ve kariyer içeriklerini sunarken, yönetim panelinde menü/kategori yönetimi, rezervasyonlar, iş ilanları ve iletişim mesajlarını yönetmeye olanak tanır.

## Özellikler

- Ziyaretçi arayüzü ve ana sayfa akışı
- Menü ve kategori yönetimi (admin)
- Rezervasyon yönetimi (admin)
- Kariyer ilanları ve başvurular (admin)
- İletişim mesajları yönetimi (admin)
- Rol bazlı yetkilendirme ve oturum yönetimi

## Teknolojiler

- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

## Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Ortam Değişkenleri

Uygulama varsayılan olarak `http://localhost:8082/api/v1` API adresini kullanır. Farklı bir backend adresi için aşağıdaki değişkeni tanımlayın:

```bash
VITE_API_URL=https://example.com/api/v1
```

## Komutlar

```bash
# Geliştirme
npm run dev

# Prodüksiyon build
npm run build

# Lint
npm run lint

# Build önizleme
npm run preview
```

## Proje Yapısı (Özet)

- `src/pages`: Ziyaretçi sayfaları
- `src/admin`: Yönetim paneli ekranları
- `src/services`: API istemcisi ve servis katmanı
- `src/store`: Redux store ve slice'lar

## Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.
