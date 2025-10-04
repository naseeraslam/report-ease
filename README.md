# FIR Report Editor

Welcome to the FIR Report Editor! This is a full-stack web application designed to help users create, manage, and export First Information Report (FIR) documents in both English and Urdu.

## Features

- **User Authentication:** Secure user registration and login.
- **Subscription Tiers:** Free, Monthly, and Lifetime (Master) account plans.
- **Rich Text Editor:** A full-featured editor for creating and formatting reports.
- **Multi-Language Support:** Full support for both English (LTR) and Urdu (RTL).
- **Report Management:** Create, save, and manage your reports from a user-friendly dashboard.
- **Template System:** Administrators can create and manage templates for users to start from.
- **PDF & DOCX Export:** Export your finished reports to popular document formats.
- **Payment Integration:** Securely upgrade your subscription using Stripe.

---

## Getting Started: How to Run the Project

Follow these steps to get the application running on your local machine.

### 1. Prerequisites (What You Need to Install First)

Before you begin, you need to have a few tools installed on your computer.

- **.NET 8 SDK:** This is the framework for the backend. You can download it from the official Microsoft website: [https://dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js and npm:** This is for running the frontend application. You can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

### 2. Configure the Application

This is the most important step. You need to provide a few secret keys for the application to work.

1.  **Find the Configuration File:** Navigate to the `Web` folder and open the `appsettings.json` file.
2.  **Edit the File:** You will see sections for `Jwt` and `Stripe`. You need to fill in the placeholder values.

    ```json
    {
      // ... other settings
      "Jwt": {
        "Key": "A_VERY_SECRET_KEY_THAT_IS_LONG_ENOUGH_TO_BE_SECURE", // Change this to your own long, random secret key
        "Issuer": "FirReportEditorApi",
        "Audience": "FirReportEditorApiClient"
      },
      "Stripe": {
        "PublishableKey": "pk_test_YOUR_PUBLISHABLE_KEY", // Get this from your Stripe Dashboard
        "SecretKey": "sk_test_YOUR_SECRET_KEY",           // Get this from your Stripe Dashboard
        "WebhookSecret": "whsec_YOUR_WEBHOOK_SECRET"      // Get this from your Stripe Dashboard's webhook settings
      },
      // ... other settings
    }
    ```

    - **`Jwt:Key`**: Replace the placeholder with a long, random, and secret string. This is for securing your application's tokens.
    - **Stripe Keys**: You will need a [Stripe](https://stripe.com/) account. You can find your **Publishable Key** and **Secret Key** in your Stripe Dashboard under the "Developers" -> "API keys" section. The **Webhook Secret** is generated when you set up a webhook endpoint in Stripe.

### 3. Run the Backend (The "Server")

1.  Open a terminal or command prompt.
2.  Navigate to the root directory of the project.
3.  Run the following command:
    ```bash
    dotnet run --project Web
    ```
4.  This will start the backend server. You should see output in the terminal indicating that it's running. Keep this terminal open.

### 4. Run the Frontend (The "Website")

1.  Open a **new** terminal or command prompt.
2.  Navigate to the `ClientApp` directory:
    ```bash
    cd ClientApp
    ```
3.  Install the necessary packages by running:
    ```bash
    npm install
    ```
4.  Once the installation is complete, start the frontend application:
    ```bash
    npm run dev
    ```
5.  You should see a message in the terminal with a local URL, usually `http://localhost:5173`.

### 5. Access the Application

-   Open your web browser and navigate to the URL from the previous step (e.g., `http://localhost:5173`).
-   You should now see the FIR Report Editor login page! You can register a new account and start using the application.

---

## How to Use the Application

1.  **Register:** Create a new account from the registration page.
2.  **Login:** Log in with your new credentials.
3.  **Dashboard:** You will be redirected to the dashboard.
4.  **Manage Reports:** From here, you can create new reports, edit existing ones, or export them.
5.  **Upgrade Account:** Navigate to the "My Account" page to upgrade your subscription plan using Stripe.
6.  **Admin Features:** If you are an administrator, you will see options to manage user templates.