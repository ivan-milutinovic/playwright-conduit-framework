import { test as setup, expect } from '@playwright/test';
import { USER_STORAGE } from '@src/constants/paths';

setup('Global API Setup with State Injection', async ({ request, page }) => {
  // 1. ČIST API LOGIN
  const response = await request.post(`${process.env.STAGING_URL}/api/users/login`, {
    data: {
      user: {
        email: process.env.CONDUIT_EMAIL,
        password: process.env.CONDUIT_PASSWORD,
      },
    },
  });

  expect(response.ok(), 'API Login failed. Check the credentials on the domain.').toBeTruthy();
  const responseBody = await response.json();
  const apiUser = responseBody.user;

  // 2. INŽENJERSKA SINTEZA STANJA: Mapiranje tačne strukture sa slike (image_ece661.png)
  const flyDevState = {
    headers: {
      // OBAVEZNO: Dodavanje prefiksa "Token " koji RealWorld API zahteva
      Authorization: `Token ${apiUser.token}`,
    },
    isAuth: true,
    loggedUser: {
      email: apiUser.email,
      username: apiUser.username,
      bio: apiUser.bio,
      image: apiUser.image,
      token: apiUser.token,
    },
  };

  // 3. PRE-BOOT INJEKTOVANJE: Ubacujemo samo ovaj jedan, masivni ključ
  await page.addInitScript((stateObj) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(stateObj));
  }, flyDevState);

  // 4. UČITAVANJE APLIKACIJE: Kroz Hash rutiranje
  await page.goto('/#/');

  // 5. VIZUELNA POTVRDA
  await expect(page.locator('a[href*="#/editor"]')).toBeVisible({ timeout: 10000 });

  // 6. BEZBEDNO SNIMANJE STANJA
  await page.context().storageState({ path: USER_STORAGE });
});
