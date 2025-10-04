# FIR Report Editor

Welcome to the FIR Report Editor! This is a full-stack web application designed to help users create, manage, and export First Information Report (FIR) documents in both English and Urdu.

---

## 🚀 Easiest Method: Run with Docker

This is the simplest "one-click" way to get the entire application running. All you need is **Docker Desktop** installed on your computer.

### Step 1: Configure Your Keys

Before you start, you need to provide a few secret keys.

1.  **Find the Configuration File:** Navigate to the `Web` folder and open the `appsettings.json` file.
2.  **Edit the File:** Fill in the placeholder values for `Jwt` and `Stripe`.

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

### Step 2: Run the Application

1.  Open a terminal (like **PowerShell** or **Command Prompt**) in the root directory of the project.
2.  Run the following single command:
    ```bash
    docker-compose up --build
    ```
3.  Wait for the build process to complete.
4.  Once it's done, open your web browser and go to: **http://localhost**

That's it! The entire application is now running.

---

## 💻 Manual Setup on a Windows Laptop

If you prefer not to use Docker, you can run the project directly on Windows.

### Step 1: Install the Necessary Tools

You need to download and install two things. Just run the installer for each one and follow the on-screen prompts.

1.  **.NET 8 SDK for Windows:**
    *   Download from the official Microsoft website: [https://dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0) (Use the "x64" installer for most Windows laptops).
2.  **Node.js (LTS) for Windows:**
    *   Download from the official Node.js website: [https://nodejs.org/](https://nodejs.org/) (The "LTS" version is recommended).

### Step 2: Configure Your Keys

This is the same as the Docker setup. Follow the instructions in **Step 1 of the Docker guide** above to edit your `appsettings.json` file with your secret keys.

### Step 3: Run the Backend (The "Server")

1.  Open a terminal application on Windows (you can search for **PowerShell** or **Command Prompt** in the Start Menu).
2.  In the terminal, navigate to the project's root folder.
3.  Run the following command to start the backend:
    ```bash
    dotnet run --project Web
    ```
4.  This will start the backend server. You will see log messages in the terminal. **Leave this terminal open and running.**

### Step 4: Run the Frontend (The "Website")

1.  Open a **second, new** terminal window (leave the first one running).
2.  In this new terminal, navigate to the `ClientApp` directory inside the project folder:
    ```bash
    cd ClientApp
    ```
3.  First, install all the necessary website packages by running:
    ```bash
    npm install
    ```
4.  After the installation finishes, start the frontend server:
    ```bash
    npm run dev
    ```
5.  The terminal will show you a URL, which is usually `http://localhost:5173`.

### Step 5: Use the Application

-   Open your web browser (like Chrome, Firefox, or Edge) and go to the URL from the previous step (e.g., `http://localhost:5173`).
-   You should now see the FIR Report Editor login page! You can register a new account and start using the application.