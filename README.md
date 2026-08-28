# Realtime Point of Sale

A modern, real-time point-of-sale (POS) system built with **Next.js 15** and **React 19**. Designed for fast, live order management with instant UI updates across all connected clients.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript 5 (strict) |
| Bundler (dev) | Turbopack |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/WilliamFelix168/Realtime-Point-Of-Sale-Apps.git
cd Realtime-Point-Of-Sale-Apps
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
└── app/
    ├── layout.tsx     # Root layout (fonts, metadata)
    ├── page.tsx       # Home route
    └── globals.css    # Tailwind v4 theme + global styles
public/                # Static assets
```

## License

MIT
