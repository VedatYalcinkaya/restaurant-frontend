import React from 'react';
import { motion } from 'motion/react';
import Contact from '../components/Contact';
import { FaCalendarAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const ContactPage = () => {
  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cok-acik-mavi/30">
      {/* Sayfa Başlığı */}
      <motion.div 
        className="py-16 bg-gradient-to-r from-acik-mavi/20 to-turkuaz/20 backdrop-blur-sm rounded-b-2xl border-b border-acik-mavi/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-koyu-mavi text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            İletişime Geçin
          </motion.h1>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
          <motion.p 
            className="text-center text-lg text-gray-700 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Projeleriniz veya sorularınız için benimle iletişime geçebilirsiniz.
            Aşağıdaki kanallardan sizinle en kısa sürede iletişime geçeceğim.
          </motion.p>
        </div>
      </motion.div>
      
      {/* İletişim Bileşeni */}
      <div className="py-12">
        <Contact />
      </div>

      {/* Ek Bilgiler Bölümü */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mt-12 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-koyu-mavi mb-6">Diğer Bilgiler</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Randevu Talebi Kartı */}
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-koyu-mavi to-turkuaz p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-koyu-mavi mb-4">Randevu Talebi</h3>
            <p className="text-gray-600 mb-4">
              Görüşme talebiniz için telefonla arayabilir veya e-posta gönderebilirsiniz. Randevular en az 2 iş günü öncesinden planlanmalıdır.
            </p>
            <a 
              href="mailto:emreokur@antalya.av.tr" 
              className="inline-block text-turkuaz hover:text-koyu-mavi font-medium transition-colors duration-300"
            >
              emreokur@antalya.av.tr
            </a>
          </motion.div>

          {/* Çalışma Saatleri Kartı */}
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-koyu-mavi to-turkuaz p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaClock className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-koyu-mavi mb-4">Çalışma Saatleri</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span className="font-medium">Kapalı</span>
              </li>
            </ul>
          </motion.div>

          {/* Acil Durum Kartı */}
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-koyu-mavi to-turkuaz p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaExclamationTriangle className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-koyu-mavi mb-4">Acil Durumlar</h3>
            <p className="text-gray-600 mb-4">
              Mesai saatleri dışında acil durumlarda aşağıdaki numaradan bize ulaşabilirsiniz. Lütfen sadece gerçek acil durumlar için kullanınız.
            </p>
            <a 
              href="tel:+905369151144" 
              className="text-koyu-mavi font-bold hover:text-turkuaz transition-colors duration-300"
            >
              +90 (536) 915 11 44
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;