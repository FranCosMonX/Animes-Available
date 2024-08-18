CREATE TABLE usuario (
  usuario_id SERIAL PRIMARY KEY,
  nomoe_completo VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  usuario VARCHAR(20) NOT NULL,
  jogo_preferido VARCHAR(100),
  anime_preferido VARCHAR(100),
  hobby VARCHAR(100)
)