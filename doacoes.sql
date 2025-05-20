CREATE DATABASE doacoes;

USE doacoes;

CREATE TABLE participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    idade INT,
    tipo_sanguineo VARCHAR(5),
    campanha_id INT
);
