import BasePage from "../pages/basepages";


export default class LoginPage extends BasePage{
    protected readonly username=this.page.locator('[id="user-name"]');
    protected readonly password=this.page.locator('[id="password"]');
    protected readonly loginbtn=this.page.locator('[id="login-button"]');

    async login(username:string,password:string){
        await this.fillelement(this.username,username);
        await this.fillelement(this.password,password);
        await this.clickelement(this.loginbtn);
        
    }
}
