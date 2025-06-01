import React from 'react';

const KonservasiCard = ({ lokasi }) => {
  if (!lokasi) {
    return <div className="text-red-500">Data lokasi tidak tersedia.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img
        src={lokasi.image || '/default.jpg'}
        alt={lokasi.name || 'Lokasi Konservasi'}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{lokasi.name}</h3>
      <p className="text-sm text-gray-600">{lokasi.description}</p>
    </div>
  );
};

export default KonservasiCard;
