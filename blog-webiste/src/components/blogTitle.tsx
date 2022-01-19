import { useEffect } from "react";
import { Button, Col, Container, Row, Toast } from "react-bootstrap";
import Moment from "react-moment";
import SystemMessage from "../models/systemMsg";

interface IBlogTitleProps{
    blogTitle : string;
    systemMessage : SystemMessage | null;
    setSystemMessage: (reset:null) => void;
    setNewPost:(message:boolean) => void;
}

export default function BlogTitle(props:IBlogTitleProps){
    let hasMessage = props.systemMessage? true : false;
    const timeOfToast = new Date(); 

    function deleteSystemMessage(){
        props.setSystemMessage(null);
    }

    function showNewPostModel(){
        props.setNewPost(true);
    }

    return(
        <Container >
            <Row>
            <h3 className="minContMar-left">{props.blogTitle}</h3>
            </Row>
            <Row>
                <Col>
                    <Toast show={hasMessage} onClose={deleteSystemMessage} bg={props.systemMessage?.state}>
                        <Toast.Header>
                            <strong className="me-auto">{props.systemMessage?.title}</strong>
                            <small>
                                <Moment fromNow > 
                                    {timeOfToast} 
                                </Moment>
                            </small>

                        </Toast.Header>
                        <Toast.Body>{props.systemMessage?.text}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <Row className="mt-1 mb-2">
                <Col className="d-flex justify-content-end ">
                    <Button className="minContMar-right" onClick={showNewPostModel}>New Post</Button>
                </Col>
            </Row>
        </Container>
    );
}