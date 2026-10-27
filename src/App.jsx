
import { useState } from 'react'
import {
  HashRouter,
  MemoryRouter,
  StaticRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './index.css'

const routerInfo = {
  HashRouter: {
    icon: '#',
    color: 'violet',
    subtitle: 'URL Hash Navigation',
    description:
      'Stores the current route after the # symbol. The browser does not send the hash to the server.',
    example: 'example.com/#/about',
    uses: ['Static hosting', 'Legacy applications', 'Simple client-side routing'],
  },
  MemoryRouter: {
    icon: '◉',
    color: 'cyan',
    subtitle: 'In-Memory Navigation',
    description:
      'Keeps navigation history in memory instead of changing the browser address bar.',
    example: 'URL stays unchanged',
    uses: ['Automated tests', 'Storybook demos', 'Embedded workflows'],
  },
  StaticRouter: {
    icon: '▣',
    color: 'amber',
    subtitle: 'Fixed Location Rendering',
    description:
      'Renders a page for a predetermined location without interactive browser navigation.',
    example: '/about (fixed location)',
    uses: ['Server-side rendering', 'Static HTML rendering', 'Server-rendered responses'],
  },
}

function Home() {
  return (
    <Page
      icon="✦"
      title="Welcome to RouterVerse"
      text="Explore three routing approaches and discover how React can display different pages without a traditional full-page navigation."
    />
  )
}

function About() {
  return (
    <Page
      icon="◈"
      title="About This Lab"
      text="RouterVerse is an interactive React Router learning experience built to make routing concepts easy to understand."
    />
  )
}

function Contact() {
  return (
    <Page
      icon="✉"
      title="Contact & Feedback"
      text="You have successfully navigated to the Contact route. Try another link to see how the selected router behaves."
    />
  )
}

function Page({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl text-violet-300">
        {icon}
      </div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
        Current route loaded
      </p>
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xl leading-7 text-slate-400">{text}</p>
    </div>
  )
}

function NavLinks() {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
            location.pathname === link.to
              ? 'border-violet-400/40 bg-violet-500/20 text-white'
              : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {link.label} <span className="ml-1 text-violet-300">↗</span>
        </Link>
      ))}
    </nav>
  )
}

function RouteContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={
          <Page
            icon="?"
            title="Page not found"
            text="This route does not exist in the demo."
          />
        }
      />
    </Routes>
  )
}

function HashDemo() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      <NavLinks />
      <RouteContent />
      <div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
          Live browser location
        </p>
        <code className="mt-3 block break-all text-sm text-cyan-200">
          {window.location.origin}{window.location.pathname}#{location.pathname}
        </code>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate(1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Forward →
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Notice the # in the address bar. Navigation changes the route without a full-page reload.
        </p>
      </div>
    </div>
  )
}

function MemoryDemo() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
          Browser address bar
        </p>
        <code className="mt-2 block break-all text-sm text-white">
          {window.location.href}
        </code>
        <p className="mt-2 text-sm text-slate-400">
          This address remains unchanged when you navigate inside MemoryRouter.
        </p>
      </div>

      <NavLinks />
      <RouteContent />

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
          Internal memory location
        </p>
        <code className="mt-2 block text-xl text-white">
          {location.pathname}
        </code>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate(1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Forward →
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            Jump to Contact ↗
          </button>
        </div>
      </div>
    </div>
  )
}

function StaticDemo() {
  const location = useLocation()

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
          Fixed route · StaticRouter
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          This route is supplied when the StaticRouter is created. It renders a matching page but does not manage interactive browser history.
        </p>
      </div>
      <RouteContent />
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
          Supplied location
        </p>
        <code className="mt-2 block text-xl text-white">
          {location.pathname}
        </code>
        <p className="mt-3 text-sm text-slate-400">
          The route is fixed for this rendering. To show another page, provide a different location from the server or render setup.
        </p>
      </div>
    </div>
  )
}

function RouterPanel({ type }) {
  if (type === 'HashRouter') {
    return (
      <HashRouter>
        <HashDemo />
      </HashRouter>
    )
  }

  if (type === 'MemoryRouter') {
    return (
      <MemoryRouter initialEntries={['/']}>
        <MemoryDemo />
      </MemoryRouter>
    )
  }

  return (
    <StaticRouter location="/about">
      <StaticDemo />
    </StaticRouter>
  )
}

