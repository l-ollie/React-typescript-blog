import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavLink from "./navLink";
import Searcher from "./searcher";
import INavLink from "../models/navLink"

export interface INavigationProps{
    links: Array<INavLink>;
    pageTitle: string;
    searchPostsHandler: (term:string) => void;
    searchTerm:string;
    setSearchTerm: (name:string) => void;
    setIsTyping: (state:boolean) => void;
}

export default function Navigation(props:INavigationProps){

    const populateLinks = props.links.map( (item, index) => { return(
        <NavLink key={index} item={item}/>)
    })

    return(
        <Navbar bg="dark" variant="dark" expand="md" >
            <Container >
                <Navbar.Brand  className= "m-2 text-white">{props.pageTitle}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav " className="justify-content-end">
                    <Nav className=" justify-content-end" >
                        <Nav.Item  className="nav-input"> 
                            <Searcher 
                                searchPostsHandler={props.searchPostsHandler} 
                                searchTerm={props.searchTerm} 
                                setSearchTerm={props.setSearchTerm}
                                setIsTyping={props.setIsTyping} />
                            </Nav.Item>
                        {populateLinks}
                    </Nav>
                </Navbar.Collapse >
            </Container>
        </Navbar>

    );
}