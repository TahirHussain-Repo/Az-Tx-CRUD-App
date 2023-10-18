const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());

const options = {
    origin: 'http://localhost:3000'
}

app.use(cors(options));

const pool = new Pool({
    user: "postgres",
    password: "Tots*29",
    database: "survey_db",
    host: "localhost",
    port: 5432
});

// Add a new question to the database
app.post('/survey/questions', (req, res) => {
    const { questionText } = req.body;

    if (!questionText) {
        return res.status(400).json({ message: 'Question text is required' });
    }

    pool.query('INSERT INTO survey_questions (question_text) VALUES ($1) RETURNING id', [questionText], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const questionId = result.rows[0].id;
            res.json({ message: 'Question added successfully', questionId });
        }
    });
});

// Add multiple answers to one question in the database
app.post('/survey/multiple-answers', (req, res) => {
    const { questionId, answerTexts } = req.body;

    if (!questionId || !Array.isArray(answerTexts) || answerTexts.length === 0) {
        return res.status(400).json({ message: 'Question ID and an array of answer texts are required' });
    }

    const insertQuery = 'INSERT INTO survey_answers (question_id, answer_text) VALUES ($1, $2) RETURNING id';
    const answerIds = [];

    const insertAnswers = () => {
        const answerText = answerTexts.pop();
        if (answerText) {
            pool.query(insertQuery, [questionId, answerText], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    answerIds.push(result.rows[0].id);
                    insertAnswers();
                }
            });
        } else {
            res.json({ message: 'Answers added successfully', answerIds });
        }
    };

    insertAnswers();
});

// Get all questions
// app.get('/survey/questions', async (req, res) => {
//     try {
//         const questions = await pool.query('SELECT * FROM survey_questions');
//         res.json(questions.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.get('/survey/questions', (req, res) => {
    pool.query('SELECT * FROM survey_questions', (err, questionsResult) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const questions = questionsResult.rows;
            const answersPromises = questions.map((question) => {
                return new Promise((resolve, reject) => {
                    pool.query('SELECT * FROM survey_answers WHERE question_id = $1', [question.id], (err, answersResult) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(answersResult.rows);
                        }
                    });
                });
            });

            Promise.all(answersPromises)
            .then((answers) => {
                questions.forEach((question, index) => {
                    question.answers = answers[index];
                });

                res.json(questions);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
        }
    });
});

// Get answers to a specific question
app.get('/survey/answers/:questionId', async (req, res) => {
    const questionId = req.params.questionId;

    try {
        const answers = await pool.query('SELECT * FROM survey_answers WHERE question_id = $1', [questionId]);
        res.json(answers.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Save user responses
app.post('/survey/save-responses', async (req, res) => {
    const userResponses = req.body.userResponses; 

    try {
        for (const response of userResponses) {
            const { questionId, answerId } = response;
            const query = 'INSERT INTO user_responses (question_id, answer_id) VALUES ($1, $2)';
            await pool.query(query, [questionId, answerId]);
        }

        res.status(201).json({ message: 'Responses saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});