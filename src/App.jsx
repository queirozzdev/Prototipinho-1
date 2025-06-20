import React from "react";
import { Routes, Route } from "react-router-dom";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import { ReactPlugin } from "@stagewise-plugins/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import CriarCampanha from "./pages/CriarCampanha.tsx";
import Profile from "./pages/Profile.tsx";
import About from "./pages/About.jsx";
import Instructions from "./pages/Instructions.tsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      )}
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/about" element={<About />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route
                path="/create-campaign"
                element={
                  <ProtectedRoute>
                    <CriarCampanha />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
