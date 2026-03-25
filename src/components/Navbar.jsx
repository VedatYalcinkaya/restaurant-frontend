import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShield } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../store/slices/authSlice";

const ADMIN_ROLES = ["ADMIN", "EDITOR"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const canAccessAdmin = useMemo(() => {
    return Boolean(isAuthenticated && user?.role && ADMIN_ROLES.includes(user.role));
  }, [isAuthenticated, user]);

  const navigation = [
    { name: "Anasayfa", href: "/" },
    { name: "Menü", href: "/menu" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Rezervasyon", href: "/reservation" },
    { name: "Kariyer", href: "/careers" },
    { name: "İletişim", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
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
      <nav
        className={`fixed top-0 left-0 right-0 z-20 w-full transition-all duration-300 ease-in-out ${
          scrolled ? "bg-brand-red shadow-lg" : "bg-brand-red/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                <div className="text-2xl md:text-3xl font-bold text-white">
                  Ala Söğüş
                </div>
                <div className="hidden md:block text-sm text-canvas font-light tracking-widest">
                  Antalya
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors duration-300 hover:text-canvas ${
                    location.pathname === item.href
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-canvas"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {canAccessAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 border border-white/40 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  <FiShield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <Link
                to="/reservation"
                className="bg-white hover:bg-canvas text-brand-red px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              >
                Rezervasyon Yap
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-canvas transition-colors duration-300"
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
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

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-brand-red shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-lg font-medium transition-colors duration-300 hover:text-white ${
                    location.pathname === item.href ? "text-white" : "text-canvas"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}

              {canAccessAdmin && (
                <div className="pt-4 border-t border-white/20">
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 w-full text-center border border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <FiShield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-white/20">
                <Link
                  to="/reservation"
                  className="block w-full text-center bg-white hover:bg-canvas text-brand-red px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  Hemen Rezervasyon Yap
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
