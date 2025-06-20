import React from "react";
import { Link } from "react-router-dom";
import { FaTint, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-start items-end">
          {/* Logo - Canto inferior esquerdo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 mb-4 md:mb-0"
          >
            <FaTint className="text-2xl" />
            <span className="text-xl font-bold">HemoByte</span>
          </Link>

          {/* Copyright - Centralizado */}
          <div className="text-secondary-400 text-sm mb-4 md:mb-0 ml-[1000px]">
            © 2024 HemoByte. Todos os direitos reservados.
          </div>
        </div>

        {/* Navigation Links - Canto inferior direito */}
        <div className="flex justify-end mt-4">
          <nav className="flex items-center space-x-6 mr-[150px]">
            <Link
              to="/campaigns"
              className="text-secondary-300 hover:text-white transition-colors duration-300"
            >
              Campanhas
            </Link>
            <Link
              to="/about"
              className="text-secondary-300 hover:text-white transition-colors duration-300"
            >
              Sobre
            </Link>
            <a
              href="https://wa.me/75981829675"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-1"
            >
              <FaWhatsapp className="text-lg" />
              <span>Contato</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
