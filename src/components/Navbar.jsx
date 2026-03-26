import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShield } from "react-icons/fi";
import { useSelector } from "react-redux";
import { motion as Motion, AnimatePresence } from "motion/react";
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
          scrolled
            ? "bg-brand-red shadow-[0_4px_24px_rgba(169,16,22,0.35)]"
            : "bg-brand-red/97 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={closeMobileMenu}
              >
                <div className="flex flex-col leading-none">
                  <span className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:opacity-90 transition-opacity duration-200">
                    Ala Söğüş
                  </span>
                  <span className="hidden md:block text-[10px] text-white/60 font-medium tracking-[0.25em] uppercase mt-0.5">
                    Antalya
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-white bg-white/15"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <Motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              {canAccessAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <FiShield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <Link
                to="/reservation"
                className="bg-white hover:bg-canvas text-brand-red px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Rezervasyon Yap
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <Motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiX className="h-6 w-6" />
                    </Motion.span>
                  ) : (
                    <Motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiMenu className="h-6 w-6" />
                    </Motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <Motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-brand-red-deep border-t border-white/10"
            >
              <div className="px-4 py-5 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-white bg-white/15"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-white/15 space-y-2 mt-2">
                  {canAccessAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center justify-center gap-2 w-full border border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                      onClick={closeMobileMenu}
                    >
                      <FiShield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/reservation"
                    className="block w-full text-center bg-white hover:bg-canvas text-brand-red px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    Hemen Rezervasyon Yap
                  </Link>
                </div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
