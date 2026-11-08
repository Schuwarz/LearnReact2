import { test, expect } from '@playwright/test';

const fakePosts = [
  { id: 1, userId: 1, title: 'Первый пост', body: 'Текст первого поста' },
  { id: 2, userId: 1, title: 'Второй пост', body: 'Текст второго поста' },
];

test.beforeEach(async ({ page }) => {
  await page.route(/jsonplaceholder\.typicode\.com\/posts(\?.*)?$/, (route) =>
    route.fulfill({
      json: fakePosts,
      headers: { 'access-control-allow-origin': '*' },
    })
  );
  await page.goto('/');
});

test('главная показывает список постов', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Первый пост' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Второй пост' })).toBeVisible();
});

test('поиск фильтрует посты по заголовку', async ({ page }) => {
  await page.getByPlaceholder('Поиск по заголовку...').fill('Второй');

  await expect(page.getByRole('heading', { name: 'Второй пост' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Первый пост' })).toBeHidden();
});

test('удаление поста через подтверждение', async ({ page }) => {
  await page.route(/jsonplaceholder\.typicode\.com\/posts\/\d+$/, (route) =>
    route.fulfill({
      json: {},
      headers: { 'access-control-allow-origin': '*' },
    })
  );

  const card = page.getByRole('listitem').filter({ hasText: 'Первый пост' });
  await card.getByRole('button', { name: 'Удалить' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Первый пост');
  await dialog.getByRole('button', { name: 'Удалить' }).click();

  await expect(page.getByRole('heading', { name: 'Первый пост' })).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Второй пост' })).toBeVisible();
});

test('форма: пустая отправка показывает ошибки', async ({ page }) => {
  await page.getByRole('button', { name: 'Добавить пост' }).click();

  await expect(page.getByText('Введите заголовок')).toBeVisible();
  await expect(page.getByText('Введите текст поста')).toBeVisible();
});

test('форма: добавление поста', async ({ page }) => {
  await page.getByPlaceholder('Заголовок', { exact: true }).fill('Мой новый пост');
  await page.getByPlaceholder('Текст', { exact: true }).fill('Привет из Playwright');
  await page.getByRole('button', { name: 'Добавить пост' }).click();

  await expect(page.getByRole('heading', { name: 'Мой новый пост' })).toBeVisible();
  await expect(page.getByPlaceholder('Заголовок', { exact: true })).toHaveValue('');
});

test('форма: ошибка только у пустого текста', async ({ page }) => {
  await page.getByPlaceholder('Заголовок', { exact: true }).fill('Заголовок без текста');
  await page.getByRole('button', { name: 'Добавить пост' }).click();

  await expect(page.getByText('Введите текст поста')).toBeVisible();
  await expect(page.getByText('Введите заголовок')).toBeHidden();
});