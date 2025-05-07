# 🌱 RiseTogether – Donation Request Web App

**RiseTogether** is a community-driven platform that allows individuals from marginalized communities to **submit donation requests**, and enables donors to **view and fulfill those requests**. Built with **React** and **Supabase**, it ensures a smooth, secure, and scalable donation process.

## 🚀 Features

- ✅ Submit donation requests with category, contact info, and optional image
- 🖼️ Upload images to Supabase Storage or fall back to category-based placeholder
- 📄 View all donation requests in one dashboard
- 🔍 Filter requests by category and time (optional)
- 🔐 User authentication via Supabase Auth
- 📦 Unified database model for all users
- 🎨 Responsive and clean form UI using CSS modules

## 🧱 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React + TypeScript          |
| Backend     | Supabase (PostgreSQL + Auth + Storage) |
| Styling     | CSS Modules / Plain CSS     |
| Storage     | Supabase Storage            |
| Auth        | Supabase Auth               |

## 📁 Project Structure

```
RiseTogether/
│
├── public/
│
├── src/
│   ├── apis/                        # API methods (Supabase queries)
│   ├── assets/                      # Static assets (e.g., SVGs)
│   │   └── react.svg
│   ├── components/
│   │   ├── dashboard/               # Dashboard components (e.g., cards)
│   │   └── ui/                      # Reusable UI components
│   │       └── index.ts
│   ├── contexts/                    # Global React context (Auth)
│   │   ├── AuthContext.tsx
│   │   └── authTypes.ts
│   ├── layout/                      # Layout components
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── Auth/                    # Auth-related pages (Login/Register)
│   │   └── dashboard/               # Main user dashboard pages
│   │       └── SubmitRequestPage.tsx
│   │   ├── AdminPanel.tsx           # Admin-only controls
│   │   └── index.ts
│   ├── routes/                      # App route definitions (optional)
│   ├── styles/                      # Global or module stylesheets
│   ├── supabase/                    # Supabase client setup
│   │   └── supabaseClient.ts
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # App entry point
│   └── vite-env.d.ts
│
├── .env                             # Environment variables
├── .gitignore
├── bun.lockb
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## 🗃️ Database: `donation_requests` Table

```sql
CREATE TABLE donation_requests (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  contact_number TEXT NOT NULL,
  contact_email TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fulfilled_by UUID REFERENCES auth.users(id),
  status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'fulfilled')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧑‍🔧 Supabase Setup

1. Create a new project at supabase.com
2. Create the `donation_requests` table using the schema above
3. Create a storage bucket named `donation-images`
4. Inside it, create a folder `basic_images/` with placeholder images like:
   - Food.jpg
   - Clothes.jpg
   - Education.jpg
   - Healthcare.jpg
   - Electronics.jpg
   - Financial.jpg
   - Others.jpg
   - default.jpg
5. Enable Row Level Security if needed, and configure access policies
6. Create a `.env` file in the root of your project and add:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🧑‍💻 Local Development

```bash
git clone https://github.com/your-username/risetogether.git
cd risetogether
npm install
npm run dev
```

## 🔮 Future Features

- 🧾 Fulfillment tracking with status updates
- 🔎 Advanced filtering and search
- 🛡️ Role-based access (admin moderation)
- 📊 Analytics dashboard for insights
- 🌍 Internationalization (i18n)