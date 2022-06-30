import { Routes, Route, Link } from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRouter";
import CreatePostPage from "./pages/CreatePostPage";
import Login from "./pages/Login";
import MessagePage from "./pages/MessagePage";
import MyProfilePage from "./pages/MyProfilePage";
import Newsfeed from "./pages/Newsfeed";
import NotAuth from "./pages/NotAuth";
import NotFound from "./pages/NotFound";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route
        path="newsfeed"
        element={
          <ProtectedRouter>
            <Newsfeed />
          </ProtectedRouter>
        }
      />

      <Route
        path="search"
        element={
          <ProtectedRouter>
            <SearchPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="create-post"
        element={
          <ProtectedRouter>
            <CreatePostPage />
          </ProtectedRouter>
        }
      />

      <Route path="message">
        <Route
          path=":userId"
          element={
            <ProtectedRouter>
              <MessagePage />
            </ProtectedRouter>
          }
        />
      </Route>

      <Route path="post">
        <Route
          path=":postId"
          element={
            <ProtectedRouter>
              <PostDetailPage />
            </ProtectedRouter>
          }
        />
      </Route>

      {/* <Route path="profile">
        <Route
          path=":userId"
          element={
            <ProtectedRouter>
              <ProfilePage />
            </ProtectedRouter>
          }
        />
      </Route> */}

      <Route path="profile">
        <Route
          path=":userId"
          element={
            <ProtectedRouter>
              <ProfilePage />
            </ProtectedRouter>
          }
        />
        <Route
          path="me"
          element={
            <ProtectedRouter>
              <MyProfilePage />
            </ProtectedRouter>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="not-auth" element={<NotAuth />} />
    </Routes>
  );
}

export default App;
