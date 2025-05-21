<?php
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$idade = $_POST['idade'];
$tipo = $_POST['tipo_sanguineo'];
$campanha_id = $_POST['campanha_id'];

// Conectar com o banco
$con = mysqli_connect("localhost", "root", "", "doacoes");

// Verificar conexão
if (!$con) {
    die("Erro ao conectar: " . mysqli_connect_error());
}

// Inserir no banco
$sql = "INSERT INTO participantes (nome, email, telefone, idade, tipo_sanguineo, campanha_id)
        VALUES ('$nome', '$email', '$telefone', $idade, '$tipo', $campanha_id)";

if (mysqli_query($con, $sql)) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . mysqli_error($con);
}

// Fechar conexão
mysqli_close($con);
?>
