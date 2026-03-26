import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { FiClock, FiMapPin, FiPhone, FiMail, FiInfo, FiCalendar } from "react-icons/fi";
import {
  createReservation,
  selectReservationCreateError,
  selectReservationCreating,
  selectReservationCreateSuccess,
  clearCreateState,
} from "../store/slices/reservationSlice";

const inputClass =
  "w-full px-4 py-3 border border-shell rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors bg-canvas/50 text-ink placeholder:text-smoke/60 text-sm";
const labelClass = "block text-xs font-semibold text-smoke uppercase tracking-wider mb-2";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    message: "",
  });

  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectReservationCreating);
  const submitError = useSelector(selectReservationCreateError);
  const submitSuccess = useSelector(selectReservationCreateSuccess);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerName: formData.name.trim(),
      customerSurname: formData.surname?.trim() || "-",
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      reservationDate: formData.date,
      reservationTime: formData.time,
      guestCount: Number(formData.guests),
      tableNumber: undefined,
      specialRequests: formData.message?.trim() || undefined,
    };

    dispatch(createReservation(payload));
  };

  useEffect(() => {
    if (submitSuccess) {
      alert("Rezervasyon talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.");
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        message: "",
      });
      dispatch(clearCreateState());
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (submitError) {
      const msg = typeof submitError === "string" ? submitError : submitError?.message;
      const details = submitError?.details;
      let detailText = "";

      if (details && typeof details === "object") {
        detailText =
          "\n" +
          Object.entries(details)
            .map(([key, value]) => `- ${key}: ${value}`)
            .join("\n");
      }

      alert((msg || "Hata oluştu") + detailText);
      dispatch(clearCreateState());
    }
  }, [submitError, dispatch]);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 11; h <= 23; h++) {
      for (const m of [0, 30]) {
        if (h === 23 && m > 0) continue;
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <div className="bg-gradient-to-br from-paper via-canvas to-blush pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest border border-brand-red/20">
              <FiCalendar className="w-3.5 h-3.5" />
              Masa Rezervasyonu
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 leading-tight">
              Yerinizi Ayırtın
            </h1>
            <p className="text-smoke text-lg max-w-xl mx-auto leading-relaxed">
              Ala Söğüş&apos;te masanız hazır olsun. Formu doldurun, en kısa
              sürede size ulaşalım.
            </p>
          </Motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — 3 cols */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-shell/30 p-8"
          >
            <h2 className="text-xl font-bold text-ink mb-7">Rezervasyon Formu</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Ad *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label htmlFor="surname" className={labelClass}>Soyad *</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>E-posta *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="ornek@eposta.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className={labelClass}>Tarih *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>Saat *</label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">Seçiniz</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="guests" className={labelClass}>Kişi Sayısı *</label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} Kişi
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Özel Notlar</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Alerji, özel talep veya ek notlarınızı yazabilirsiniz."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red hover:bg-brand-red-deep text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Gönderiliyor..." : "Rezervasyon Talebi Gönder"}
              </button>
            </form>
          </Motion.div>

          {/* Sidebar — 2 cols */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Çalışma Saatleri */}
            <div className="bg-white rounded-2xl shadow-sm border border-shell/30 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center">
                  <FiClock className="w-4.5 h-4.5 text-brand-red" />
                </div>
                <h3 className="text-base font-bold text-ink">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { gun: "Pazartesi – Cuma", saat: "11:00 – 23:00" },
                  { gun: "Cumartesi", saat: "11:00 – 23:30" },
                  { gun: "Pazar", saat: "12:00 – 22:00" },
                ].map(({ gun, saat }) => (
                  <div key={gun} className="flex justify-between items-center py-2 border-b border-shell/30 last:border-0">
                    <span className="text-sm text-smoke">{gun}</span>
                    <span className="text-sm font-semibold text-ink">{saat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <div className="bg-white rounded-2xl shadow-sm border border-shell/30 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center">
                  <FiPhone className="w-4.5 h-4.5 text-brand-red" />
                </div>
                <h3 className="text-base font-bold text-ink">İletişim</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiPhone className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-smoke font-semibold uppercase tracking-wider mb-0.5">Telefon</p>
                    <a href="tel:+905369151144" className="text-sm font-medium text-ink hover:text-brand-red transition-colors">
                      +90 (536) 915 11 44
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMail className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-smoke font-semibold uppercase tracking-wider mb-0.5">E-posta</p>
                    <a href="mailto:iletisim@alasogus.com" className="text-sm font-medium text-ink hover:text-brand-red transition-colors">
                      iletisim@alasogus.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-smoke font-semibold uppercase tracking-wider mb-0.5">Adres</p>
                    <p className="text-sm font-medium text-ink leading-relaxed">
                      Altındağ, Anafartalar Cd. No:73 D:1<br />
                      07050 Muratpaşa/Antalya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Önemli Bilgiler */}
            <div className="bg-gradient-to-br from-brand-red/5 to-blush rounded-2xl border border-brand-red/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center">
                  <FiInfo className="w-4.5 h-4.5 text-brand-red" />
                </div>
                <h3 className="text-base font-bold text-ink">Bilmeniz Gerekenler</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Rezervasyon talepleri uygunluğa göre onaylanır.",
                  "8 kişi ve üzeri gruplar için doğrudan arayın.",
                  "Plan değişikliğinde en az 2 saat önce haber verin.",
                  "Sizi Ala Söğüş'te ağırlamayı sabırsızlıkla bekliyoruz.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-smoke leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
