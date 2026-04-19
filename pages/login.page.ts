import { Page, expect } from '@playwright/test';
import { LOCATORS } from '../constants/locators';

export class LoginPage {
    constructor(private page: Page) {
    }

    private emailInput = this.page.locator(LOCATORS.login.email);
    private passwordInput = this.page.locator(LOCATORS.login.password);
    private loginButton = this.page.getByRole('button', { name: 'Login' });

    async logout() {
        const logoutButton = this.page.getByRole('link', { name: 'Logout' });
        if (await logoutButton.isVisible()) {
            await logoutButton.click();
        }
    }

    async login(email: string, password: string) {
        await this.page.goto('/login');

        const cookieConsentButton = this.page.getByRole('button', { name: 'Consent' });
        if (await cookieConsentButton.isVisible()) {
            await cookieConsentButton.click();
        }

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return this.page.getByText('Your email or password is incorrect!');
    }

    async isLoggedOut() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    async isDeleteAccountVisible() {
        return this.page.getByRole('link', { name: ' Delete Account' });
    }
}