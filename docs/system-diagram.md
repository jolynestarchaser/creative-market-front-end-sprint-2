# Creative Market System Diagram

เอกสารนี้สรุป architecture ของโปรเจค `creative-market-front-end-sprint-2` จากโค้ดปัจจุบันใน repo

## High-Level System Diagram

```mermaid
flowchart LR
    buyer[Buyer / Customer]
    admin[Admin]

    hosting[Vercel / Static Hosting]
    browser[Browser]
    spa[React + Vite SPA]
    router[React Router]
    layout[MainLayout<br/>Navbar + Outlet + Footer]

    publicPages[Public Marketplace Pages<br/>Home / Market / Product<br/>Artist Profile]
    auth[Auth Pages<br/>Register / Login]
    checkout[Shopping Flow<br/>Cart / Checkout / Payment / Complete]
    userDash[User Dashboard<br/>Overview / Orders / Address]
    adminDash[Admin Dashboard<br/>Overview / Orders / Sales]

    storage[(Browser localStorage<br/>users / currentUser / cart)]
    assets[(Static Assets<br/>images / icons / logos)]

    buyer --> browser
    admin --> browser
    hosting --> browser
    browser --> spa
    spa --> router
    router --> layout

    layout --> publicPages
    router --> auth
    router --> checkout
    router --> userDash
    router --> adminDash

    publicPages --> assets
    auth <--> storage
    checkout <--> storage
    userDash --> storage

    userDash -. navigate .-> adminDash
    adminDash -. navigate .-> userDash
```

## Internal Module View

```mermaid
flowchart TB
    app[App.jsx]
    mainLayout[MainLayout.jsx]

    home[Home]
    market[Market]
    product[Product]
    artistProfile[ArtistProfile / NewArtistProfile]
    register[Register]
    login[LoginPage]
    cart[Cart]
    checkout[Checkout]
    payment[Payment]
    complete[Complete]
    userDashboard[UserDashboard]
    adminDashboard[AdminDashboard]

    app --> mainLayout
    mainLayout --> home
    mainLayout --> market
    mainLayout --> product
    mainLayout --> artistProfile
    mainLayout --> register
    mainLayout --> login
    mainLayout --> cart
    mainLayout --> checkout
    mainLayout --> payment
    mainLayout --> complete
    mainLayout --> userDashboard
    mainLayout --> adminDashboard

    product --> cartStore[(cart)]
    cart --> cartStore
    checkout --> cartStore
    payment --> cartStore

    register --> userStore[(users)]
    login --> userStore
    login --> currentUser[(currentUser)]
```

## Notes

- โปรเจคนี้เป็น `frontend-only SPA` ในสถานะปัจจุบัน ยังไม่มี backend API หรือ database server อยู่ใน repo
- การเก็บข้อมูลหลักตอนนี้ใช้ `localStorage`:
  - `users` สำหรับสมัครสมาชิก
  - `currentUser` สำหรับ session หลัง login
  - `cart` สำหรับตะกร้าสินค้าและ checkout flow
- หน้า `UserDashboard` และ `AdminDashboard` เป็น UI module ภายในแอปเดียวกัน และสลับกันด้วยการ `navigate()`
- มีหน้า/คอมโพเนนต์ฝั่ง artist เช่น `ArtistDrop` และ `ArtistRegister` อยู่ใน repo แต่ยังไม่ได้ผูก route ใน `src/App.jsx`

## Suggested Presentation Caption

> Creative Market ใช้สถาปัตยกรรมแบบ Frontend SPA บน React + Vite ให้ผู้ใช้และแอดมินใช้งานผ่าน Browser เดียวกัน โดยจัดการ routing ภายในแอปด้วย React Router และเก็บข้อมูลจำลอง เช่น ผู้ใช้ปัจจุบันและตะกร้าสินค้า ไว้ใน browser localStorage
