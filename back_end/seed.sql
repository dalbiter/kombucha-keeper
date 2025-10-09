DROP DATABASE IF EXISTS  kombucha_keeperdb;
CREATE DATABASE kombucha_keeperdb;
\c kombucha_keeperdb;

CREATE TYPE role AS ENUM ('admin', 'user');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    user_type_choice role,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP
);

CREATE TYPE brew AS ENUM ('kombucha', 'jun');

CREATE TABLE recipes
(
    id SERIAL PRIMARY KEY
);