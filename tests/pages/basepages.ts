import {Locator,Page} from '@playwright/test';


export default class BasePage{
    protected  readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }

    protected  async clickelement(element:Locator){
        await element.click();
    }
    
    protected  async fillelement(element:Locator,text:string){
        await element.fill(text);
    }
    public async takescreenshot(pathfile:string){
        await this.page.screenshot({path:pathfile});
    }
    
}