export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleBody = page.locator('.article-content p').first();
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).nth(1);
    this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).nth(1);
  }

  async getArticleTitle() {
    await this.articleTitle.waitFor({ timeout: 10000 });
    return await this.articleTitle.textContent();
  }

  async getArticleBody() {
    await this.articleBody.waitFor({ timeout: 10000 });
    return await this.articleBody.textContent();
  }

  async clickEditArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    // Обрабатываем диалоговое окно подтверждения
    this.page.once('dialog', dialog => {
      dialog.accept(); // Подтверждение удаления в диалоговом окне 
    });
    await this.deleteArticleButton.click();
  }
}
