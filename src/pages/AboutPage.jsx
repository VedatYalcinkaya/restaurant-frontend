import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-canvas">
      <section className="relative py-20 bg-gradient-to-r from-paper to-brand-red-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-ink mb-6"
          >
            Hakkımızda
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Ala Söğüş, Antalya&apos;da söğüş lezzetini özenli hazırlık ve samimi
            servisle buluşturan bir durak.
          </Motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-ink mb-6">Hikayemiz</h2>
              <p className="text-gray-600 mb-4">
                Ala Söğüş, iyi malzeme ve doğru hazırlığın söğüşte fark
                yarattığı fikriyle kuruldu. Misafirlerimize hızlı servis
                sunarken lezzetten ödün vermemek için her gün aynı titizlikle
                hazırlanıyoruz.
              </p>
              <p className="text-gray-600 mb-4">
                Menümüzde sadelikten güç alan ama detayda ustalık isteyen bir
                yaklaşım var. Taze doğranmış malzemeler, dengeli baharatlar ve
                doğru ekmek seçimiyle her porsiyonu karakterli kılıyoruz.
              </p>
              <p className="text-gray-600">
                Antalya&apos;nın enerjisini yansıtan sıcak atmosferimizle, ister
                kısa bir öğün ister uzun bir masa planı için sizi her zaman aynı
                özenle ağırlıyoruz.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Ala Söğüş iç mekânı"
                className="rounded-xl shadow-lg w-full"
              />
            </Motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ink mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bizi ayakta tutan yaklaşım ve masanıza taşıdığımız standart
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tazelik ve Kalite",
                description:
                  "Gün içinde servis ettiğimiz her ürünün hazırlık kalitesini korumak için malzeme akışını dikkatle yönetiyoruz.",
                icon: "01",
              },
              {
                title: "Ustalık",
                description:
                  "Söğüş gibi sade görünen bir lezzetin asıl farkını detayların belirlediğini biliyor, her porsiyonda bu özeni sürdürüyoruz.",
                icon: "02",
              },
              {
                title: "Misafirperverlik",
                description:
                  "Ala Söğüş'te herkesin kendini rahat hissedeceği, tekrar gelmek isteyeceği samimi bir ortam kuruyoruz.",
                icon: "03",
              },
            ].map((value, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-paper rounded-xl p-8"
              >
                <div className="text-4xl font-display text-brand-red mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-ink mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-ink mb-4">Ekibimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mutfağı, servisi ve operasyonu aynı özen çizgisinde buluşturan ekip
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Usta Mehmet Demir",
                position: "Mutfak Sorumlusu",
                description:
                  "Hazırlık düzeninden porsiyon standardına kadar tüm mutfak akışını yöneterek Ala Söğüş imzasını her tabakta korur.",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Elif Kaya",
                position: "Servis Yöneticisi",
                description:
                  "Misafir deneyiminin hızlı, düzenli ve sıcak ilerlemesi için salon operasyonunu titizlikle koordine eder.",
                image:
                  "https://msastrg.blob.core.windows.net/msaimages/cms/block/item/image/694.jpg",
              },
              {
                name: "Baran Aydın",
                position: "Operasyon ve Paket Servis",
                description:
                  "Yoğun saatlerde bile siparişlerin aynı kaliteyle hazırlanması ve doğru şekilde ulaşması için süreci takip eder.",
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
            ].map((member, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-red-soft to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Bize Uğrayın</h2>
            <p className="text-white/90 mb-8 text-lg">
              Ala Söğüş&apos;te sizi ağırlamaktan mutluluk duyarız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservation"
                className="inline-flex justify-center bg-white text-ink hover:bg-paper px-8 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Rezervasyon Yap
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                İletişime Geç
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
