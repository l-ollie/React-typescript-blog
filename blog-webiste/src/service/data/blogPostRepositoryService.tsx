import api from "./api";
import {BasePost} from '../../models/Posts';

export default class BlogPostRepositoryService {
    apiEndpoint: string;

    constructor(){
        this.apiEndpoint = "BlogPosts";
    }

    async getById(categoryId:number) {
        return await api.get(`${this.apiEndpoint}/GetPostByCategory?categoryId=${categoryId}`);
    }    

    async newPost(title:string, text:string, categoryId:number) {
        const newBlogPost = new BasePost(title, text,categoryId);
        return await api.post(`${this.apiEndpoint}`, newBlogPost);
    }

    async deletePost(id:number) { 
        return await api.delete(`${this.apiEndpoint}/${id}`)
    }

    async editPost( title:string, text:string,  categoryId:number, id:number) { 
        const replacePost = new BasePost(title, text, categoryId, id);
        return await api.put(`${this.apiEndpoint}/${id}`, replacePost )
    }

    async searchPosts( term:string) { 
        return await api.get(`${this.apiEndpoint}/Search?term=${term}`)
    }
}