import React from "react";
import { motion as Motion } from "motion/react";
import Contact from "../components/Contact";
import { FaCalendarAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-canvas/30">
      <Motion.div
        className="py-16 bg-gradient-to-r from-shell/20 to-brand-red-soft/20 backdrop-blur-sm rounded-b-2xl border-b border-shell/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.h1
            className="text-4xl md:text-5xl font-bold text-ink text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            İletişime Geçin
          </Motion.h1>
          <Motion.div
            className="h-1 w-20 bg-gradient-to-r from-brand-red-soft to-shell rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <Motion.p
            className="text-center text-lg text-gray-700 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Rezervasyon, toplu sipariş ya da merak ettiğiniz konular için bize
            ulaşın. En kısa sürede dönüş yapalım.
          </Motion.p>
        </div>
      </Motion.div>

      <div className="py-12">
        <Contact />
      </div>

      <Motion.div
        className="max-w-7xl mx-auto px-4 mt-12 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-ink mb-6">Ek Bilgiler</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-brand-red-soft to-shell rounded-full mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Motion.div
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-ink to-brand-red-soft p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-ink mb-4">Rezervasyon</h3>
            <p className="text-gray-600 mb-4">
              Rezervasyon için telefonla bize ulaşabilir ya da form bırakabilirsiniz.
              Kalabalık masalar için mümkünse en az 1 gün önce haber vermeniz
              yeterli.
            </p>
            <a
              href="mailto:iletisim@alasogus.com"
              className="inline-block text-brand-red-soft hover:text-ink font-medium transition-colors duration-300"
            >
              iletisim@alasogus.com
            </a>
          </Motion.div>

          <Motion.div
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-ink to-brand-red-soft p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaClock className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-ink mb-4">Çalışma Saatleri</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span className="font-medium">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi - Pazar:</span>
                <span className="font-medium">11:00 - 23:30</span>
              </li>
            </ul>
          </Motion.div>

          <Motion.div
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-br from-ink to-brand-red-soft p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FaExclamationTriangle className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-ink mb-4">Özel Talepler</h3>
            <p className="text-gray-600 mb-4">
              Alerji, hassasiyet ya da toplu sipariş gibi notlarınız varsa
              önceden iletin; hazırlığımızı size göre yapalım.
            </p>
            <a
              href="tel:+905369151144"
              className="text-ink font-bold hover:text-brand-red-soft transition-colors duration-300"
            >
              +90 (536) 915 11 44
            </a>
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
};

export default ContactPage;
