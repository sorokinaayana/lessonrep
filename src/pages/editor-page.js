import { TestData } from '../test-data.js';

export class EditorPage {
  constructor(page) {
    this.page = page;
    // пока так т.к не находит другие локаторы
    this.articleTitleInput = page.locator('input').first();
    this.articleAboutInput = page.locator('input').nth(1);
    this.articleBodyInput = page.locator('textarea').first();
    this.tagsInput = page.locator('input').last();
    this.publishButton = page.locator('button').getByText('Publish Article');
  }

  async createNewArticle() {
    const articleData = TestData.generateArticle();
    
    // загрузка страницы
    await this.page.waitForLoadState('networkidle');
    
    await this.articleTitleInput.fill(articleData.title);
    await this.articleAboutInput.fill(articleData.description);
    await this.articleBodyInput.fill(articleData.body);
    
    // Теги
    await this.tagsInput.fill(articleData.tags[0]);
    await this.tagsInput.press('Enter');
    
    await this.publishButton.click();
    await this.page.waitForURL(/\/article\//, { timeout: 15000 });
    return articleData;
  }
}
