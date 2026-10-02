# 🍕 Food Delivery

A responsive food delivery web application built with **React.js and Vite**. Users can browse food items by category, add items to their cart, manage quantities, and proceed to checkout with delivery details and order summary.

**Live Demo:** https://food-delivery-wine-eight.vercel.app/
**GitHub:** https://github.com/princepatel451/food-delivery

---

## 🚀 Features

* Browse food items by category
* Add and remove items from cart
* Increase or decrease item quantities
* Dynamic cart subtotal and delivery fee calculation
* Checkout with delivery information
* Login / Sign Up interface
* Responsive design for desktop, tablet, and mobile
* Client-side navigation using React Router
* Global cart state management using Context API

---

## 🛠️ Tech Stack

* **React.js** – UI development
* **Vite** – Development and build tool
* **React Router** – Client-side routing
* **Context API** – Global state management
* **JavaScript (ES6+)** – Application logic
* **CSS3** – Styling and responsive design
* **ESLint** – Code quality
* **Vercel** – Deployment

---

## 📂 Project Structure

```text
src/
├── assets/
├── Components/
│   ├── AppDownload/
│   ├── ExploreMenu/
│   ├── Food-display/
│   ├── FoodItem/
│   ├── Footer/
│   ├── Header/
│   ├── LoginPopup/
│   └── Navbar/
│
├── Context/
│   └── storeContext.jsx
│
├── Pages/
│   ├── Home/
│   ├── Cart/
│   └── Placeorder/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧠 Key Concepts

### Context API

The application uses Context API to manage cart-related state globally, including:

* Cart items
* Add to cart
* Remove from cart
* Cart quantity
* Total cart amount

### React Router

The application uses React Router for navigation between:

```text
/       → Home
/Cart   → Cart
/Order  → Place Order
```

### Component-Based Architecture

The UI is divided into reusable components such as Navbar, Header, FoodItem, ExploreMenu, Cart, LoginPopup, Footer, and more.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/princepatel451/food-delivery.git
cd food-delivery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🌐 Deployment

The application is deployed on **Vercel**.

**Live Application:** https://food-delivery-wine-eight.vercel.app/

---

## 👨‍💻 Author

**Prince Patel**

* GitHub: https://github.com/princepatel451
* LinkedIn: https://www.linkedin.com/in/prince-patel-a6112b285/

---

⭐ If you find this project useful, consider giving the repository a star.
