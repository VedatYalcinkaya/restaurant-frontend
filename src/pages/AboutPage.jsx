import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  FiAward,
  FiZap,
  FiDroplet,
  FiThumbsUp,
} from "react-icons/fi";

const values = [
  {
    icon: <FiAward className="w-16 h-16 text-brand-red" />,
    tag: "Usta işi",
    title: "Tazelik ve Kalite",
    description:
      "Gün içinde servis ettiğimiz her ürünün hazırlık kalitesini korumak için malzeme akışını dikkatle yönetiyoruz. Taze malzemeler, doğru zamanda masanıza ulaşıyor.",
  },
  {
    icon: <FiZap className="w-16 h-16 text-brand-red" />,
    tag: "Her gün taze",
    title: "Sürekli Ustalık",
    description:
      "Söğüş gibi sade görünen bir lezzetin asıl farkını detayların belirlediğini biliyor, her porsiyonda bu özeni kesintisiz bir şekilde sürdürüyoruz.",
  },
  {
    icon: <FiDroplet className="w-16 h-16 text-brand-red" />,
    tag: "Gizli tarif",
    title: "Özel Sos Dengesi",
    description:
      "Soğan, domates ve baharatın oranı özenle kurgulandı. Her porsiyonda aynı karakterli lezzeti yakalamak için tarifimizi titizlikle uyguluyoruz.",
  },
  {
    icon: <FiThumbsUp className="w-16 h-16 text-brand-red" />,
    tag: "Samimi servis",
    title: "Misafirperverlik",
    description:
      "Ala Söğüş'te herkesin kendini rahat hissedeceği, tekrar gelmek isteyeceği samimi ve sıcak bir ortam kuruyoruz.",
  },
];

