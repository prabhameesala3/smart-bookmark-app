1. Smart Bookmark App
A full-stack bookmark management application built using Next.js (App Router) and Supabase.
Users can log in using Google OAuth, create private bookmarks, delete them, and see updates in real-time.

2. Live Application
🔗 https://smart-bookmark-app-hq5p.vercel.app/

3. GitHub Repository
https://github.com/prabhameesala3/smart-bookmark-app.git

(Replace with your actual GitHub URL)

4. Tech Stack
Frontend: Next.js (App Router)
Authentication: Supabase Auth (Google OAuth)
Database: Supabase PostgreSQL
Realtime: Supabase Realtime Subscriptions
Styling: CSS
Deployment: Vercel

5. Features
Google OAuth login
Private bookmarks per user
Add bookmark
Delete bookmark
Real-time updates across multiple tabs
Production deployment on Vercel

6. Security Implementation
Row Level Security (RLS) is enabled on the bookmarks table.
Policies ensure that:
Users can only view their own bookmarks
Users can only insert their own bookmarks
Users can only delete their own bookmarks
Policy condition used:
auth.uid() = user_id
This guarantees strict user-level data isolation.

7. Project Structure
app/
  page.tsx
  dashboard/page.tsx

lib/
  supabase.ts

8. Environment Variables
Create a .env.local file:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_api_key

9. Challenges Faced
OAuth redirect mismatch between localhost and production
Module resolution issues during Vercel deployment
Case sensitivity differences between Windows and Linux
Supabase Site URL misconfiguration
All issues were resolved by:
Removing hardcoded redirect URLs
Using relative imports
Updating Supabase authentication settings
Proper environment variable configuration

10. How To Run Locally
npm install
npm run dev
