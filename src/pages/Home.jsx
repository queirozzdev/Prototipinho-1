import React from "react";
import { Link } from "react-router-dom";
import {
  FaTint,
  FaUsers,
  FaHeart,
  FaHospital,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaCalendar,
  FaBell,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Home = () => {
  const stats = [
    { number: "1.500+", label: "DOAÇÕES", icon: FaTint },
    { number: "12", label: "CAMPANHAS", icon: FaUsers },
    { number: "6.000+", label: "VIDAS IMPACTADAS", icon: FaHeart },
  ];

  const impactStats = [
    {
      number: "1.500+",
      label: "Doações Realizadas",
      description: "este mês",
      icon: FaTint,
    },
    {
      number: "12",
      label: "Campanhas Ativas",
      description: "em diferentes bairros",
      icon: FaUsers,
    },
    {
      number: "6.000+",
      label: "Vidas Impactadas",
      description: "em 2024",
      icon: FaHeart,
    },
    {
      number: "15",
      label: "Hospitais Atendidos",
      description: "na região",
      icon: FaHospital,
    },
  ];

  const featuredCampaigns = [
    {
      status: "urgent",
      title: "Campanha Solidária - Feira VI",
      location: "Feira VI",
      date: "25-26 Março",
      goal: "Meta: 50 doadores",
      progress: 60,
    },
    {
      status: "active",
      title: "Doe Vida - Tomba",
      location: "Tomba",
      date: "27-28 Março",
      goal: "Meta: 30 doadores",
      progress: 40,
    },
  ];

  const appFeatures = [
    {
      icon: FaBell,
      title: "Notificações",
      description: "Alertas de campanhas próximas",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Localização",
      description: "Encontre pontos de doação",
    },
    {
      icon: FaCalendarCheck,
      title: "Agendamento",
      description: "Marque sua doação facilmente",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Stats Banner */}
      <section className="bg-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center ml-[300px]">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center ml-[500px]">
              <Link to="/create-campaign" className="btn-primary-custom">
                Criar Campanha
              </Link>
              <Link to="/campaigns" className="btn-secondary-custom">
                Ver Campanhas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="bg-warning text-secondary-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaExclamationCircle className="text-2xl animate-pulse" />
              <h3 className="text-lg font-semibold">
                Urgente: Tipo O- em Baixa
              </h3>
            </div>
            <Link to="/campaigns" className="btn-accent-custom">
              Doar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-800 mb-12">
            Nosso Impacto em Feira de Santana
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="card-custom p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  {stat.label}
                </h3>
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  {stat.number}
                </div>
                <p className="text-secondary-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-800">
              Campanhas em Destaque
            </h2>
            <Link
              to="/campaigns"
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-300"
            >
              Ver Todas
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCampaigns.map((campaign, index) => (
              <div key={index} className="card-custom p-6">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                    campaign.status === "urgent"
                      ? "status-urgent"
                      : "status-active"
                  }`}
                >
                  {campaign.status === "urgent" ? "Urgente" : "Ativa"}
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
                    <FaCalendar className="text-primary-500" />
                    <span>{campaign.date}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-secondary-600">
                    <FaUsers className="text-primary-500" />
                    <span>{campaign.goal}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <div className="progress-custom">
                    <div
                      className="progress-fill"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="btn-primary-custom w-full text-center"
                >
                  Participar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promotion */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">
              App HemoByte
            </h2>
            <p className="text-xl mb-12 opacity-90 text-black">
              Transforme vidas com apenas alguns toques
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-xl text-black" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold mb-2 text-red-600">
                      {feature.title}
                    </h4>
                    <p className="opacity-90 text-black">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="flex items-center space-x-3 bg-black bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">BAIXE NO</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 bg-black bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">DISPONÍVEL NA</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
