import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: "Startseite", href: "/" },
    { name: "Menü", href: "/menu" },
    { name: "Über uns", href: "/about" },
    { name: "Reservierung", href: "/reservation" },
    { name: "Karriere", href: "/careers" },
    { name: "Kontakt", href: "/contact" }
  ];

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Body'nin scroll edilebilirliğini mobil menü açıkken kısıtla
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [scrolled, mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      <nav className={`fixed top-0 left-0 right-0 z-20 w-full transition-all duration-300 ease-in-out ${
        scrolled ? "bg-koyu-kirmizi shadow-lg" : "bg-koyu-kirmizi/95 backdrop-blur-sm"
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                 <div className="text-2xl md:text-3xl font-bold text-white">
                   ESSZIMMER
                 </div>
                <div className="hidden md:block text-sm text-acik-krem font-light tracking-widest">
                  KÖLN
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors duration-300 hover:text-acik-krem ${
                    location.pathname === item.href
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-acik-krem"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Reservierung Button (Desktop) */}
            <div className="hidden md:block">
              <Link
                to="/reservation"
                className="bg-white hover:bg-acik-krem text-koyu-kirmizi px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              >
                Reservieren
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-acik-krem transition-colors duration-300"
              >
                {mobileMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-koyu-kirmizi shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-lg font-medium transition-colors duration-300 hover:text-white ${
                    location.pathname === item.href
                      ? "text-white"
                      : "text-acik-krem"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Reservierung Button */}
              <div className="pt-4 border-t border-white/20">
                <Link
                  to="/reservation"
                  className="block w-full text-center bg-white hover:bg-acik-krem text-koyu-kirmizi px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  Jetzt reservieren
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;