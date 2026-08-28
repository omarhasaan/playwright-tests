import { expect, test } from '@playwright/test';

test('to have text', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toHaveText('Login');
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect(page.locator(".app_logo")).toBeVisible();
    await page.locator('.inventory_item_description').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item_description').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator(".shopping_cart_link").click();
    await page.close();
})
test('delete elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.locator("button[onclick='addElement()']").filter({ hasText: 'Add Element' }).click();
    await page.locator("button[onclick='addElement()']").filter({ hasText: 'Add Element' }).click();
    await page.locator("button[onclick='addElement()']").filter({ hasText: 'Add Element' }).click();
    await page.locator("button[onclick='addElement()']").filter({ hasText: 'Add Element' }).click();
    await page.locator("button[onclick='addElement()']").filter({ hasText: 'Add Element' }).click();
    await expect(page.locator(".added-manually")).toHaveCount(5);
    await page.locator(".added-manually").nth(3).click();
    await expect(page.locator(".added-manually")).toHaveCount(4);
    await page.close();

})
test('checkbox test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await expect(page.locator("#checkboxes input").first()).not.toBeChecked();
    await page.locator("#checkboxes option").last().uncheck();
    await page.locator("#checkboxes input").first().check();
    await page.close();
})
test('select option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.locator("#dropdown").selectOption("Option 2");
    await page.selectOption("#dropdown", "Option 2");
    await page.selectOption("#dropdown", { value: "1" });
    await expect(page.locator("#dropdown")).toHaveValue("1");
    await page.close();
})
test('visiable and enabled', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator("button[onclick='swapCheckbox()']")).toHaveText('Remove');
    await page.locator("button[onclick='swapCheckbox()']").click();
    // await expect(page.locator("button[onclick='swapCheckbox()']")).toHaveText('Add');
    await expect(page.locator("#checkbox")).toBeHidden();
    await page.locator("button[onclick='swapCheckbox()']").click();
    await page.locator("#checkbox").check();
    await page.close();
})
test('check attributes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await expect(page.locator('[id="file-submit"]')).toHaveAttribute("type", "submit");
    await page.close();
})
test('check url and title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await expect(page.locator('[id="file-submit"]')).toHaveAttribute("type", "submit");
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/upload');
    await expect(page).toHaveTitle('The Internet');


    await page.close();
})
test('check url and get screenshot', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await expect(page.locator('[id="file-submit"]')).toHaveAttribute("type", "submit");
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/upload');
    await expect(page).toHaveTitle('The Internet');
    await page.screenshot({ path: "screenshot.png" });
    await expect(page).toHaveScreenshot();
    await page.close();
})
test('press and write sequentional', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[id="user-name"]').fill("standard_user");
    await page.locator('[id="password"]').pressSequentially("secret_sauce", { delay: 100 });
    await page.locator('[id="password"]').press('Enter');
    await page.screenshot({ path: "screenshot.png" });
    await page.close();
})

test('dynamic drobdown', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-dropdown-search-demo/?utm_source=chatgpt.com');
    // await page.locator('[class="js-example-basic-multiple"]').selectOption({value:"Arizona"});
    // await page.locator('[class="js-example-basic-multiple"]').selectOption({value:"Alaska"});
    await page.selectOption('[class="s-example-basic-multipled"]', { value: "Arizona" });
    // await page.locator('[class="js-example-basic-multiple"]').click();
    // await page.locator('[class="js-example-basic-multiplejs-example-basic-multiple"] il span').filter({hasText: 'Arizona'}).click();
    await page.screenshot({ path: "screenshot.png" });
    await page.close();
})
test('test alert normal', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com');
    await page.on('dialog', async (alert) => {
        expect(alert.message()).toEqual("I am a JS Alert");
        await alert.accept();
        expect(page.locator('[id="result"]')).toHaveText("You successfully clicked an alert");
    })
    await page.locator("[onclick='jsAlert()']").click();
    await page.screenshot({ path: "screenshot.png" });
    await page.close();
})

test('test alert confirmation', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com');
    await page.on('dialog', async (alert) => {
        expect(alert.message()).toEqual("I am a JS Confirm");
        await alert.dismiss();
        expect(page.locator('[id="result"]')).toHaveText("You clicked: Cancel");
    })
    await page.locator("[onclick='jsConfirm()']").click();
    await page.screenshot({ path: "screenshot.png" });
    await page.close();
})
test('test alert prompt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com');
    await page.on('dialog', async (alert) => {
        expect(alert.message()).toEqual("I am a JS prompt");
        await alert.accept("Test");
        expect(page.locator('[id="result"]')).toHaveText("You entered: Test");
    })
    await page.locator('[onclick="jsPrompt()"]').click();
    await page.screenshot({ path: "screenshot.png" });
    await page.close();
})
test('test tabs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows?utm_source=chatgpt.com');

    const [browsertabs] = await Promise.all([
        page.waitForEvent('popup'), await page.locator('[href="/windows/new"]').click()
    ])

    await browsertabs.waitForLoadState();
    const defaultpage = browsertabs[0]
    const pages = browsertabs.context().pages();
    const newpage = pages[pages.length - 1];
    await expect(newpage.locator('[class="example"] h3')).toHaveText("New Window");
    await page.close();
})
test('test drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop?utm_source=chatgpt.com');
    const boxA = page.locator('[id="column-a"]');
    const boxB = page.locator('[id="column-b"]');
    // await boxA.hover();
    // await page.mouse.down();
    // await boxB.hover();
    // await page.mouse.up();
    await boxA.dragTo(boxB);


    await page.close();
})
test('test download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop?utm_source=chatgpt.com');
    const download = await Promise.all([
        page.waitForEvent('download'), await page.locator('[href="download/test.txt"]').click()
    ])

    const downloadFile = download[0];
    const path = await downloadFile.path();
    const filename = downloadFile.suggestedFilename();
    await downloadFile.saveAs(filename);

    await page.close();
})
test('test upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload?utm_source=chatgpt.com');

    const fileupload = await Promise.all([
        page.waitForEvent('filechooser'), await page.locator('[id="file-upload"]').click()
    ])

    const file = fileupload[0].setFiles('./screenshot.png');
    await page.locator('[id="file-submit"]').click();
    await page.close();
})
test('test API get', async ({ request }) => {
    const startdate = Date.now();
    const response = await request.get('https://dummyjson.com/products/1');
    const body = await response.json();
    await expect(body.id).toBe(1);
    await expect(body.category).toBe("beauty")
    await expect(response.headers()['content-type']).toContain('application/json');
    await expect(response.status()).toBe(200);
    const enddate = Date.now();
    const responseTime = enddate - startdate;
    console.log(responseTime);
    await expect(responseTime).toBeLessThan(500);

})
test('test API post', async ({ request }) => {
    const startdate = Date.now();
    const response = await request.post('https://dummyjson.com/products/add', {
        data: {
            "title": "Test Product",
            "price": 100,
            "description": "This is a test product"
        }
    });
    const body = await response.json();
    console.log(body);
})
test('test API patch', async ({ request }) => {
    const startdate = Date.now();
    const response = await request.patch('https://dummyjson.com/products/1', {
        data: {
            "title": "Test Product1",
        }
    });
    const body = await response.json();
    console.log(body);
})
test('test API delete', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/products/1');
    const body = await response.json();
    const token = "bearer_123456";
})