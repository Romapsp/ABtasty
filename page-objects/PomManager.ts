import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { MFAPage } from './MFAPage'
import { SSOPage } from './SSOPage'

export class PageManager {
    private readonly page: Page
    private LoginPage: LoginPage
    private MFAPage: MFAPage
    private SSOPage: SSOPage
  
    constructor(page: Page) {
      this.page = page
      this.LoginPage = new LoginPage(this.page)
      this.MFAPage = new MFAPage(this.page)
      this.SSOPage = new SSOPage(this.page)
    }
  
    onLoginPage() {
      return this.LoginPage
    }

    onMFAPage() {
      return this.MFAPage
    }

    onSSOPage() {
      return this.SSOPage
    }
  }