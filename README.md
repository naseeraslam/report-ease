# FIR Report Editor

Welcome to the FIR Report Editor! This is a full-stack web application designed to help users create, manage, and export First Information Report (FIR) documents in both English and Urdu. It can be run as a standard web application or built into a self-contained desktop application for Windows.

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
4.  Once it's done, open your web browser and go to: **http://localhost:8000**

That's it! The entire application is now running.

---

## 🖥️ Building the Desktop Application for Windows

Follow these steps to package the entire application into a single `.exe` installer that you can share and install on other Windows machines.

### Step 1: Prerequisites

- You must have the tools from the "Manual Setup" guide installed: **.NET 8 SDK** and **Node.js**.

### Step 2: Build the Backend

Before building the desktop app, you need to publish the final version of the backend.

1.  Open a terminal (PowerShell or Command Prompt).
2.  Navigate to the project's root directory.
3.  Run the following command:
    ```bash
    dotnet publish Web -c Release -o Web/bin/Release/net8.0/
    ```

### Step 3: Build the Installer

1.  In the same terminal, navigate to the `ClientApp` directory:
    ```bash
    cd ClientApp
    ```
2.  Install all dependencies if you haven't already:
    ```bash
    npm install
    ```
3.  Run the desktop build command:
    ```bash
    npm run electron:build
    ```
4.  This will create a `dist` folder inside the `ClientApp` directory. Inside, you will find the `.exe` installer for the FIR Report Editor. You can now copy this file to any other Windows machine and run it to install the application.

---

## 🔧 (For Developers) Manual Local Setup

If you are a developer and prefer not to use Docker, you can run the project directly on Windows.

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

1.  Open a **second, new** terminal window (leave the first one running).
2.  In this new terminal, navigate to the `ClientApp` directory:
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
5.  Open your browser to the URL provided in the terminal (usually `http://localhost:5173`). The backend will be available to the frontend automatically.