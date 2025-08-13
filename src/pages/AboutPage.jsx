import React from 'react';
import { motion } from 'motion/react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-acik-krem">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-krem to-toprak">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-koyu-kahve mb-6"
          >
            Über uns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Willkommen im Esszimmer Köln - wo kulinarische Leidenschaft auf Gemütlichkeit trifft
          </motion.p>
        </div>
      </section>

      {/* Unsere Geschichte */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-koyu-kahve mb-6">
                Unsere Geschichte
              </h2>
              <p className="text-gray-600 mb-4">
                Das Esszimmer Köln ist mehr als nur ein Restaurant - es ist ein Ort, an dem sich Menschen begegnen, 
                um außergewöhnliche kulinarische Momente zu erleben. Seit unserer Eröffnung haben wir uns der Mission 
                verschrieben, weniger Alltag und mehr Außergewöhnliches in die Herzen und auf die Teller unserer Gäste zu bringen.
              </p>
              <p className="text-gray-600 mb-4">
                Unser Konzept verbindet traditionelle deutsche Küche mit modernen, internationalen Einflüssen. 
                Wir glauben daran, dass gutes Essen verbindet und unvergessliche Erinnerungen schafft.
              </p>
              <p className="text-gray-600">
                In unserem gemütlichen Ambiente können Sie vom Frühstück bis zum Fine Dining alle kulinarischen 
                Facetten genießen, die unser erfahrenes Küchenteam täglich frisch und mit Leidenschaft zubereitet.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Restaurant Interior"
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unsere Werte */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-koyu-kahve mb-4">
              Unsere Werte
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Was uns antreibt und was Sie bei uns erwarten können
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Frische & Qualität",
                description: "Wir verwenden nur die besten, frischen Zutaten aus der Region und arbeiten mit lokalen Lieferanten zusammen.",
                icon: "🌱"
              },
              {
                title: "Leidenschaft",
                description: "Unser Team brennt für gutes Essen und exzellenten Service. Diese Leidenschaft spüren Sie in jedem Gericht.",
                icon: "❤️"
              },
              {
                title: "Gemeinschaft",
                description: "Wir schaffen einen Ort der Begegnung, wo sich Menschen wohlfühlen und gerne Zeit verbringen.",
                icon: "🤝"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-krem rounded-xl p-8"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-koyu-kahve mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-koyu-kahve mb-4">
              Unser Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leidenschaftliche Profis, die täglich ihr Bestes geben
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Chef Marcus Weber",
                position: "Küchenchef",
                description: "Mit über 15 Jahren Erfahrung in der gehobenen Gastronomie bringt Marcus innovative Kreationen auf Ihre Teller.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Anna Müller",
                position: "Serviceleitung",
                description: "Anna sorgt dafür, dass Sie sich bei uns wie zu Hause fühlen und einen unvergesslichen Abend erleben.",
                image: "https://images.unsplash.com/photo-1594824680330-10c72d3e6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Tom Schmidt",
                position: "Sommelier",
                description: "Tom kennt jeden Wein in unserem Keller und findet die perfekte Begleitung zu jedem Gericht.",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <motion.div
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
                  <h3 className="text-xl font-bold text-koyu-kahve mb-2">
                    {member.name}
                  </h3>
                  <p className="text-altin font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-toprak to-altin">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Besuchen Sie uns
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Wir freuen uns darauf, Sie in unserem Esszimmer begrüßen zu dürfen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-koyu-kahve hover:bg-krem px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                Tisch reservieren
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-koyu-kahve px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                Kontakt aufnehmen
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
