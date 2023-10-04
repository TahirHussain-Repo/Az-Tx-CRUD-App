const express = require("express");
const app = express();
const pool = require("./db");
const cors = require('cors');


app.use(express.json())



const options = {
    origin: 'http://localhost:3000'
}

app.use(cors(options));

//ROUTES//

//get all surveys

app.get("/surveys", async (req, res) => {
    try {
        const allSurveys = await pool.query("SELECT * FROM survey");

        res.json(allSurveys.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get one survey

app.get("/surveys/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const survey = await pool.query("SELECT * FROM survey WHERE survey_id = $1", [id])

        res.json(survey.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//create a new survey

app.post("/surveys", async(req, res) => {
    try {
        const{ question, answerchoices, pickedanswer, notes } = req.body;
        const newSurvey = await pool.query("INSERT INTO survey (question, answerchoices, pickedanswer, notes) VALUES ($1, $2, $3, $4) RETURNING *", [question, answerchoices, pickedanswer, notes]);
        res.json(newSurvey);
    } catch(err) {
        console.error(err.message);
    }
})

//update survey

app.put("/surveys/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { question, answerchoices, pickedanswer, notes } = req.body;

        const updateSurvey = await pool.query("UPDATE survey SET question = $1, answerchoices = $2, pickedanswer = $3, notes = $4 WHERE  survey_id = $5", [question, answerchoices, pickedanswer, notes, id]);
    
        res.json("survey question was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a survey

app.delete("/surveys/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteSurvey = await pool.query("DELETE FROM survey WHERE survey_id = $1", [id]);
        
        res.json("survey question was successfully deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//port connection

app.listen(4500, () => {
    console.log("server is listening on port 4500");
});