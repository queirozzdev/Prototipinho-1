import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "/api/login.php",
        {
          email,
          senha,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Login realizado com sucesso!");
        return true;
      } else {
        toast.error(response.data.error || "Erro ao fazer login");
        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao conectar com o servidor");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }

      const response = await axios.post("/api/cadastrar.php", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.success) {
        const newUser = response.data.user;
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast.success("Cadastro realizado com sucesso!");
        return true;
      } else {
        const errorMessage = Array.isArray(response.data.errors)
          ? response.data.errors.join("\n")
          : response.data.error || "Erro ao cadastrar";
        toast.error(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao conectar com o servidor");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
