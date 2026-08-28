import BasePage from "../pages/basepages";


export default class ProductPage extends BasePage{
   protected readonly addtocartbtn=this.page.locator('[id="add-to-cart-sauce-labs-bolt-t-shirt"]');
   protected readonly cardicon= this.page.locator('[class="shopping_cart_link"]');

   async addtocart(){
    await this.addtocartbtn.click();
   }
   async gotocart(){
    await this.cardicon.click();
   }
   
}
