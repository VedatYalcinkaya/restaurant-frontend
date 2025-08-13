// Basit restoran veri yapısı - Backend'den yemekler çekilecek
export const restaurantInfo = {
  name: "Esszimmer Köln",
  description: "Weniger Alltag, mehr Außergewöhnliches - im Esszimmer Köln.",
  location: "Köln, Deutschland",
  phone: "+49 221 123 456",
  email: "info@esszimmer-koeln.de",
  address: "Musterstraße 123, 50667 Köln"
};

// Sayfa navigasyonu
export const navigation = [
  { name: "Startseite", href: "/" },
  { name: "Menü", href: "/menu" },
  { name: "Über uns", href: "/about" },
  { name: "Reservierung", href: "/reservation" },
  { name: "Kontakt", href: "/contact" }
];

// Özellikler (Features)
export const features = [
  "Frühstück & Fine Dining",
  "Moderne Küche",
  "Frisch & saisonal", 
  "Lust auf Fine Dining",
  "Aufmerksame Bedienung",
  "Catering für Anlässe",
  "Lust auf Fine Dining",
  "Geschichte"
];

export default { restaurantInfo, navigation, features };
