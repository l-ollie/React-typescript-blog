import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props:any){

    return(
        <Modal
        size="sm"
        show={props.showDeleteModal}
        onHide={() => props.setShowDeleteModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Delete Blog Post?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete post <span className="fw-bold">"{props.selectedPost?.title}"</span>?
                <br/>
                You can't undo this action.
            </Modal.Body>
            <Modal.Footer> 
                <Button onClick={() => props.setShowDeleteModal(false)} variant="secondary">Close</Button>
                <Button variant="danger" onClick={() => props.deleteAction(props.selectedPost)} >Delete post</Button>
            </Modal.Footer>
        </Modal>
    )
}

