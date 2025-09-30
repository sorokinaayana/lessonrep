import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register-page.js';

test('редактирование профиля с проверкой сохранения', async ({ page }) => {
  //  Регистрация
  const registerPage = new RegisterPage(page);
  await registerPage.navigate();
  const userData = await registerPage.registerNewUser();

  // Переход в настройки профиля
  await page.getByText(userData.username).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'Edit Profile Settings' }).click();

  //  Редактирование БИО
  const newBio = 'обновление профиля ' + Date.now();
  await page.getByRole('textbox', { name: 'Short bio about you' }).fill(newBio);
  await page.getByRole('button', { name: 'Update Settings' }).click();

  //  Обновление + сохранение 
  await page.waitForTimeout(2000);
  
  // Проверяем текстовое поле 
  const savedBio = await page.getByRole('textbox', { name: 'Short bio about you' }).inputValue();
  
  // Проверка на соотвествие 
  expect(savedBio).toBe(newBio);
});
