import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/login.page';    

test('Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('invalid@example.com', 'wrongpassword');

    await expect(await loginPage.getErrorMessage()).toBeVisible();
});

test('Logout', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(await loginPage.isDeleteAccountVisible()).toBeVisible();

    await loginPage.logout();
    await expect(await loginPage.isLoggedOut()).toBeVisible();
});