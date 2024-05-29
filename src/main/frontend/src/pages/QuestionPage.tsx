import {Col, Container, Form, Image, Row, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import Button from "@mui/material/Button";

const QuestionPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const parsedId = parseInt(id!)
    const questionIndex = parsedId - 1
    const radioOptions = [
        { value: 'option1', fontSize: 40 },
        { value: 'option2', fontSize: 30 },
        { value: 'option3', fontSize: 20 },
        { value: 'option4', fontSize: 30 },
        { value: 'option5', fontSize: 40 },
    ];
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event: any) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value)
    };

    const handleNext = () => {
        if (parsedId < 4) {
            navigate(`/question/${parsedId + 1}`)
        } else {
            navigate('/result')
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleExit = () => {
        setShow(false)
        navigate('/')
        // TODO: 기존에 선택했던 데이터 지우고 완전 처음으로 돌아가기
    }
    const handleShow = () => setShow(true);

    const handleBefore = () => {
        if (parsedId > 1) {
            navigate(`/question/${parsedId - 1}`)
        } else {
            handleShow()
        }
    }

    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                        <Image src={require(`../image/question${parsedId}.png`)} rounded width='90%' height='auto'
                               style={{marginTop: '10%', marginBottom: '20px'}}></Image>
                    </div>
                    <Form>
                        <Button onClick={() => console.log('매우 그렇지 않다')} style={{width: '100%'}}>
                            매우 그렇지 않다
                        </Button>
                        <Button onClick={() => console.log('그렇지 않다')} style={{width: '100%'}}>
                            그렇지 않다
                        </Button>
                        <Button onClick={() => console.log('보통이다')} style={{width: '100%'}}>
                            보통이다
                        </Button>
                        <Button onClick={() => console.log('약간 그렇다')} style={{width: '100%'}}>
                            약간 그렇다
                        </Button>
                        <Button onClick={() => console.log('매우 그렇다')} style={{width: '100%'}}>
                            매우 그렇다
                        </Button>
                        <Button onClick={handleBefore} style={{width: '100%'}}>
                            이전
                        </Button>
                        <Button onClick={handleNext} style={{width: '100%'}}>
                            다음
                        </Button>
                    </Form>
                </Col>
                <Col md={4} sm={0}></Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>앗! 잠시만요!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    이전으로 돌아가게 되면 지금까지 선택한 데이터가 사라집니다.
                    <br/>
                    계속 진행하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        계속 진행 할래요
                    </Button>
                    <Button onClick={handleExit}>
                        홈 화면으로 돌아 갈래요
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default QuestionPage