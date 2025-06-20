import React from "react";
import {
  FaCheckCircle,
  FaUser,
  FaWeight,
  FaBed,
  FaUtensils,
  FaIdCard,
  FaClock,
  FaHeadSideCough,
  FaBaby,
  FaPaintBrush,
  FaProcedures,
  FaCalendarAlt,
  FaMars,
  FaVenus,
  FaMapMarkerAlt,
  FaHospitalAlt,
  FaMapPin,
  FaPhone,
  FaArrowLeft,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Instructions: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">
          Instruções para Doação
        </h1>
        <p className="instructions-subtitle mb-8">
          Confira os requisitos e informações importantes para doar sangue
        </p>
        <div className="instructions-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Requisitos Básicos */}
          <section className="instruction-card card-custom p-6">
            <div className="card-header flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-success text-xl" />
              <h2 className="text-lg font-bold">Requisitos Básicos</h2>
            </div>
            <ul className="requirements-list space-y-4">
              <li className="flex gap-3">
                <FaUser className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Idade entre 16 e 69 anos</h3>
                  <p>Menores de 18 anos precisam de autorização</p>
                  <p>Maiores de 60 anos: histórico de doação regular</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaWeight className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Peso mínimo: 50kg</h3>
                  <p>Independente do gênero</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaBed className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Boa noite de sono</h3>
                  <p>Mínimo 6 horas nas últimas 24h</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaUtensils className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Estar bem alimentado</h3>
                  <p>Evitar alimentos gordurosos nas últimas 4h</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaIdCard className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Documentação</h3>
                  <p>Documento oficial com foto</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Impedimentos Temporários */}
          <section className="instruction-card card-custom p-6">
            <div className="card-header flex items-center gap-2 mb-4">
              <FaClock className="text-warning text-xl" />
              <h2 className="text-lg font-bold">Impedimentos Temporários</h2>
            </div>
            <ul className="requirements-list space-y-4">
              <li className="flex gap-3">
                <FaHeadSideCough className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Gripe ou Resfriado</h3>
                  <p>Aguardar 7 dias após fim dos sintomas</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaBaby className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Gravidez e Pós-parto</h3>
                  <p>90 dias após parto normal</p>
                  <p>180 dias após cesariana</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaPaintBrush className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Tatuagem ou Piercing</h3>
                  <p>Aguardar 12 meses</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaProcedures className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Cirurgias</h3>
                  <p>Pequeno porte: 3 meses</p>
                  <p>Grande porte: 6 meses</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Intervalos */}
        <section className="instruction-card card-custom p-6 mb-8">
          <div className="card-header flex items-center gap-2 mb-4">
            <FaCalendarAlt className="text-accent-500 text-xl" />
            <h2 className="text-lg font-bold">Intervalos para Doação</h2>
          </div>
          <div className="intervals-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="interval-item text-center">
              <FaMars className="text-primary-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold">Homens</h3>
              <p>60 dias de intervalo</p>
              <p>Máximo 4 doações/ano</p>
            </div>
            <div className="interval-item text-center">
              <FaVenus className="text-primary-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold">Mulheres</h3>
              <p>90 dias de intervalo</p>
              <p>Máximo 3 doações/ano</p>
            </div>
          </div>
        </section>

        {/* Local de Doação */}
        <section className="instruction-card card-custom p-6 mb-8">
          <div className="card-header flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-primary-500 text-xl" />
            <h2 className="text-lg font-bold">HEMOBA Feira de Santana</h2>
          </div>
          <div className="location-info">
            <div className="location-map flex items-center justify-center mb-4">
              <FaHospitalAlt className="text-4xl text-primary-500" />
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapPin className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p>Rua Gétulio Vargas, 471 - Centro</p>
                  <p>Feira de Santana - BA</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaClock className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Horário de Funcionamento</h3>
                  <p>Segunda a Sexta: 7h30 às 16h30</p>
                  <p>Sábado: 7h30 às 12h30</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaPhone className="text-primary-500 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Contato</h3>
                  <p>(75) 3221-6494</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Botões de ação */}
        <div className="action-buttons flex gap-4 justify-center">
          <Link to="/" className="btn-secondary-custom flex items-center gap-2">
            <FaArrowLeft /> Voltar ao Início
          </Link>
          <a
            href="https://wa.me/75981829675"
            className="btn-primary-custom flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> Tirar Dúvidas
          </a>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
