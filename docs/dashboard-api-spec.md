# Dashboard API Specification

เอกสารนี้สรุป API ที่ควรมีเพื่อรองรับหน้า `User Dashboard` และ `Admin Dashboard` ตาม UI ปัจจุบันในโปรเจค

## Assumptions

- ใช้ token-based authentication เช่น JWT
- ผู้ใช้ทั่วไปเรียกได้เฉพาะข้อมูลของตัวเอง
- admin เรียกข้อมูลภาพรวมร้าน, orders ทั้งหมด, และ sales analytics ได้
- ชื่อ endpoint ด้านล่างเป็นข้อเสนอสำหรับเชื่อม frontend ปัจจุบันกับ backend

## User Dashboard APIs

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/users/me/dashboard` | `GET` | Get current user profile card and overview stats for User Dashboard |
| `/users/me/orders/status` | `GET` | Get recent orders with current status for the overview table |
| `/users/me/orders/history` | `GET` | Get past orders history for the overview table |
| `/users/me/orders` | `GET` | Get full order list for My Orders page with optional status filter |
| `/users/me/addresses` | `GET` | Get saved addresses for My Address page |
| `/users/me/addresses` | `POST` | Create a new saved address |
| `/users/me/addresses/:addressId` | `PATCH` | Update one saved address |
| `/users/me/addresses/:addressId` | `DELETE` | Delete one saved address |

## Admin Dashboard APIs

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/admin/dashboard/overview` | `GET` | Get admin overview cards for total sales, orders, items sold, and average order value |
| `/admin/dashboard/sales-chart` | `GET` | Get time-series sales data for Sales Overview chart |
| `/admin/dashboard/product-breakdown` | `GET` | Get product category or collection breakdown for pie chart |
| `/admin/dashboard/recent-orders` | `GET` | Get recent customer orders for overview table |
| `/admin/dashboard/top-products` | `GET` | Get top selling art/products ranking |
| `/admin/orders` | `GET` | Get full order list for Orders page with filters such as status and date |
| `/admin/orders/:orderId` | `GET` | Get details of a specific order |
| `/admin/orders/:orderId/status` | `PATCH` | Update order status such as pending, processing, shipped, or completed |
| `/admin/sales/summary` | `GET` | Get sales summary cards for Sales page |
| `/admin/sales/chart` | `GET` | Get sales chart data for Sales page |
| `/admin/sales/product-breakdown` | `GET` | Get product performance breakdown for Sales page |

## Suggested Response Shape

### `GET /users/me/dashboard`

```json
{
  "profile": {
    "id": "usr_001",
    "displayName": "Luna Atelier",
    "username": "@lunaatelier",
    "avatarUrl": "https://example.com/avatar.jpg",
    "roles": ["customer", "artist"]
  },
  "stats": {
    "totalOrders": 3,
    "totalSpend": 9550
  }
}
```

### `GET /users/me/orders`

Query params:

- `status=all|pending|processing|completed`
- `page`
- `limit`

```json
{
  "summary": {
    "totalOrders": 3,
    "totalSpend": 9550,
    "completed": 1
  },
  "items": [
    {
      "id": "CM-20191",
      "product": "Golden Bloom Poster",
      "artist": "Asha Studio",
      "items": 1,
      "date": "2026-03-12",
      "price": 1250,
      "status": "completed",
      "imageUrl": "https://example.com/product.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### `GET /users/me/addresses`

```json
{
  "items": [
    {
      "id": "addr_001",
      "label": "Home",
      "name": "Luna Atelier",
      "street": "88 Sukhumvit 24, Khlong Tan",
      "district": "Khlong Toei",
      "city": "Bangkok",
      "postcode": "10110",
      "country": "Thailand",
      "tel": "0812345678",
      "isCurrent": true
    }
  ]
}
```

### `GET /admin/dashboard/overview`

```json
{
  "stats": {
    "totalSales": 8624.5,
    "orders": 124,
    "itemsSold": 156,
    "averageOrderValue": 69.55
  },
  "changes": {
    "totalSales": "18.6% from last 30 days",
    "orders": "12.3% from last 30 days",
    "itemsSold": "4.7% from last 30 days",
    "averageOrderValue": "5.0% from last 30 days"
  }
}
```

### `GET /admin/orders`

Query params:

- `status=pending|processing|shipped|completed`
- `page`
- `limit`
- `dateFrom`
- `dateTo`

```json
{
  "stats": {
    "allOrders": 124,
    "new": 18,
    "processing": 32,
    "shipped": 45,
    "completed": 29
  },
  "items": [
    {
      "id": "AR-31241",
      "product": "Ocean Bloom Print",
      "imageUrl": "https://example.com/product.jpg",
      "date": "2026-05-12",
      "qty": 1,
      "customer": {
        "id": "usr_102",
        "name": "Sarah Jenkins"
      },
      "amount": 1250,
      "status": "completed"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### `GET /admin/dashboard/sales-chart`

```json
{
  "range": "last_30_days",
  "points": [
    { "label": "May 12", "sales": 2100 },
    { "label": "May 20", "sales": 3450 },
    { "label": "May 29", "sales": 4920 },
    { "label": "Jun 08", "sales": 6240 }
  ]
}
```

### `GET /admin/dashboard/product-breakdown`

```json
{
  "totalUnits": 156,
  "items": [
    { "label": "Collection name 1", "value": 25, "percent": 25, "color": "#6366f1" },
    { "label": "Collection name 2", "value": 20, "percent": 20, "color": "#8b5cf6" }
  ]
}
```

### `GET /admin/dashboard/top-products`

```json
{
  "items": [
    {
      "rank": 1,
      "productId": "prd_001",
      "name": "Golden Bloom Poster",
      "imageUrl": "https://example.com/product.jpg"
    }
  ]
}
```

## UI-to-API Mapping

### User Dashboard

- `Overview` ใช้ `/users/me/dashboard`, `/users/me/orders/status`, `/users/me/orders/history`
- `My Orders` ใช้ `/users/me/orders`
- `My Address` ใช้ `/users/me/addresses`

### Admin Dashboard

- `Overview` ใช้ `/admin/dashboard/overview`, `/admin/dashboard/sales-chart`, `/admin/dashboard/product-breakdown`, `/admin/dashboard/recent-orders`, `/admin/dashboard/top-products`
- `Orders` ใช้ `/admin/orders` และ `/admin/orders/:orderId/status`
- `Sales` ใช้ `/admin/sales/summary`, `/admin/sales/chart`, `/admin/sales/product-breakdown`
