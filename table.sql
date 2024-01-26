-- Criação da tabela 'users'
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
);

-- Criação da tabela 'positions'
CREATE TABLE positions (
    id VARCHAR(255) PRIMARY KEY,
    x_axis VARCHAR(255) NOT NULL DEFAULT '0',
    y_axis VARCHAR(255) NOT NULL DEFAULT '0',
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('1', 'Amanda Oliveira', 'amanda.oliveira@example.com', '5591991123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('1', '2', '3', '1');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('2', 'Felipe Santos', 'felipe.santos@example.com', '5591991123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('2', '5', '8', '2');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('3', 'Isabela Oliveira', 'isabela.oliveira@example.com', '5591991123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('3', '8', '5', '3');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('4', 'Lucas Silva', 'lucas.silva@example.com', '5591992123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('4', '9', '2', '4');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('5', 'Valentina Lima', 'valentina.lima@example.com', '5591992123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('5', '6', '4', '5');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('6', 'Enzo Almeida', 'enzo.almeida@example.com', '5591993123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('6', '2', '7', '6');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('7', 'Sofia Costa', 'sofia.costa@example.com', '5591993123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('7', '1', '4', '7');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('8', 'Guilherme Almeida', 'guilherme.almeida@example.com', '5591993123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('8', '1', '6', '8');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('9', 'Laura Rocha', 'laura.rocha@example.com', '5591994123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('9', '2', '8', '9');

-- Inserção na tabela 'users'
INSERT INTO users (id, name, email, phone) VALUES ('10', 'Mateus Oliveira', 'mateus.oliveira@example.com', '5591995123456');

-- Inserção na tabela 'positions' associada ao 'user_id' da tabela 'users'
INSERT INTO positions (id, x_axis, y_axis, user_id) VALUES ('10', '3', '12', '10');