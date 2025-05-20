<?php
session_start();

// Configurações do banco (igual ao cadastrar.php)
$host = 'localhost';
$db   = 'doacoes';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

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
$email = trim($_POST['email'] ?? '');
$senha = $_POST['senha'] ?? '';

if (!$email || !$senha) {
    die('Por favor, preencha todos os campos.');
}

// Busca usuário pelo email
$stmt = $pdo->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    // Login bem-sucedido
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];

    echo "Login efetuado com sucesso! Seja bem-vindo, " . htmlspecialchars($usuario['nome']) . ".";
    // Aqui você pode redirecionar para uma área restrita, por exemplo:
    // header('Location: dashboard.php');
    // exit;
} else {
    echo "Email ou senha incorretos.";
}
?>
