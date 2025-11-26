
# BitGo Food App – React Native + Node API

A complete mobile food‑delivery simulation project built with:

- **api/** → Backend REST API (Node.js + Express)
- **BitGo-app/** → Frontend mobile app (React Native + Expo Router)

The API provides food categories and products with images, and the mobile app consumes it.

This setup runs locally for development, but the API can be hosted later so the mobile app can work from anywhere.

---

## 1. Project Structure

```
root/
├── api/                 # Backend: Node.js + Express
│   ├── server.js
│   └── public/
│       └── images/      # Product & category images served statically
│
└── BitGo-app/           # Mobile frontend: React Native + Expo Router
    ├── app/
    │   ├── (tabs)/
    │   │   ├── index.tsx         # Home screen (categories)
    │   │   └── _layout.tsx
    │   └── products/
    │       └── [category].tsx    # Products screen for each category
    ├── constants/
    │   └── config.ts             # API base URL
    ├── components/
    └── package.json
```

---

## 2. Requirements

- Node.js 18+
- npm or yarn
- Expo CLI (via `npx expo`)
- Android Studio (with a configured emulator) **or** a real device with Expo Go installed

---

## 3. Backend – API (`api/`)

The backend provides:

- Categories
- Products
- Static image files from `/public/images`

### 3.1. Install dependencies

```bash
cd api
npm install
```

## 3.1. Important: Images Are **Not** Included Yet

The `/public/images` folder is **empty by default**.

**You must add your own images manually.**  
There are two ways to add them:

### Option 1: Download real images (recommended)
Search for food images online and download them (for example):

- Google Images
- Unsplash
- Pexels
- Freepik
- Pixabay

Then place them inside:

```
api/public/images/
```

Use simple filenames such as:

```
burger.jpg
pizza.jpg
sushi.jpg
dessert.jpg
coffee.jpg
salad.jpg
```

### Option 2: Use direct image URLs
Instead of downloading files, you can use direct URLs in the API:

```js
image: "https://example.com/my-image.jpg"
```

But you must ensure the links work.  
Many free-hosted images block external access, so downloading the files is **more reliable**.

---

### 3.3. Run the API

```bash
npm run dev
# or
node server.js
```

Default URL:

```
http://localhost:3000
```

### 3.4. API Endpoints

| Method | Endpoint                     | Description |
|--------|------------------------------|-------------|
| GET    | `/categories`                | Returns all food categories |
| GET    | `/products`                  | Returns all products |
| GET    | `/products?categoryId=x`     | Returns products filtered by category |
| GET    | `/categories/:id/products`   | Returns products of one category |

---

## 4. Frontend – Mobile App (`BitGo-app/`)

Built with **Expo** + **Expo Router**.

### 4.1. Install dependencies

```bash
cd BitGo-app
npm install
```

### 4.2. API URL configuration (VERY IMPORTANT)

Open:

```
BitGo-app/constants/config.ts
```

Set:

```ts
// When using Android Studio emulator:
export const API_URL = "http://10.0.2.2:3000";
```

Why?

- `10.0.2.2` is Android’s internal alias to access **your PC's localhost**.

Other cases:

#### Real device on the same WiFi:
```ts
export const API_URL = "http://YOUR_LOCAL_IP:3000";
```

Example:

```ts
export const API_URL = "http://192.168.0.15:3000";
```

#### Future Hosting (public API):

```ts
export const API_URL = "https://your-hosted-api.com";
```

You only change it in **one place**.

### 4.3. Navigation (Expo Router)

- `app/(tabs)/index.tsx` → home screen (categories)
- `app/products/[category].tsx` → products screen

Data flow:

```
GET /categories → shows category cards
GET /products?categoryId={category} → shows category products
```

### 4.4. Run the app on Android emulator

1. Start the API (`npm run dev` inside `api/`)
2. Open Android Studio → Device Manager → Start an emulator
3. Inside `BitGo-app` run:

```bash
npx expo start
```

4. When Expo CLI appears, press:

```
a
```

Expo installs & opens Expo Go inside the emulator and loads the project.

### 4.5. Run on real device

1. Connect your phone to the same WiFi network
2. Update `API_URL` with your PC's local IP
3. Run:

```bash
npx expo start
```

4. Scan the QR code with Expo Go

---

## 5. Deployment – Hosting the API (future)

Later the `api/` folder can be deployed to services like:

- Render
- Railway
- Fly.io
- DigitalOcean
- AWS / Azure / GCP

Once hosted, you will have a URL like:

```
https://bitgo-foodapi.onrender.com
```

Then simply update:

```ts
export const API_URL = "https://bitgo-foodapi.onrender.com";
```

The mobile app will now work **from anywhere in the world**.

---

## 6. Quick Summary

- Run `api/` → serves categories, products, and images.
- Run `BitGo-app/` → mobile UI using Expo Router.
- Update `API_URL` to connect the app to the backend.
- Emulator uses: `http://10.0.2.2:3000`
- Real devices use your WiFi local IP.
- Future deployment only requires changing `API_URL`.

Your project is ready for classroom delivery AND future real‑world deployment.
