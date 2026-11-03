# BookNook

A small online library where readers share books, borrow them for a week, and return them when they are done.

**Live site:** https://booknook-tarek.vercel.app

**Server repository:** https://github.com/TarekAhmed353/booknook-server

## Features

- Browse every book in the library, filter by category (Fiction, Science, History, Kids, Others), and see the six newest arrivals on the home page.
- Register with email and password (with live password rules) or sign in with Google. Private pages send you to Login and bring you back afterwards, and reloading a private page keeps you logged in.
- Add your own books with a cover image uploaded to imgbb, then edit or delete them from My Books. Deleting asks for confirmation in a custom dialog.
- Borrow a book for 7 days from its details page. Each book tracks its available copies, so borrowing lowers the count, returning raises it, and the Borrow button turns into "Not Available" when none are left.
- You cannot borrow the same book twice at once. My Borrows lists everything you have out, with borrow and return dates, an overdue tag, and a Return button.
- The Express API checks a JSON Web Token on every protected route, so only logged-in users can borrow, add, edit or delete, and only the owner can change their own books.
- Light and dark themes with a toggle in the Navbar, Swiper banner on the home page, scroll animations with Motion, loading spinners, a custom 404 page, and a fully responsive layout.

## Tech stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS 4 and shadcn/ui
- BetterAuth with the MongoDB adapter, Google OAuth and the JWT plugin
- Swiper, Motion, next-themes, Sonner, Lucide and React Icons
- imgbb for image hosting

## Run it locally

1. Clone this repository and install packages:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```
   MONGODB_URI=your-mongodb-connection-string
   BETTER_AUTH_SECRET=a-long-random-string
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_KEY=your-imgbb-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. Start the BookNook server (see the server repository), then run:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000.