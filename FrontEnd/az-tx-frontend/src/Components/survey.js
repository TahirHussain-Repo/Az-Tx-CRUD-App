import React, { useEffect, useState } from "react";
import "./survey.css"
import "react-step-progress-bar/styles.css";
//import { ProgressBar, Step } from "react-step-progress-bar";
import {Container, Row, Col, Card, Button, Form, Nav} from "react-bootstrap";
 
const Survey = (props) => {

    const [allSurveys, setAllSurveys] = useState([]);
    const [answerchoices, setAnswerChoice] = useState([['']]);
    const [pickedAnswer, setPickedAnswer] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState([['']]);

    useEffect(() => {
        const fetchData = async (id) => {
            const result = await fetch(`http://localhost:4500/surveys/:${id}`);
            const jsonResult = await result.json();
            setAllSurveys(jsonResult)

            
            let tempChoices = [['']];
            let tempQuestions = [['']];
            for(let i = 0; i < jsonResult.length; i++){
                tempQuestions[i] = jsonResult[i].question;
                tempChoices[i] = jsonResult[i].answerchoices;
                
            }
            console.log(tempQuestions)
            setCurrentQuestion(tempQuestions);
            setAnswerChoice(tempChoices);
            
        }
        fetchData(pickedAnswer)
    }, [])

    const NextQuestion = () => {
        return(
            <div>        
                {allSurveys.map((allSurveys, idx) =>
                    <Card.Body>
                        {currentQuestion.map(question => 
                            <div className="text-left pb-4">
                                {question}
                            </div>
                        )}
                        <Form.Select>
                            <option>Pick your answer from the dropdown below</option>
                            {answerchoices[idx].map(answerchoices => 
                                <option value={pickedAnswer}>{answerchoices}</option> 
                            )}
                        </Form.Select>
                    </Card.Body>
                
                )}
            </div>
        )
    }

   return (
        <Container className="h-100 py-5">
            <Row className="m-10 pb-5">
                <Col className="align-self-center">
                </Col>
            </Row>
            <Row>
                <Card>
                    <NextQuestion />
                    <Card.Footer className="d-flex justify-content-between">
                            <Button>Previous</Button>
                            <Button>Next</Button>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    );
}
export default Survey



{/* <ProgressBar
                        percent={((index -1) * 100) /5 }
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    >
                        <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div className={`step ${accomplished ? "completed" : ""}`}>1</div>
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div className={`step ${accomplished ? "completed" : ""}`}>2</div>          
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div className={`step ${accomplished ? "completed" : ""}`}>3</div>
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div className={`step ${accomplished ? "completed" : ""}`}>4</div>          
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished, index }) => (
                            <div className={`step ${accomplished ? "completed" : ""}`}>5</div>
                        )}
                        </Step>
                    </ProgressBar> */}