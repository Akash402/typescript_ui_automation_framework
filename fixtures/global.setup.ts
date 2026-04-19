import dotenv from 'dotenv';

import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

dotenv.config();

// setup('authenticate', async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     await page.goto(process.env.BASE_URL + '/login');
//     await loginPage.giveCookieConsent();
//     await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

//     await page.context().storageState({ path: 'storageState.json' });
// });