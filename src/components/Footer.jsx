import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-20">
      {/* Ana Footer İçeriği */}
      <div className="bg-koyu-yesil text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Restaurant Bilgileri */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">ESSZIMMER</h2>
                <p className="text-acik-krem text-lg font-light tracking-wide">KÖLN</p>
              </div>
              <p className="text-acik-krem/90 mb-6 leading-relaxed">
                Weniger Alltag, mehr Außergewöhnliches im Esszimmer Köln. 
                Erleben Sie kulinarische Höhepunkte in gemütlicher Atmosphäre.
              </p>
              
              {/* Sosyal Medya */}
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white text-white hover:text-koyu-kirmizi p-3 rounded-full transition-all duration-300"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white text-white hover:text-koyu-kirmizi p-3 rounded-full transition-all duration-300"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Schnelle Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Schnelle Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Startseite", href: "/" },
                  { name: "Menü", href: "/menu" },
                  { name: "Über uns", href: "/about" },
                  { name: "Reservierung", href: "/reservation" },
                  { name: "Karriere", href: "/careers" },
                  { name: "Kontakt", href: "/contact" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-acik-krem/90 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt Bilgileri */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div className="text-acik-krem/90">
                    <p>Musterstraße 123</p>
                    <p>50667 Köln</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-white flex-shrink-0" />
                  <a
                    href="tel:+492211234567"
                    className="text-acik-krem/90 hover:text-white transition-colors duration-300"
                  >
                    +49 221 123 456
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-white flex-shrink-0" />
                  <a
                    href="mailto:info@esszimmer-koeln.de"
                    className="text-acik-krem/90 hover:text-white transition-colors duration-300"
                  >
                    info@esszimmer-koeln.de
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaClock className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div className="text-acik-krem/90">
                    <p className="font-medium">Öffnungszeiten</p>
                    <p className="text-sm">Mo-Do: 17:30-22:00</p>
                    <p className="text-sm">Fr-Sa: 17:30-23:00</p>
                    <p className="text-sm">So: 12:00-21:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt kısım - Copyright */}
      <div className="bg-koyu-yesil py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-acik-krem/80">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Esszimmer Köln. Alle Rechte vorbehalten.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/impressum"
                className="hover:text-white transition-colors duration-300"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="hover:text-white transition-colors duration-300"
              >
                Datenschutz
              </Link>
              <Link
                to="/agb"
                className="hover:text-white transition-colors duration-300"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;