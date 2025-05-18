// Função para inicializar os filtros
function inicializarFiltros() {
    const bairroFilter = document.getElementById('bairro-filter');
    const tipoSanguineoFilter = document.getElementById('tipo-sanguineo-filter');
    const statusFilter = document.getElementById('status-filter');
    const dataFilter = document.getElementById('data-filter');
    const campaignCards = document.querySelectorAll('.campaign-card');

    // Adiciona event listeners para cada filtro
    bairroFilter.addEventListener('change', () => filtrarCampanhas());
    tipoSanguineoFilter.addEventListener('change', () => filtrarCampanhas());
    statusFilter.addEventListener('change', () => filtrarCampanhas());
    dataFilter.addEventListener('change', () => filtrarCampanhas());

    // Função principal de filtragem
    function filtrarCampanhas() {
        const bairroSelecionado = bairroFilter.value.toLowerCase();
        const tipoSanguineoSelecionado = tipoSanguineoFilter.value.toLowerCase();
        const statusSelecionado = statusFilter.value.toLowerCase();
        const dataSelecionada = dataFilter.value;

        campaignCards.forEach(card => {
            let mostrar = true;
            
            // Aplica todos os filtros
            mostrar = aplicarFiltroBairro(card, bairroSelecionado) && mostrar;
            mostrar = aplicarFiltroTipoSanguineo(card, tipoSanguineoSelecionado) && mostrar;
            mostrar = aplicarFiltroStatus(card, statusSelecionado) && mostrar;
            mostrar = aplicarFiltroData(card, dataSelecionada) && mostrar;

            // Atualiza a visibilidade do card
            card.style.display = mostrar ? 'block' : 'none';
        });
    }

    // Funções auxiliares para cada tipo de filtro
    function aplicarFiltroBairro(card, bairroSelecionado) {
        if (!bairroSelecionado) return true;
        const bairroCard = card.querySelector('.campaign-info p:first-child').textContent.toLowerCase();
        return bairroCard.includes(bairroSelecionado);
    }

    function aplicarFiltroTipoSanguineo(card, tipoSanguineoSelecionado) {
        if (!tipoSanguineoSelecionado) return true;
        const tipoSanguineoCard = card.querySelector('.campaign-info p:last-child').textContent.toLowerCase();
        return tipoSanguineoCard.includes(tipoSanguineoSelecionado);
    }

    function aplicarFiltroStatus(card, statusSelecionado) {
        if (!statusSelecionado) return true;
        const statusCard = card.querySelector('.campaign-status').textContent.toLowerCase();
        return statusCard === statusSelecionado;
    }

    function aplicarFiltroData(card, dataSelecionada) {
        if (!dataSelecionada) return true;
        
        const dataCard = card.querySelector('.campaign-info p:nth-child(2)').textContent;
        const dataCampanha = new Date(dataCard.split(',')[0].split(' ').slice(-2).join(' '));
        const hoje = new Date();
        
        switch(dataSelecionada) {
            case 'hoje':
                return dataCampanha.toDateString() === hoje.toDateString();
            case 'amanha':
                const amanha = new Date(hoje);
                amanha.setDate(amanha.getDate() + 1);
                return dataCampanha.toDateString() === amanha.toDateString();
            case 'semana':
                const fimSemana = new Date(hoje);
                fimSemana.setDate(fimSemana.getDate() + 7);
                return dataCampanha >= hoje && dataCampanha <= fimSemana;
            case 'mes':
                const fimMes = new Date(hoje);
                fimMes.setMonth(fimMes.getMonth() + 1);
                return dataCampanha >= hoje && dataCampanha <= fimMes;
            default:
                return true;
        }
    }
}

// Inicializa os filtros quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarFiltros);
