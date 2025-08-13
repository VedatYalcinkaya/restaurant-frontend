import React from 'react';
import { motion } from 'motion/react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

const ContactModal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative z-[9999]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <div className="space-y-3">
          <a 
            href="tel:+905551234567" 
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            <FaPhone className="mr-2" /> Telefon ile Arayın
          </a>
          
          <Link 
            to="/iletisim" 
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            <FaEnvelope className="mr-2" /> İletişim Formunu Kullanın
          </Link>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ContactModal; 