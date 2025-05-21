<?php
session_start();

header('Content-Type: application/json');

// Configurações do banco
$host = 'localhost';
$db   = 'doacoes';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
    exit;
}

// Recebe dados do formulário
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$senha = $_POST['senha'] ?? '';

// Validações
$errors = [];

if (!$email) {
    $errors[] = 'Email inválido';
}

if (empty($senha)) {
    $errors[] = 'Senha é obrigatória';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

try {
    // Busca usuário pelo email
    $stmt = $pdo->prepare("SELECT id, nome, email, telefone, senha FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if ($usuario && password_verify($senha, $usuario['senha'])) {
        // Login bem-sucedido
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nome'] = $usuario['nome'];
        $_SESSION['usuario_email'] = $usuario['email'];

        // Remove a senha antes de enviar os dados do usuário
        unset($usuario['senha']);

        echo json_encode([
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'user' => $usuario
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Email ou senha incorretos']);
    }
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao realizar login']);
}
?>
