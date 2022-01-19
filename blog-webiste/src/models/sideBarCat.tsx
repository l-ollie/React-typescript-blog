export default class Category {
    id:number;
    title:string;
    URL: string;

    constructor(id:number, title:string, URL:string) {
        this.id = id;
        this.title = title;
        this.URL = URL;
    }       

    public get CategoryUrl() {
        return `Category/${this.id}`;
    } 
}