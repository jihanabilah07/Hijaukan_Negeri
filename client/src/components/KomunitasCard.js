const KonservasiCard = ({ lokasi }) => (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={lokasi.image} alt={lokasi.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{lokasi.name}</h3>
        <p className="text-sm text-gray-600">{lokasi.description}</p>
      </div>
    </div>
  );
  
  export default KonservasiCard;