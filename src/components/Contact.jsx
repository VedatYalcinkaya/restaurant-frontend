import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* İletişim Kartı */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row border border-shell/30 relative z-20"
      >
        {/* Sol Alan: İletişim Bilgileri */}
        <div className="w-full lg:w-2/5 p-12 lg:p-16 bg-ink !text-white relative flex flex-col justify-between overflow-hidden">
          {/* Arka plan dekoratif daireleri */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 !text-white">İletişim Bilgilerimiz</h3>
            <p className="!text-white opacity-70 mb-12 text-lg leading-relaxed">
              Her türlü soru, görüş veya değerlendirmeniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
            </p>

            <div className="space-y-8">
              <a href="mailto:iletisim@alasogus.com" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red font-semibold transition-colors">
                  <FiMail className="text-xl !text-white" />
                </div>
                <div>
                  <p className="text-xs !text-white opacity-50 uppercase tracking-widest font-bold mb-1">E-Posta</p>
                  <p className="text-lg !text-white group-hover:!text-brand-red-soft transition-colors tracking-wide">iletisim@alasogus.com</p>
                </div>
              </a>

              <a href="tel:+905369151144" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red font-semibold transition-colors">
                  <FiPhone className="text-xl !text-white" />
                </div>
                <div>
                  <p className="text-xs !text-white opacity-50 uppercase tracking-widest font-bold mb-1">Telefon</p>
                  <p className="text-lg !text-white group-hover:!text-brand-red-soft transition-colors tracking-wide">+90 (536) 915 11 44</p>
                </div>
              </a>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiMapPin className="text-xl !text-white" />
                </div>
                <div>
                  <p className="text-xs !text-white opacity-50 uppercase tracking-widest font-bold mb-1">Adres</p>
                  <p className="text-lg !text-white opacity-90 leading-relaxed">
                    Aydınlar Yolu, Anafartalar Cd.<br /> No:73 D:1, Muratpaşa / Antalya
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10">
              <h4 className="text-xs !text-white opacity-50 uppercase tracking-widest font-bold mb-6">Sosyal Medya & Direk İletişim</h4>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/905369151144"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300"
                  title="WhatsApp'tan Yazın"
                >
                  <FaWhatsapp className="text-2xl" />
                </a>
                <a
                  href="https://instagram.com/alasogus_antalya"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E1306C]/20 text-[#E1306C] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white transition-all duration-300"
                  title="Instagram'da Takip Edin"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Alan: Form */}
        <div className="w-full lg:w-3/5 p-12 lg:p-16 bg-white relative">
          <h3 className="text-3xl font-bold text-ink mb-10">Bize Mesaj Gönderin</h3>

          {(formState.success || formState.error) && (
            <Motion.div
              className={`mb-8 p-4 rounded-xl shadow-sm border ${
                formState.error
                  ? "bg-red-50 text-red-800 border-red-200"
                  : "bg-green-50 text-green-800 border-green-200"
              } flex items-center gap-3 font-medium`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`p-2 rounded-full ${formState.error ? "bg-red-100" : "bg-green-100"}`}>
                {formState.error ? <FiX className="text-red-500" /> : <FiCheck className="text-green-500" />}
              </div>
              <p>
                {formState.error
                  ? typeof formState.error === "string"
                    ? formState.error
                    : "Mesajınız iletilemedi. Lütfen tekrar deneyin."
                  : "Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız."}
              </p>
            </Motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-smoke ml-1">Ad Soyad</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-canvas border border-transparent rounded-xl focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all text-ink placeholder:text-ink/30"
                  placeholder="Ahmet Yılmaz"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-smoke ml-1">E-Posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-canvas border border-transparent rounded-xl focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all text-ink placeholder:text-ink/30"
                  placeholder="ornek@mail.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-smoke ml-1">Telefon Numarası</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-canvas border border-transparent rounded-xl focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all text-ink placeholder:text-ink/30"
                  placeholder="0 (555) 000 00 00"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-smoke ml-1">Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-canvas border border-transparent rounded-xl focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all text-ink placeholder:text-ink/30"
                  placeholder="Hangi konuda yazıyorsunuz?"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-smoke ml-1">Mesajınız</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-5 py-4 bg-canvas border border-transparent rounded-xl focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all text-ink placeholder:text-ink/30 resize-none"
                placeholder="Mesajınızı detaylı şekilde buraya yazabilirsiniz..."
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red hover:bg-brand-red-deep text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
              >
                {formState.loading ? "Gönderiliyor..." : "Mesajı Gönder"}
                {!formState.loading && <FiArrowRight className="text-xl" />}
              </button>
            </div>
          </form>
        </div>
      </Motion.div>

      {/* Harita */}
      <Motion.div
        className="mt-16 rounded-[2rem] shadow-xl overflow-hidden h-[450px] border border-shell/50 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
          className="grayscale-0 hover:grayscale-0 transition-all duration-700 w-full h-full"
        ></iframe>
      </Motion.div>
    </div>
  );
};

export default Contact;
