import React from "react";
import { motion as Motion } from "motion/react";
import Contact from "../components/Contact";
import { FiCalendar, FiClock, FiInfo } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Şık ve Sade Hero Alanı */}
      <section className="bg-canvas pt-32 pb-32 relative overflow-hidden">
        {/* Dekoratif Arka Plan */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-gradient-to-b from-brand-red/5 to-transparent rounded-b-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-4"
          >
            Bize Ulaşın
          </Motion.span>
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-ink mb-6"
          >
            Sizi Dinliyoruz
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-smoke max-w-2xl mx-auto leading-relaxed"
          >
            Soru, görüş, öneri veya özel rezervasyon talepleriniz için formu doldurabilir ya da iletişim kanallarından bize doğrudan ulaşabilirsiniz.
          </Motion.p>
        </div>
      </section>

      {/* İletişim Formu (Contact Bileşeni) - Negatif margin ile hero'nun üzerine biner */}
      <div className="-mt-16 relative z-20">
        <Contact />
      </div>

      {/* Ek Bilgiler - Daha sade kartlar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-ink mb-4">Önemli Notlar</h2>
          <div className="h-1 w-12 bg-brand-red mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] box-border border border-shell/20 hover:border-brand-red/20 transition-colors"
          >
            <div className="w-14 h-14 bg-brand-red/8 rounded-2xl flex items-center justify-center mb-6">
              <FiCalendar className="text-brand-red text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Rezervasyon Önceliği</h3>
            <p className="text-smoke leading-relaxed">
              Yoğun saatlerde bekleme süresini azaltmak için gelmeden önce arayabilir veya form üzerinden masa ayırtabilirsiniz. Kalabalık gruplar için 1 gün önceden haber verilmesini rica ediyoruz.
            </p>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] box-border border border-shell/20 hover:border-brand-red/20 transition-colors"
          >
            <div className="w-14 h-14 bg-brand-red/8 rounded-2xl flex items-center justify-center mb-6">
              <FiClock className="text-brand-red text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Servis Saatlerimiz</h3>
            <p className="text-smoke leading-relaxed mb-4">
              Haftanın her günü aynı özenle hizmetinizdeyiz. Özel günler için çalışma saatlerimiz değişiklik gösterebilir.
            </p>
            <ul className="space-y-2 text-sm text-ink font-medium">
              <li className="flex justify-between items-center bg-canvas px-4 py-2 rounded-lg">
                <span className="text-smoke">Hafta İçi</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between items-center bg-canvas px-4 py-2 rounded-lg">
                <span className="text-smoke">Hafta Sonu</span>
                <span>11:00 - 23:30</span>
              </li>
            </ul>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] box-border border border-shell/20 hover:border-brand-red/20 transition-colors"
          >
            <div className="w-14 h-14 bg-brand-red/8 rounded-2xl flex items-center justify-center mb-6">
              <FiInfo className="text-brand-red text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Özel Talepler</h3>
            <p className="text-smoke leading-relaxed">
              Herhangi bir gıda hassasiyetiniz veya hazırlığa dair özel bir notunuz varsa lütfen bize iletin. Porsiyonlarınızı sizin hassasiyetlerinize uygun şekilde hazırlayalım.
            </p>
          </Motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
