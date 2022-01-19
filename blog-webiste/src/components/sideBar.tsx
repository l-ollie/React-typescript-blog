import { Nav } from "react-bootstrap"
import Category from "../models/sideBarCat";

export interface ISideBarProps{
    categories: Array<Category>;
    setCategoryId: (category:number) => void;
    selectedCategoryId: number;
}

export default function SideBar(props:ISideBarProps){

    const selectedSideBar = (id:number) => {
        if(props.selectedCategoryId === id){
            return "sidebar-selected";
        }
        return "";
    }

    function setSelectedCategory(categoryId:number){
        props.setCategoryId(categoryId);
    }

    const populateSidebarLinks = props.categories.map( (item:Category, index:number) => { 
        return <Nav.Link key={index} className={`text-nowrap  ${selectedSideBar(item.id)}`} onClick={() => setSelectedCategory(item.id)}  >{item.title}</Nav.Link>
    })
    
    return(
        <Nav defaultActiveKey="/home" className="flex-column">
            {populateSidebarLinks}
        </Nav>

    )
}