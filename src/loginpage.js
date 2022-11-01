import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function Login() {
    return (
        <div>
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-primary"></div>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                      <p className=" mb-5">Please enter your login and password!</p>
                      <div className="mb-3">
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email address
                            </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                          </Form.Group>
    
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                          <div className="d-grid">
                            <Button variant="primary" type="submit">
                              Login
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            Don't have an account?{" "}
                            <a href="{''}" className="text-primary fw-bold">
                              Sign Up
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );    
}