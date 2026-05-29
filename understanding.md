# Creative Market - Project Documentation

This document provides an overview of the architecture, tech stack, and development patterns used in the Creative Market project.

## 🚀 Tech Stack

- **Frontend Framework:** React 19 (Functional Components & Hooks)
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4 & Lucide React Icons
- **State Management:** React `useState` & `useEffect` (Client-side)
- **Persistence:** LocalStorage

---

## 🏗️ Architecture

The project follows a **Component-Based Architecture** with a clear separation between layouts, pages, and modular components.

### 1. Routing & Layouts
- **Main Entry:** `src/App.jsx` defines the routing using `createBrowserRouter`.
- **Layouts:** `src/layouts/MainLayout.jsx` acts as a wrapper, providing a consistent **Navbar** and **Footer** across all pages via the `<Outlet />` component.

### 2. Component Organization
Components are grouped by feature/page inside `src/components/`:
- `Home/`: Components for the landing page.
- `Cart/`: Modular parts of the shopping cart.
- `UserDashboard/` & `AdminDashboard/`: Specific UI elements for user/admin views.
- **Naming Convention:** Components are often prefixed with numbers (e.g., `01_Sidebar.jsx`) to indicate their structural order or hierarchy.

---

## 🛠️ CRUD Implementation

The project currently uses **Local State** and **LocalStorage** to manage data. The logic is designed to be easily swappable with a Backend API (like Supabase) in the future.

### **Create (POST)**
New items are added by creating a new object and spreading it into the existing state array.
- **Example:** `src/components/Artistdrop/02_ItemNames.jsx`
- **Pattern:** `setCollections([...collections, newObject])`

### **Read (GET)**
Data is retrieved using `useEffect` when a component mounts.
- **Example:** `src/pages/Cart.jsx`
- **Pattern:** `JSON.parse(localStorage.getItem('key'))`

### **Update (PUT/PATCH)**
Existing items are modified using the `.map()` method to create a new array with the updated data.
- **Example:** `src/pages/Cart.jsx` (`updateQuantity` function)
- **Pattern:** `state.map(item => item.id === targetId ? { ...item, ...updates } : item)`

### **Delete (DELETE)**
Items are removed using the `.filter()` method.
- **Example:** `src/pages/Cart.jsx` (`removeItem` function)
- **Pattern:** `state.filter(item => item.id !== targetId)`

---

## 📁 Directory Structure

```text
src/
├── assets/             # Static assets (images, icons, logos)
├── components/         # Feature-specific modular components
│   ├── AdminDashboard/ # Admin-related UI
│   ├── Cart/           # Cart-related UI
│   └── ...             # Other feature folders
├── layouts/            # Layout wrappers (MainLayout)
├── pages/              # Route entry points (Home, Market, Product, etc.)
├── App.jsx             # Router configuration
└── main.jsx            # Application entry point
```

---

## 🔮 Future Roadmap
- [ ] **Backend Integration:** Replace LocalStorage with a database (e.g., Supabase/PostgreSQL).
- [ ] **Authentication:** Implement login/register logic with JWT or Auth providers.
- [ ] **Dynamic Routing:** Transition from hardcoded product pages to dynamic `:id` routes.
