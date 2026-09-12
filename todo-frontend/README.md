## Connect to the backend

The frontend uses `NEXT_PUBLIC_API_URL` as the API base URL. Create a `.env.local` file in this folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the backend first, then start the frontend:

```bash
# terminal 1
cd todo-backend
npm install
npm run dev

# terminal 2
cd todo-frontend
npm install
npm run dev
```

Open `http://localhost:3000/register` to create an account, then sign in at `/login`. The frontend stores the returned access token in browser storage and sends it as `Authorization: Bearer <token>` for protected todo requests. The backend allows the local frontend origin through `FRONTEND_URL` (defaults to `http://localhost:3000`).

For the backend, make sure its `.env` includes `PORT`, `MONGODB_URI`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_SECRET`, and `REFRESH_TOKEN_EXPIRY`. Set `NODE_ENV=production` and a real `FRONTEND_URL` when deploying.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
