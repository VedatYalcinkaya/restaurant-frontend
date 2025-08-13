/**
 * Bir tarih nesnesini veya tarih formatındaki string'i Türkçe formatına dönüştürür
 * @param {Date|string} date - Formatlanacak tarih
 * @returns {string} Formatlanmış tarih string'i
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  return dateObj.toLocaleDateString('tr-TR', options);
};

/**
 * Bir tarih nesnesini veya tarih formatındaki string'i kısa Türkçe formatına dönüştürür
 * @param {Date|string} date - Formatlanacak tarih
 * @returns {string} Formatlanmış tarih string'i
 */
export const formatShortDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  return dateObj.toLocaleDateString('tr-TR', options);
}; 