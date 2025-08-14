import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-9xl font-bold text-koyu-mavi text-center md:text-left"
                >
                  404
                </motion.div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 text-center md:text-left"
                >
                  Seite nicht gefunden
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 text-gray-600 text-center md:text-left"
                >
                  Die gesuchte Seite wurde verschoben, entfernt oder hat nie existiert.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 space-y-3"
                >
                  <Link 
                    to="/" 
                    className="inline-block text-center bg-koyu-kirmizi hover:bg-daha-koyu-kirmizi text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Zur Startseite
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-full md:w-1/2"
              >
                <div className="relative">
                  <svg 
                    viewBox="0 0 200 200" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto text-koyu-mavi/10"
                  >
                    <path 
                      fill="currentColor" 
                      d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.5,-0.3C89,15.7,85.5,31.4,76.8,43.5C68.1,55.7,54.3,64.2,40.3,72.5C26.3,80.7,13.2,88.7,-0.7,89.8C-14.5,90.9,-29,85.1,-43.5,77.8C-58,70.4,-72.5,61.5,-79.6,48.6C-86.7,35.6,-86.5,17.8,-83.8,1.6C-81.2,-14.7,-76.1,-29.3,-68.5,-42.7C-60.9,-56.1,-50.7,-68.3,-38.1,-76.4C-25.4,-84.5,-12.7,-88.6,1.2,-90.7C15.1,-92.7,30.2,-92.8,44.7,-84.8Z" 
                      transform="translate(100 100)" 
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-auto text-koyu-mavi">
                        <path fill="currentColor" d="M440,128h-80V80c0-26.51-21.49-48-48-48H200c-26.51,0-48,21.49-48,48v48H80c-26.51,0-48,21.49-48,48v256c0,26.51,21.49,48,48,48h360c26.51,0,48-21.49,48-48V176C488,149.49,466.51,128,440,128z M184,80c0-8.84,7.16-16,16-16h112c8.84,0,16,7.16,16,16v48H184V80z M456,432c0,8.84-7.16,16-16,16H72c-8.84,0-16-7.16-16-16V176c0-8.84,7.16-16,16-16h360c8.84,0,16,7.16,16,16V432z"/>
                        <path fill="currentColor" d="M267.2,260.8c-5.26-5.26-13.7-5.26-18.96,0L196.8,312.23c-5.26,5.26-5.26,13.7,0,18.96c2.63,2.63,6.06,3.94,9.49,3.94c3.43,0,6.87-1.31,9.5-3.94l51.45-51.43C272.5,274.5,272.5,266.06,267.2,260.8z"/>
                        <path fill="currentColor" d="M218.28,234.7c-3.12-5.24-9.84-6.94-15.05-3.83c-5.24,3.12-6.94,9.84-3.83,15.05l49.64,83.64c2.05,3.45,5.73,5.36,9.46,5.36c1.91,0,3.85-0.5,5.59-1.53c5.24-3.12,6.94-9.84,3.83-15.05L218.28,234.7z"/>
                        <path fill="currentColor" d="M315.3,291.2c-5.26-5.26-13.7-5.26-18.96,0L245.9,342.63c-5.26,5.26-5.26,13.7,0,18.96c2.63,2.63,6.06,3.94,9.49,3.94c3.43,0,6.87-1.31,9.5-3.94l50.42-50.43C320.57,304.9,320.57,296.45,315.3,291.2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-center text-gray-500 text-sm">
              Yardıma ihtiyacınız varsa, lütfen <Link to="/iletisim" className="text-koyu-mavi hover:underline">iletişim</Link> sayfasından bize ulaşın.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 