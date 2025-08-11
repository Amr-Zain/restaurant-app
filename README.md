# Restaurant App

A modern, full-featured restaurant web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This app provides a seamless user experience for Browse menus, placing orders, making reservations, managing a user profile, multi-branch restaurant ,real-time order tracking Integrated Socket.IO to deliver real-time notifications for order status updates to customers and staff. It's designed to be fast, responsive, and multilingual, making it a robust solution for any restaurant.

---
## Live DEMO
-   https://restaurant-app-1.vercel.app/

---
## ✨ Features

-   **Dynamic Menu:** Browse a complete, categorized menu with detailed product pages.
-   **Shopping Cart & Checkout:** Add items to a cart and complete the checkout process with a user-friendly form.
-   **User Authentication:** Secure login, registration, and password recovery.
-   **User Profile Management:** Users can view and edit their profile details.
-   **Order History:** A dedicated section to track past and current orders.
-   **Reservations:** Users can easily book a table.
-   **Offers & Promotions:** A page to display special offers and deals.
-   **Multi-language Support:** The app supports both English and Arabic, with an intuitive language switcher.
-   **Store Locator:** Find restaurant branches and their details on a map.
-   **Contact Us:** A contact form for user inquiries.
-   **Optimized Performance:** Utilizes Next.js 15 features for server-side rendering (SSR), static site generation (SSG), and route handlers for optimized performance.
-   **Modern UI/UX:** A clean, elegant interface built with Tailwind CSS and Shadcn UI components.
-   **Responsive Design:** A seamless experience across all devices, from desktops to mobile phones.

---

## 🛠️ Technologies Used

-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Components:** Shadcn UI
-   **State Management:** Zustand
-   **Internationalization:** `next-intl` for multi-language support
-   **Forms:** React Hook Form with Zod for validation
-   **Animations:** `framer-motion`
-   **Data Fetching:** Axios
-   **Mapping:** `@react-google-maps/api`
-   **Real-time updates:** `socket.io-client`

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Amr-Zain/restaurant-app.git](https://github.com/Amr-Zain/restaurant-app.git)
    cd restaurant-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
   
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your API keys or other environment-specific configurations. The project uses a `NEXT_PUBLIC_API_URL` variable for API requests.
    ```env
    NEXT_PUBLIC_BASE_URL=[https://your-api-url.com/api](https://your-api-url.com/api)
    STRIPE_SECRET_KEY=[for stipe payment]
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---
You're absolutely right; the lines collapsing in the directory structure makes it hard to read. Here's a revised version of the `README.md` with the file tree formatted correctly so it's clean and easy to follow.

-----

# Restaurant App

A modern, full-featured restaurant web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This app provides a seamless user experience for Browse menus, placing orders, making reservations, and managing a user profile. It's designed to be fast, responsive, and multilingual, making it a robust solution for any restaurant.

## ✨ Features

  - **Dynamic Menu:** Browse a complete, categorized menu with detailed product pages.
  - **Shopping Cart & Checkout:** Add items to a cart and complete the checkout process with a user-friendly form.
  - **User Authentication:** Secure login, registration, and password recovery.
  - **User Profile Management:** Users can view and edit their profile details.
  - **Order History:** A dedicated section to track past and current orders.
  - **Reservations:** Users can easily book a table.
  - **Offers & Promotions:** A page to display special offers and deals.
  - **Multi-language Support:** The app supports both English and Arabic, with an intuitive language switcher.
  - **Store Locator:** Find restaurant branches and their details on a map.
  - **Contact Us:** A contact form for user inquiries.
  - **Optimized Performance:** Utilizes Next.js 15 features for server-side rendering (SSR), static site generation (SSG), and route handlers for optimized performance.
  - **Modern UI/UX:** A clean, elegant interface built with Tailwind CSS and Shadcn UI components.
  - **Responsive Design:** A seamless experience across all devices, from desktops to mobile phones.

-----

## 🛠️ Technologies Used

  - **Framework:** Next.js 15 (App Router)
  - **Language:** TypeScript
  - **Styling:** Tailwind CSS, `prettier-plugin-tailwindcss`
  - **Components:** Shadcn UI, Headless UI, `vaul` (for drawers)
  - **State Management:** Zustand
  - **Internationalization:** `next-intl` for multi-language support
  - **Forms:** React Hook Form with Zod for validation
  - **Animations:** `framer-motion`, `animate.css`
  - **Data Fetching:** Axios
  - **Mapping:** `@react-google-maps/api`
  - **Real-time updates:** `socket.io-client`

-----

## 🚀 Getting Started

### Prerequisites

  - Node.js (v18 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Amr-Zain/restaurant-app.git
    cd restaurant-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your API keys or other environment-specific configurations. The project uses a `NEXT_PUBLIC_API_URL` variable for API requests.
    ```env
    # Example .env.local
    NEXT_PUBLIC_API_URL=https://your-api-url.com/api
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application.

-----

## 📁 Project Structure

The project follows a well-organized directory structure to maintain clarity and scalability.

```
.
├── actions/                  # Server actions
├── app/                      # Next.js 15 App Router
│   ├── [locale]/             # Multi-language routing
│   │   ├── (root)/           # Main application routes
│   │   ├── api/              # API Route Handlers
│   │   └── auth/             # Authentication routes
├── assets/                   # Images and other media
├── components/               # Reusable UI components
│   ├── animations/
│   ├── auth/
│   ├── base/
│   ├── general/
│   ├── home/
│   └── ui/                   # Shadcn UI components
├── helper/                   # Helper functions and schemas
├── hooks/                    # Custom React hooks
├── i18n/                     # Internationalization configuration and translations
├── middleware/               # Next.js middleware
├── public/                   # Public assets like fonts and images
├── services/                 # API service files
├── stores/                   # Zustand stores for state management
├── styles/                   # Custom CSS files
└── types/                    # TypeScript type definitions
```
The project follows a well-organized directory structure to maintain clarity and scalability.
