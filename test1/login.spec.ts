/**
✦ Playwright 테스트 파일 login.spec.ts를 생성했습니다. 이 테스트는 다음을 수행합니다.

   1. "test1" / "test2"로 로그인 시도:
       * Hacker News 로그인 페이지로 이동합니다.
       * 사용자 이름에 "test1", 비밀번호에 "test2"를 입력합니다.
       * 로그인 버튼을 클릭합니다.
       * "Bad login."이라는 텍스트가 페이지에 표시되는지 확인합니다.

   2. 임의의 잘못된 자격 증명으로 로그인 시도:
       * Hacker News 로그인 페이지로 이동합니다.
       * 사용자 이름에 "randomuser", 비밀번호에 "randompassword"를 입력합니다.
       * 로그인 버튼을 클릭합니다.
       * "Bad login."이라는 텍스트가 페이지에 표시되는지 확인합니다.

  다음 명령어를 사용하여 터미널에서 테스트를 실행할 수 있습니다.
   1 npx playwright test
 */
import { test, expect } from '@playwright/test';

test.describe('Hacker News Login', () => {
  test('should not login with invalid credentials "test1"/"test2"', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/login?goto=news');

    // Fill in the username and password
    await page.locator('input[name="acct"]').fill('test1');
    await page.locator('input[name="pw"]').fill('test2');

    // Click the login button
    await page.getByRole('button', { name: 'login' }).click();

    // Assert that the "Bad login." message is visible
    await expect(page.locator('body')).toContainText('Bad login.');
  });

  test('should not login with random invalid credentials', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/login?goto=news');

    // Fill in the username and password
    await page.locator('input[name="acct"]').fill('randomuser');
    await page.locator('input[name="pw"]').fill('randompassword');

    // Click the login button
    await page.getByRole('button', { name: 'login' }).click();

    // Assert that the "Bad login." message is visible
    await expect(page.locator('body')).toContainText('Bad login.');
  });
});
