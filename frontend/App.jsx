import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home/Home.jsx';
import LoginPage from './views/LoginPage/LoginPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import RegisterPage from './views/RegisterPage/RegisterPage.jsx';
import Cart from './views/Cart/Cart.jsx';
import Posts from './views/Posts/Posts.jsx';
import NewPost from './views/NewPost/NewPost.jsx';
import Profile from './views/Profile/Profile.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/nanomarket" />} />
        <Route path="/nanomarket" element={<Home />} />
        <Route path="/nanomarket/login" element={<LoginPage />} />
        <Route path="/nanomarket/register" element={<RegisterPage />} />
        <Route path="/nanomarket/cart" element={<Cart />} />
        <Route path="/nanomarket/posts" element={<Posts />} />
        <Route path="/nanomarket/newpost" element={<NewPost />} />
        <Route path="/nanomarket/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/nanomarket" />} />
      </Routes>
    </>
  );
}

export default App;





