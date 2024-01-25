CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
);

INSERT INTO users (id, name, email, phone) VALUES ('test-id', 'Test User', 'test@example.com', '5591999123456');