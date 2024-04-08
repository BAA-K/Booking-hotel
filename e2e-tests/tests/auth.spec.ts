import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("Should Allow User To Register", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create An Account Here" }).click();

    await expect(
        page.getByRole("heading", { name: "Create An Account" })
    ).toBeVisible();

    await page.locator("[name=firstName]").fill("test");
    await page.locator("[name=lastName]").fill("test2");
    await page.locator("[name=email]").fill("test@test.com");
    await page.locator("[name=password]").fill("testPassword");
    await page.locator("[name=confirmPassword]").fill("testPassword");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Registration Success")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("Should ALlow The User To Sing In", async ({ page }) => {
    await page.goto(UI_URL);

    //  Get The Sign In Button
    await page.getByRole("link", { name: "Sign In" }).click();

    //  We Say We Expect To See Page That Has Heading And Contain This Text (Sign In)
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    //  Make Fill To The Form
    await page.locator("[name=email]").fill("test@test.com");
    await page.locator("[name=password]").fill("testPassword");

    //  Click On The Submit Button
    await page.getByRole("button", { name: "login" }).click();

    //  Check If The User Successfully Sign In By Checking The Next Element
    await expect(page.getByText("Sign In Successful!")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
