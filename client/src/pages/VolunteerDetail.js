import React from 'react';
import { useParams } from 'react-router-dom';

const VolunteerDetail = () => {
  const { id } = useParams(); // asumsi URL-nya /volunteer/:id

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detail Relawan</h2>
      <p>Menampilkan detail kegiatan relawan dengan ID: {id}</p>
    </div>
  );
};

export default VolunteerDetail;
