import { useState } from 'react';
import type { FormEvent } from 'react';

type DailyUpdate = {
  day: string;
  revenue: string;
  signUps: number;
  workDone: string;
  status: 'done' | 'current' | 'future';
};

type ProductProgress = {
  name: string;
  tagline: string;
  dotClass: string;
  lineClass: string;
  website: string;
  updates: DailyUpdate[];
};

const dailyProgress: ProductProgress[] = [
  {
    name: 'Circuit',
    tagline: 'Educational platform where people learn by experimenting',
    dotClass: 'bg-emerald-300',
    lineClass: 'bg-emerald-300/45',
    website: '#',
    updates: [
      {
        day: 'Day 1',
        revenue: '$0',
        signUps: 18,
        workDone: 'Defined experiment flow and mapped lesson structure.',
        status: 'done',
      },
      {
        day: 'Day 2',
        revenue: '$49',
        signUps: 34,
        workDone: 'Built interactive challenge UI and baseline progress tracking.',
        status: 'done',
      },
      {
        day: 'Day 3',
        revenue: '$79',
        signUps: 46,
        workDone: 'Added guided hints with instant feedback loops.',
        status: 'done',
      },
      {
        day: 'Day 4',
        revenue: '$109',
        signUps: 51,
        workDone: 'Refining mobile interactions for the lab canvas.',
        status: 'current',
      },
      {
        day: 'Day 5',
        revenue: 'TBD',
        signUps: 0,
        workDone: 'Preparing first cohort rollout from waitlist users.',
        status: 'future',
      },
    ],
  },
  {
    name: 'SaveTime',
    tagline: 'Analyze thousands of comments in seconds',
    dotClass: 'bg-lime-300',
    lineClass: 'bg-lime-300/45',
    website: '#',
    updates: [
      {
        day: 'Day 1',
        revenue: '$0',
        signUps: 12,
        workDone: 'Built ingestion pipeline for large comment datasets.',
        status: 'done',
      },
      {
        day: 'Day 2',
        revenue: '$29',
        signUps: 26,
        workDone: 'Implemented clustering for repeated user pain points.',
        status: 'done',
      },
      {
        day: 'Day 3',
        revenue: '$59',
        signUps: 38,
        workDone: 'Added sentiment scoring with confidence signals.',
        status: 'done',
      },
      {
        day: 'Day 4',
        revenue: '$99',
        signUps: 44,
        workDone: 'Optimizing summary generation speed for heavy files.',
        status: 'current',
      },
      {
        day: 'Day 5',
        revenue: 'TBD',
        signUps: 0,
        workDone: 'Designing insights dashboard for action-ready outputs.',
        status: 'future',
      },
    ],
  },
];

function ProductTimeline({ product }: { product: ProductProgress }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section className="relative">
      <div className="flex items-end justify-between border-b border-white/20 pb-3">
        <div>
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{product.tagline}</p>
        </div>
        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:text-white"
        >
          Visit Website
        </a>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={`Join ${product.name} waitlist`}
          className="h-10 w-full rounded-lg border border-white/25 bg-white/10 px-3 text-sm text-white placeholder:text-slate-300/70 outline-none transition focus:border-white/60"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg border border-white/35 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.11em] text-white transition hover:bg-white/20"
        >
          Join Waitlist
        </button>
      </form>
      {submitted && <p className="mt-2 text-xs font-medium text-green-300">Added to waitlist.</p>}

      <ul className="mt-5 space-y-5">
        {product.updates.map((item, index) => {
          const isLast = index === product.updates.length - 1;
          const isFuture = item.status === 'future';
          const isCurrent = item.status === 'current';

          return (
            <li
              key={`${product.name}-${item.day}`}
              className={`group relative cursor-pointer pl-8 transition ${isFuture ? 'opacity-45' : 'opacity-100'}`}
            >
              <span
                className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border border-white/70 ${
                  isFuture ? 'bg-slate-700' : product.dotClass
                }`}
              />
              {!isLast && <span className={`absolute left-[7px] top-6 h-[calc(100%+0.55rem)] w-px ${product.lineClass}`} />}

              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">{item.day}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <p className="text-slate-100">
                  Revenue: <span className="font-semibold">{item.revenue}</span>
                </p>
                <p className="text-slate-100">
                  Sign ups: <span className="font-semibold">{item.signUps}</span>
                </p>
                {isCurrent && <span className="text-xs font-semibold uppercase tracking-[0.11em] text-green-200">Today</span>}
              </div>

              <div className="mt-2 max-h-0 overflow-hidden rounded-md border border-white/10 bg-white/5 p-0 text-xs leading-relaxed text-slate-200 opacity-0 transition-all duration-200 group-hover:max-h-24 group-hover:p-2 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:p-2 group-focus-within:opacity-100">
                {item.workDone}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen text-white">
      <div className="ambient-bg pointer-events-none" aria-hidden="true" />
      <div className="ambient-pattern pointer-events-none" aria-hidden="true" />

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-9 sm:px-6 lg:px-10">
        <header className="border-b border-white/20 pb-5">
          <h1 className="text-xl font-black leading-tight sm:text-3xl">
            Hello, I am Parthib👋
            <br />
            <span className="text-green-200">
              Currently building my own startup #buildinpublic
            </span>
          </h1>

          <div className="mt-3 flex items-center gap-2.5">
            <a href="#" className="social-icon" aria-label="Reddit">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M14.2 15.7c.05-.05.05-.13 0-.18-.35-.35-.92-.54-1.6-.54-.68 0-1.25.2-1.6.54-.05.05-.05.13 0 .18.05.05.13.05.18 0 .3-.3.82-.47 1.42-.47.6 0 1.12.17 1.42.47.05.05.13.05.18 0zM9.6 12.9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm5.8-1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                <path d="M22 12a2.2 2.2 0 0 0-3.75-1.56 8.07 8.07 0 0 0-4.8-1.5l.82-3.85 2.68.57a1.75 1.75 0 1 0 .1-.56l-2.9-.61a.28.28 0 0 0-.33.22l-.9 4.2a8.22 8.22 0 0 0-5.09 1.53A2.2 2.2 0 1 0 5.3 14c0 .2.01.4.05.6.3 2.5 3.12 4.5 6.65 4.5 3.54 0 6.36-2 6.66-4.5.03-.2.04-.4.04-.6A2.2 2.2 0 0 0 22 12zm-10 6.54c-3.22 0-5.82-1.75-5.82-3.92 0-2.17 2.6-3.93 5.82-3.93 3.22 0 5.82 1.76 5.82 3.93 0 2.17-2.6 3.92-5.82 3.92z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="X">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M18.9 2H22l-6.78 7.75L23 22h-6.1l-4.78-6.2L6.7 22H3.6l7.24-8.28L1 2h6.25l4.31 5.66L18.9 2zm-1.07 18h1.69L6.33 3.9H4.52L17.83 20z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20.45 20.45H16.9v-5.56c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.4v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.28 2.38 4.28 5.48v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Product Hunt">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1.52 12.1h-2.1v3.71H9.28V8.2h4.24c2.12 0 3.42 1.45 3.42 2.95s-1.3 2.95-3.42 2.95zm-.04-2.02h-2.06v2.03h2.06c.75 0 1.31-.4 1.31-1.01s-.56-1.02-1.31-1.02z" />
              </svg>
            </a>
          </div>
        </header>

        <section className="mt-8">

          <div className="grid grid-cols-1 gap-9 lg:grid-cols-2 lg:gap-12">
            {dailyProgress.map((product) => (
              <ProductTimeline key={product.name} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
