CREATE DATABASE estoque;
USE estoque;

CREATE TABLE itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INT NOT NULL,
  medida VARCHAR(50) NOT NULL
);

select * from itens;