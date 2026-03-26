import React from "react";
import { motion as Motion } from "motion/react";
import { FlipWords } from "./ui/flip-words";
import {
  FiUsers,
  FiClock,
  FiMapPin,
  FiThumbsUp,
  FiDroplet,
  FiZap,
  FiAward,
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
      baslik: "El Kesimiyle Hazırlanır",
      aciklama:
        "Her porsiyon makinede değil, ustanın elinde doğranır. Söğüşün dokusu ve tadı bu özenle oluşur.",
      icon: <FiAward className="w-10 h-10 text-brand-red" />,
      tag: "Usta işi",
    },
    {
      baslik: "Günde Bir Kez Hazırlanır",
      aciklama:
        "Malzemeler sabah hazırlanır, gün bitmeden tükenir. Bayat porsiyon çıkmaz, kalan yarın masaya gelmez.",
      icon: <FiZap className="w-10 h-10 text-brand-red" />,
      tag: "Her gün taze",
    },
    {
      baslik: "Özel Sos Dengesi",
      aciklama:
        "Soğan, domates ve baharatın oranı özenle kurgulandı. Her porsiyonda aynı karakterli lezzet.",
      icon: <FiDroplet className="w-10 h-10 text-brand-red" />,
      tag: "Gizli tarif",
    },
    {
      baslik: "Hızlı Ama Özenli",
      aciklama:
        "Öğle molasında da akşam masasında da aynı servisi sunuyoruz — hızlı ama hiç aceleyle değil.",
      icon: <FiThumbsUp className="w-10 h-10 text-brand-red" />,
      tag: "Samimi servis",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-paper to-blush py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero başlık bloğu */}
        <div className="text-center mb-16">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-brand-red/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Antalya&apos;nın Söğüş Durağı
          </Motion.div>

          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-ink mb-4 leading-tight"
          >
            Ala Söğüş
          </Motion.h1>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10"
          >
            <p className="text-lg text-smoke max-w-xl mx-auto leading-relaxed">
              Taze malzeme, dengeli baharat ve ustalıkla hazırlanan söğüş lezzetini
              samimi bir servisle sunuyoruz.
            </p>

            <div className="flex flex-col items-center mt-8 mb-2">
              <div className="text-ink/70 font-medium mb-2 text-base">
                Burada sizi bekleyenler:
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-red-deep font-bold text-3xl md:text-4xl">
                <FlipWords words={restaurantFlip} duration={2000} />
              </span>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/reservation"
              className="bg-brand-red hover:bg-brand-red-deep text-white px-10 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Rezervasyon Yap
            </Link>
            <Link
              to="/menu"
              className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-10 py-3.5 rounded-lg text-base font-semibold transition-all duration-300"
            >
              Menüyü İncele
            </Link>
          </Motion.div>
        </div>

        {/* Feature kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm shadow-sm border border-shell/30 p-6 rounded-2xl flex flex-col items-start group hover:shadow-md hover:border-brand-red/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-red/8 flex items-center justify-center mb-4 group-hover:bg-brand-red/14 transition-colors duration-300">
                {feature.icon}
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-red mb-2 bg-brand-red/8 px-2 py-0.5 rounded-full">
                {feature.tag}
              </span>
              <h3 className="text-base font-semibold text-ink mb-2">
                {feature.baslik}
              </h3>
              <p className="text-smoke text-sm leading-relaxed">
                {feature.aciklama}
              </p>
            </Motion.div>
          ))}
        </div>

        {/* Info bar */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-shell/30 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-shell/30">
            <div className="flex items-center gap-4 px-8 py-5">
              <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <FiMapPin className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-xs font-semibold text-smoke uppercase tracking-wider mb-0.5">Adres</p>
                <p className="text-sm text-ink font-medium">
                  Anafartalar Cd. No:73, Muratpaşa/Antalya
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-5">
              <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <FiClock className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-xs font-semibold text-smoke uppercase tracking-wider mb-0.5">Çalışma Saatleri</p>
                <p className="text-sm text-ink font-medium">Her gün 11:00 – 23:00</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-5">
              <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <FiUsers className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-xs font-semibold text-smoke uppercase tracking-wider mb-0.5">Rezervasyon</p>
                <a href="tel:+905369151144" className="text-sm text-ink font-medium hover:text-brand-red transition-colors">
                  +90 (536) 915 11 44
                </a>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Hero;
