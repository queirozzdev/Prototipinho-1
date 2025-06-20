import React, { useState } from "react";
import {
  FaUserCircle,
  FaCalendar,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarCheck,
  FaCheckCircle,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext.jsx";

interface Donation {
  date: string;
  status: string;
}

interface UserProfile {
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  endereco: string;
  tipoSanguineo: string;
  historico: Donation[];
}

const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [showConfig, setShowConfig] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nome: user?.nome || "Carregando...",
    email: user?.email || "Carregando...",
    dataNascimento: user?.dataNascimento || "",
    telefone: user?.telefone || "",
    endereco: user?.endereco || "",
    tipoSanguineo: user?.tipoSanguineo || "",
    historico: [
      { date: "15/03/2024", status: "Doação Realizada" },
      { date: "10/09/2023", status: "Doação Realizada" },
    ],
  });

  const handleConfigChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profile);
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="profile-header text-center mb-8">
          <div className="profile-avatar w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserCircle className="text-6xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-800 mb-1">
            {profile.nome}
          </h1>
          <p className="profile-email text-secondary-600">{profile.email}</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowConfig(true)}
              className="btn-secondary-custom flex items-center gap-2"
            >
              <FaCog /> Configurações
            </button>
            <button
              onClick={logout}
              className="btn-primary-custom flex items-center gap-2"
            >
              <FaSignOutAlt /> Sair
            </button>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="profile-section card-custom p-6 mb-8">
          <h2 className="text-xl font-bold text-secondary-800 mb-4">
            Informações Pessoais
          </h2>
          <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="info-item flex items-start gap-3">
              <FaCalendar className="text-primary-500 text-xl mt-1" />
              <div>
                <label className="block text-secondary-600 text-sm">
                  Data de Nascimento
                </label>
                <p className="font-medium text-secondary-800">
                  {profile.dataNascimento || "Não informado"}
                </p>
              </div>
            </div>
            <div className="info-item flex items-start gap-3">
              <FaPhone className="text-primary-500 text-xl mt-1" />
              <div>
                <label className="block text-secondary-600 text-sm">
                  Telefone
                </label>
                <p className="font-medium text-secondary-800">
                  {profile.telefone || "Não informado"}
                </p>
              </div>
            </div>
            <div className="info-item flex items-start gap-3">
              <FaMapMarkerAlt className="text-primary-500 text-xl mt-1" />
              <div>
                <label className="block text-secondary-600 text-sm">
                  Endereço
                </label>
                <p className="font-medium text-secondary-800">
                  {profile.endereco || "Não informado"}
                </p>
              </div>
            </div>
            <div className="info-item flex items-start gap-3">
              <FaTint className="text-primary-500 text-xl mt-1" />
              <div>
                <label className="block text-secondary-600 text-sm">
                  Tipo Sanguíneo
                </label>
                <p className="font-medium text-secondary-800">
                  {profile.tipoSanguineo || "Não informado"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Doações */}
        <div className="profile-section card-custom p-6 mb-8">
          <h2 className="text-xl font-bold text-secondary-800 mb-4">
            Histórico de Doações
          </h2>
          <div className="donation-history flex flex-col gap-4">
            {profile.historico.map((item, idx) => (
              <div key={idx} className="donation-item flex items-center gap-6">
                <div className="donation-date flex items-center gap-2 text-secondary-700">
                  <FaCalendarCheck className="text-success" />
                  <span>{item.date}</span>
                </div>
                <div className="donation-status flex items-center gap-2 text-success">
                  <FaCheckCircle />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Configurações */}
        {showConfig && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="modal-content bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
              <div className="modal-header flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Configurações</h2>
                <button
                  className="close-modal text-2xl text-secondary-500 hover:text-primary-500"
                  onClick={() => setShowConfig(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleConfigSubmit} className="space-y-4">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={profile.nome}
                    onChange={handleConfigChange}
                    className="input-custom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleConfigChange}
                    className="input-custom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={profile.telefone}
                    onChange={handleConfigChange}
                    className="input-custom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Endereço</label>
                  <input
                    type="text"
                    name="endereco"
                    value={profile.endereco}
                    onChange={handleConfigChange}
                    className="input-custom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo Sanguíneo</label>
                  <select
                    name="tipoSanguineo"
                    value={profile.tipoSanguineo}
                    onChange={handleConfigChange}
                    className="input-custom"
                    required
                  >
                    <option value="">Selecione</option>
                    {tiposSanguineos.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-actions flex gap-4 mt-6">
                  <button type="submit" className="btn-primary-custom">
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-custom"
                    onClick={() => setShowConfig(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
