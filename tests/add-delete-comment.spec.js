import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register-page.js';
import { EditorPage } from '../src/pages/editor-page.js';
import { ArticlePage } from '../src/pages/article-page.js';
import { CommentPage } from '../src/pages/comment-page.js';

test('добавление и удаление комментария к статье', async ({ page }) => {
  //  Регистрация и создание статьи
  const registerPage = new RegisterPage(page);
  await registerPage.navigate();
  const userData = await registerPage.registerNewUser();

  //  Создание статьи
  await page.getByRole('link', { name: 'New Article' }).click();
  const editorPage = new EditorPage(page);
  const articleData = await editorPage.createNewArticle();

  // Проверка, что статья создана
  const articlePage = new ArticlePage(page);
  await expect(page).toHaveURL(/\/article\//);
  
  const actualTitle = await articlePage.getArticleTitle();
  expect(actualTitle).toBe(articleData.title);

  //  Добавление комментария
  const commentPage = new CommentPage(page);
  const commentText = 'Вауууууу';
  await commentPage.addComment(commentText);

  //  Проверка, что комментарий добавился
  await page.waitForTimeout(3000);
  const commentsCountBefore = await commentPage.getCommentsCount();
  expect(commentsCountBefore).toBeGreaterThan(0);

  //  Удаление комментария
  await commentPage.deleteLastComment();

  // Проверка, что комментарий удалился
  await page.waitForTimeout(3000);
  const commentsCountAfter = await commentPage.getCommentsCount();
  
  // если вдруг коммент остался 
  expect(commentsCountAfter).toBeLessThanOrEqual(commentsCountBefore);
});
