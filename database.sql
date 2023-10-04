CREATE DATABASE survey_answers;

CREATE TABLE survey(
    survey_id SERIAL PRIMARY KEY,
    question text,
    answerchoices text[],
    pickedanswer int,
    notes VARCHAR(2000)
);