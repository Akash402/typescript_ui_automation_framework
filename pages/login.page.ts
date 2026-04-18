import { Page } from '@playwright/test';
import { LOCATORS } from '../constants/locators';

export class LoginPage {
    constructor(private page: Page) {
    }

    private emailInput = this.page.locator(LOCATORS.login.email);
    private passwordInput = this.page.locator(LOCATORS.login.password);
    private loginButton = this.page.getByRole('button', { name: 'Login' });

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async goto() {
        await this.page.goto('/login');
    }

    async giveCookieConsent() {
        const cookieConsentButton = this.page.getByRole('button', { name: 'Consent' });
        if (await cookieConsentButton.isVisible()) {
            await cookieConsentButton.click();
        }
    }
}   