import {Col, Container, Form, Image, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import Button from "@mui/material/Button";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

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
            navigate("/result")
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
                        {/*동그라미 라디오 버튼*/}
                        {/*{radioOptions.map((option, index) => (*/}
                        {/*    <Radio*/}
                        {/*        key={option.value}*/}
                        {/*        sx={{*/}
                        {/*            '& .MuiSvgIcon-root': {*/}
                        {/*                fontSize: option.fontSize,*/}
                        {/*                color: '#3949ab'*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*        value={option.value}*/}
                        {/*        checked={selectedValue === option.value}*/}
                        {/*        onChange={handleRadioChange}*/}
                        {/*    />*/}
                        {/*))}*/}
                        <Button onClick={handleNext} style={{ width: '100%' }}>
                            Next
                        </Button>
                    </Form>
                </Col>
                <Col md={4} sm={0}></Col>
            </Row>
        </Container>
    )
}

export default QuestionPage