import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaTint,
  FaHome,
  FaMapMarkerAlt,
  FaPlusCircle,
  FaInfoCircle,
  FaUser,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", icon: FaHome, title: "Início" },
    { path: "/campaigns", icon: FaMapMarkerAlt, title: "Campanhas" },
    { path: "/create-campaign", icon: FaPlusCircle, title: "Criar Campanha" },
    { path: "/about", icon: FaInfoCircle, title: "Sobre" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors duration-300"
          >
            <FaTint className="text-2xl" />
            <span className="text-xl font-bold">HemoByte</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-[70px]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary-500 bg-primary-50"
                    : "text-secondary-600 hover:text-primary-500 hover:bg-secondary-50"
                }`}
                title={item.title}
              >
                <item.icon className="text-lg" />
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            ))}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors duration-300"
                  title="Perfil"
                >
                  <FaUserCircle className="text-lg" />
                  <span className="hidden lg:inline">
                    {user.nome?.split(" ")[0] || "Perfil"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-secondary-600 hover:text-primary-500 transition-colors duration-300"
                  title="Sair"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
                title="Login"
              >
                <FaUser className="text-lg" />
                <span className="hidden lg:inline">Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary-600 hover:text-primary-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? "text-primary-500 bg-primary-50"
                      : "text-secondary-600 hover:text-primary-500 hover:bg-secondary-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="text-lg" />
                  <span>{item.title}</span>
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {user ? (
                <div className="border-t border-secondary-200 pt-4 mt-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserCircle className="text-lg" />
                    <span>{user.nome?.split(" ")[0] || "Perfil"}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center space-x-3 px-4 py-3 text-secondary-600 hover:text-primary-500 transition-colors duration-300"
                  >
                    <FaUser className="text-lg" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="text-lg" />
                  <span>Login</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
