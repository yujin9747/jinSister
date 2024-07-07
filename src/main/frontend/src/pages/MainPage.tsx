import React from "react";
import { Image, Col, Container, Row} from "react-bootstrap";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router";


const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container fluid>
            <h1 style={{display: 'none'}}>지역 마스코트로 알아보는 성격 유형 검사</h1>
            <h1 style={{display: 'none'}}>Mascot</h1>
            <h1 style={{display: 'none'}}>Jin</h1>
            <h1 style={{display: 'none'}}>테스트</h1>
            <h1 style={{display: 'none'}}>Test</h1>
            <h1 style={{display: 'none'}}>심리 테스트</h1>
            <h1 style={{display: 'none'}}>스트롱 검사</h1>
            <h1 style={{display: 'none'}}>GOT, BIS, PSS</h1>
            <h1 style={{display: 'none'}}>일반직업분류</h1>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{height: '70vh', display: 'flex', justifyContent: 'center'}}>
                        <Image src={require('../image/mainPage.png')} rounded width='100%' height='auto'
                               style={{marginTop: '10%', marginBottom: '20px'}}></Image>
                    </div>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        소요 시간: 1분 30초 내외
                    </Row>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="contained"
                            size="large"
                            style={{marginTop: '20px', width: '80%', backgroundColor: '#3949ab'}}
                            onClick={() => navigate("/question/1")}
                        >
                            시작하기
                        </Button>
                    </Row>
                </Col>
                <Col md={4} sm={0}></Col>
            </Row>
        </Container>
    )
}

export default MainPage