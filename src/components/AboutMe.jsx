import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaGraduationCap, FaUniversity, FaBalanceScale, FaBuilding, FaQuoteLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const AboutMe = () => {
  // Modal durumu için state
  const [showModal, setShowModal] = useState(false);
  
  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Eğitim ve Kariyer Zaman Çizelgesi
  const timelineItems = [
    {
      year: "2016",
      title: "Kocaeli Üniversitesi Hukuk Fakültesi",
      description: "Hukuk fakültesinde lisans eğitimime başladım",
      icon: <FaUniversity className="text-blue-600" />
    },
    {
      year: "2020",
      title: "Mezuniyet",
      description: "Kocaeli Üniversitesi Hukuk Fakültesi'nden mezun oldum",
      icon: <FaGraduationCap className="text-blue-600" />
    },
    {
      year: "2020 - 2021",
      title: "Avukatlık Stajı",
      description: "Avukatlık stajımı başarıyla tamamladım",
      icon: <FaBalanceScale className="text-blue-600" />
    },
    {
      year: "2022",
      title: "Avukatlık Ruhsatı",
      description: "Avukatlık ruhsatımı aldım ve mesleki hayatıma başladım",
      icon: <FaBalanceScale className="text-blue-600" />
    },
    {
      year: "2022",
      title: "Boşanma ve Mal Rejimi Tasfiyesi Eğitimi",
      description: "Boşanma ve mal rejimi tasfiyesi konularında profesyonel eğitim aldım",
      icon: <FaGraduationCap className="text-blue-600" />
    }
  ];
  

  return (
    <section id="hakkimda" className="w-full bg-white py-24 px-4 md:px-10 relative">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      <motion.div 
        className="max-w-screen-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-800"
          variants={itemVariants}
        >
          Hakkımda
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start relative">
          {/* Sol Taraf - Hakkımda Metni - Sticky */}
          <motion.div 
            className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start"
            variants={itemVariants}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 -mt-16 mx-auto shadow-lg border-4 border-white">
                EO
              </div>
              
              <div className="relative mb-8">
                <FaQuoteLeft className="text-blue-100 text-5xl absolute -top-4 -left-2" />
                <motion.p className="text-gray-700 leading-relaxed relative z-10 pl-3" variants={itemVariants}>
                  Hukuk kariyerime Kocaeli Üniversitesi'nde aldığım kapsamlı eğitimle başladım ve uzmanlaşarak müvekkillerime etkili ve güvenilir hukuk hizmetleri sunmaya başladım. Şu an boşanma, aile hukuku, miras ve ticaret hukuku gibi çeşitli alanlarda dava ve danışmanlık hizmetleri vermekteyim.
                </motion.p>
              </div>
              
              <motion.p className="text-gray-700 leading-relaxed" variants={itemVariants}>
                Hedefim, her müvekkilime en doğru ve adil çözümü sunarken, hukukun sunduğu tüm imkanlardan faydalanarak sürecin her aşamasında onları en iyi şekilde temsil etmektir. Dava süreçlerinde müvekkillerimin ihtiyaç ve beklentilerine göre özelleştirilmiş stratejiler geliştirerek, onların haklarını savunmak önceliğimdir.
              </motion.p>
              
              <motion.p className="text-gray-700 leading-relaxed mt-4" variants={itemVariants}>
                Hukuki mücadelenin zorluklarının farkındayım ve her zaman müvekkillerimle güçlü bir iletişim kurarak, onlara güvenilir bir hukuk desteği sağlamayı ilke edinmiş bulunmaktayım. Kendime duyduğum güven ve azimle, müvekkillerime başarıya giden yolu birlikte inşa ediyoruz.
              </motion.p>
            </div>
            
            <motion.div
              className="mt-8 bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <FaBalanceScale className="mr-2" />
                Baro Üyelikleri
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  Antalya Barosu (2022 - Günümüz)
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  Türkiye Barolar Birliği
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="font-medium text-gray-800 mb-2">İletişim</h4>
                <a href="mailto:emreokur@antalya.av.tr" className="text-blue-600 hover:underline block">emreokur@antalya.av.tr</a>
                <a href="tel:+905369151144" className="text-blue-600 hover:underline block">+90 36 915 11 44</a>
              </div>
            </motion.div>
            
            <motion.div
              className="hidden lg:block text-center mt-8 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-white shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">İlk Görüşme</h3>
              <p className="mb-4">Hukuki sorununuzu değerlendirmek için randevu alın</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowModal(true)} 
                  className="bg-white text-blue-700 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors w-full flex items-center justify-center"
                >
                  <FaPhone className="mr-2" /> Randevu Al
                </button>
                <Link 
                  to="/iletisim" 
                  className="bg-blue-50 text-blue-700 px-6 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors w-full flex items-center justify-center"
                >
                  <FaEnvelope className="mr-2" /> İletişim Formu
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Sağ Taraf - Zaman Çizelgesi */}
          <motion.div 
            className="lg:col-span-2 sticky"
            variants={itemVariants}
          >
            <div className="container mx-auto w-full h-full">
              <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
                {/* Ortadaki Dikey Çizgi */}
                <div 
                  className="absolute h-full border-2 border-blue-300 left-1/2 transform -translate-x-1/2 rounded-[1%]"
                ></div>
                
                {timelineItems.map((item, index) => (
                  index % 2 === 0 ? (
                    // Sağ taraftaki itemler
                    <motion.div 
                      key={index}
                      className="mb-16 flex justify-between items-center w-full right-timeline"
                      variants={itemVariants}
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="order-1 w-5/12"></div>
                      <div className="z-10 flex items-center order-1 bg-blue-600 shadow-xl w-10 h-10 rounded-full">
                        <div className="mx-auto text-white">{item.icon}</div>
                      </div>
                      <motion.div 
                        className="order-1 w-5/12 px-4 py-5 bg-white rounded-lg shadow-md border border-blue-100"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="mb-2 text-base text-blue-600 font-semibold">{item.year}</p>
                        <h4 className="mb-2 font-bold text-lg text-gray-800">{item.title}</h4>
                        <p className="text-sm leading-snug text-gray-600">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Sol taraftaki itemler
                    <motion.div 
                      key={index}
                      className="mb-16 flex justify-between flex-row-reverse items-center w-full left-timeline"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="order-1 w-5/12"></div>
                      <div className="z-10 flex items-center order-1 bg-blue-600 shadow-xl w-10 h-10 rounded-full">
                        <div className="mx-auto text-white">{item.icon}</div>
                      </div>
                      <motion.div 
                        className="order-1 w-5/12 px-4 py-5 bg-white rounded-lg shadow-md border border-blue-100"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="mb-2 text-base text-blue-600 font-semibold">{item.year}</p>
                        <h4 className="mb-2 font-bold text-lg text-gray-800">{item.title}</h4>
                        <p className="text-sm leading-snug text-gray-600">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-2xl text-blue-700 font-medium italic px-6 py-8 max-w-4xl mx-auto border-t border-b border-blue-100"
            variants={itemVariants}
            whileInView={{ scale: 1.02 }}
            transition={{ duration: 1 }}
          >
            "Hukuki sorunlarınızda yanınızdayım ve haklarınızı korumak için var gücümle çalışıyorum."
          </motion.p>
        </motion.div>
      </motion.div>
      
      {/* Modal */}
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Randevu Talebi"
        description="İlk görüşme talebiniz için size nasıl ulaşalım?"
      />
    </section>
  );
};

export default AboutMe; 