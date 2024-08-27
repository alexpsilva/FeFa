CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    
    name VARCHAR(255),
    email VARCHAR(255),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pacients(
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users (id),
    
    name VARCHAR(255),
    birthday DATE,
    cpf VARCHAR(11),
    
    address VARCHAR(255),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS phones(
    id SERIAL PRIMARY KEY,

    pacient_id INTEGER REFERENCES pacients (id),
    
    number VARCHAR(11),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments(
    id SERIAL PRIMARY KEY,

    pacient_id INTEGER REFERENCES pacients (id),
    
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    description TEXT,

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);