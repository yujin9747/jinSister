import {Col, Container, Image, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import React from "react";

const QuestionPage = () => {
    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{ height: '70%', display: 'flex', justifyContent: 'center' }}>
                        <Image src={require('../image/mainPage2.png')} rounded width='90%' height='auto' style={{marginTop: '10%', marginBottom: '20px' }}></Image>
                    </div>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ marginTop: '20px', width: '75%', backgroundColor: '#3949ab' }}
                            onClick={() => console.log('clicked')}
                        >
                            예
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ marginTop: '20px', width: '75%', backgroundColor: '#3949ab' }}
                            onClick={() => console.log('clicked')}
                        >
                            아니오
                        </Button>
                    </Row>
                </Col>
                <Col md={4} sm={0}></Col>
            </Row>
        </Container>
    )
}

export default QuestionPage