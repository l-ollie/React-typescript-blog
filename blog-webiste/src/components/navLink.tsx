import { Nav } from "react-bootstrap";
import INavLink from "../models/navLink"

interface INavLinkProps{
    item:INavLink;
}

export default function NavLink(props:INavLinkProps){
    return(
        <Nav.Item>
            <Nav.Link className="nav-links text-nowrap">{props.item.title}</Nav.Link>
        </Nav.Item>

    )
}