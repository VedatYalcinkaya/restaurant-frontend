import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import AboutPage from './pages/AboutPage'
import ReservationPage from './pages/ReservationPage'
import ContactPage from './pages/ContactPage'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'

const Dashboard = () => {
  const location = useLocation();
  
  // Sayfa değiştiğinde en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Restoran temalı arkaplan */}
      <div className="fixed inset-0 bg-gradient-to-b from-acik-krem to-acik-bej z-0">
        {/* Koyu kırmızı nokta deseni */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(162, 44, 41, 0.1) 1px, transparent 1px)', 
          backgroundSize: '25px 25px' 
        }}></div>
        
        {/* Doğal renk vurguları */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-acik-bej/20 to-koyu-kirmizi/10 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-acik-krem/40 to-acik-bej/20 opacity-60"></div>
      </div>
      
      <Navbar />
      
      {/* Ana içerik alanı (büyüyebilir) */}
      <main className="relative z-10 w-full flex-grow pt-20">
        {/* İçerik konteyneri */}
        <div className="w-full">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="reservation" element={<ReservationPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default Dashboard