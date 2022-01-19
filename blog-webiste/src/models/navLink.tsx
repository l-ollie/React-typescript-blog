export default interface INavLink {
    title: string;
    URL: string;
}
// export interface INavLinkProps{
//     item:INavLink;
// }
// export interface INavigationProps{
//     navLinks: Array<INavLink>;
//     pageTitle: string;
// }

class NavLink{
    private _title:string;
    private _url:string;
    
    constructor(title:string ,url:string){
        if(title === '') throw new Error('NavLink title is empty');
        this._title = title;
        this._url = url;
    }
    
    public get title() {
        return this._title;
    }
    
    public set title(theTitle: string) {
        if (theTitle=='') {
            throw new Error('set Navlink title is empty');
        }
        this._title = theTitle;
    }
    
    public get url() {
        return this._url;
    }
    
    public set url(theUrl: string) {
        this._url = theUrl;
    }
    
}