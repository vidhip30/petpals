import Button from "react-bootstrap/Button";
import {TextField, validatePlaintext} from "../../components/shared/TextField"
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { makeReport } from "../../api/reports";
import Form from "react-bootstrap/Form";

export const MakeReportPage = () => {
    const { userID } = useParams();
    const reporter = localStorage.getItem("userID");
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        
        const form = event.currentTarget;
        setSubmissionStatus(null);

        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        const payload = {};

        const reportData = new FormData(form);
    
        reportData.forEach((value, field) => {
            payload[field] = value;
          });

        payload['reporter_id'] = reporter;
        payload['reportee_id'] = userID;

    
    
        try {
          const response = await makeReport(payload);
          console.log(response);
    
          if (response.status === 201) {
            const responseData = await response.json();
            console.log('Form submitted successfully:', responseData);
            setSubmissionStatus('Form submitted successfully. The admin team will look over your report shortly.');
          } else {
            console.error('Failed to submit form:', response.statusText);
            setSubmissionStatus('Failed to submit form. Please try again.');
          }
        } catch (error) {
          console.error('Error during form submission:', error);
          setSubmissionStatus('An error occurred. Please try again.');
        }
      };
    

    return (
        <main>

            <Row className="justify-content-center my-4">
                <Col className="text-center">
                    <h1 className="display-4">Make a Report</h1>
                </Col>
            </Row>

            <Row className="justify-content-center mx-4 my-y">
                <Col md={6}>
                    <Form
                    className=" p-5 pt-0 border rounded shadow-sm needs-validation"
                    id="report-form"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}>
                        <TextField
                        fieldName="text"
                        placeholder="Enter reason for report."
                        type="text" 
                        errorMessage="This field cannot be empty"
                        validate={validatePlaintext}
                        />

                        <div className="text-center mt-4"> {/* Centering the button and status */}
                            <Button 
                            id="report"
                            className="mb-3 mt-4 btn btn-secondary"
                            type="submit"
                            value="Create Report"
                            style={{
                                backgroundColor: '#333973 !important',
                                color: 'white',
                              }}>
                                Report
                            </Button>
                            {submissionStatus && (
                            <div className="submission-status mt-2">
                                {submissionStatus}
                            </div>
                            )}
                        </div>
                    </Form>
                </Col>
            </Row>

        </main>

      );
};