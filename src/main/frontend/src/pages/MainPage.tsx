import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

const MainPage: React.FC = () => {

    const onStartButtonClicked = () => {
        console.log('clicked!!')
    }

    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4}></Col>
                <Col md={4}>
                    <div style={{ height: '600px' }}>

                    </div>
                    <Row>
                        <Button
                            onClick={() => onStartButtonClicked()}
                        >
                            시작하기
                        </Button>
                    </Row>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    )
}

export default MainPage