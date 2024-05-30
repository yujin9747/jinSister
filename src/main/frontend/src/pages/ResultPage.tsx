import {Col, Container, Image, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import resultImage from '../image/resultPage.jpeg'
import {useNavigate} from "react-router";
const ResultPage = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'resultPage.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleClose = () => setShow(false);
    const handleExit = () => {
        setShow(false)
        navigate('/')
        // TODO: 기존에 선택했던 데이터 지우고 완전 처음으로 돌아가기
    }
    const handleShow = () => setShow(true);


    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div style={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                        <Image src={require(`../image/resultPage.jpeg`)} rounded width='90%' height='auto'
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