# 🥬 FreshMart — Smart Grocery Store

A full-stack smart grocery store web application built with **React**, **Node.js**, **Express**, and **Redis**. Localized for the **Indian market** with real store locations near Waknaghat, Himachal Pradesh.

> 🌐 **Live Demo**: [freshmart on Render](https://freshmart.onrender.com)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Hero banner carousel, category navigation, popular products |
| 🛍️ **Product Catalog** | 26 products across 6 categories with search, filter, sort & price range |
| 📦 **Product Detail** | Individual product pages with quantity selector and add-to-cart |
| 🛒 **Shopping Cart** | Full cart management with order summary and free delivery over ₹500 |
| 🏷️ **Offers & Deals** | Flash sale cards with live countdown timers and discount badges |
| 📍 **Store Locator** | Interactive Leaflet map with 5 real store locations near Waknaghat |
| 📊 **Analytics Dashboard** | Category distribution, price analysis, and popular products |
| 🔍 **Smart Search** | Real-time product search with URL query parameter sync |
| 🌙 **Dark Theme** | Premium dark UI with green accents and glassmorphism effects |
| 📱 **Responsive** | Fully responsive across desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI with Hooks
- **React Router v6** — Client-side routing with query params
- **Bootstrap 5** — Responsive grid layout
- **Axios** — HTTP client for API calls
- **Leaflet.js** — Interactive maps for store locator
- **Context API** — Global cart state management
- **Vanilla CSS** — Custom design system with CSS variables

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — REST API server
- **Redis** — In-memory data store
- **Morgan** — HTTP request logger
- **Compression** — Gzip response compression

### Deployment
- **Render** — Cloud hosting (Web Service + Redis)
- **GitHub** — Version control with auto-deploy

---

## 📸 Screenshots

### Home Page
(<img width="1916" height="1076" alt="image" src="https://github.com/user-attachments/assets/1c40bdd1-8cc2-48f7-89da-f36224682a7f" />)
(<img width="1918" height="938" alt="image" src="https://github.com/user-attachments/assets/05652dc9-e7e0-4850-9cc8-9baec12623bb" />)

### Product Catalog
(<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/05b1336d-ece1-48ed-a52d-48f7cdf9db21" />)


### Store Locator
(<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/9a9bc966-741d-4629-a10d-d3ea6659e92d" />)

---

## 🏗️ Architecture

```
Client (React)  ──── REST API ────  Server (Express)  ────  Redis
     │                                    │
     ├── Pages (7)                        ├── /api/products
     ├── Components (10)                  ├── /api/offers
     ├── Context (Cart)                   ├── /api/stores
     ├── Services (Axios)                 └── /api/analytics
     └── Hooks (Custom)
```

**Single-server deployment**: Express serves the React production build and API from the same port.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Redis** (running on default port 6379)
- **npm**

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Kr1ShiV/freshmart.git
cd freshmart

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Build the React frontend
cd client && npx react-scripts build && cd ..

# 4. Seed the database
node server/seed.js

# 5. Start the server
node server/index.js
```

Open **http://localhost:5000** in your browser 🎉

### Quick Restart (after code changes)

```bash
# For data changes (mockData.js):
redis-cli FLUSHALL && node server/seed.js && node server/index.js

# For frontend changes:
cd client && npx react-scripts build && cd .. && node server/index.js
```

---

## 📂 Project Structure

```
freshmart/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── BannerCarousel.js
│       │   ├── CartItem.js
│       │   ├── ConfirmDialog.js
│       │   ├── Footer.js
│       │   ├── Navbar.js
│       │   ├── OfferCard.js
│       │   ├── ProductCard.js
│       │   ├── SkeletonCard.js
│       │   └── Toast.js
│       ├── context/
│       │   └── CartContext.js  # Cart state management
│       ├── hooks/
│       │   └── useFetch.js     # Custom data fetching hook
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── ProductsPage.js
│       │   ├── ProductDetailPage.js
│       │   ├── CartPage.js
│       │   ├── OffersPage.js
│       │   ├── StoreLocatorPage.js
│       │   └── AnalyticsDashboard.js
│       ├── services/
│       │   └── api.js          # Axios API layer
│       ├── App.js              # Routes & layout
│       └── index.css           # Design system
│
├── server/                     # Express Backend
│   ├── config/
│   │   └── redis.js            # Redis connection
│   ├── data/
│   │   └── mockData.js         # Product, offer & store data
│   ├── routes/
│   │   ├── products.js         # Product CRUD API
│   │   ├── offers.js           # Offers & banners API
│   │   ├── stores.js           # Store locator API
│   │   └── analytics.js        # Analytics API
│   ├── utils/
│   │   └── response.js         # Response helpers
│   ├── seed.js                 # Database seeder
│   └── index.js                # Express server entry
│
├── package.json
└── .gitignore
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products (supports `?category`, `?search`, `?sort`, `?maxPrice`) |
| `GET` | `/api/products/:id` | Get single product by ID |
| `GET` | `/api/offers` | Get all active offers |
| `GET` | `/api/offers/banners` | Get homepage banners |
| `GET` | `/api/stores` | Get all store locations |
| `GET` | `/api/analytics/categories` | Category-wise product distribution |
| `GET` | `/api/analytics/price-distribution` | Price range analysis |
| `GET` | `/api/analytics/top-viewed` | Most viewed products leaderboard |
| `GET` | `/api/health` | Health check |

---

## 🇮🇳 India Localization

- **Products**: Amul, Britannia, Parle-G, Maggi, Tata Tea, Haldiram's, Cadbury, Lay's, Surf Excel, Vim, Harpic, Bisleri
- **Currency**: All prices in ₹ (INR)
- **Stores**: 5 real locations near Waknaghat, Solan, Himachal Pradesh
- **Delivery**: Free delivery on orders above ₹500

---

## 👥 Team

| Role | Responsibility |
|------|---------------|
| **Frontend Engineer** | React UI, components, state management, routing, responsive design |
| **Backend Engineer** | Express API, Redis integration, data modeling, server config |
| **Feature Engineer** | Product features, analytics, offers system, store locator |

---

## 📄 License

This project is for educational purposes.

---

<p align="center">Built with 💚 in Himachal Pradesh</p>
