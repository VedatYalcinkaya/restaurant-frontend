import React from "react";
import Hero from "../components/Hero";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                Ala Söğüş Deneyimi
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Usta usulü hazırlanan söğüş porsiyonlarımız, günlük doğranan
                malzemeler ve dengeli baharatlarla taze bir lezzet sunar.
                Ekmeğinden servisine kadar her detay hızlı ama özenli bir deneyim
                için hazırlanır.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Öğle arasında hızlı bir mola vermek isteyenler de, akşam
                arkadaşlarıyla keyifli bir masa kurmak isteyenler de Ala
                Söğüş&apos;te aynı sıcak karşılamayı bulur.
              </p>
              <Link
                to="/menu"
                className="inline-flex bg-brand-red hover:bg-brand-red-deep text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Menüyü Keşfet
              </Link>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Ala Söğüş servis sunumu"
                className="rounded-xl shadow-lg w-full"
              />
            </Motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-canvas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ink mb-6"
            >
              Tazelik, Denge ve Ustalık
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Ala Söğüş&apos;te her porsiyon aynı standardı korusun diye hazırlık,
              sunum ve servis sürecini titizlikle yönetiyoruz. Lezzetin
              merkezinde sadelik, tazelik ve doğru oran var.
            </Motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-red to-brand-red-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ala Söğüş ile söğüş keyfini yeniden keşfedin.
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              İster hızlı bir öğle yemeği ister dostlarla uzun bir akşam
              planlayın, masanız hazır olsun diye rezervasyonunuzu kolayca
              oluşturabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservation"
                className="inline-flex justify-center bg-white text-ink hover:bg-canvas px-8 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Hemen Rezervasyon Yap
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-3 rounded-lg font-medium transition-colors duration-300"
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
