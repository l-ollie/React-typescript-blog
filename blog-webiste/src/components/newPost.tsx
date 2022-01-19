import Modal from "react-bootstrap/esm/Modal"
import PostForm from "./postForm";

export default function NewPostForm (props:any){

    function closeEditPost(){
        props.setNewPost(false);
    }

    return(
        <Modal show={props.createPost} onHide={closeEditPost}>
            <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p> <small>This post wil be added under the category <strong>{props.selectedCat+1}</strong></small></p>
                <PostForm focusOnTitle={props.createPost} closeHandler={closeEditPost} submitHandler={props.submitHandler} post={null} />
            </Modal.Body>
        </Modal>
    )
}