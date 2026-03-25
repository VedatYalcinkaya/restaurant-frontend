import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ReservationPage from "./pages/ReservationPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import CareerPage from "./pages/CareerPage";
import JobDetailPage from "./pages/JobDetailPage";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-canvas to-blush z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(162, 44, 41, 0.1) 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        ></div>

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blush/20 to-brand-red/10 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-canvas/40 to-blush/20 opacity-60"></div>
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex-grow pt-20">
        <div className="w-full">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="reservation" element={<ReservationPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="careers" element={<CareerPage />} />
            <Route path="careers/:id" element={<JobDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
