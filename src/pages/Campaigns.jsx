import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaSearch,
  FaExclamationCircle,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTint,
  FaUsers,
} from "react-icons/fa";

const Campaigns = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    bairro: "",
    tipoSanguineo: "",
    status: "",
    data: "",
  });

  // Dados mockados das campanhas
  const campaigns = [
    {
      id: 1,
      status: "urgent",
      title: "Campanha de Doação - Feira VI",
      location: "Feira VI, Feira de Santana",
      date: "15 de Maio, 2024",
      time: "08:00 - 17:00",
      bloodType: "A+",
      progress: 40,
      goal: 50,
      current: 20,
    },
    {
      id: 2,
      status: "urgent",
      title: "Doação Emergencial - Centro",
      location: "Centro, Feira de Santana",
      date: "16 de Maio, 2024",
      time: "09:00 - 16:00",
      bloodType: "O-",
      progress: 30,
      goal: 40,
      current: 12,
    },
    {
      id: 3,
      status: "active",
      title: "Doe Vida - Tomba",
      location: "Tomba, Feira de Santana",
      date: "20 de Maio, 2024",
      time: "09:00 - 16:00",
      bloodType: "B+",
      progress: 60,
      goal: 30,
      current: 18,
    },
    {
      id: 4,
      status: "active",
      title: "Campanha Universitária - UEFS",
      location: "UEFS, Feira de Santana",
      date: "22 de Maio, 2024",
      time: "08:00 - 17:00",
      bloodType: "AB+",
      progress: 45,
      goal: 50,
      current: 22,
    },
    {
      id: 5,
      status: "active",
      title: "Campanha Solidária - Queimadinha",
      location: "Queimadinha, Feira de Santana",
      date: "25 de Maio, 2024",
      time: "08:00 - 15:00",
      bloodType: "O+",
      progress: 20,
      goal: 40,
      current: 8,
    },
    {
      id: 6,
      status: "planning",
      title: "Unidos pelo Sangue - Serraria Brasil",
      location: "Serraria Brasil, Feira de Santana",
      date: "1-2 de Junho, 2024",
      time: "08:00 - 16:00",
      bloodType: "A-",
      progress: 0,
      goal: 60,
      current: 0,
    },
  ];

  const bairros = [
    "Todos os Bairros",
    "Feira VI",
    "Tomba",
    "Centro",
    "Queimadinha",
    "Cidade Nova",
    "UEFS",
    "Serraria Brasil",
  ];

  const tiposSanguineos = [
    "Todos os Tipos Sanguíneos",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const statusOptions = ["Todos os Status", "Urgente", "Ativa", "Planejamento"];

  const dataOptions = [
    "Todas as Datas",
    "Hoje",
    "Amanhã",
    "Esta Semana",
    "Este Mês",
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBairro =
      !filters.bairro ||
      filters.bairro === "Todos os Bairros" ||
      campaign.location.includes(filters.bairro);

    const matchesTipoSanguineo =
      !filters.tipoSanguineo ||
      filters.tipoSanguineo === "Todos os Tipos Sanguíneos" ||
      campaign.bloodType === filters.tipoSanguineo;

    const matchesStatus =
      !filters.status ||
      filters.status === "Todos os Status" ||
      campaign.status === filters.status.toLowerCase();

    return (
      matchesSearch && matchesBairro && matchesTipoSanguineo && matchesStatus
    );
  });

  const urgentCampaigns = filteredCampaigns.filter(
    (c) => c.status === "urgent"
  );
  const activeCampaigns = filteredCampaigns.filter(
    (c) => c.status === "active"
  );
  const planningCampaigns = filteredCampaigns.filter(
    (c) => c.status === "planning"
  );

  const renderCampaignCard = (campaign) => (
    <div key={campaign.id} className="card-custom p-6">
      <div
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
          campaign.status === "urgent"
            ? "status-urgent"
            : campaign.status === "active"
            ? "status-active"
            : "status-planning"
        }`}
      >
        {campaign.status === "urgent"
          ? "Urgente"
          : campaign.status === "active"
          ? "Ativa"
          : "Planejamento"}
      </div>

      <h3 className="text-xl font-semibold text-secondary-800 mb-4">
        {campaign.title}
      </h3>

      <div className="space-y-2 mb-4">
        <p className="flex items-center space-x-2 text-secondary-600">
          <FaMapMarkerAlt className="text-primary-500" />
          <span>{campaign.location}</span>
        </p>
        <p className="flex items-center space-x-2 text-secondary-600">
          <FaCalendarAlt className="text-primary-500" />
          <span>{campaign.date}</span>
        </p>
        <p className="flex items-center space-x-2 text-secondary-600">
          <FaClock className="text-primary-500" />
          <span>{campaign.time}</span>
        </p>
        <p className="flex items-center space-x-2 text-secondary-600">
          <FaTint className="text-primary-500" />
          <span>Tipo Sanguíneo: {campaign.bloodType}</span>
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-secondary-600 mb-2">
          <span>
            Progresso: {campaign.current}/{campaign.goal} doadores
          </span>
          <span>{campaign.progress}%</span>
        </div>
        <div className="progress-custom">
          <div
            className="progress-fill"
            style={{ width: `${campaign.progress}%` }}
          ></div>
        </div>
      </div>

      <Link
        to={user ? `/campaign/${campaign.id}` : "/login"}
        className="btn-primary-custom w-full text-center"
      >
        Participar
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-800 mb-4">
            Campanhas Ativas em Feira de Santana
          </h1>
          <p className="text-xl text-secondary-600">
            Encontre e participe de campanhas de doação próximas a você
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card-custom p-6 mb-8">
          {/* Search */}
          <div className="flex mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar campanhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-custom pr-12"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={filters.bairro}
              onChange={(e) => handleFilterChange("bairro", e.target.value)}
              className="input-custom"
            >
              {bairros.map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>

            <select
              value={filters.tipoSanguineo}
              onChange={(e) =>
                handleFilterChange("tipoSanguineo", e.target.value)
              }
              className="input-custom"
            >
              {tiposSanguineos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="input-custom"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={filters.data}
              onChange={(e) => handleFilterChange("data", e.target.value)}
              className="input-custom"
            >
              {dataOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campaigns Sections */}
        {urgentCampaigns.length > 0 && (
          <section className="mb-12">
            <h2 className="flex items-center space-x-2 text-2xl font-bold text-secondary-800 mb-6">
              <FaExclamationCircle className="text-danger" />
              <span>Campanhas Urgentes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentCampaigns.map(renderCampaignCard)}
            </div>
          </section>
        )}

        {activeCampaigns.length > 0 && (
          <section className="mb-12">
            <h2 className="flex items-center space-x-2 text-2xl font-bold text-secondary-800 mb-6">
              <FaCheckCircle className="text-success" />
              <span>Campanhas Ativas</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map(renderCampaignCard)}
            </div>
          </section>
        )}

        {planningCampaigns.length > 0 && (
          <section className="mb-12">
            <h2 className="flex items-center space-x-2 text-2xl font-bold text-secondary-800 mb-6">
              <FaCalendarAlt className="text-warning" />
              <span>Próximas Campanhas</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningCampaigns.map(renderCampaignCard)}
            </div>
          </section>
        )}

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="text-6xl text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-600 mb-2">
              Nenhuma campanha encontrada
            </h3>
            <p className="text-secondary-500">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
