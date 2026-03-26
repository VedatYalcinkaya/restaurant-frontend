import React from "react";
import Hero from "../components/Hero";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />

      {/* "Ala Söğüş Deneyimi" section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
                Neden Ala Söğüş?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight">
                Ala Söğüş Deneyimi
              </h2>
              <p className="text-smoke mb-5 leading-relaxed">
                Usta usulü hazırlanan söğüş porsiyonlarımız, günlük doğranan
                malzemeler ve dengeli baharatlarla taze bir lezzet sunar.
                Ekmeğinden servisine kadar her detay hızlı ama özenli bir deneyim
                için hazırlanır.
              </p>
              <p className="text-smoke mb-8 leading-relaxed">
                Öğle arasında hızlı bir mola vermek isteyenler de, akşam
                arkadaşlarıyla keyifli bir masa kurmak isteyenler de Ala
                Söğüş&apos;te aynı sıcak karşılamayı bulur.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-deep text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Menüyü Keşfet
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gradient-to-br from-blush via-shell to-brand-red-soft flex items-center justify-center">
                <div className="text-center text-white/70">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium opacity-60">Servis görseli</p>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* "Tazelik, Denge ve Ustalık" section */}
      <section className="py-24 bg-canvas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-bold uppercase tracking-widest text-brand-red mb-4"
            >
              Standartlarımız
            </Motion.span>
            <Motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ink mb-5"
            >
              Tazelik, Denge ve Ustalık
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-smoke max-w-2xl mx-auto leading-relaxed"
            >
              Her porsiyon aynı standardı korusun diye hazırlık, sunum ve servis
              sürecini titizlikle yönetiyoruz.
            </Motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Günlük Hazırlık",
                description:
                  "Taze malzeme ve düzenli hazırlık ile her gün aynı kalite",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Özel Lezzet Dengesi",
                description:
                  "Soğan, domates ve baharat uyumuyla karakterli söğüş tadı",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Samimi Servis",
                description:
                  "Hızlı, sıcak ve misafir odaklı bir servis anlayışı",
              },
            ].map((item, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-shell/20 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-smoke text-sm leading-relaxed">{item.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-red to-brand-red-deep relative overflow-hidden">
        {/* Dekoratif daireler */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
              Masanız Hazır
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Ala Söğüş ile söğüş keyfini yeniden keşfedin.
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              İster hızlı bir öğle yemeği ister dostlarla uzun bir akşam
              planlayın, masanız hazır olsun diye rezervasyonunuzu kolayca
              oluşturabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservation"
                className="inline-flex justify-center items-center gap-2 bg-white text-brand-red hover:bg-canvas px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Hemen Rezervasyon Yap
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 border-2 border-white/60 text-white hover:bg-white hover:text-brand-red px-8 py-3.5 rounded-lg font-semibold transition-all duration-300"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
