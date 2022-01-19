export class BasePost{
    id:number;
    title:string;
    text:string;
    categoryId:number;

    constructor( title:string, text:string, categoryId:number =0, id:number = 0) {
        this.id = id;

        if (text === ""){
            throw new Error("NewPost text is empty string");
        }
        if (title === ""){
            throw new Error("NewPost title is empty string");
        }
        this.categoryId = categoryId;
        this.text = text;
        this.title = title;
    }
}
 export default class ExistingPost extends BasePost {
    createdAt: Date;
    updatedAt: Date;

    constructor( title:string, text:string, categoryId:number =0, id:number = 0,createdAt:Date=new Date(), updatedAt:Date=new Date()){
        super(title, text, categoryId, id);
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
 }

