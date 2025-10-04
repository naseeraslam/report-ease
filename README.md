# FIR Report Editor

Welcome to the FIR Report Editor! This is a full-stack web application designed to help users create, manage, and export First Information Report (FIR) documents in both English and Urdu.

---

## 🚀 Quick Start: Run Everything with One Command

This is the easiest way to get the entire application running. All you need is **Docker** installed on your computer.

### Step 1: Configure Your Keys

Before you start, you need to provide a few secret keys.

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
      "Features": {
        "EnableSubscriptionChecks": true // Set to false to disable all subscription limits
      }
      // ... other settings
    }
    ```

    - **`Jwt:Key`**: Replace the placeholder with a long, random, and secret string.
    - **Stripe Keys**: You will need a [Stripe](https://stripe.com/) account. You can find your keys in your Stripe Dashboard under "Developers" -> "API keys".
    - **`EnableSubscriptionChecks`**: Set this to `false` if you want all users to have access to all features without any subscription limits. Set it to `true` to enforce the payment plans.

### Step 2: Run the Application

1.  Open a terminal or command prompt in the root directory of the project.
2.  Run the following single command:
    ```bash
    docker-compose up --build
    ```
3.  Wait for the build process to complete. You will see a lot of text in your terminal.
4.  Once it's done, open your web browser and go to: **http://localhost**

That's it! The entire application is now running.

---

## 🔧 (For Developers) Manual Local Setup

If you are a developer and prefer not to use Docker, you can run the project manually.

### Prerequisites

-   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js and npm](https://nodejs.org/)

### 1. Run the Backend

1.  Make sure you have configured your `appsettings.json` file as described in the "Quick Start" section.
2.  Open a terminal and navigate to the project's root directory.
3.  Run the backend server:
    ```bash
    dotnet run --project Web
    ```
4.  Keep this terminal open.

### 2. Run the Frontend

1.  Open a **new** terminal.
2.  Navigate to the `ClientApp` directory:
    ```bash
    cd ClientApp
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the frontend server:
    ```bash
    npm run dev
    ```
5.  Open your browser to the URL provided in the terminal (usually `http://localhost:5173`).