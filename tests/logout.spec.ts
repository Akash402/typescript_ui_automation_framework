import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Logout', async ({page}) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await expect(await loginPage.isDeleteAccountVisible()).toBeVisible();

    await loginPage.logout();
    await expect(await loginPage.isLoggedOut()).toBeVisible();
});
