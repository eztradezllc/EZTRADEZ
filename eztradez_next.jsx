# EZTRADEZ — Next.js Starter App

This canvas contains a ready-to-run **Next.js** starter project prewired with:

- Navy & cream theme (navy `#0a1a2f`, cream `#f8f6f0`, red accent `#b22b2b`)
- Splash screen with your uploaded logo (`/public/EZ_LOGO2.png`) and tagline **"Win Consistently"**
- Splash fade-in animation (logo then tagline), auto-transition (2.5s) to the app
- Basic pages: Landing (splash → login), Login placeholder, Dashboard
- Tailwind CSS for styling (quick, production-ready styling system)
- Placeholders for Stripe server endpoints and Firebase integrations (if you want to add them later)

---

## Project file list (copy these into a new Next.js app)

```
package.json
next.config.js
postcss.config.js
tailwind.config.js
public/EZ_LOGO2.png
pages/_app.jsx
pages/index.jsx
pages/login.jsx
pages/dashboard.jsx
components/SplashScreen.jsx
styles/globals.css
README.md
```

---

Below are the exact file contents. Copy each into your project (or download and run). The app expects your logo at `public/EZ_LOGO2.png` (already uploaded into the environment).

---

### package.json

```json
{
  "name": "eztradez-next",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.5.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "clsx": "^1.2.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.4.5"
  }
}
```

---

### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = nextConfig;
```

---

### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### tailwind.config.js

```js
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ezNavy: '#0a1a2f',
        ezCream: '#f8f6f0',
        ezRed: '#b22b2b'
      }
    }
  },
  plugins: [],
};
```

---

### public/EZ_LOGO2.png

Place the provided `EZ_LOGO2.png` here. (The project references `/EZ_LOGO2.png`.)

---

### pages/_app.jsx

```jsx
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

---

### pages/index.jsx

```jsx
import { useEffect, useState } from 'react'
import SplashScreen from '../components/SplashScreen'
import { useRouter } from 'next/router'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // after splash duration, navigate to login
    const timer = setTimeout(() => {
      setShowSplash(false)
      router.replace('/login')
    }, 2500) // 2.5s total
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-ezNavy flex items-center justify-center">
      {showSplash ? <SplashScreen /> : null}
    </div>
  )
}
```

---

### pages/login.jsx

```jsx
import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen bg-ezNavy text-ezCream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-semibold">EZTRADEZ</h1>
        <p className="mt-2 text-sm text-ezCream/80">Sign in to access premium callouts and the trading community.</p>

        <div className="mt-6 space-y-3">
          <button className="w-full py-2 rounded-lg bg-ezCream text-ezNavy font-semibold">Sign in with Google</button>
          <button className="w-full py-2 rounded-lg border border-ezCream/20 text-ezCream">Sign in with Email</button>
        </div>

        <div className="mt-6 text-sm text-ezCream/70">
          <p>Demo: <Link href="/dashboard"><a className="text-ezCream underline">Enter Dashboard (demo)</a></Link></p>
        </div>
      </div>
    </div>
  )
}
```

---

### pages/dashboard.jsx

```jsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-ezNavy text-ezCream p-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded bg-ezCream/10">EZ</div>
          <div>
            <div className="font-semibold text-lg">EZTRADEZ</div>
            <div className="text-xs text-ezCream/70">Win Consistently</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-ezCream/20 rounded">Profile</button>
          <button className="px-3 py-1 text-sm bg-ezRed text-white rounded">Subscribe</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 bg-white/3 p-6 rounded-2xl"> 
            <h2 className="font-semibold text-lg">Callouts</h2>
            <div className="mt-4 text-sm text-ezCream/80">Sample feed will appear here. Connect Firestore or your API to populate callouts.</div>
          </section>

          <aside className="bg-white/3 p-6 rounded-2xl">
            <div className="font-semibold">Community</div>
            <div className="mt-2 text-sm text-ezCream/80">Members · 1200</div>
            <div className="mt-4">
              <button className="w-full py-2 rounded-lg bg-ezCream text-ezNavy">Join Premium</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
```

---

### components/SplashScreen.jsx

```jsx
import Image from 'next/image'

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="splash-logo-wrapper">
        <Image src="/EZ_LOGO2.png" alt="EZTRADEZ" width={640} height={240} priority />
      </div>
      <div className="splash-tagline">Win Consistently</div>

      <style jsx>{`
        .splash-logo-wrapper {
          opacity: 0;
          animation: logoFade 0.9s ease forwards;
        }
        .splash-tagline {
          margin-top: -8px;
          color: #f8f6f0;
          font-weight: 600;
          letter-spacing: 2px;
          opacity: 0;
          transform: translateY(6px);
          animation: tagFade 0.9s 0.9s ease forwards;
        }
        @keyframes logoFade {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tagFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
```

---

### styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ez-navy: #0a1a2f;
  --ez-cream: #f8f6f0;
  --ez-red: #b22b2b;
}

html, body, #__next {
  height: 100%;
}

body {
  background-color: var(--ez-navy);
  color: var(--ez-cream);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* subtle utility */
.bg-ezNavy { background-color: var(--ez-navy); }
.text-ezCream { color: var(--ez-cream); }
```

---

### README.md (quick start)

```md
# EZTRADEZ — Next.js Starter

1. Ensure Node 18+ is installed.
2. Place your logo at `public/EZ_LOGO2.png` (already present in this environment).
3. Install dependencies:

```bash
npm install
```

4. Run the dev server:

```bash
npm run dev
```

5. Visit http://localhost:3000 to see the splash and app.

---

### Notes & next steps

- This starter uses client-side placeholder auth UI. I left Stripe and Firebase integration points intentionally out so you can wire them server-side and securely (I can generate server code for Stripe checkout & webhooks if you want).
- If you'd like, I can now:
  - Add Firebase auth + Firestore wiring (with rules) and integrate the previous callout features.
  - Build the Stripe Checkout + webhook server (Cloud Function / Express) and wire subscription state into user docs.
  - Convert the styling into shadcn components and add accessibility tweaks.

Tell me which of these you'd like next and I'll add it to the project.
```

---

That's everything — the project is ready in the canvas. You can copy each file to build/run locally. If you'd like, I can now:

- Add Firebase + previous callout logic into this Next.js app (auth, callouts, premium gating), or
- Add server-side Stripe code (Cloud Function / Express) and webhook handling, or
- Package this as a downloadable zip file.

Which would you like me to do next?