const team = [
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
      "Misafir deneyiminin hızlı, düzenli ve sıcak ilerlemesi için salon operasyonunu koordine eder.",
    image:
      "https://msastrg.blob.core.windows.net/msaimages/cms/block/item/image/694.jpg",
  },
  {
    name: "Baran Aydın",
    position: "Operasyon Sorumlusu",
    description:
      "Yoğun saatlerde bile siparişlerin aynı kaliteyle hazırlanması ve doğru şekilde ulaşması için süreci takip eder.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

const AboutPage = () => {
  return (
    <div className="w-full">
      {/* 1. Hero: Sola hizalı, sağda dekoratif/görsel alan */}
      <section className="min-h-[60vh] bg-canvas flex items-center py-24 relative overflow-hidden">
        {/* Dekoratif arka plan çemberi */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full translate-x-1/3 blur-3xl pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-brand-red/20">
                Biz Kimiz?
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6 leading-tight">
                Özenli Hazırlık, <br className="hidden md:block" />
                <span className="text-brand-red">Samimi Servis</span>
              </h1>
              <p className="text-lg text-smoke leading-relaxed mb-8 max-w-lg">
                Ala Söğüş olarak, Antalya'da gerçek söğüş lezzetini hiçbir detayı atlamadan sunmak için yola çıktık. İyi malzemenin ustalıkla buluştuğu durağınız.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/menu"
                  className="bg-ink hover:bg-black text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-md"
                >
                  Lezzetlerimizi İncele
                </Link>
                <Link
                  to="/contact"
                  className="bg-white hover:bg-shell text-ink border border-shell px-8 py-3.5 rounded-lg font-semibold transition-all duration-300"
                >
                  İletişim
                </Link>
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Mutfak hazırlığı"
                  className="rounded-2xl object-cover h-64 w-full shadow-lg origin-bottom-right hover:-translate-y-2 transition-transform duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Söğüş lezzeti"
                  className="rounded-2xl object-cover h-64 w-full shadow-lg translate-y-12 origin-top-left hover:-translate-y-2 transition-transform duration-500"
                />
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* 2. Hikayemiz: Odaklı giriş ve panoramik görsel */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
          <Motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-sm font-bold tracking-widest uppercase mb-4 block"
          >
            Nasıl Başladık?
          </Motion.span>
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-ink mb-8"
          >
            Sadelikten Gelen Ustalık
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-smoke leading-relaxed"
          >
            Ala Söğüş, iyi malzeme ve doğru hazırlığın söğüşte her zaman fark yaratacağı inancıyla doğdu.
            Yılların mutfak tecrübesini, her tabakta kendini belli eden bir karakterle harmanladık.
          </Motion.p>
        </div>

        {/* Panoramik Görsel */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Restoran atmosferi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </Motion.div>

        {/* Editoryal Metin Düzeni */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-lg text-smoke leading-relaxed">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>
                Menümüzde sadelikten güç alan ama detayda büyük ustalık isteyen bir yaklaşım var.
                Taze doğranmış malzemeler, dengeli baharat oranları ve özenle seçilmiş ekmeğimizle her porsiyonunu karakterli bir başyapıta dönüştürüyoruz.
              </p>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Antalya'nın enerjisini ve samimiyetini mutfağımıza taşıyoruz. İster hızlı bir öğle molası vermek isteyin,
                ister dostlarınızla sohbetin tadını çıkaracağınız uzun bir masa etrafında buluşun. Bizim önceliğimiz sizi her ziyarette aynı sıcaklıkla ağırlamaktır.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* 3. Değerlerimiz: Zigzag Düzende */}
      <section className="py-24 bg-paper relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Mutfak Felsefemiz</h2>
            <p className="text-smoke max-w-2xl mx-auto text-lg">Bizi sıradan bir mekandan ayıran, işimize kattığımız prensiplerdir.</p>
          </div>

          <div className="space-y-24">
            {values.map((value, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* İkon / Görsel alanı */}
                  <Motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2 flex justify-center"
                  >
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-white shadow-xl flex items-center justify-center border-8 border-canvas relative">
                      {/* Küçük dekoratif çember */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-brand-red/10" />
                      <div className="absolute -bottom-6 -left-2 w-16 h-16 rounded-full bg-shell/50" />
                      {value.icon}
                    </div>
                  </Motion.div>

                  {/* Metin alanı */}
                  <Motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                  >
                    <span className="inline-block text-brand-red font-bold uppercase tracking-wider text-sm mb-3">
                      {value.tag}
                    </span>
                    <h3 className="text-3xl font-bold text-ink mb-6">{value.title}</h3>
                    <p className="text-lg text-smoke leading-relaxed">{value.description}</p>
                  </Motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Ekibimiz: Yuvarlak çerçeveli, yatay ritimli */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-red text-sm font-bold tracking-widest uppercase mb-4 block"
            >
              Arkamızdakiler
            </Motion.span>
            <Motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-ink mb-4"
            >
              Ekibimizle Tanışın
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-smoke max-w-2xl mx-auto"
            >
              Misafirimizi en iyi şekilde ağırlamak için hazırlıktan sunuma her aşamada büyük bir uyumla çalışıyoruz.
            </Motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-canvas shadow-lg group-hover:border-brand-red/30 transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating badge effect */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-brand-red whitespace-nowrap">
                    {member.position}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-3">{member.name}</h3>
                <p className="text-smoke leading-relaxed">{member.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimal ve Ferah CTA */}
      <section className="py-24 bg-canvas border-t border-shell/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-shell/20 relative overflow-hidden"
          >
            {/* Minimal deco */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-ink/5 rounded-tr-full" />

            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6 relative z-10">
              Sizi de Aramıza Bekliyoruz
            </h2>
            <p className="text-smoke text-lg mb-10 max-w-xl mx-auto relative z-10">
              Usta işi söğüş lezzetini yerinde denemek, sıcak atmosferimizi hissetmek için kapımız her zaman açık.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <Link
                to="/reservation"
                className="bg-brand-red hover:bg-brand-red-deep text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-md"
              >
                Hemen Masanızı Ayırtın
              </Link>
              <Link
                to="/contact"
                className="bg-canvas hover:bg-shell text-ink px-8 py-3.5 rounded-full font-semibold transition-all duration-300"
              >
                İletişim Bilgileri
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
