import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register-page.js';
import { EditorPage } from '../src/pages/editor-page.js';
import { ArticlePage } from '../src/pages/article-page.js';

test('Создание статьи под новым пользователем', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.navigate();
  const userData = await registerPage.registerNewUser();

  await page.getByRole('link', { name: 'New Article' }).click();
  const editorPage = new EditorPage(page);
  const articleData = await editorPage.createNewArticle();

  const articlePage = new ArticlePage(page);
  
  await expect(page).toHaveURL(/\/article\//);
  
  const actualTitle = await articlePage.getArticleTitle();
  expect(actualTitle).toBe(articleData.title);
  
  const actualBody = await articlePage.getArticleBody();
  expect(actualBody.length).toBeGreaterThan(0);

  // Удаляем статью в конце теста
  await articlePage.deleteArticle();
  await expect(page).toHaveURL('https://realworld.qa.guru/#/');
});
