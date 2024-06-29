import {Col, Container, Image, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import resultImage1 from '../image/resultPage1.jpeg';
import resultImage2 from '../image/resultPage2.jpeg';
import resultImage3 from '../image/resultPage3.jpeg';
import resultImage4 from '../image/resultPage4.jpeg';
import resultImage5 from '../image/resultPage5.jpeg';
import resultImage6 from '../image/resultPage6.jpeg';
import {useNavigate, useParams} from "react-router";
const ResultPage = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const { resultId } = useParams()

    const getResultImage = (id: string| undefined): [string, string] => {
        switch (id) {
            case '1':
                return [ resultImage1, '서울특별시_해치' ];
            case '2':
                return [ resultImage2, '대전광역시_한꿈이&꿈돌이' ];
            case '3':
                return [ resultImage3, '세종_충녕' ];
            case '4':
                return [ resultImage4, '부산_부비' ];
            case '5':
                return [ resultImage5, '대구광역시_패션이' ];
            case '6':
                return [ resultImage6, '충청북도_고드미&바르미' ];
            default:
                return [ resultImage1, '서울특별시_해치' ];
        }
    }

    const downloadImage = () => {
        const imageUrl = getResultImage(resultId)
        const link = document.createElement('a');
        link.href = imageUrl[0];
        link.download = `지역_마스코트_성격_유형_테스트_${imageUrl[1]}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleClose = () => setShow(false);
    const handleExit = () => {
        setShow(false)
        navigate('/')
    }
    const handleShow = () => setShow(true);


    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                        <Image src={require(`../image/resultPage${resultId}.jpeg`)} rounded width='90%' height='auto'
                               style={{marginTop: '10%'}}></Image>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button onClick={downloadImage}>Download Image</Button>
                        <Button onClick={handleShow} style={{width: '100%'}}>
                            홈 화면으로 돌아가기
                        </Button>
                    </div>
                </Col>
                <Col md={4} sm={0}></Col>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>앗! 잠시만요!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        이전으로 돌아가게 되면 테스트 결과는 다시 조회할 수 없습니다.
                        <br/>
                        결과 이미지를 다운받아서 친구와 공유해보세요!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            취소
                        </Button>
                        <Button onClick={handleExit}>
                            홈 화면으로 돌아 갈래요
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )
}

export default ResultPage