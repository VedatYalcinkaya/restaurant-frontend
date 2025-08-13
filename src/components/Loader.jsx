import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
};

export default Loader; 