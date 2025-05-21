<?php
session_start();

header('Content-Type: application/json');

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

// Recebe e valida dados do formulário
$nome = trim($_POST['nome'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$telefone = trim($_POST['telefone'] ?? '');
$senha = $_POST['senha'] ?? '';
$confirmar_senha = $_POST['confirmar_senha'] ?? '';

// Validações
$errors = [];

if (empty($nome)) {
    $errors[] = 'Nome é obrigatório';
}

if (!$email) {
    $errors[] = 'Email inválido';
}

if (empty($telefone)) {
    $errors[] = 'Telefone é obrigatório';
}

if (strlen($senha) < 6) {
    $errors[] = 'A senha deve ter no mínimo 6 caracteres';
}

if ($senha !== $confirmar_senha) {
    $errors[] = 'As senhas não coincidem';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

try {
    // Verifica se email já existe
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Email já cadastrado']);
        exit;
    }

    // Criptografa a senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere no banco
    $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nome, $email, $telefone, $senhaHash]);

    // Retorna sucesso com os dados do usuário (exceto senha)
    $userId = $pdo->lastInsertId();
    echo json_encode([
        'success' => true,
        'message' => 'Cadastro realizado com sucesso!',
        'user' => [
            'id' => $userId,
            'nome' => $nome,
            'email' => $email,
            'telefone' => $telefone
        ]
    ]);

} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao realizar cadastro']);
}
?>
