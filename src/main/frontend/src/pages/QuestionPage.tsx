import {Col, Container, Form, Image, Row, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Button from "@mui/material/Button";

const QuestionPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const parsedId = parseInt(id!)

    const handleNext = () => {
        setSelectedButton(null)
        if (parsedId < 30) {
            navigate(`/question/${parsedId + 1}`)
        } else {
            const allAnswered = answers.every(answer => answer !== null && answer !== undefined && answer !== '');
            if (!allAnswered) {
                console.log('모든 질문에 답변하지 않음.')
                const firstUnansweredQuestion = answers.findIndex(answer => answer === null || answer === undefined || answer === '');
                navigate(`/question/${firstUnansweredQuestion + 1}`);
            } else {
                const resultId = determineResultId(answers)
                navigate(`/result/${resultId}`, { state: answers })
            }
        }
    }

    type ResultType = 'C' | 'S' | 'A' | 'E' | 'I' | 'R';

    const determineResultId = (answers: number[]): number => {
        const resultTypeScores: Record<ResultType, number> = {
            'C': 0,
            'S': 0,
            'A': 0,
            'E': 0,
            'I': 0,
            'R': 0,
        };

        const questionResults: Record<ResultType, number[]> = {
            'C': [6, 12, 18, 24, 30],
            'S': [4, 10, 16, 22, 28],
            'A': [3, 9, 15, 21, 27],
            'E': [5, 11, 17, 23, 29],
            'I': [2, 8, 14, 20, 26],
            'R': [1, 7, 13, 19, 25],
        };

        answers.forEach((answer, index) => {
            if (questionResults.C.includes(index + 1)) {
                resultTypeScores.C += answer;
            } else if (questionResults.S.includes(index + 1)) {
                resultTypeScores.S += answer;
            } else if (questionResults.A.includes(index + 1)) {
                resultTypeScores.A += answer;
            } else if (questionResults.E.includes(index + 1)) {
                resultTypeScores.E += answer;
            } else if (questionResults.I.includes(index + 1)) {
                resultTypeScores.I += answer;
            } else if (questionResults.R.includes(index + 1)) {
                resultTypeScores.R += answer;
            }
        });

        let highestScore = 0;
        let resultType: ResultType = 'C';

        let entries = Object.entries(resultTypeScores);
        for (const entry of entries) {
            let type = entry[0];
            let score = entry[1];
            if (score > highestScore) {
                highestScore = score;
                resultType = type as ResultType;
            }
        }

        console.log(resultType)

        return getResultImageNumber(resultType)
    }

    const getResultImageNumber = (resultType: ResultType): number => {
        switch (resultType) {
            case 'C':
                return 6;
            case 'S':
                return 1;
            case 'A':
                return 5;
            case 'E':
                return 3;
            case 'I':
                return 2;
            case 'R':
                return 4;
            default:
                return 1;
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleExit = () => {
        setShow(false)
        navigate('/')
    }
    const handleShow = () => setShow(true);

    const handleBefore = () => {
        setSelectedButton(null)
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
        newAnswers[parsedId-1] = mapButtonToScore(buttonName)
        setAnswers(newAnswers)
    }

    const mapButtonToScore = (buttonName: string): number => {
        switch (buttonName) {
            case '매우 그렇다':
                return 5;
            case '약간 그렇다':
                return 4;
            case '보통이다':
                return 3;
            case '그렇지 않다':
                return 2;
            case '매우 그렇지 않다':
                return 1;
            default:
                return 0; // 기본적으로 점수를 0으로 설정하거나, 에러 처리 등을 추가할 수 있습니다.
        }
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