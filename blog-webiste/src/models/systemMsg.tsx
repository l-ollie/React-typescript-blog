export default class SystemMessage { 
    title;
    text;
    state;
    constructor(title:string, text:string){
        this.title = title;
        this.text = text;
        this.state=title === "Success" ? "light":"danger";
    }
}