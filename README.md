# FashionHub 🛍️

Live Demo: [https://fashionhub-shop.netlify.app](https://fashionhub-shop.netlify.app)

FashionHub is a responsive e-commerce demo app built with React. This project was created to help me get hands-on experience with:

- **TypeScript** – Using static types to catch bugs early and improve developer experience.
- **React Router (v7)** – Implementing client-side routing for navigation between product listing and detail pages.
- **React Testing Library + Vitest** – Writing unit and integration tests to ensure component reliability.
- **Component-based architecture** – Building reusable UI components.
- **State management** – Managing cart state and quantity updates locally.
- **Responsive design** – Building a layout that works well on desktop and mobile.

## 🧪 Testing

The app includes component tests using **React Testing Library**, with utilities like:

- `@testing-library/user-event`
- `vitest`
- `jsdom`

Tests cover things like:

- Rendering product data
- Simulating user interactions (e.g., typing, clicking, navigating)
- Adding/removing items to/from cart
- Routing between pages

## 🛠️ Tech Stack

- React
- TypeScript
- React Router
- React Testing Library
- Vitest
- CSS Modules
- Vite
- Netlify (for deployment)

## 🚀 Deployment

Deployed via [Netlify](https://www.netlify.com/). Includes a `_redirects` file to support client-side routing with React Router.

## 📦 Getting Started

```bash
git clone https://github.com/Rezwan1768/shopping-cart.git
cd shopping-cart
npm install
npm run dev
```

## 🗒️ Notes

This project is for learning and demonstration purposes only. Product images and data are mock content and not associated with any real brand.
