export class CommentPage {
  constructor(page) {
    this.page = page;
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.commentsList = page.locator('.card');
    this.deleteCommentButton = page.getByRole('button', { name: '', exact: true });
  }

  async addComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.postCommentButton.click();
  }

  async getCommentsCount() {
    return await this.commentsList.count();
  }

  async getLastCommentText() {
    const lastComment = this.commentsList.last();
    return await lastComment.locator('.card-text').textContent();
  }

  async deleteLastComment() {
    // Обрабатываем диалоговое окно подтверждения
    this.page.once('dialog', dialog => {
      dialog.accept(); // Подтверждаем удаление
    });
    await this.deleteCommentButton.waitFor({ timeout: 5000 });
    await this.deleteCommentButton.click();
    await this.page.waitForTimeout(1000);
  }
}
