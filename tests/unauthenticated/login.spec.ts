import {expect, test} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('invalid@example.com', 'wrongpassword');

    await expect(await loginPage.getErrorMessage()).toBeVisible();
});
