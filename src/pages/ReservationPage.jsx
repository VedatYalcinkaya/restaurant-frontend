import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, selectReservationCreateError, selectReservationCreating, selectReservationCreateSuccess, clearCreateState } from '../store/slices/reservationSlice';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    message: ''
  });

  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectReservationCreating);
  const submitError = useSelector(selectReservationCreateError);
  const submitSuccess = useSelector(selectReservationCreateSuccess);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      customerName: formData.name.trim(),
      customerSurname: formData.surname?.trim() || '-',
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      reservationDate: formData.date, // yyyy-MM-dd
      reservationTime: formData.time, // HH:mm
      guestCount: Number(formData.guests),
      tableNumber: undefined,
      specialRequests: formData.message?.trim() || undefined,
    };

    dispatch(createReservation(payload));
  };

  // Başarı/başarısızlık geri bildirimleri
  useEffect(() => {
    if (submitSuccess) {
      alert('Ihre Reservierung wurde erfolgreich übermittelt! Wir melden uns bald bei Ihnen.');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2, message: '' });
      dispatch(clearCreateState());
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (submitError) {
      const msg = typeof submitError === 'string' ? submitError : submitError?.message;
      const details = submitError?.details;
      let detailText = '';
      if (details && typeof details === 'object') {
        detailText = '\n' + Object.entries(details).map(([k, v]) => `• ${k}: ${v}`).join('\n');
      }
      alert((msg || 'Hata oluştu') + detailText);
      dispatch(clearCreateState());
    }
  }, [submitError, dispatch]);

  // 11:00–23:00 arası her 30 dk slot
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 11; h <= 23; h++) {
      for (const m of [0, 30]) {
        if (h === 23 && m > 0) continue;
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }, []);

  return (
    <div className="min-h-screen bg-acik-krem py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-koyu-kahve mb-4">
            Tisch reservieren
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reservieren Sie Ihren Tisch für ein unvergessliches kulinarisches Erlebnis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Rezervasyon Formu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-koyu-kahve mb-6">
              Reservierungsanfrage
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                    placeholder="Ihr Nachname"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                  placeholder="+49 221 123 456"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Datum *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Uhrzeit *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                  >
                    <option value="">Wählen Sie</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                    Personen *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'Personen'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Besondere Wünsche
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-altin focus:border-transparent transition-colors"
                  placeholder="Haben Sie besondere Wünsche oder Allergien?"
                />
              </div>
              {/* Submit Button - her zaman görünür */}
              <div className="sticky bottom-0 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-koyu-kirmizi hover:bg-daha-koyu-kirmizi text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Reservierung anfragen'}
              </button>
              </div>
            </form>
          </motion.div>

          {/* Restaurant Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-koyu-kahve mb-4">
                Öffnungszeiten
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Montag - Donnerstag:</span>
                  <span>17:30 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Freitag - Samstag:</span>
                  <span>17:30 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag:</span>
                  <span>12:00 - 21:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-koyu-kahve mb-4">
                Kontakt
              </h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <strong>Telefon:</strong><br />
                  +49 221 123 456
                </div>
                <div>
                  <strong>E-Mail:</strong><br />
                  info@esszimmer-koeln.de
                </div>
                <div>
                  <strong>Adresse:</strong><br />
                  Musterstraße 123<br />
                  50667 Köln
                </div>
              </div>
            </div>

            <div className="bg-krem rounded-xl p-8">
              <h3 className="text-xl font-bold text-koyu-kahve mb-4">
                Wichtige Hinweise
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reservierungen werden nach Verfügbarkeit bestätigt</li>
                <li>• Bei Gruppen ab 8 Personen kontaktieren Sie uns bitte direkt</li>
                <li>• Stornierungen bitte mindestens 2 Stunden vorher</li>
                <li>• Wir freuen uns auf Ihren Besuch!</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
