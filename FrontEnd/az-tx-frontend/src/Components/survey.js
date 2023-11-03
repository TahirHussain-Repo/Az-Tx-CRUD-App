import React, { useEffect, useState } from "react";
import axios from 'axios';

import "./survey.css"
import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
 
const Survey = () => {

    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const baseUrl = 'http://localhost:5001'

    useEffect(() => {
        axios.get(`${baseUrl}/survey/questions`)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const handleAnswerChange = (question_id, e) => {
        console.log(question_id)
        console.log(e.target.value);
        setAnswers(prevState => ({
            ...prevState,
            [question_id]: e.target.value,
        }));
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }else{
            submitAnswers();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const submitAnswers = async () => {
        console.log(answers);

        try {
            for (let [questionId, answerId] of Object.entries(answers)) {
                await axios.post(`${baseUrl}/survey/save-responses`, { question_id: questionId, answer_id: answerId });
            }
            alert('Survey completed!');
        } catch (error) {
            console.error("Error submitting answers:", error);
            alert('Error submitting survey. Please try again.');
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
                            <Form.Select value={answers[questions[currentStep].id] || ''} onChange={(e) => handleAnswerChange(questions[currentStep].id, e)} >
                                <option value="">Select an answer</option>
                                {questions[currentStep].answers.map((answer) => 
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
                                <Button onClick={submitAnswers}>Finish</Button>
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