CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pacients(
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL REFERENCES users (id),
    
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    cpf VARCHAR(11),
    
    address VARCHAR(255),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS phones(
    id SERIAL PRIMARY KEY,

    pacient_id INTEGER REFERENCES pacients (id) NOT NULL,
    
    number VARCHAR(11) NOT NULL,

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments(
    id SERIAL PRIMARY KEY,

    pacient_id INTEGER NOT NULL REFERENCES pacients (id),
    
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    description TEXT NOT NULL,

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medications(
  id SERIAL PRIMARY KEY,
  
  user_id INTEGER REFERENCES users (id) NOT NULL,
  
  name VARCHAR(255) NOT NULL,
  
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prescriptions(
  id SERIAL PRIMARY KEY,
  
  start_appointment_id INTEGER NOT NULL REFERENCES appointments (id),
  end_appointment_id INTEGER REFERENCES appointments (id),
  
  medication_id INTEGER NOT NULL REFERENCES medications (id),
  dosage VARCHAR(255) NOT NULL,
  frequency VARCHAR(255) NOT NULL,
  
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS observations(
  id SERIAL PRIMARY KEY,
  
  start_appointment_id INTEGER NOT NULL REFERENCES appointments (id),
  end_appointment_id INTEGER REFERENCES appointments (id),
  
  description VARCHAR(255) NOT NULL,
  
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
