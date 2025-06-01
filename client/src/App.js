import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import VolunteerDetail from './pages/VolunteerDetail';
import ManageCommunity from './pages/ManageCommunity';
import TempatKonservasi from './pages/TempatKonservasi';
import AllPosts from './pages/AllPosts';
import AllCommunities from './pages/AllCommunities';
import CommunityDetail from './pages/CommunityDetail';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Halaman yang tidak membutuhkan autentikasi */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/TempatKonservasi" element={<TempatKonservasi />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/communities" element={<AllCommunities />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/community/:id" element={<CommunityDetail />} />

        {/* Halaman-halaman yang memerlukan autentikasi */}
        <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated() ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/manage-community" element={isAuthenticated() ? <ManageCommunity /> : <Navigate to="/login" />} />
        <Route path="/volunteer/seulawah" element={isAuthenticated() ? <VolunteerDetail /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;