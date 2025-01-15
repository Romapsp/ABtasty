import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { MFAPage } from './MFAPage'

export class PageManager {
    private readonly page: Page
    private LoginPage: LoginPage
    private MFAPage: MFAPage

  
    constructor(page: Page) {
      this.page = page
      this.LoginPage = new LoginPage(this.page)
      this.MFAPage = new MFAPage(this.page)
    }
  
    onLoginPage() {
      return this.LoginPage
    }

    onMFAPage() {
      return this.MFAPage
    }
  }