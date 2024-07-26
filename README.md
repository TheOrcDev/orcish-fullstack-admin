![orcish-fullstack-admin](https://github.com/TheOrcDev/orcish-fullstack-admin/assets/7549148/33e3a311-c595-4b2b-8a74-eee3ac8331e0)

## Overview
Welcome to the Next.js Admin Panel Fullstack Project! This application is built using Next.js, Shadcn, tRPC, Drizzle, and Neon. Designed as an admin interface, it provides a robust and reusable foundation for your new projects. This guide will assist you in setting up and running the development server for this versatile application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Rename `.env.example` to `.env` and fill in your environment variables:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and replace the following with your own config:

   ```bash
   NEON_DATABASE_URL=
   NEXT_PUBLIC_APP_URL=
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

To run the tests run:

   ```bash
   pnpm test
   ```

Admin is on this url [http://localhost:3000/admin](http://localhost:3000/admin)
