# Pixel Shop

A Persian (RTL) online store for gaming gear, built to practice a modern React data-fetching stack on a realistic project.

## Features

- Product listing with category filter, search and sorting, all stored in the URL so links are shareable
- Product detail page with stock-aware add to cart
- Shopping cart saved in localStorage and validated when loaded
- Register and login with form validation
- Checkout with a shipping form (Persian digits are normalized) and an order success page
- Flash-sale section with a live countdown, newsletter form and a fully responsive layout

## Tech stack and where it is used

| Tool | Used for |
| --- | --- |
| React 19 and Vite | UI and build tooling |
| React Router | Nested layouts, dynamic routes, protected routes, URL search params |
| TanStack Query | Server state: queries, mutations, caching, select |
| Axios | API client with a shared instance and an error interceptor |
| React Hook Form and Zod | Forms and validation. Zod also validates API responses and localStorage data |
| Tailwind CSS 4 | Styling with design tokens defined in @theme |

## Getting started

bash
npm install
npm start


npm start runs the mock API (json-server on port 3001) and the Vite dev server together. Open http://localhost:5173.

The mock database is created from db.seed.json on the first run. Run npm run reset-db to restore it. To change the API address, copy .env.example to .env.

## Scripts

| Script | Description |
| --- | --- |
| npm start | Mock API and dev server together |
| npm run dev | Vite dev server only |
| npm run server | Mock API only |
| npm run reset-db | Restore the mock database from the seed file |
| npm run build | Production build |
| npm run lint | ESLint |

## Project structure


src/
  api/         Axios client and request functions
  schemas/     Zod schemas (forms, API responses, storage)
  hooks/       TanStack Query hooks and small custom hooks
  context/     Cart and auth state
  components/  Reusable UI and home page sections
  pages/       Route components
  layouts/     Main layout with navbar and footer
  lib/         Formatting helpers and static data
  assets/      Hero image and product photos (src/assets/products/<id>.png)
public/        Logo and favicon


## Notes

- The backend is a json-server mock. Authentication is simulated for learning: passwords are stored as plain text in the mock database. A real backend must hash passwords and issue tokens.
- Order totals are calculated on the client. A real backend must recalculate them from its own prices.
- Product photos are matched to products by id.