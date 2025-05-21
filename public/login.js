// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao fazer login');
        }

        // Salva os dados do usuário no localStorage para persistência
        localStorage.setItem('usuario', JSON.stringify(data.user));
        return true;
    } catch (erro) {
        console.error('Erro ao fazer login:', erro);
        alert(erro.message);
        return false;
    }
}

// Função para fazer cadastro
async function fazerCadastro(dados) {
    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(dados)) {
            formData.append(key, value);
        }

        const response = await fetch('cadastrar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(Array.isArray(data.errors) ? data.errors.join('\n') : data.error || 'Erro ao cadastrar');
        }

        // Salva os dados do usuário no localStorage para persistência
        localStorage.setItem('usuario', JSON.stringify(data.user));
        return true;
    } catch (erro) {
        console.error('Erro ao cadastrar:', erro);
        alert(erro.message);
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
        window.location.href = 'login.html';
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
                }
            } finally {
                // Reabilita o botão e remove loading
                btnLogin.disabled = false;
                btnLogin.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
            }
        });
    }

    // Adiciona o evento de submit ao formulário de cadastro
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dados = {
                nome: cadastroForm.querySelector('input[name="nome"]').value,
                email: cadastroForm.querySelector('input[name="email"]').value,
                telefone: cadastroForm.querySelector('input[name="telefone"]').value,
                senha: cadastroForm.querySelector('input[name="senha"]').value,
                confirmar_senha: cadastroForm.querySelector('input[name="confirmar_senha"]').value
            };

            const btnCadastro = cadastroForm.querySelector('button[type="submit"]');
            
            try {
                // Desabilita o botão e mostra loading
                btnCadastro.disabled = true;
                btnCadastro.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';

                const sucesso = await fazerCadastro(dados);

                if (sucesso) {
                    window.location.href = 'hemobyteee.html';
                }
            } finally {
                // Reabilita o botão e remove loading
                btnCadastro.disabled = false;
                btnCadastro.innerHTML = '<i class="fas fa-user-plus"></i> Cadastrar';
            }
        });
    }

    // Adiciona o evento de clique ao botão de sair
    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', fazerLogout);
    }
});        