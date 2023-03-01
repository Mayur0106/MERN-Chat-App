import React from 'react'
import {Col,Button,Form,Row} from "react-bootstrap";
import "./MessageForm.css";

export default function MessageForm() {
    function handleSubmit(e){
         e.preventDefault();
    }
  return (
    <>
        <div className='messages-output'></div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Your message"></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                        <Button variant="primary" type="submit" style={{ width: "100%",backgroundColor:"green"}}>
                            <i className='fas fa-paper-plane'></i>
                        </Button>
                </Col>
            </Row>
        </Form>
      
    </>
  )
}
