README
🛒 FreshCart (FrshCard) - E-Commerce Web Application
A modern, scalable E-commerce web application that delivers a complete online shopping experience. Users can browse products, add them to the cart, and complete purchases through a simulated secure checkout system.

🚀 Features
1. 🛍️ Full Shopping Experience
Product Listing: Beautiful grid view displaying products with full details.
Advanced Filtering: Filter and search products by category, price, and rating.
Product Details Page: High-quality images, technical descriptions, and pricing.
2. 🛒 Advanced Cart System
Real-Time Updates: Add/remove items and update quantities instantly without page reload.
Persistence: Cart data is saved using Redux + LocalStorage, so items remain even after closing the browser.
3. 💳 Secure Checkout & Payment
Online Payment Simulation: Simulates a secure and professional checkout flow.
Order Confirmation: Validates shipping details and shows a full order summary before purchase.
4. 🔐 Authentication & Security
Login & Register System: Secure user authentication and personalized experience.
Protected Routes: Prevents access to checkout and account pages for unauthorized users.
5. ⚡ Performance & User Experience
High Performance: Built with Next.js using Server-Side Rendering (SSR) for fast loading and SEO optimization.
Responsive Design: Mobile-first design using Tailwind CSS for all devices.
Toast Notifications: Interactive alerts for user actions and errors.
6. 🧱 Clean Code & Architecture
Modular Architecture: Well-structured and scalable codebase for easy feature expansion.
TypeScript: Strong typing ensures fewer bugs and easier debugging.
📁 Project Structure
src/
├── app/
│   ├── (authentication)/
│   ├── (platform)/
│   ├── electronics/
│   ├── featured-products/
│   ├── login/
│   ├── mans-fashoins/
│   ├── offers/
│   └── women-fashoins/
│
├── assets/
│   ├── fonts/
│   └── images/
│
├── components/
│   ├── providers/
│   ├── shared/
│   └── ui/
│
├── config/
├── constants/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── products/
│   ├── checkout/
│   ├── categories/
│   ├── orders/
│   ├── wishlist/
│   └── more...
│
├── hooks/
├── store/
├── styles/
├── types/
└── utils/
# 1. Navigate to project folder
cd FrshCard

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev