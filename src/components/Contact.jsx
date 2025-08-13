import React, { useState } from "react";
import { motion } from "motion/react";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevState) => ({ ...prevState, submitting: true }));

    try {
      // Burada gerçek API çağrısı yapılacak
      // await fetch('/api/contact', {...})

      // Simüle edilmiş başarılı gönderim
      setTimeout(() => {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Mesajınız başarıyla gönderildi!" },
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // 5 saniye sonra bildirimi kaldır
        setTimeout(() => {
          setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null },
          });
        }, 5000);
      }, 1000);
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg: "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        },
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* İletişim Bilgileri */}
        <motion.div
          className="bg-gradient-to-br from-koyu-mavi/20 via-acik-mavi/30 to-turkuaz/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-koyu-mavi/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-koyu-mavi mb-6">
            İletişim Bilgileri
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-8"></div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-koyu-mavi to-mavi w-12 h-12 rounded-full flex items-center justify-center">
                  <FiMail className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-koyu-mavi">Email</h4>
                <a
                  href="mailto:emreokur@antalya.av.tr"
                  className="text-gray-600 hover:text-turkuaz transition-colors"
                >
                  emreokur@antalya.av.tr
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-koyu-mavi to-mavi w-12 h-12 rounded-full flex items-center justify-center">
                  <FiPhone className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-koyu-mavi">
                  Telefon
                </h4>
                <a
                  href="tel:+905369151144"
                  className="text-gray-600 hover:text-turkuaz transition-colors"
                >
                  +90 (536) 915 11 44
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-koyu-mavi to-mavi w-12 h-12 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-koyu-mavi">Adres</h4>
                <p className="text-gray-600">Antalya, Türkiye</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-xl font-semibold text-koyu-mavi mb-4">
              Mesai Saatleri
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span className="text-koyu-mavi font-medium">
                  09:00 - 18:00
                </span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi - Pazar:</span>
                <span className="text-koyu-mavi font-medium">Kapalı</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* İletişim Formu */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-koyu-mavi mb-6">
            Bir Mesaj Gönderin
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-8"></div>

          {/* Bildirimler */}
          {status.info.msg && (
            <motion.div
              className={`mb-6 p-4 rounded-lg ${
                status.info.error
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              } flex items-start`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mr-3 mt-0.5">
                {status.info.error ? (
                  <FiX className="text-red-500" />
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </div>
              <div>{status.info.msg}</div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  İsim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turkuaz focus:border-transparent transition-all"
                  placeholder="İsminizi girin"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turkuaz focus:border-transparent transition-all"
                  placeholder="Email adresinizi girin"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turkuaz focus:border-transparent transition-all"
                  placeholder="Telefon numaranızı girin"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turkuaz focus:border-transparent transition-all"
                  placeholder="Konu başlığını girin"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turkuaz focus:border-transparent transition-all"
                placeholder="Mesajınızı buraya yazın..."
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={status.submitting}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-koyu-mavi to-mavi hover:from-turkuaz hover:to-acik-mavi transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {status.submitting ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Harita */}
      <motion.div
        className="mt-12 rounded-2xl shadow-lg overflow-hidden h-96 border border-koyu-mavi/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.9830830236615!2d30.69204537638291!3d36.89075296258898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3901e9fe11f07%3A0xd0da4cc7db2268dc!2sAlt%C4%B1nda%C4%9F%2C%20Anafartalar%20Cd.%2073%20D%20D%3A1%2C%2007050%20Muratpa%C5%9Fa%2FAntalya!5e0!3m2!1str!2str!4v1746651234058!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ofis Konumumuz"
          className="transition-all duration-300"
        ></iframe> */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.985645054469!2d30.69216867642104!3d36.890691672221564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3901c200e576f%3A0x62dfdfc8ccdf6deb!2zQWx0xLFuZGHEnywgQW5hZmFydGFsYXIgQ2QuIE5vOjczIEQ6MSwgMDcwNTAgTXVyYXRwYcWfYS9BbnRhbHlh!5e0!3m2!1str!2str!4v1746651435544!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ofis Konumumuz"
          className="transition-all duration-300"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;
