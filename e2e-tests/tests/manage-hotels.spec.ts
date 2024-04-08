import { test, expect } from "@playwright/test";
import exp from "constants";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
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
});

test("Should Allow User To Add A Hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    //  Make Fill To The Form
    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page
        .locator("[name=description]")
        .fill("This Is Description For The Test Hotel");
    await page.locator("[name=pricePerNight]").fill("100");
    await page.selectOption("select[name=starRating]", "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childCount]").fill("4");
    await page.setInputFiles("[name=imageFiles]", [
        path.join(__dirname, "files", "about.jpg"),
    ]);
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Hotel added successfully")).toBeVisible();
});

test("Should Display Hotels", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText("Dublin Getaways"));
    await expect(
        page.locator(':has-text("Lorem ipsum dolor sit amet")')
    ).toBeVisible();
    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("$110 Per Night")).toBeVisible();
    await expect(page.getByText("2 Adults, 3 Children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();

    await expect(
        page.getByRole("link", { name: "View Details" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("Should Edit Hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await page.getByRole("link", { name: "View Details" }).click();

    await page.waitForSelector(`[name="name"]`, { state: "attached" });
    await expect(page.locator(`[name="name"]`)).toHaveValue("Dublin Getaways");
    await page.locator('[name="name"').fill("Dublin Getaways Updated");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name-"name"]')).toHaveValue(
        "Dublin Getaways Updated"
    );
    await page.locator(`[name="name"]`).fill("Dublin Getaways");
    await page.getByRole("button", { name: "Save" }).click();
});
