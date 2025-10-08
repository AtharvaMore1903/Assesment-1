# Avalpha Technologies Commission Calculator

A web-based **Commission Calculator** built with **React** for frontend and **ASP.NET Core** for backend.  
It calculates commissions for Avalpha Technologies and a competitor based on local and foreign sales.

---

## Features

- Input sales data: Local Sales Count, Foreign Sales Count, Average Sale Amount (£)
- Calculates:
  - Avalpha Technologies Local, Foreign, and Total Commission
  - Competitor Local, Foreign, and Total Commission
  - Avalpha advantage over competitor
- Displays results in a modern, responsive UI

---

## Tech Stack

- **Frontend:** React, CSS, JavaScript
- **Backend:** ASP.NET Core Web API
- **API Communication:** JSON (POST request)

---

## Implementation Details

- **Frontend**
  - Form input for sales data
  - Fetch POST request to backend API (`/Commision`)
  - Displays results in cards with totals and advantage
  - Handles loading state and error messages
- **Backend**
  - ASP.NET Core API endpoint `/Commision`
  - Validates input (must be greater than 0)
  - Calculates commissions:
    ```text
    Avalpha Local = 20% of (LocalSalesCount × AverageSaleAmount)
    Avalpha Foreign = 35% of (ForeignSalesCount × AverageSaleAmount)
    Competitor Local = 2% of (LocalSalesCount × AverageSaleAmount)
    Competitor Foreign = 7.55% of (ForeignSalesCount × AverageSaleAmount)
    ```
  - Returns JSON response with all calculated values

---

## How to Run

### Backend (ASP.NET Core)

1. Navigate to backend project folder:

   ```bash
   cd api

   ```

2. Run the API:
   ```bash
   dotnet run
   ```

### FrontEnd

1. Navigate to frontend project folder:

   ```bash
   cd ui

   ```

2. Install dependencies::

   ```bash
   npm install

   ```

3. Start the React app:
   ```bash
   npm start
   ```

### Decisions

Used React useState for form data and results

Added error handling for failed API calls

Backend calculations rounded to 2 decimal places

API designed to validate input and reject negative numbers

Frontend displays results dynamically with advantage calculation
