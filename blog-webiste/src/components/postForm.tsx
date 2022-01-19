import React, { createRef } from "react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ExistingPost, {BasePost} from '../models/Posts';

interface IForm{ 
    closeHandler: () => void;
    submitHandler: (post:BasePost) => void;
    post:ExistingPost | null;
    focusOnTitle:boolean;
}

export default function PostForm(props:IForm){
    const [formTitle, setFormTitle] = useState<string>("");
    const [formText, setFormText] = useState<string>("");
    const [validated, setValidated] = useState(false);
    let _myInp: any = createRef();

    useEffect(()=>{
            _myInp.focus();
            if(props.post){
                setFormTitle(props.post.title);
                setFormText(props.post.text);
            }
  
    },[props.focusOnTitle]);
    
    const submitButtonText = () => {
        if (props.post){
            return "Update Post" 
        }  
        return "Add new post"
    };

    function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>):void {
        setFormTitle(e.target.value);
    }

    function handleChangeText(e: React.ChangeEvent<HTMLInputElement>):void {
        setFormText(e.target.value);
    }

    function submitAction(): void{
        if(props.post === null){
            const postToAdd = new BasePost(formTitle,formText);
            props.submitHandler(postToAdd);
        } else {
            const postToEdit = new BasePost(formTitle,formText,props.post.categoryId,props.post.id);
            props.submitHandler(postToEdit);
        }
    }


    const handleSubmit = (event:React.SyntheticEvent):void => { 
        event.preventDefault();
        
        const form = (event.currentTarget) as HTMLFormElement ;
        if (form.checkValidity()) {
            submitAction();
            setValidated(false);
            props.closeHandler();
            return;
        }
        setValidated(true);
    };

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="blogTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control 
                    ref={(ip: any) => { _myInp = ip}}
                    required
                    autoFocus
                    type="text" 
                    placeholder= "A Majestic Title" 
                    onChange={handleChangeTitle} 
                    value={formTitle}/>
                <Form.Control.Feedback type="invalid">Title can't be empty</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="blogTitle">
                <Form.Label>Text</Form.Label>
                <Form.Control 
                    required
                    as="textarea" 
                    rows={3} 
                    placeholder="Something fascinating" 
                    onChange={handleChangeText} 
                    value={formText} />
                <Form.Control.Feedback type="invalid">Text can't be empty</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Button variant="secondary" onClick={()=>{props.closeHandler()}}>Close</Button>
                {' '}
                <Button variant="primary" 
                type="submit"
                >{submitButtonText()}</Button>
            </Form.Group>
        </Form>
    )
}