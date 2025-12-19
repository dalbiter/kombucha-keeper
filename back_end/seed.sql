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
    role_choice role DEFAULT 'user',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
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
    method_name VARCHAR(50) UNIQUE NOT NULL
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

-- CREATE TABLE weight_units
-- (
--     id SERIAL PRIMARY KEY,
--     weight_unit VARCHAR(20),
--     weight_unit_abr VARCHAR(10)
-- );

-- CREATE TABLE temp_units
-- (
--     id SERIAL PRIMARY KEY,
--     temp_unit VARCHAR(20),
--     temp_unit_abr VARCHAR(10)
-- );

-- CREATE TABLE volume_units
-- (
--     id SERIAL PRIMARY KEY,
--     volume_unit VARCHAR(20),
--     volume_unit_abr VARCHAR(10)
-- );

CREATE TABLE recipes 
(
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(100) NOT NULL,
    brew_type VARCHAR(25) NOT NULL CHECK (brew_type IN ('kombucha', 'jun')),
    tea_type INTEGER NOT NULL REFERENCES tea_types,
    tea_type_qty VARCHAR(20) NOT NULL,
    sugar_source INTEGER NOT NULL REFERENCES sugar_sources,
    sugar_source_qty VARCHAR(20) NOT NULL,
    starter_qty VARCHAR(20) NOT NULL,
    batch_size VARCHAR(20),
    avg_ferment_temp VARCHAR(20),
    primary_ferment_days INTEGER NOT NULL,
    primary_ferment_notes TEXT,
    secondary_ferment_days INTEGER,
    secondary_ferment_notes TEXT,
    carbonation_method_id INTEGER REFERENCES carbonation_methods,
    steps TEXT,
    recipe_notes TEXT,
    rating NUMERIC(3,1) CHECK (rating BETWEEN 1 AND 10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recipes_flavorings
(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes ON DELETE CASCADE,
    flavoring_id INTEGER NOT NULL REFERENCES flavorings
);

CREATE TABLE brew_logs
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL REFERENCES recipes ON DELETE CASCADE,
    brewed_on DATE NOT NULL,
    notes TEXT
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
INSERT INTO carbonation_methods (method_name)
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

-- -- insert list of weight units
-- INSERT INTO weight_units (weight_unit, weight_unit_abr)
-- VALUES
--     ('ounces', 'oz'),
--     ('pounds', 'lb'),
--     ('teaspoons', 'tsp'),
--     ('tablespoons', 'tbsp'),
--     ('grams', 'g'),
--     ('kilograms', 'kg');

-- -- insert list of temp units
-- INSERT INTO temp_units (temp_unit, temp_unit_abr)
-- VALUES
--     ('fahrenheit', 'F'),
--     ('celsius', 'C');

-- -- insert list of volume units
-- INSERT INTO volume_units (volume_unit, volume_unit_abr)
-- VALUES
--     ('fluid ounces', 'fl oz'),
--     ('cups', 'C'),
--     ('pints', 'pt'),
--     ('quarts', 'qt'),
--     ('gallons', 'gal'),
--     ('milliliters', 'ml'),
--     ('liters', 'L')

-- insert example recipes
INSERT INTO recipes 
    (recipe_name, 
    brew_type, 
    tea_type, 
    tea_type_qty, 
    sugar_source,
    sugar_source_qty,
    starter_qty, 
    primary_ferment_days,
    secondary_ferment_days,
    carbonation_method_id
    )
VALUES
    (
        'pinapple jun',
        'jun',
        1,
        '10 grams',
        1,
        '1 cup',
        '2 cups',
        3,
        4,
        1
    ),
    (
        'passionfruit-ginger kombucha',
        'kombucha',
        2,
        '12 grams',
        1,
        '300 grams',
        '2 cups',
        7,
        3,
        1
    );

-- insert example recipe_flavorings
INSERT INTO recipes_flavorings (recipe_id, flavoring_id)
VALUES
    (1, 1),
    (2, 3),
    (2, 2);

-- insert exampe brew_logs

INSERT INTO brew_logs (user_id, recipe_id, brewed_on, notes)
VALUES
    (1, 1, '11-11-2025', 'a bit sweet, maybe a little less honey to start next time'),
    (2, 2, '10-10-2025', 'perfecto!');

