import React, { useEffect, useState } from "react";
import {Form } from "react-bootstrap";

export default function Searcher(props:any){
  const searchDelay:number = 1000;

  function handleValueSearch(e: React.ChangeEvent<HTMLInputElement>){
    props.setIsTyping(true);
    props.setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const delaySearchTerm = setTimeout(() => {
        sendSearchTerm();
    }, searchDelay)

    return () => clearTimeout(delaySearchTerm)
  }, [props.searchTerm])

  
  function sendSearchTerm(){
      props.setIsTyping(false);
      props.searchPostsHandler(props.searchTerm);
  }

    return(
        <Form.Control  
        type="text"
        placeholder="Search blogs"
        size="sm"
        onChange={handleValueSearch} 
      />
    )
}