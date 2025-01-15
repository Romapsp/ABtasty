import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'

export class PageManager {
    private readonly page: Page
    private LoginPage: LoginPage
  
    constructor(page: Page) {
      this.page = page
      this.LoginPage = new LoginPage(this.page)
    }
  
    onLoginPage() {
      return this.LoginPage
    }
  }