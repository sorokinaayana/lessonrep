import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register-page.js';
import { EditorPage } from '../src/pages/editor-page.js';
import { ArticlePage } from '../src/pages/article-page.js';

test('Редактирование статьи после создания', async ({ page }) => {

  //  Регистрация и создание статьи
  const registerPage = new RegisterPage(page);
  await registerPage.navigate();
  const userData = await registerPage.registerNewUser();

  //  Создание статьи
  await page.getByRole('link', { name: 'New Article' }).click();
  const editorPage = new EditorPage(page);
  const originalArticle = await editorPage.createNewArticle();


  //  Редактирование статьи
  const articlePage = new ArticlePage(page);
  await articlePage.clickEditArticle();
  
  // Ждём загрузки редактора
  await page.waitForURL(/\/editor\//);
  await page.waitForTimeout(2000);

  // Редактируем содержимое
  const updatedContent = 'Редактирование статьи для домашней работы - ' + Date.now();
  await page.getByRole('textbox', { name: 'Write your article (in' }).click();
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill(updatedContent);
  
  // Сохранение
  await page.getByRole('button', { name: 'Update Article' }).click();
  
  // Проверка данных
  await page.waitForURL(/\/article\//);
  const actualBody = await articlePage.getArticleBody();
  expect(actualBody).toContain('Редактирование статьи для домашней работы');
  
});
