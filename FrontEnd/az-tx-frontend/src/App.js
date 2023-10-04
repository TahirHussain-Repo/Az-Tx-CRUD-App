import { useEffect, useState } from "react";
import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './App.css';

function App() {

  const [allSurveys, setAllSurveys] = useState([]);
  const [answerchoices, setAnswerChoice] = useState(['']);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:4500/surveys');
      const jsonResult = await result.json();
      setAllSurveys(jsonResult)
      
      setAnswerChoice(jsonResult[0].answerchoices);

    }

    fetchData()
  }, [])
  
  
  return (
    <div className="App">
      <h2>Question:</h2>
      {allSurveys.map(allSurveys => 
        <div key={allSurveys.survey_id}>
          <h3>{allSurveys.question}</h3>
          <p>{allSurveys.pickedanswer}</p>
          <p>{allSurveys.notes}</p>
        </div>
      )}
      <h2>Answer Choices:</h2>
      {answerchoices.map(answerchoices =>
        <div key={allSurveys.survey_id}>
          <p>{answerchoices}</p>
        </div>
      )}
    </div>
  );
}

export default App;
