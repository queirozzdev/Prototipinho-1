import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaInfoCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBullseye,
  FaCamera,
  FaFileContract,
  FaCheck,
  FaRedo,
} from "react-icons/fa";

interface FormData {
  nomeCampanha: string;
  tipoCampanha: string;
  descricao: string;
  bairro: string;
  local: string;
  referencia: string;
  dataInicio: string;
  dataFim: string;
  horaInicio: string;
  horaFim: string;
  metaDoadores: string;
  recursos: string[];
  recursosAdicionais: string;
  imagem: File | null;
  canais: string[];
  termos: boolean;
  privacidade: boolean;
}

const bairros = [
  "Feira VI",
  "Tomba",
  "Centro",
  "Queimadinha",
  "Cidade Nova",
  "UEFS",
  "Serraria Brasil",
];
const tiposCampanha = [
  { value: "urgente", label: "Urgente" },
  { value: "regular", label: "Regular" },
  { value: "especial", label: "Especial" },
];
const recursosList = [
  "Cadeiras",
  "Mesas",
  "Água",
  "Lanche",
  "Voluntários",
  "Sistema de Som",
  "Tendas",
  "Outros",
];
const canaisList = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Cartazes",
  "Rádio Local",
];

const CriarCampanha: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nomeCampanha: "",
    tipoCampanha: "",
    descricao: "",
    bairro: "",
    local: "",
    referencia: "",
    dataInicio: "",
    dataFim: "",
    horaInicio: "",
    horaFim: "",
    metaDoadores: "",
    recursos: [],
    recursosAdicionais: "",
    imagem: null,
    canais: [],
    termos: false,
    privacidade: false,
  });
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "recursos") {
        setForm((prev) => ({
          ...prev,
          recursos: checked
            ? [...prev.recursos, value]
            : prev.recursos.filter((r) => r !== value),
        }));
      } else if (name === "canais") {
        setForm((prev) => ({
          ...prev,
          canais: checked
            ? [...prev.canais, value]
            : prev.canais.filter((c) => c !== value),
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setMensagem("Campanha criada com sucesso!");
      setEnviando(false);
    }, 1500);
  };

  const handleReset = () => {
    setForm({
      nomeCampanha: "",
      tipoCampanha: "",
      descricao: "",
      bairro: "",
      local: "",
      referencia: "",
      dataInicio: "",
      dataFim: "",
      horaInicio: "",
      horaFim: "",
      metaDoadores: "",
      recursos: [],
      recursosAdicionais: "",
      imagem: null,
      canais: [],
      termos: false,
      privacidade: false,
    });
    setMensagem(null);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">
          Criar Nova Campanha de Doação
        </h1>
        <p className="subtitle mb-8">
          Organize uma campanha de doação de sangue em seu bairro e ajude a
          transformar Feira de Santana. Preencha o formulário abaixo com os
          detalhes da sua campanha.
        </p>
        <form
          className="campaign-form space-y-8"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {/* Informações Básicas */}
          <section className="form-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaInfoCircle /> Informações Básicas
            </h2>
            <div className="form-group mb-4">
              <label>Nome da Campanha*</label>
              <input
                type="text"
                name="nomeCampanha"
                value={form.nomeCampanha}
                onChange={handleChange}
                className="input-custom"
                required
                placeholder="Ex: Doe Vida - Bairro Feira VI"
              />
              <span className="form-hint">
                Escolha um nome claro e atrativo para sua campanha
              </span>
            </div>
            <div className="form-group mb-4">
              <label>Tipo de Campanha*</label>
              <select
                name="tipoCampanha"
                value={form.tipoCampanha}
                onChange={handleChange}
                className="input-custom"
                required
              >
                <option value="">Selecione o tipo</option>
                {tiposCampanha.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-4">
              <label>Descrição da Campanha*</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                className="input-custom"
                required
                placeholder="Descreva os objetivos da campanha e como a comunidade pode participar"
              />
            </div>
          </section>

          {/* Localização */}
          <section className="form-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaMapMarkerAlt /> Localização
            </h2>
            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group mb-4">
                <label>Bairro*</label>
                <select
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  className="input-custom"
                  required
                >
                  <option value="">Selecione o bairro</option>
                  {bairros.map((bairro) => (
                    <option key={bairro} value={bairro}>
                      {bairro}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label>Local Específico*</label>
                <input
                  type="text"
                  name="local"
                  value={form.local}
                  onChange={handleChange}
                  className="input-custom"
                  required
                  placeholder="Ex: Praça Principal, Igreja, Escola"
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label>Ponto de Referência</label>
              <input
                type="text"
                name="referencia"
                value={form.referencia}
                onChange={handleChange}
                className="input-custom"
                placeholder="Ex: Próximo ao Supermercado X"
              />
            </div>
          </section>

          {/* Data e Horário */}
          <section className="form-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaCalendarAlt /> Data e Horário
            </h2>
            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group mb-4">
                <label>Data de Início*</label>
                <input
                  type="date"
                  name="dataInicio"
                  value={form.dataInicio}
                  onChange={handleChange}
                  className="input-custom"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Data de Término*</label>
                <input
                  type="date"
                  name="dataFim"
                  value={form.dataFim}
                  onChange={handleChange}
                  className="input-custom"
                  required
                />
              </div>
            </div>
            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group mb-4">
                <label>Horário de Início*</label>
                <input
                  type="time"
                  name="horaInicio"
                  value={form.horaInicio}
                  onChange={handleChange}
                  className="input-custom"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Horário de Término*</label>
                <input
                  type="time"
                  name="horaFim"
                  value={form.horaFim}
                  onChange={handleChange}
                  className="input-custom"
                  required
                />
              </div>
            </div>
          </section>

          {/* Metas e Recursos */}
          <section className="form-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaBullseye /> Metas e Recursos
            </h2>
            <div className="form-group mb-4">
              <label>Meta de Doadores*</label>
              <input
                type="number"
                name="metaDoadores"
                value={form.metaDoadores}
                onChange={handleChange}
                className="input-custom"
                required
                min={10}
                placeholder="Ex: 50"
              />
              <span className="form-hint">
                Mínimo de 10 doadores por campanha
              </span>
            </div>
            <div className="form-group mb-4">
              <label>Recursos Necessários</label>
              <div className="checkbox-grid grid grid-cols-2 md:grid-cols-4 gap-2">
                {recursosList.map((recurso) => (
                  <label
                    key={recurso}
                    className="checkbox-item flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      name="recursos"
                      value={recurso}
                      checked={form.recursos.includes(recurso)}
                      onChange={handleChange}
                    />{" "}
                    {recurso}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group mb-4">
              <label>Recursos Adicionais Necessários</label>
              <textarea
                name="recursosAdicionais"
                value={form.recursosAdicionais}
                onChange={handleChange}
                className="input-custom"
                placeholder="Descreva outros recursos ou necessidades específicas"
              />
            </div>
          </section>

          {/* Mídia e Divulgação */}
          <section className="form-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaCamera /> Mídia e Divulgação
            </h2>
            <div className="form-group mb-4">
              <label>Imagem da Campanha</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input-custom"
              />
              {form.imagem && (
                <span className="text-sm text-secondary-600">
                  {form.imagem.name}
                </span>
              )}
              <span className="upload-hint">
                Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB
              </span>
            </div>
            <div className="form-group mb-4">
              <label>Canais de Divulgação</label>
              <div className="checkbox-grid grid grid-cols-2 md:grid-cols-3 gap-2">
                {canaisList.map((canal) => (
                  <label
                    key={canal}
                    className="checkbox-item flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      name="canais"
                      value={canal}
                      checked={form.canais.includes(canal)}
                      onChange={handleChange}
                    />{" "}
                    {canal}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Termos e Condições */}
          <section className="form-section terms-section">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <FaFileContract /> Termos e Condições
            </h2>
            <div className="form-group mb-4">
              <label className="checkbox-item flex items-center gap-2">
                <input
                  type="checkbox"
                  name="termos"
                  checked={form.termos}
                  onChange={handleChange}
                  required
                />
                Concordo em seguir as diretrizes da HEMOBA e me comprometo a
                organizar a campanha de forma responsável
              </label>
              <label className="checkbox-item flex items-center gap-2">
                <input
                  type="checkbox"
                  name="privacidade"
                  checked={form.privacidade}
                  onChange={handleChange}
                  required
                />
                Concordo com a política de privacidade e o uso dos dados para
                fins de organização da campanha
              </label>
            </div>
          </section>

          <div className="form-actions flex gap-4 mt-6">
            <button
              type="submit"
              className="btn-primary-custom flex items-center gap-2"
              disabled={enviando}
            >
              {enviando ? (
                <span className="animate-spin">
                  <FaCheck />
                </span>
              ) : (
                <FaCheck />
              )}{" "}
              Criar Campanha
            </button>
            <button
              type="reset"
              className="btn-secondary-custom flex items-center gap-2"
              disabled={enviando}
            >
              <FaRedo /> Limpar Formulário
            </button>
          </div>
          {mensagem && (
            <div className="mt-4 text-success font-semibold">{mensagem}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CriarCampanha;
