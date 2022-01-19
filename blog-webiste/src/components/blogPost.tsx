import { Button, Card } from "react-bootstrap";
import PostForm from "./postForm";
import Moment from 'react-moment';
import 'moment-timezone';
import ExistingPost,{BasePost} from '../models/Posts';

interface IBlogPostProps{
    post:ExistingPost;
    selectedPost:ExistingPost | null;
    setSelectedPost:(post:ExistingPost | null) => void;
    setEditPost: (state:boolean)=> void;
    editPost:boolean;
    setShowDeleteModal: (state:boolean)=> void;
    submitHandler: (post:BasePost)=> void;
}

export default function BlogPost(props:IBlogPostProps){
    let showCard="mb-2";
    let hideCard="d-none"

    const datePrefix = () => {
        if(props.post.createdAt !== props.post.updatedAt){
            return"Updated at ";
        }
        return"Created at "
    };

    const dateStamp = props.post.createdAt === props.post.updatedAt?
                        props.post.createdAt : props.post.updatedAt;
 
    function editPost(){
        props.setEditPost(true);
        props.setSelectedPost(props.post);
    }

    function deletePost(){
        props.setShowDeleteModal(true);
        props.setSelectedPost(props.post)
    }

    return (
        <div className="single-post">
            <Card className={props.editPost && props.selectedPost?.id === props.post.id ? hideCard : showCard}>
                <Card.Body>
                    <Card.Title> {props.post.title} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">  
                        <small> 
                            {datePrefix()} 
                            <Moment local format="LL, HH:mm">{dateStamp}</Moment> 
                        </small>
                    </Card.Subtitle>
                    <Card.Text>
                        {props.post.text}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="d-flex justify-content-end">
                    <Button variant="link" onClick={()=> editPost()} >Edit</Button>
                    <Button variant="link" onClick={()=>deletePost()} >Delete</Button>
                </Card.Body>
            </Card >

            <Card className={props.editPost && props.selectedPost?.id === props.post.id ? showCard : hideCard}>
                <Card.Body>
                    <PostForm 
                        focusOnTitle={props.editPost && props.selectedPost?.id === props.post.id ? true : false}
                        post={props.post} 
                        closeHandler={()=>props.setEditPost(false)} 
                        submitHandler={props.submitHandler} 
                    />
                </Card.Body>
            </Card>
        </div>
    )
}