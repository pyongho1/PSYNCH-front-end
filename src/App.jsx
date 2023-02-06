// npm modules
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import NewPost from "./pages/NewPost/NewPost";
import Profile from "./pages/Profile/Profile";
import MainFeed from "./pages/MainFeed/MainFeed";
import PendingRequests from "./components/FriendRequests/PendingRequests/PendingRequests";
import PostDetails from "./pages/PostDetails/PostDetails";

// components
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./services/authService";
import * as emotionPostService from "./services/emotionPostService";

// styles
import "./App.css";


const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout();
    setUser(null);
    navigate("/");
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  };

  const [posts, setPosts] = useState([]);

  const handleAddPost = async (postData) => {
    const newPost = await emotionPostService.create(postData);
    setPosts([newPost, ...posts]);
    navigate("/global-feed");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await emotionPostService.index();
      setPosts(postData);
      // console.log("Data:", postData);
      // console.log("Posts:", posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute user={user}>
              <NewPost handleAddPost={handleAddPost} />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile/:id" 
          element={
          <ProtectedRoute user={user}>
            <Profile user={user}/>
          </ProtectedRoute>
      } />
        <Route 
          path="/profile/requests" 
          element={
          <ProtectedRoute user={user}>
            <PendingRequests user={user}/>
          </ProtectedRoute>
      } />
      <Route 
          path="/main-feed" 
          element={
          <MainFeed posts={posts} />
        } />
      </Routes>
    </>
  );
};

export default App;
