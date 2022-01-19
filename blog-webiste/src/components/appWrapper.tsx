import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Navigation from "./navigation";
import BlogTitle from "./blogTitle";
import BlogPost from "./blogPost";
import SideBar from "./sideBar";
import NewPostForm from "./newPost";
import ExistingPost, { BasePost } from '../models/Posts';
import Category from '../models/sideBarCat';
import BlogPostRepositoryService from '../service/data/blogPostRepositoryService';
import DeleteModal from "./deleteModal";
import SystemMessage from "../models/systemMsg";

let navLinks = [
    {"title":"Link1", "URL":"none"},{"title":"Link2", "URL":"none"},{"title":"Link3", "URL":"none"},{"title":"My profile", "URL":"none"},{"title":"Logout", "URL":"none"}];

let sideBarLinks = [
    new Category(0, "Category 1", "none" ),new Category(1, "Category 2", "none" ),new Category(2, "Category 3", "none" )];

export default function AppWrapper(){
    const blogPostRepositoryService:any = new BlogPostRepositoryService();
    const [systemMessage, setSystemMessage] = useState<SystemMessage | null>(null);
    const [data, setData] = useState<Array<ExistingPost>| null > (null);
    const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
    const [selectedCatId, setSelectedCatId] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal]= useState(false);
    const [selectedPost, setSelectedPost] = useState<ExistingPost | null>(null);
    const [editPost, setEditPost] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [emptyListText, setEmptyListText] = useState<string>("");

    function errorMessageHandler(error:any): void {
        const message =
            error.response.data === "" ? error.message : error.response.data.title;
            setSystemMessage(new SystemMessage("Error",message));
            setIsLoading(false);
    }

    async function getPostFromCategory(): Promise<void> {
        setIsLoading(true);
        const response = await blogPostRepositoryService.getById(selectedCatId).catch((error:any) => {
            errorMessageHandler(error);
        });
        const responseData = response.data.resultData;
        setData(responseData);
        setIsLoading(false);
    }

    async function submitPost(post:BasePost): Promise<void> {
        setIsLoading(true);
        if(post.id === 0){
            const response = await blogPostRepositoryService.newPost(post.title,post.text,selectedCatId).catch((error:any) => {
                errorMessageHandler(error);
            });
            setShowCreatePost(false);
            console.log(response);
            setSystemMessage(new SystemMessage("Success","Post succesfully added"));
        }

        if(post.id !== 0){
            const response = await blogPostRepositoryService.editPost(post.title,post.text,selectedCatId,post.id).catch((error:any) => {
                    errorMessageHandler(error);
                });
                setSystemMessage(new SystemMessage("Success", "Post succesfully edit"));
        }
        await getPostFromCategory();
    }

    async function deletePostHandler( post:ExistingPost): Promise<void> {
        setShowDeleteModal(false);
        setSelectedPost(null);
        setIsLoading(true);
        const response = await blogPostRepositoryService.deletePost(post.id).catch((error:any) => {
            errorMessageHandler(error);
          });
        setSystemMessage(new SystemMessage("Success", `Post "${selectedPost?.title}" was deleted`));
        await getPostFromCategory();
    }

    async function searchPostsHandler(searchTerm:string): Promise<void> {
        setIsLoading(true);
        if(searchTerm !== ""){
            const response = await blogPostRepositoryService.searchPosts(searchTerm).catch((error:any) => {
                errorMessageHandler(error);
            });
            const responseData = response.data.resultData;
            setData(responseData);
            setIsLoading(false);
        } else {
            getPostFromCategory();
        }
    }

    useEffect(()=>{
        getPostFromCategory();
    },[selectedCatId]); 
    
    const populateBlogList: any | Array<ExistingPost> = data?.map((item:any, index:number)=>{
        return <BlogPost 
                    key={index} 
                    post={item} 
                    submitHandler={submitPost} 
                    editPost={editPost} 
                    setEditPost={setEditPost} 
                    setShowDeleteModal={setShowDeleteModal} 
                    selectedPost={selectedPost} 
                    setSelectedPost={setSelectedPost}/>
    });

    function settingTextForEmptyList(){
        if(!isTyping && !isLoading){
            if(searchTerm !== ""){
                setEmptyListText(`No post found with "${searchTerm}"`)
            } else{
                setEmptyListText("No post found");
            }
        }
    }

    useEffect(()=>{
        settingTextForEmptyList();
    },[isTyping,isLoading]);

    return(
        <div>
            <Navigation 
                pageTitle="BlogSite" 
                links={navLinks} 
                searchPostsHandler={searchPostsHandler} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                setIsTyping={setIsTyping}
                />
            <Container className="mt-5">
                <DeleteModal 
                    showDeleteModal={showDeleteModal} 
                    setShowDeleteModal={setShowDeleteModal} 
                    selectedPost={selectedPost} 
                    deleteAction={deletePostHandler}/>
                <Row>
                    <Col xs="12" sm="3" lg="2"></Col>
                    <Col xs="12" md="12" sm="9" lg>
                        <BlogTitle 
                            blogTitle="Welcome to my blog" 
                            systemMessage={systemMessage} 
                            setSystemMessage={setSystemMessage} 
                            setNewPost={setShowCreatePost} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="3" lg="2">
                        <SideBar 
                            categories={sideBarLinks} 
                            setCategoryId={setSelectedCatId} 
                            selectedCategoryId={selectedCatId} />
                    </Col>
                    <Col xs="12" sm lg >
                        <NewPostForm 
                            createPost={showCreatePost}  
                            setNewPost={setShowCreatePost} 
                            submitHandler={submitPost} 
                            selectedCat={selectedCatId}/>
                            <Spinner animation="border" className={isLoading === true ? "" : "d-none"} />

                            {populateBlogList}
                            {populateBlogList?.length === 0  ? <h3>{emptyListText}</h3> : null }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}