import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-20">
      <div className="bg-ink text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Ala Söğüş</h2>
                <p className="text-canvas text-lg font-light tracking-wide">Antalya</p>
              </div>
              <p className="text-canvas/90 mb-6 leading-relaxed">
                Günlük hazırlanan malzemeler, dengeli baharatlar ve samimi servis ile
                Antalya&apos;da özlenen söğüş lezzetini sofranıza taşıyoruz.
              </p>

              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white text-white hover:text-brand-red p-3 rounded-full transition-all duration-300"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white text-white hover:text-brand-red p-3 rounded-full transition-all duration-300"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Hızlı Linkler</h3>
              <ul className="space-y-3">
                {[
                  { name: "Anasayfa", href: "/" },
                  { name: "Menü", href: "/menu" },
                  { name: "Hakkımızda", href: "/about" },
                  { name: "Rezervasyon", href: "/reservation" },
                  { name: "Kariyer", href: "/careers" },
                  { name: "İletişim", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-canvas/90 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">İletişim</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div className="text-canvas/90">
                    <p>Altındağ, Anafartalar Cd. No:73 D:1</p>
                    <p>07050 Muratpaşa/Antalya</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-white flex-shrink-0" />
                  <a
                    href="tel:+905369151144"
                    className="text-canvas/90 hover:text-white transition-colors duration-300"
                  >
                    +90 (536) 915 11 44
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-white flex-shrink-0" />
                  <a
                    href="mailto:iletisim@alasogus.com"
                    className="text-canvas/90 hover:text-white transition-colors duration-300"
                  >
                    iletisim@alasogus.com
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <FaClock className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div className="text-canvas/90">
                    <p className="font-medium">Çalışma Saatleri</p>
                    <p className="text-sm">Pazartesi - Cuma: 11:00 - 23:00</p>
                    <p className="text-sm">Cumartesi: 11:00 - 23:30</p>
                    <p className="text-sm">Pazar: 12:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ink py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-canvas/80">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Ala Söğüş. Tüm hakları saklıdır.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/reservation"
                className="hover:text-white transition-colors duration-300"
              >
                Rezervasyon
              </Link>
              <Link
                to="/careers"
                className="hover:text-white transition-colors duration-300"
              >
                Kariyer
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-300"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
