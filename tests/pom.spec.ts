import {expect,test,Page}from"@playwright/test";
import loginpage from "./LoginPage/loginpage";
import ProductPage from "./LoginPage/productpage";
import * as testdata from "../testdata/testdata.json";

test("pom",async({page})=>{

    const loginpageelements= new loginpage(page);;
    const productpageelemnts=new ProductPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginpageelements.login(testdata.username,testdata.password);
    await loginpageelements.takescreenshot(".tests/LoginPage/screenloginbpage.png")
    await productpageelemnts.addtocart();
    await productpageelemnts.takescreenshot(".tests/LoginPage/addtocardscreen.png")
    await expect(page.locator('[class="shopping_cart_badge"]')).toHaveText("1");
    await productpageelemnts.gotocart();
    await productpageelemnts.takescreenshot(".tests/LoginPage/gotocardscreen.png")

})