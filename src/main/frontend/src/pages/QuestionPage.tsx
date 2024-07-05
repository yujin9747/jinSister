import {Col, Container, Form, Image, Row, Modal} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Button from "@mui/material/Button";

const QuestionPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const parsedId = parseInt(id!)

    const handleNext = () => {
        if (!answers[parsedId - 1]) {
            alert('답변 해야 넘어갈 수 있습니다.')
            return;
        }
        setSelectedButton(null)
        if (parsedId < 30) {
            navigate(`/question/${parsedId + 1}`)
        } else {
            const allAnswered = answers.every(answer => answer !== null && answer !== undefined && answer !== '');
            if (!allAnswered) {
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
    const [isAnswered, setIsAnswered] = useState(false)

    const handleButtonClick = (buttonName: any) => {
        setSelectedButton(buttonName)
        console.log(buttonName)

        const newAnswers = [...answers]
        newAnswers[parsedId-1] = buttonName
        setAnswers(newAnswers)

        setTimeout(() => {
            setSelectedButton(null)
            if (parsedId < 30) {
                navigate(`/question/${parsedId + 1}`)
            } else {
                const allAnswered = answers.every(answer => answer !== null && answer !== undefined && answer !== '');
                if (!allAnswered) {
                    const firstUnansweredQuestion = answers.findIndex(answer => answer === null || answer === undefined || answer === '');
                    navigate(`/question/${firstUnansweredQuestion + 1}`);
                } else {
                    const resultId = determineResultId(answers)
                    navigate(`/result/${resultId}`, { state: answers })
                }
            }
        }, 500);
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
            case 1:
                return '#d9d9ff'
            case 2:
                return '#b5b6ff'
            case 3:
                return '#9092fc'
            case 4:
                return '#7779fc'
            case 5:
                return '#6366ff'
            default:
                return '#6366ff'
        }
    }

    useEffect(() => {
        console.log(answers)
    }, [answers])

    useEffect(() => {
        setSelectedButton(answers[parsedId-1])
    }, [parsedId]);

    useEffect(() => {
        setIsAnswered(answers[parsedId - 1] !== null && answers[parsedId - 1] !== undefined);
    }, [answers, parsedId]);

    const backgroundImage = require('../image/questionPage.png');
    const questions = [
        '방 안에 조용히 있으면 \n답답해 지거나 잠이 온다',
        '과학이나 역사에 관한 \n책 읽기를 좋아한다',
        '나는 상상력이 \n풍부한 편이다',
        '여러 사람이 모이는 모임에 \n참석 하는 것이 좋다',
        '다른 사람에 비해 \n욕심과 야망이 큰 편이다',
        '나는 정리 정돈을 \n잘 해두는 편이다',
        '이론을 따지고 토론 하는 것을 보면 \n재미가 없다',
        '무엇이 궁금 하면 \n책을 찾아 보거나 \n실험 해보려 한다',
        '나는 좋아 하고 싫어 하는 \n일이 뚜렷 하다',
        '내 주위에는 \n늘 친한 친구들이 있다',

        '내가 앞장 서서 하는 일을 \n좋아한다',
        '세밀하고 꼼꼼한 성격이다',
        '험한 운동도 \n피하지 않고 잘 한다',
        '나는 무엇을 새롭게 \n배우는 것이 즐겁다',
        '나는 감정이 풍부해서 \n조그마한 일에 감동한다',
        '다른 사람들과 대화에서 \n감정이 잘 통하는 편이다',
        '장래에 다른 사람들을 지도하는 \n지도자 역할을 하고 싶다',
        '무슨 일이든 계획한 대로 \n실행해야 마음이 편하다',
        '말을 다정스럽다기 보다 \n무뚝뚝하게 하는 편이다',
        '예술보다 과학을 좋아한다',

        '나에게는 예술적 재능이 \n있는 것 같다',
        '인정이 많은 사람이 되고 싶다',
        '집단활동을 계획하고 \n이끌어가는 일을 좋아한다',
        '변화가 많고 복잡한 것은 \n별로 좋아하지 않는다',
        '방 안에서 보다 밖에서 \n활동적인 놀이나 운동을 좋아한다',
        '과학적 사실에 대해 \n알아보는 것이 즐겁다',
        '평범한 것보다 새롭고 \n별다른 것이 좋다',
        '다른 사람들 보다 \n따뜻하고 인정이 많은 편이다',
        '나는 적극적이고 \n주장이 강한 편이다',
        '원리원칙대로 행동하고 \n또 그렇게 살려고 한다'
    ]
    return (
        <Container fluid>
            <h1 style={{display: 'none'}}>방 안에 조용히 있으면 답답해지거나 잠이 온다.</h1>
            <h1 style={{display: 'none'}}>과학이나 역사에 관한 책 읽기를 좋아한다.</h1>
            <h1 style={{display: 'none'}}>나는 상상력이 풍부한 편이다.</h1>
            <h1 style={{display: 'none'}}>여러 사람이 모이는 모임에 참석 하는 것이 좋다.</h1>
            <h1 style={{display: 'none'}}>다른 사람에 비해 욕심과 야망이 큰 편이다.</h1>
            <h1 style={{display: 'none'}}>나는 정리 정돈을 잘 해두는 편이다.</h1>
            <h1 style={{display: 'none'}}>이론을 따지고 토론 하는 것을 보면 재미가 없다.</h1>
            <h1 style={{display: 'none'}}>무엇이 궁금 하면 책을 찾아 보거나 실험 해보려 한다.</h1>
            <h1 style={{display: 'none'}}>나는 좋아 하고 싫어 하는 일이 뚜렷 하다.</h1>
            <h1 style={{display: 'none'}}>내 주위에는 늘 친한 친구들이 있다.</h1>

            <h1 style={{display: 'none'}}>내가 앞장서서 하는 일을 좋아한다.</h1>
            <h1 style={{display: 'none'}}>세밀하고 꼼꼼한 성격이다.</h1>
            <h1 style={{display: 'none'}}>험한 운동도 피하지 않고 잘 한다.</h1>
            <h1 style={{display: 'none'}}>나는 무엇을 새롭게 배우는 것이 즐겁다.</h1>
            <h1 style={{display: 'none'}}>나는 감정이 풍부해서 조그마한 일에 감동한다.</h1>
            <h1 style={{display: 'none'}}>다른 사람들과 대화에서 감정이 잘 통하는 편이다.</h1>
            <h1 style={{display: 'none'}}>장래에 다른 사람들을 지도하는 지도자 역할을 하고 싶다.</h1>
            <h1 style={{display: 'none'}}>무슨 일이든 계획한 대로 실행해야 마음이 편하다.</h1>
            <h1 style={{display: 'none'}}>말을 다정스럽다기보다 무뚝뚝하게 하는 편이다.</h1>
            <h1 style={{display: 'none'}}>예술보다 과학을 좋아한다.</h1>

            <h1 style={{display: 'none'}}>나에게는 예술적 재능이 있는 것 같다.</h1>
            <h1 style={{display: 'none'}}>인정이 많은 사람이 되고 싶다.</h1>
            <h1 style={{display: 'none'}}>집단활동을 계획하고 이끌어가는 일을 좋아한다.</h1>
            <h1 style={{display: 'none'}}>변화가 많고 복잡한 것은 별로 좋아하지 않는다.</h1>
            <h1 style={{display: 'none'}}>방 안에서 보다 밖에서 활동적인 놀이나 운동을 좋아한다.</h1>
            <h1 style={{display: 'none'}}>과학적 사실에 대해 알아보는 것이 즐겁다.</h1>
            <h1 style={{display: 'none'}}>평범한 것보다 새롭고 별다른 것이 좋다.</h1>
            <h1 style={{display: 'none'}}>다른 사람들 보다 따뜻하고 인정이 많은 편이다.</h1>
            <h1 style={{display: 'none'}}>나는 적극적이고 주장이 강한 편이다.</h1>
            <h1 style={{display: 'none'}}>원리원칙대로 행동하고 또 그렇게 살려고 한다.</h1>

            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{
                        marginTop: '10%',
                        marginBottom: '10%',
                        height: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            whiteSpace: 'pre-line'
                        }}>
                            {questions[parsedId-1]}
                        </div>
                    </div>
                    <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(1)}
                            style={{
                                width: getButtonWidth(1),
                                height: getButtonHeight(1),
                                backgroundColor: getButtonBackgroundColor(1),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize(1)
                            }}
                        >
                            매우 그렇지 않다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(2)}
                            style={{
                                width: getButtonWidth(2),
                                height: getButtonHeight(2),
                                backgroundColor: getButtonBackgroundColor(2),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize(2)
                            }}
                        >
                            그렇지 않다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(3)}
                            style={{
                                width: getButtonWidth(3),
                                height: getButtonHeight(3),
                                backgroundColor: getButtonBackgroundColor(3),
                                color: '#0c0e94',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize(3)
                            }}
                        >
                            보통이다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(4)}
                            style={{
                                width: getButtonWidth(4),
                                height: getButtonHeight(4),
                                backgroundColor: getButtonBackgroundColor(4),
                                color: '#06074f',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize(4)
                            }}
                        >
                            약간 그렇다
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(5)}
                            style={{
                                width: getButtonWidth(5),
                                height: getButtonHeight(5),
                                backgroundColor: getButtonBackgroundColor(5),
                                color: '#06074f',
                                borderRadius: '0',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: getButtonFontSize(5)
                            }}
                        >
                            매우 그렇다
                        </Button>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                            <Button onClick={handleBefore} style={{flex: 1, marginRight: '5px'}}>
                                이전
                            </Button>
                            <Button onClick={handleNext} style={{flex: 1, marginLeft: '5px'}} disabled={!isAnswered}>
                                다음
                            </Button>
                        </div>
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