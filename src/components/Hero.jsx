import React, { useState } from "react";
import { motion } from "motion/react";
import { FlipWords } from "./ui/flip-words";
import { FiCoffee, FiHeart, FiStar, FiUsers, FiClock, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  
  // FlipWords için restoran özellikleri
  const restaurantFlip = ["Frühstück", "Fine Dining", "Moderne Küche", "Frisch", "Saisonal", "Leidenschaft"];
  
  // Restaurant özellikleri
  const features = [
    { 
      baslik: "Frühstück & Fine Dining", 
      aciklama: "Von einem gemütlichen Frühstück bis zu exquisitem Fine Dining",
      icon: <FiCoffee className="w-10 h-10 mb-4 text-koyu-kirmizi" />,
      link: "/menu"
    },
    { 
      baslik: "Moderne Küche", 
      aciklama: "Innovative Kreationen mit traditionellen deutschen Einflüssen",
      icon: <FiStar className="w-10 h-10 mb-4 text-koyu-kirmizi" />,
      link: "/menu"
    },
    { 
      baslik: "Frisch & Saisonal", 
      aciklama: "Täglich frische Zutaten aus der Region, saisonal und nachhaltig",
      icon: <FiHeart className="w-10 h-10 mb-4 text-koyu-kirmizi" />,
      link: "/about"
    },
    { 
      baslik: "Aufmerksame Bedienung", 
      aciklama: "Unser erfahrenes Team sorgt für einen unvergesslichen Abend",
      icon: <FiUsers className="w-10 h-10 mb-4 text-koyu-kirmizi" />,
      link: "/about"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-acik-krem to-acik-bej py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana Hero Bölümü */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-koyu-yesil mb-6 leading-tight"
          >
            ESSZIMMER
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-4 font-light tracking-wide"
          >
            K Ö L N
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Weniger Alltag, mehr Außergewöhnliches im Esszimmer Köln.
            </p>
            
            <div className="flex flex-col items-center mt-8 mb-8">
              <div className="text-koyu-yesil font-semibold mb-3 text-xl">Erleben Sie:</div>
              <div className="text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-koyu-kirmizi to-daha-koyu-kirmizi font-bold text-3xl md:text-4xl">
                  <FlipWords words={restaurantFlip} duration={2000} />
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link
              to="/reservation"
              className="bg-koyu-kirmizi hover:bg-daha-koyu-kirmizi text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Tisch reservieren
            </Link>
            <Link
              to="/menu"
              className="border-2 border-koyu-kirmizi text-koyu-kirmizi hover:bg-koyu-kirmizi hover:text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300"
            >
              Speisekarte ansehen
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Link 
                to={feature.link}
                className="block bg-white/70 backdrop-blur-sm shadow-lg p-8 rounded-xl transition-all duration-300 flex flex-col items-center text-center border border-white/20 h-full relative group overflow-hidden hover:shadow-xl hover:bg-white/90"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-acik-krem/50 to-acik-bej/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-koyu-yesil mb-3">{feature.baslik}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.aciklama}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16 bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <FiMapPin className="w-6 h-6 text-koyu-kirmizi mr-3" />
              <div>
                <p className="font-medium text-koyu-yesil">Adresse</p>
                <p className="text-gray-600">Musterstraße 123, Köln</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FiClock className="w-6 h-6 text-koyu-kirmizi mr-3" />
              <div>
                <p className="font-medium text-koyu-yesil">Öffnungszeiten</p>
                <p className="text-gray-600">Mo-So 17:30-22:00</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-koyu-kirmizi mr-3" />
              <div>
                <p className="font-medium text-koyu-yesil">Reservierung</p>
                <p className="text-gray-600">+49 221 123 456</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Reservierung anfragen"
        description="Wie können wir Sie erreichen?"
      />
    </div>
  );
};

export default Hero;
