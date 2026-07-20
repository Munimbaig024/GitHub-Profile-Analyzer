# GitHub Profile Analyzer

A clean, modern, and highly responsive dashboard to explore GitHub universes. Built with React, Vite, React Router, Tailwind CSS, and Recharts. 

## Features

- **Global Unified Search:** Search for any GitHub user or search the entire GitHub repository database seamlessly using the dropdown in the search bar.
- **Dynamic Pagination:** The global search supports an infinite-style "Load More" pagination, pulling exactly 12 results at a time to optimize network load and UI scaling.
- **Deep Routing & Browser History:** Full integration with `react-router-dom` means that every search query (`/search?q=...`) and user profile (`/user/...`) has its own shareable URL. The browser's native back and forward buttons work perfectly out-of-the-box.
- **Native Context Menus:** Search result cards utilize native `<Link>` tags, allowing you to right-click and "Open in new tab" seamlessly.
- **Comprehensive Profile Overview:** Get a detailed snapshot of a user, including their avatar, bio, location, followers/following, join date, total repositories, stars, and forks.
- **Data Visualization:** Top programming languages are visually broken down in a stunning, interactive donut chart using Recharts.
- **Top Repositories Grid:** Browse a user's most recently updated repositories. Repositories include direct secure links ("View on GitHub") to the source.
- **Dynamic Dark/Light Mode:** Includes an aesthetically pleasing dark mode interface and a clean light mode interface, complete with a toggle button that persists your preference to `localStorage`.

## Tech Stack

- **[React 18](https://reactjs.org/)**: UI Library.
- **[React Router 6](https://reactrouter.com/)**: Powerful client-side routing.
- **[Vite](https://vitejs.dev/)**: Next-generation, blazing fast frontend tooling.
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[Recharts](https://recharts.org/)**: Composable charting library built on React components.
- **[Lucide React](https://lucide.dev/)**: Beautiful and consistent iconography.

## Getting Started

Follow these steps to run the GitHub Profile Analyzer locally on your machine.

### Prerequisites

You will need **Node.js** installed on your system. It is recommended to use the latest LTS (Long Term Support) version. 
You can download it from [nodejs.org](https://nodejs.org/).

### Installation & Setup

1. **Clone the repository:**
   Open your terminal and run:
   ```bash
   git clone https://github.com/Munimbaig024/GitHub-Profile-Analyzer.git
   cd "GitHub Profile Analyzer"
   ```

2. **Install all dependencies:**
   This will install React, Vite, Tailwind CSS, Recharts, and React Router.
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Once the server starts, it will output a local URL (usually `http://localhost:5173`). Open this URL in your browser to view the application!

## Building for Production

To create a highly optimized production build, run:

```bash
npm run build
```

This will output all static assets into a `dist` directory, which can be deployed to any static hosting provider.

## Deployment

You can deploy this project instantly to **Vercel**, **Netlify**, or **GitHub Pages**. 
When importing the repository to your hosting provider, keep the default build settings for Vite:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Handling Client-Side Routing in Production
Because this app uses React Router (`react-router-dom`), if you deploy to a standard static server, you will need to configure rewrite rules to point all requests to `index.html`. Vercel handles this automatically for Vite projects, but if you use Netlify, simply create a `_redirects` file in the `public` folder with the following content:
```
/* /index.html 200
```
