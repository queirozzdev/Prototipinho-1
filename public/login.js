// Função para validar o login
function validarLogin(event) {
    event.preventDefault();

    // Obtém os valores dos campos
    const email = document.querySelector('#login-form input[type="email"]').value;
    const senha = document.querySelector('#login-form input[type="password"]').value;

    // Credenciais de teste
    const usuarioValido = "admin@hotmail.com";
    const senhaValida = "admin123";

    // Verifica se as credenciais estão corretas
    if (email === usuarioValido && senha === senhaValida) {
        alert("Login realizado com sucesso!");
        // Redireciona para a página principal
        window.location.href = "hemobyte.html";
    } else {
        alert("Email ou senha incorretos. Por favor, tente novamente.");
    }
}

// Adiciona o evento de submit ao formulário de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validarLogin);
    }
});
