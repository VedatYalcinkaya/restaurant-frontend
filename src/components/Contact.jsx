import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMessage,
  selectContactFormState,
} from "../store/slices/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const formState = useSelector(selectContactFormState);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || undefined,
      subject: formData.subject?.trim() || undefined,
      message: formData.message.trim(),
    };

    await dispatch(sendContactMessage(payload));
    if (!formState.error) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Motion.div
          className="bg-gradient-to-br from-ink/20 via-shell/30 to-brand-red-soft/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-ink/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-ink mb-6">İletişim Bilgileri</h3>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-red-soft to-shell rounded-full mb-8"></div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-ink to-brand-red w-12 h-12 rounded-full flex items-center justify-center">
                  <FiMail className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-ink">E-posta</h4>
                <a
                  href="mailto:iletisim@alasogus.com"
                  className="text-gray-600 hover:text-brand-red-soft transition-colors"
                >
                  iletisim@alasogus.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-ink to-brand-red w-12 h-12 rounded-full flex items-center justify-center">
                  <FiPhone className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-ink">Telefon</h4>
                <a
                  href="tel:+905369151144"
                  className="text-gray-600 hover:text-brand-red-soft transition-colors"
                >
                  +90 (536) 915 11 44
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-ink to-brand-red w-12 h-12 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-white text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-ink">Adres</h4>
                <p className="text-gray-600">
                  Altındağ, Anafartalar Cd. No:73 D:1, Muratpaşa/Antalya
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-xl font-semibold text-ink mb-4">Çalışma Saatleri</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span className="text-ink font-medium">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi - Pazar:</span>
                <span className="text-ink font-medium">11:00 - 23:30</span>
              </li>
            </ul>
          </div>
        </Motion.div>

        <Motion.div
          className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-ink mb-6">Mesaj Gönderin</h3>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-red-soft to-shell rounded-full mb-8"></div>

          {(formState.success || formState.error) && (
            <Motion.div
              className={`mb-6 p-4 rounded-lg ${
                formState.error
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              } flex items-start`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mr-3 mt-0.5">
                {formState.error ? (
                  <FiX className="text-red-500" />
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </div>
              <div>
                {formState.error
                  ? typeof formState.error === "string"
                    ? formState.error
                    : "Mesaj gönderilemedi"
                  : "Mesajınız bize ulaştı"}
              </div>
            </Motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="Adınızı ve soyadınızı girin"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="E-posta adresinizi girin"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="Telefon numaranızı girin"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Konu (isteğe bağlı)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="Konu girin"
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                placeholder="Mesajınızı yazın..."
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={formState.loading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-brand-red to-brand-red-deep hover:from-brand-red/90 hover:to-brand-red-deep/90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {formState.loading ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>
          </form>
        </Motion.div>
      </div>

      <Motion.div
        className="mt-12 rounded-2xl shadow-lg overflow-hidden h-96 border border-ink/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.985645054469!2d30.69216867642104!3d36.890691672221564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3901c200e576f%3A0x62dfdfc8ccdf6deb!2zQWx0xLFuZGHEnywgQW5hZmFydGFsYXIgQ2QuIE5vOjczIEQ6MSwgMDcwNTAgTXVyYXRwYcWfYS9BbnRhbHlh!5e0!3m2!1str!2str!4v1746651435544!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konum"
          className="transition-all duration-300"
        ></iframe>
      </Motion.div>
    </div>
  );
};

export default Contact;
