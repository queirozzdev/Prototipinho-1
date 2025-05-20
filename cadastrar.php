
<?php
session_start();

// Configurações do banco
$host = 'localhost';
$db   = 'doacoes';
$user = 'root';   // Ajuste conforme seu usuário MySQL
$pass = '';       // Ajuste conforme sua senha MySQL
$charset = 'utf8mb4';

// Conectar com PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die('Erro ao conectar ao banco: ' . $e->getMessage());
}

// Recebe dados do formulário
$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$telefone = trim($_POST['telefone'] ?? '');
$senha = $_POST['senha'] ?? '';
$confirmar_senha = $_POST['confirmar_senha'] ?? '';

// Validações básicas
if (!$nome || !$email || !$telefone || !$senha || !$confirmar_senha) {
    die('Por favor, preencha todos os campos.');
}

if ($senha !== $confirmar_senha) {
    die('As senhas não coincidem.');
}

// Verifica se email já existe
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    die('Email já cadastrado.');
}

// Criptografa a senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Insere no banco
$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)");
if ($stmt->execute([$nome, $email, $telefone, $senhaHash])) {
    echo "Cadastro realizado com sucesso! <a href='index.html'>Voltar para login</a>";
} else {
    echo "Erro ao cadastrar.";
}
?>
