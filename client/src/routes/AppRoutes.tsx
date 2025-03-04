import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import NewsDetail from "../pages/NewsDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPanel from "../pages/SavedArticles";
import SavedArticles from "../pages/SavedArticles";
import History from "../pages/History";

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/saved-articles" element={<SavedArticles />}/>
      <Route path="/search-history." element={<History />}/>
      <Route path="/admin" element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
    </Routes>
  );
}
