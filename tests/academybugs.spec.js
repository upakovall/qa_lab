const { test, expect } = require('@playwright/test');

test('TC-1: Перевірка переходу на сторінку "DNK Yellow Shoes"', async ({ page }) => {
  // 1. Відкриваємо головну сторінку магазину
  await page.goto('https://academybugs.com/find-bugs/');

  // 2. Клікаємо на товар DNK Yellow Shoes
  await page.locator('text=DNK Yellow Shoes').first().click();

  // 3. Перевіряємо, що URL змінився на правильний
  await expect(page).toHaveURL(/.*dnk-yellow-shoes/);
});

test('TC-2: Додавання товару "Blue Tshirt" у кошик', async ({ page }) => {
  // 1. Відкриваємо сторінку товару Blue Tshirt
  await page.goto('https://academybugs.com/store/blue-tshirt/');

  // 2. Натискаємо кнопку Add to Cart
  await page.locator('.ec_details_add_to_cart').click();

  // 3. Переходимо в кошик
  await page.goto('https://academybugs.com/cart/');

  // 4. Перевіряємо, що товар є у списку
  await expect(page.locator('text=Blue Tshirt')).toBeVisible();
});