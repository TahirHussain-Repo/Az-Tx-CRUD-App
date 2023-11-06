CREATE DATABASE survey_db;

CREATE TABLE survey_users (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) UNIQUE NOT NULL, -- This will store the Auth0 user ID
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE survey_questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL
);


CREATE TABLE survey_answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES survey_questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL
);


CREATE TABLE user_responses (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES survey_questions(id) ON DELETE CASCADE,
    answer_id INT REFERENCES survey_answers(id)
);

ALTER TABLE user_responses ADD COLUMN user_id INT REFERENCES survey_users(id);

