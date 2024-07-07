import {Col, Container, Image, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import resultImage1 from '../image/resultPage1.jpeg';
import resultImage2 from '../image/resultPage2.jpeg';
import resultImage3 from '../image/resultPage3.jpeg';
import resultImage4 from '../image/resultPage4.jpeg';
import resultImage5 from '../image/resultPage5.jpeg';
import resultImage6 from '../image/resultPage6.jpeg';
import {useLocation, useNavigate, useParams} from "react-router";
import {FaDownload, FaGift, FaRedo, FaShare, FaUserPlus} from "react-icons/fa";
import styled from "@emotion/styled";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import {IconButton} from "@mui/material";
import {MdOutlineContentCopy} from "react-icons/md";
import axios from "axios";

const ResultPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showInvalidBrowser, setShowInvalidBrowser] = useState(false);
    const [showEventPromotion, setShowEventPromotion] = useState(true);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

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

    const downloadImage = async () => {
        await axios.post(
            'https://wh.jandi.com/connect-api/webhook/31418946/db8dcc71f936eec942cab6571bea0af7',
            {
                body: JSON.stringify({
                    resultType: resultId
                })
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.tosslab.jandi-v2+json'
                }
            }
        ).then(r => {
            console.log(r)
        })
        const imageUrl = getResultImage(resultId)
        const link = document.createElement('a');
        link.href = imageUrl[0];
        link.download = `지역_마스코트_성격_유형_테스트_${imageUrl[1]}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleClose = () => {
        setShow(false);
        setShowInvalidBrowser(false);
        setShowEventPromotion(false);
    }
    const handleExit = () => {
        setShow(false)
        navigate('/')
    }
    const handleShow = () => setShow(true);

    const FlexContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;    
    `;

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(4, 48px);
        grid-column-gap: 8px;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
    `;

    const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`;


    const currentUrl = 'https://mascot-jin.netlify.app/';

    const shareData = {
        title: "마스코트 성격 유형 검사",
        url: currentUrl,
    };

    const clickShareBtn = async () => {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('실패')
            setShowInvalidBrowser(true)
        }
    }

    const clickCopyUrlBtn = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            alert("클립보드 복사에 실패했어요. 다시 시도해 주세요.");
        }
    }

    const handleEventSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post(
            'https://wh.jandi.com/connect-api/webhook/31418946/9cc4e165d1a8848507f628d74afa2878',
            {
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    resultId: resultId,
                    answers: location.state
                })
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.tosslab.jandi-v2+json'
                }
            }
        ).then(r => {
            console.log(r)
        })
        setShowEventPromotion(false);
        setName('');
        setPhone('');
    }

    return (
        <Container fluid>
            <h1 style={{display: 'none'}}>
                해치(서울특별시) 사회형(S) 봉사/ 사람 지향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 사람들과 어울리기를 좋아하고 재미난 이야 기를 나누기를 무척 좋아하는 수다쟁이!
                불쌍한 사람들을 돕고 싶어하는 수호천사같은 존재!
                사람들과 함께 시간을 보내는 것이 가장 행복하고 동정심이 많아 다른 사람의 아픔을 나의 아픔처럼 여기는 착한 사람!
                당신의 유형에 맞는 진로는 선생님, 간호사, 사회복 지사 등 교육, 사회봉사, 의료봉사, 종교활동 분야와 어울려요!
                당신은 정의와 안전을 지켜주고 꿈과 희망, 행복을 가져다주는 서울의 마스코트인 해치와 닮았답니다
            </h1>
            <h1 style={{display: 'none'}}>
                한꿈이&꿈돌이
                대전광역시
                탐구형(I)
                사고/ 아이디어찌향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 하루 온종일 책을 보며 실험을 하고 연구하는 과학자! 알고 싶은 것이 너무 많은 궁금이!
                당신은 공부 를 잘하고 특히 수학과 과학을 잘하죠 주위 사람들과 어울려 노는 것보다 혼자 책보고
                생각하는 것을 즐기는 당신의 유형에 맞는 진로는 과학자, 의사, 약사, 천문 학자, 발명가 등 과학, 수학, 의학 분야와 어울려요!
                당신은 과학과 미래라는 대전의 이미지를 상징하는 한 꿈이와 과학기술, 산업의 발전을 통한 인류의 평화와
                공존공영의 미래상을 제시하는 꿈돌이와 닮았답니다
            </h1>
            <h1 style={{display: 'none'}}>
                젊은세공.
                풍녕
                진취형(E)
                관리/성취 끼향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 사람들을 잘 이끌어가고 누구하고나 잘 지내는 인 기쟁이! 매우 적극적이고 경쟁심이 많은 사람!
                당신이 이 끌면 다른 사람들이 다 따르게 되어 있어요!
                말을 참 잘하 고 일단 말을 시작하면 술술 나오는 당신의 유형에 맞는 진로는 경찰관, 검사, 사업가, 정치가, 기자 등 대중연설, 법, 정치, 판매, 조직 관리 분야와 어울려요!
                당신은 체계 적이고 논리적이며 소통대왕이었던 세종시의 젊은 세종 충 녕과 닮았답니다
            </h1>
            <h1 style={{display: 'none'}}>
                부비(부산)
                현형(R)
                실행/실물 찌향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 기계를 잘다루기 때문이 손재주가 많아요!
                운 동도 잘하죠. 축구, 농구 등과 같은 운동을 잘하고 에너 지가 넘치죠!
                오랫동안 가만히 있는 것을 견디지 못하 고 활동적인 놀이를 좋아하는 당신의 유형에 맞는 진로 는 운동가, 기계기사, 농부, 트럭운전사, 군인 등 군사 활동, 기계, 스포츠 분야와 어울려요!
                당신은 꿈과 희 망을 상징하는 태양을 활발하고 힘차게 역동하는 부산 의 부비와 닮았답니다
            </h1>
            <h1 style={{display: 'none'}}>
                고드미&바르미
                (충청북도)
                관습형(C)
                관급/짜료 피향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 정확하고 빈틈이 없는 사람!
                무엇이든 깔끔하게 정리정돈하기를 좋아하고, 규칙적인 생활을 잘하는 사람!
                작은 일에도 메모하고 보 관해두기를 잘하며 한 번도 못한 일을 하려면 많이 두렵지만 일단 시작하면 책임감있게 하 죠! 당신의 유형에 맞는 진로는 은행원, 도서관 사서, 공무원 등
                자료관리, 컴퓨터 활동, 사무 활동 분야와 어울려요!
                당신은 충북 전래의 선 비 정신과 기상을 바탕으로 21c 새 시대를 바 르고 올곧게 개척해나가는 충청북도의 마스코 트인 고드미&바르미와 닮았답니다
            </h1>
            <h1 style={{display: 'none'}}>
                패션이
                대구광역시
                예물형(S)
                창조/아이디어피향
            </h1>
            <h1 style={{display: 'none'}}>
                당신은 예술을 사랑하는 예술가! 다른 사람들이 당신 을 보고 개성이 강하고 상상력이 풍부하며
                늘 새로운 것을 찾는 사람이라고 말하기도 하죠.
                감정이 풍부하 고 변덕을 잘 부리고 같은 일을 반복하는 일은 싫어하 는 통통튀는 매력을 가진 사람!
                당신의 유형에 맞는 진로는 화가, 음악가, 배우, 소설가, 무용가, 만화가, 디자이너 등 음악, 미술, 글쓰기 분야와 어울려요!
                당 신은 한국의 전통적인 비천상 문양의 미적 감각을 21 세기 세계적 섬유패션도시로 발전하고자 하는 대구의 패션이와 닮았답니다
            </h1>
            <Row className="vh-100">
                <Col md={4} sm={0}></Col>
                <Col md={4} sm={12}>
                    <div
                        style={{
                            height: '80vh',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Image src={require(`../image/resultPage${resultId}.jpeg`)}
                               fluid
                               width='auto'
                               height='70vh'
                               style={{
                                   marginTop: '10%',
                                   borderRadius: '10px',
                                   boxShadow: '0px 0px 10px 0px #81fd98'
                               }}
                        >
                        </Image>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button onClick={downloadImage} style={{flex: 1, color: '#3949ab'}}>
                            <FaDownload style={{ marginRight: '5px' }} />
                            결과 다운로드
                        </Button>
                        <Button onClick={() => setShowEventPromotion(true)} style={{flex: 1, color: '#3949ab'}}>
                            <FaGift style={{ marginRight: '5px' }} />
                            이벤트 참여하기
                        </Button>
                        <Button onClick={handleShow} style={{flex: 1, color: '#3949ab'}}>
                            <FaRedo style={{ marginRight: '5px' }} />
                            다시 하기
                        </Button>
                    </div>
                    <FlexContainer>
                        <GridContainer>
                            <FacebookShareButton url={currentUrl}>
                                <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
                            </FacebookShareButton>
                            <TwitterShareButton url={currentUrl}>
                                <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
                            </TwitterShareButton>
                            <IconButton onClick={clickShareBtn} style={{ width: '48px', height: '48px', borderRadius: '24px', border: '2px solid #3949ab', backgroundColor: '#3949ab' }}>
                                <FaShare style={{ fontSize: '24px', color: 'white' }} />
                            </IconButton>
                            <IconButton onClick={clickCopyUrlBtn} style={{ width: '48px', height: '48px', borderRadius: '24px', border: '2px solid #3949ab', backgroundColor: '#3949ab' }}>
                                <MdOutlineContentCopy style={{ fontSize: '24px', color: 'white' }} />
                            </IconButton>
                        </GridContainer>
                    </FlexContainer>
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
                <Modal show={showInvalidBrowser} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>공유 불가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        지원하지 않는 브라우저입니다.
                        <br/>
                        지원 가능 브라우저:
                        <br/>
                        웹: Safari, Edge
                        <br/>
                        모바일(android): Chrome, Firefox, Opera for Android
                        <br/>
                        모바일(ios): Safari for IOS
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEventPromotion} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>이벤트 참여</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleEventSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">이름</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneInput" className="form-label">전화번호</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneInput"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit">
                                제출하기
                            </Button>
                            <Button onClick={handleClose} className="ms-2">
                                참여하지 않기
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Row>
        </Container>
    )
}

export default ResultPage