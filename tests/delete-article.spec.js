import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register-page.js';
import { EditorPage } from '../src/pages/editor-page.js';
import { ArticlePage } from '../src/pages/article-page.js';

test('удаление статьи после создания', async ({ page }) => {
  // Регистрация и создание статьи
  const registerPage = new RegisterPage(page);
  await registerPage.navigate();
  const userData = await registerPage.registerNewUser();

  // Создание статьи
  await page.getByRole('link', { name: 'New Article' }).click();
  const editorPage = new EditorPage(page);
  const articleData = await editorPage.createNewArticle();

  // Проверка, что статья создана
  const articlePage = new ArticlePage(page);
  await expect(page).toHaveURL(/\/article\//);
  
  const actualTitle = await articlePage.getArticleTitle();
  expect(actualTitle).toBe(articleData.title);

  // Удаление статьи
  await articlePage.deleteArticle();

  //Проверка возвращения на страницу 
  await expect(page).toHaveURL('https://realworld.qa.guru/#/');
  
});
