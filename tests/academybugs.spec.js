const { test, expect } = require('@playwright/test');

test('TC-1: Перевірка переходу на сторінку "DNK Yellow Shoes"', async ({ page }) => {
  // 1. Відкриваємо головну сторінку магазину
  await page.goto('https://academybugs.com/find-bugs/');

  // 2. Клікаємо на видиме посилання товару (на сторінці є прихований дублікат)
  await page.getByRole('link', { name: 'DNK Yellow Shoes' }).filter({ visible: true }).click();

  // 3. Перевіряємо, що URL змінився на правильний
  await expect(page).toHaveURL(/.*dnk-yellow-shoes/);
});

test('TC-2: Додавання товару "Blue Tshirt" у кошик', async ({ page }) => {
  // 1. Відкриваємо сторінку товару Blue Tshirt
  await page.goto('https://academybugs.com/store/blue-tshirt/');

  // 2. Натискаємо Add to Cart (сайт перенаправляє на /my-cart/)
  await page.locator('.ec_details_add_to_cart').click();
  await page.waitForURL(/my-cart/);

  // 3. Перевіряємо, що товар з'явився у списку (контент корзини підвантажується асинхронно)
  await expect(page.locator('a.ec_cartitem_title', { hasText: 'Blue Tshirt' })).toBeVisible({ timeout: 15000 });
});