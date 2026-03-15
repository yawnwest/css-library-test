import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("button variants", async ({ page }) => {
  const section = page.locator(".section").first();
  await expect(section).toHaveScreenshot();
});

test("button sizes", async ({ page }) => {
  const section = page.locator(".section").nth(1);
  await expect(section).toHaveScreenshot();
});

test("button disabled", async ({ page }) => {
  const section = page.locator(".section").nth(2);
  await expect(section).toHaveScreenshot();
});

test("dark mode", async ({ page }) => {
  await page.click('button:has-text("Toggle Dark Mode")');
  await expect(page).toHaveScreenshot();
});