function App() {
  const [selected, setSelected] = useState('HashRouter')
  const info = routerInfo[selected]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b16] text-slate-200">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-2xl font-black text-white shadow-lg shadow-violet-500/20">
              R
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                Router<span className="text-violet-400">Verse</span>
              </h1>
              <p className="text-xs text-slate-500">INTERACTIVE REACT ROUTER LAB</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            ● LIVE DEMONSTRATION
          </span>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
              Practical No. 03 / Routing
            </p>
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              One app.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Three routing worlds.
              </span>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              Discover how HashRouter, MemoryRouter, and StaticRouter decide which React page to render. Choose a router and experiment with its behavior.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#router-lab"
                className="rounded-xl bg-violet-500 px-5 py-3 font-bold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
              >
                Explore the lab ↓
              </a>
              <span className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-400">
                React + Tailwind CSS
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Routing overview</p>
                <p className="mt-1 text-xs text-slate-500">Choose the right navigation model</p>
              </div>
              <span className="text-2xl">⌘</span>
            </div>
            {Object.entries(routerInfo).map(([name, item], index) => (
              <button
                key={name}
                onClick={() => {
                  setSelected(name)
                  document.getElementById('router-lab')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
                className={`mb-3 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  selected === name
                    ? 'border-violet-400/40 bg-violet-500/10'
                    : 'border-white/10 bg-black/10 hover:bg-white/[0.05]'
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl font-black text-cyan-300">
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-white">{name}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {item.subtitle}
                  </span>
                </span>
                <span className="text-sm text-slate-500">0{index + 1}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="router-lab" className="scroll-mt-6 py-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
              Hands-on experience
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              The Router Lab<span className="text-violet-400">.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a mode below and test the navigation yourself.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Object.keys(routerInfo).map((name) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selected === name
                    ? 'border-violet-400/50 bg-violet-500/10 shadow-lg shadow-violet-950/20'
                    : 'border-white/10 bg-white/[0.025] hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-2xl text-cyan-300">
                  {routerInfo[name].icon}
                </span>
                <span className="mt-3 block font-bold text-white">{name}</span>
                <span className="mt-1 block text-xs text-slate-500">
                  {routerInfo[name].subtitle}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="min-w-0 rounded-3xl border border-white/10 bg-[#0d1120] p-4 sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Currently testing
                  </p>
                  <h3 className="mt-1 text-xl font-black text-white">
                    {selected}
                  </h3>
                </div>
                <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-cyan-300">
                  {info.icon} Router active
                </span>
              </div>
              <RouterPanel key={selected} type={selected} />
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                Router intelligence
              </p>
              <h3 className="mt-3 text-2xl font-black text-white">{selected}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {info.description}
              </p>
              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-500">Navigation behavior</p>
                <code className="mt-2 block break-words text-sm text-cyan-200">
                  {info.example}
                </code>
              </div>
              <h4 className="mt-6 font-bold text-white">Best used for</h4>
              <ul className="mt-3 space-y-3">
                {info.uses.map((use) => (
                  <li key={use} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-300">✓</span>
                    {use}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-black text-white">The difference, at a glance</h2>
          <p className="mt-2 text-sm text-slate-400">
            Three approaches, three different navigation requirements.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-white/[0.05] text-slate-300">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">HashRouter</th>
                  <th className="p-4">MemoryRouter</th>
                  <th className="p-4">StaticRouter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-400">
                {[
                  ['Stores location', 'URL hash', 'In memory', 'Supplied location'],
                  ['Changes address bar', 'Yes', 'No', 'No'],
                  ['Interactive navigation', 'Yes', 'Yes', 'No'],
                  ['Typical use', 'Static hosting', 'Tests / embedded UI', 'Server rendering'],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td
                        key={cell}
                        className={`p-4 ${index === 0 ? 'font-semibold text-white' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="border-t border-white/10 py-6 text-center">
          <p className="font-bold text-slate-300">
            RouterVerse <span className="text-violet-400">©</span> React Practical 03
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Built for learning · Explore. Navigate. Understand.
          </p>
        </footer>
      </div>
    </main>
  )
}

export default App
