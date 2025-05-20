// Simulação de banco de dados de usuários
const usuarios = [
    {
        id: 1,
        nome: "Victor Santos",
        email: "admin@hotmail.com",
        senha: "admin123",
        dataNascimento: "06/06/2004",
        telefone: "(75) 98765-4321",
        endereco: "Rua das Flores, 123 - Bahia, FSA",
        tipoSanguineo: "O+"
    },
    {
        id: 2,
        nome: "Davi Santss",
        email: "Davi@hotmail.com",
        senha: "123456",
        dataNascimento: "20/08/2004",
        telefone: "(75) 91234-5678",
        endereco: "Av. Paulista, 1000 - São Paulo, SP",
        tipoSanguineo: "O-"
    }
];

// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Procura o usuário no "banco de dados"
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            // Remove a senha antes de salvar no localStorage
            const { senha, ...usuarioSemSenha } = usuario;
            localStorage.setItem('usuario', JSON.stringify(usuarioSemSenha));
            return true;
        }
        return false;
    } catch (erro) {
        console.error('Erro ao fazer login:', erro);
        return false;
    }
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const currentPage = window.location.pathname;
    
    // Se estiver na página de login e já estiver logado, redireciona para hemobyteee.html
    if (currentPage.includes('login.html') && usuario) {
        window.location.href = 'hemobyteee.html';
        return;
    }
    
    // Se estiver em uma página protegida e não estiver logado, redireciona para login.html
    const paginasProtegidas = ['perfil.html', 'criar-campanha.html'];
    const paginaAtual = currentPage.split('/').pop();
    
    if (paginasProtegidas.includes(paginaAtual) && !usuario) {
        window.location.href = '../login.html';
        return;
    }
    
    // Atualiza a navegação em todas as páginas
    atualizarNavegacao();
}

// Função para atualizar a navegação com base no status de login
function atualizarNavegacao() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const navLogin = document.getElementById('nav-login');
    const navProfile = document.getElementById('nav-profile');
    const userName = document.querySelector('.user-name');
    
    if (navLogin && navProfile) {
        if (usuario) {
            navLogin.style.display = 'none';
            navProfile.style.display = 'block';
            if (userName) {
                userName.textContent = usuario.nome.split(' ')[0];
            }
        } else {
            navLogin.style.display = 'block';
            navProfile.style.display = 'none';
        }
    }
}

// Função para fazer cadastro
function fazerCadastro(dados) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verifica se o email já está cadastrado
    if (usuarios.some(u => u.email === dados.email)) {
        return false;
    }
    
    // Adiciona o novo usuário
    usuarios.push(dados);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Faz login automaticamente
    const { senha, ...usuarioSemSenha } = dados;
    localStorage.setItem('usuario', JSON.stringify(usuarioSemSenha));
    window.location.href = 'hemobyteee.html';
    return true;
}

// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Verifica login ao carregar a página
    verificarLogin();

    // Adiciona o evento de submit ao formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value;
            const senha = loginForm.querySelector('input[type="password"]').value;
            const btnLogin = loginForm.querySelector('button[type="submit"]');

            try {
                // Desabilita o botão e mostra loading
                btnLogin.disabled = true;
                btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

                const sucesso = await fazerLogin(email, senha);

                if (sucesso) {
                    window.location.href = 'hemobyteee.html';
                } else {
                    alert('Email ou senha incorretos');
                }
            } catch (erro) {
                alert('Erro ao fazer login. Tente novamente.');
            } finally {
                // Reabilita o botão e remove loading
                btnLogin.disabled = false;
                btnLogin.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
            }
        });
    }

    // Adiciona o evento de clique ao botão de sair
    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', fazerLogout);
    }

    // Form de Cadastro
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = cadastroForm.querySelector('input[type="text"]').value;
            const email = cadastroForm.querySelector('input[type="email"]').value;
            const telefone = cadastroForm.querySelector('input[type="tel"]').value;
            const senha = cadastroForm.querySelectorAll('input[type="password"]')[0].value;
            const confirmarSenha = cadastroForm.querySelectorAll('input[type="password"]')[1].value;
            
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            
            const dados = {
                nome,
                email,
                telefone,
                senha
            };
            
            if (fazerCadastro(dados)) {
                alert('Cadastro realizado com sucesso!');
            } else {
                alert('Email já cadastrado!');
            }
        });
    }
});        