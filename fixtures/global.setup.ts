import dotenv from 'dotenv';

import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

dotenv.config();

setup('authenticate', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await page.context().storageState({ path: `storageState.${testInfo.project.name}.json` });
});
