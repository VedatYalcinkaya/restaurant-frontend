import React from 'react'
import Hero from '../components/Hero'
import { motion } from 'motion/react'

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      
      {/* Frühstück & Fine Dining Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-koyu-yesil mb-6">
                Frühstück & Fine Dining
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Beginnen Sie Ihren Tag mit unserem exquisiten Frühstücksangebot oder genießen Sie am Abend 
                unser Fine Dining Erlebnis. Unser Küchenchef und sein Team kreieren täglich neue Köstlichkeiten 
                mit frischen, regionalen Zutaten.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Von traditionellen deutschen Gerichten bis hin zu internationalen Fusion-Kreationen - 
                bei uns erwartet Sie kulinarische Vielfalt auf höchstem Niveau.
              </p>
              <button className="bg-koyu-kirmizi hover:bg-daha-koyu-kirmizi text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                Speisekarte entdecken
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fine Dining Experience"
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Moderne Küche Section */}
      <section className="py-20 bg-acik-krem">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-koyu-yesil mb-6"
            >
              Moderne Küche trifft Tradition
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Unsere Küche vereint innovative Kochtechniken mit traditionellen Rezepten. 
              Jedes Gericht wird mit Leidenschaft und Präzision zubereitet, um Ihnen ein 
              unvergessliches Geschmackserlebnis zu bieten.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Lust auf Fine Dining",
                description: "Exquisite Menüs für besondere Anlässe"
              },
              {
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Frisch & saisonal",
                description: "Beste Zutaten aus der Region"
              },
              {
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Aufmerksame Bedienung",
                description: "Service, der keine Wünsche offen lässt"
              }
            ].map((item, index) => (
              <motion.div
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
                  <h3 className="text-xl font-bold text-koyu-yesil mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-koyu-kirmizi to-daha-koyu-kirmizi">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Weniger Alltag, mehr Außergewöhnliches - 
              im Esszimmer Köln.
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Lassen Sie sich von unserer Küche und unserem Service verwöhnen. 
              Reservieren Sie noch heute Ihren Tisch für ein unvergessliches kulinarisches Erlebnis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-koyu-yesil hover:bg-acik-krem px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                Jetzt reservieren
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-koyu-yesil px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                Kontakt aufnehmen
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage