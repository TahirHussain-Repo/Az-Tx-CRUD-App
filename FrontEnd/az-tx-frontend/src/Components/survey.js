import React, { useEffect, useState } from "react";
import axios from 'axios';

import "./survey.css"
import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
 
const Survey = () => {

    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [userResponses, setUserResponses] = useState([]);

    const baseUrl = 'http://localhost:5001'

    useEffect(() => {
        axios.get(`${baseUrl}/survey/questions`)
            .then((response) => {
                setQuestions(response.data);
                setUserResponses(new Array(response.data.length).fill(''));
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            const newResponses = [...userResponses];
            newResponses[currentStep] = selectedAnswer;
            setUserResponses(newResponses);
            setCurrentStep(currentStep + 1);
            setSelectedAnswer('');
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedAnswer(userResponses[currentStep - 1]);
        }
    };

    const handleFinish = () => {
        if (selectedAnswer) {
            const newResponses = [...userResponses];
            newResponses[currentStep] = selectedAnswer;
            setUserResponses(newResponses);

            // Send user responses to the backend for saving
            axios.post(`${baseUrl}/survey/save-responses`, { userResponses })
                .then((response) => {
                    console.log('Responses saved successfully');
                })
                .catch((error) => {
                    console.error('Error saving responses:', error);
                });
        } else {
            console.error('Please select an answer before finishing.');
        }
    };

   return (
        <Container className="h-100 py-5">
            <Row className="m-10 pb-5">
                <Col className="align-self-center">
                    <h2>Security Risk Assesment - Step {currentStep + 1}</h2>
                </Col>
            </Row>
            <Row>
                {currentStep < questions.length ? (
                    <Card border="info" style={{ width: '1500px' }}>
                        <Card.Body>
                            <div className="text-left pb-4">
                                {questions[currentStep].question_text}
                            </div>
                            <Form.Select onChange={handleAnswerChange} value={selectedAnswer}>
                                <option value="">Select an answer</option>
                                {questions[currentStep].answers.map(answer => 
                                    <option key={answer.id} value={answer.id}>
                                        {answer.answer_text}
                                    </option>
                                )}
                            </Form.Select>
                                <br></br>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Your Notes Here"
                                style={{ height: '100px', paddingTop:'10px' }}
                            />
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            {currentStep > 0 && (
                                <Button onClick={handlePrevious}>Previous</Button>
                            )}
                            {currentStep < questions.length - 1 ? (
                                <Button onClick={handleNext}>Next</Button>
                            ) : (
                                <Button onClick={handleFinish}>Finish</Button>
                            )}
                        </Card.Footer>
                    </Card>
                ) : (
                    <div>
                        <p>Thank you for completing the survey!</p>
                    </div>
                )}
            </Row>
        </Container>
    );
}
export default Survey