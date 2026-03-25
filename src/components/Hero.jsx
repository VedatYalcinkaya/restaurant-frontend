import React from "react";
import { motion as Motion } from "motion/react";
import { FlipWords } from "./ui/flip-words";
import {
  FiCoffee,
  FiHeart,
  FiStar,
  FiUsers,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Hero = () => {
  const restaurantFlip = [
    "İzmir usulü",
    "Günlük hazırlık",
    "Taptaze",
    "Bol lezzet",
    "Özel sos",
    "Usta dokunuşu",
  ];

  const features = [
    {
      baslik: "Usta Usulü Söğüş",
      aciklama:
        "Geleneksel söğüş lezzetini taze malzeme ve dengeli baharatlarla hazırlıyoruz.",
      icon: <FiCoffee className="w-10 h-10 text-brand-red" />,
    },
    {
      baslik: "Günlük Hazırlık",
      aciklama:
        "Malzemelerimiz her gün özenle hazırlanır, servis öncesi tazeliğini korur.",
      icon: <FiStar className="w-10 h-10 text-brand-red" />,
    },
    {
      baslik: "Taze ve Dengeli",
      aciklama:
        "Soğan, domates, baharat ve özel sos dengesini her porsiyonda aynı özenle kuruyoruz.",
      icon: <FiHeart className="w-10 h-10 text-brand-red" />,
    },
    {
      baslik: "Hızlı Servis",
      aciklama:
        "İster hızlı bir öğün ister uzun bir sohbet, servisimizi tempoya göre ayarlıyoruz.",
      icon: <FiUsers className="w-10 h-10 text-brand-red" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas to-blush py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-ink mb-6 leading-tight"
          >
            Ala Söğüş
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-4 font-light tracking-wide"
          >
            Antalya
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Antalya&apos;da gerçek söğüş keyfini taze malzeme, ustalık ve samimi
              servisle buluşturuyoruz.
            </p>

            <div className="flex flex-col items-center mt-8 mb-8">
              <div className="text-ink font-semibold mb-3 text-xl">
                Burada sizi bekleyenler:
              </div>
              <div className="text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-red-deep font-bold text-3xl md:text-4xl">
                  <FlipWords words={restaurantFlip} duration={2000} />
                </span>
              </div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link
              to="/reservation"
              className="bg-brand-red hover:bg-brand-red-deep text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Rezervasyon Yap
            </Link>
            <Link
              to="/menu"
              className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300"
            >
              Menüyü İncele
            </Link>
          </Motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="block bg-white/70 backdrop-blur-sm shadow-lg p-8 rounded-xl transition-all duration-300 flex flex-col items-center text-center border border-white/20 h-full relative group overflow-hidden hover:shadow-xl hover:bg-white/90">
                <div className="absolute inset-0 bg-gradient-to-br from-canvas/50 to-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-ink mb-3">
                    {feature.baslik}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.aciklama}
                  </p>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16 bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <FiMapPin className="w-6 h-6 text-brand-red mr-3" />
              <div>
                <p className="font-medium text-ink">Adres</p>
                <p className="text-gray-600">
                  Altındağ, Anafartalar Cd. No:73 D:1, Muratpaşa/Antalya
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FiClock className="w-6 h-6 text-brand-red mr-3" />
              <div>
                <p className="font-medium text-ink">Çalışma Saatleri</p>
                <p className="text-gray-600">Her gün 11:00 - 23:00</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-brand-red mr-3" />
              <div>
                <p className="font-medium text-ink">Rezervasyon</p>
                <p className="text-gray-600">+90 (536) 915 11 44</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Hero;
