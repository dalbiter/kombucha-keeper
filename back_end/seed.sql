DROP DATABASE IF EXISTS  kombucha_keeperdb;
CREATE DATABASE kombucha_keeperdb;
\c kombucha_keeperdb;

CREATE TYPE role AS ENUM ('admin', 'user');
CREATE TYPE brew_type AS ENUM ('kombucha', 'jun');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    role_choice role DEFAULT 'user',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP
);

CREATE TABLE tea_types
(
    id SERIAL PRIMARY KEY,
    tea_name VARCHAR(100) UNIQUE NOT NULL,
    brand VARCHAR(50)
);

CREATE TABLE carbonation_methods
(
    id SERIAL PRIMARY KEY,
    method VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE sugar_sources
(
    id SERIAL PRIMARY KEY,
    sugar_type VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE flavorings
(
    id SERIAL PRIMARY KEY,
    flavoring_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE recipes 
(
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(100) NOT NULL
    
);

-- insert example users
INSERT INTO users (username, first_name, last_name, email, role_choice, password_hash) 
VALUES 
    ('junman', 'dan', 'the man', 'junman24@gmail.com', 'admin', 'd5f8r5f6g'),
    ('kombuchaqueen13', 'cort', 'the queen', 'kombuchaqueen13@yahoo.com', 'user', '6t9d4f22b5');

-- insert example tea types 
INSERT INTO tea_types (tea_name, brand)
VALUES 
    ('green tea', 'lipton'),
    ('black tea', 'twinings');

-- insert example carbonation methods
INSERT INTO carbonation_methods (method)
VALUES
    ('bottle conditioned'),
    ('forced carbonation');

-- insert example sugar sources
INSERT INTO sugar_sources (sugar_type)
VALUES
    ('refined white'),
    ('honey');

-- insert example flavorings
INSERT INTO flavorings (flavoring_name)
VALUES
    ('pineapple'),
    ('ginger'),
    ('passionfruit');