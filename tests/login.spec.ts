import {test} from '@playwright/test';
import { LoginPage } from '../pages/login.page';    

test('Login with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.giveCookieConsent();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
});