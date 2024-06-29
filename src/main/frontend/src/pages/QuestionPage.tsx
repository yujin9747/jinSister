import {Col, Container, Form, Image, Row, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Button from "@mui/material/Button";

const QuestionPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const parsedId = parseInt(id!)

    const handleNext = () => {
        if (parsedId < 30) {
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

    const [selectedButton, setSelectedButton] = useState(null)
    const [answers, setAnswers] = useState(Array(30).fill(null))
    const handleButtonClick = (buttonName: any) => {
        setSelectedButton(buttonName)
        console.log(buttonName)

        const newAnswers = [...answers]
        newAnswers[parsedId-1] = buttonName
        setAnswers(newAnswers)
    }

    const getButtonWidth = (buttonName: any) => {
        if (selectedButton === buttonName) {
            return '82%'
        } else {
            return '75%'
        }
    }

    const getButtonHeight = (buttonName: any) => {
        if (selectedButton === buttonName) {
            return '45px'
        } else {
            return '35px'
        }
    }

    const getButtonFontSize = (buttonName: any) => {
        if (selectedButton === buttonName) {
            return '20px'
        } else {
            return '15px'
        }
    }

    const getButtonBackgroundColor = (buttonName: any) => {
        if (selectedButton === buttonName) {
            return '#fff'
        }

        switch (buttonName) {
            case '매우 그렇지 않다':
                return '#d9d9ff'
            case '그렇지 않다':
                return '#b5b6ff'
            case '보통이다':
                return '#9092fc'
            case '약간 그렇다':
                return '#7779fc'
            case '매우 그렇다':
                return '#6366ff'
            default:
                return '#6366ff'
        }
    }

    useEffect(() => {
        console.log(answers)
    }, [answers])

    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                        <Image src={require(`../image/question${parsedId}.png`)} rounded width='90%' height='auto'
                               style={{marginTop: '10%'}}></Image>
                    </div>
                    <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick('매우 그렇지 않다')}
                            style={{
                                width: getButtonWidth('매우 그렇지 않다'),
                                height: getButtonHeight('매우 그렇지 않다'),
                                backgroundColor: getButtonBackgroundColor('매우 그렇지 않다'),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize('매우 그렇지 않다')
                            }}
                        >
                            매우 그렇지 않다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick('그렇지 않다')}
                            style={{
                                width: getButtonWidth('그렇지 않다'),
                                height: getButtonHeight('그렇지 않다'),
                                backgroundColor: getButtonBackgroundColor('그렇지 않다'),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize('그렇지 않다')
                            }}
                        >
                            그렇지 않다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick('보통이다')}
                            style={{
                                width: getButtonWidth('보통이다'),
                                height: getButtonHeight('보통이다'),
                                backgroundColor: getButtonBackgroundColor('보통이다'),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize('보통이다')
                            }}
                        >
                            보통이다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick('약간 그렇다')}
                            style={{
                                width: getButtonWidth('약간 그렇다'),
                                height: getButtonHeight('약간 그렇다'),
                                backgroundColor: getButtonBackgroundColor('약간 그렇다'),
                                color: '#06074f',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize('약간 그렇다')
                            }}
                        >
                            약간 그렇다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick('매우 그렇다')}
                            style={{
                                width: getButtonWidth('매우 그렇다'),
                                height: getButtonHeight('매우 그렇다'),
                                backgroundColor: getButtonBackgroundColor('매우 그렇다'),
                                color: '#06074f',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize('매우 그렇다')
                            }}
                        >
                            매우 그렇다
                        </Button>
                        <Button onClick={handleBefore} style={{width: '100%'}}>
                            이전
                        </Button>
                        <Button onClick={handleNext} style={{width: '100%'}}>
                            다음
                        </Button>
                        <Button onClick={handleShow} style={{width: '100%'}}>
                            홈 화면으로 돌아가기
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