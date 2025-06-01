const ArticleCard = ({ artikel }) => (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={artikel.image} alt={artikel.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{artikel.title}</h3>
        <p className="text-sm text-gray-600">{artikel.excerpt}</p>
      </div>
    </div>
  );
  
  export default ArticleCard;