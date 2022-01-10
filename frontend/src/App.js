import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import RequireAuth from "./components/ProtectedRoute";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import UserProfile from "./screens/UserProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
