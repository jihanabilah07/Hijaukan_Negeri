import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil detail postingan');
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4e9]">
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail postingan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4e9] font-sans">
      <div className="relative container mx-auto px-8 md:px-24 py-16">
        <Link
          to="/posts"
          className="absolute top-4 left-4 flex items-center text-green-900 hover:underline z-10 bg-white px-3 py-1 rounded-full shadow-md"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </Link>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : !post ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Postingan tidak ditemukan.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8 p-8">
            <h1 className="text-3xl font-bold text-green-900 mb-6">{post.title}</h1>
            
            {post.image && (
              <div className="w-full mb-8">
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full object-contain max-h-[80vh]"
                />
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                {post.location}
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {post.description}
              </p>
            </div>

            {post.author && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Dibuat oleh: <span className="font-semibold">{post.author.nama || 'Anonymous'}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Diposting pada: {new Date(post.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;