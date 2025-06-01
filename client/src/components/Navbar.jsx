import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Tree Planting
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              // Menu for authenticated users
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-post"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Buat Post
                </Link>
                <Link
                  to="/create-community"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Buat Komunitas
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              // Menu for non-authenticated users
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 