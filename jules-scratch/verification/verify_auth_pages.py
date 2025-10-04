from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the login page
    page.goto("http://localhost:5173/login")
    expect(page.get_by_role("heading", name="Login")).to_be_visible()
    page.screenshot(path="/app/jules-scratch/verification/login-page.png")

    # Navigate to the register page
    page.goto("http://localhost:5173/register")
    expect(page.get_by_role("heading", name="Register")).to_be_visible()
    page.screenshot(path="/app/jules-scratch/verification/register-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)