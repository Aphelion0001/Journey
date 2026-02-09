import { useState } from 'react';
import type { FormEvent } from 'react';
import circuitLogo from './assets/circuit.svg';
import saveTimeLogo from './assets/savetime.svg';

type DailyUpdate = {
  day: string;
  revenue: string;
  signUps: number;
  workDone: string;
  status: 'done' | 'current' | 'future';
};

type ProductProgress = {
  name: string;
  logo: string;
  tagline: string;
  website: string;
  updates: DailyUpdate[];
};

const dailyProgress: ProductProgress[] = [
  {
    name: 'Circuit',
    logo: circuitLogo,
    tagline: 'Educational platform where people learn by experimenting',
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
    logo: saveTimeLogo,
    tagline: 'Analyze thousands of comments in seconds',
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
      <div className="border-b border-white/20 pb-3">
        <div className="flex items-center gap-3">
          <img src={product.logo} alt="" className="h-7 w-7" />
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <a
            href={product.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 transition hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:text-emerald-300"
          >
            <span>Visit Website</span>
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" />
            </svg>
          </a>
        </div>
        <p className="mt-1 text-sm text-slate-300">{product.tagline}</p>
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

      <ul className="mt-4 space-y-0">
        {product.updates.map((item, index) => {
          const isLast = index === product.updates.length - 1;
          const isFuture = item.status === 'future';
          const isCurrent = item.status === 'current';
          const isDone = item.status === 'done';

          const dotClass = isDone || isCurrent ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-800 border-slate-700';
          const lineClass = isDone ? 'bg-emerald-500' : 'bg-white/10';

          return (
            <li
              key={`${product.name}-${item.day}`}
              className={`group relative cursor-pointer pl-8 pb-6 transition ${isFuture ? 'opacity-45' : 'opacity-100'}`}
            >
              <span
                className={`absolute left-0 top-0 h-4 w-4 rounded-full border-2 ${dotClass}`}
              />
              {!isLast && <span className={`absolute left-[7px] top-4 h-[calc(100%+0.5rem)] w-[2px] ${lineClass}`} />}

              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-400 -mt-0.5">{item.day}</p>
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

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="border-b border-white/20 pb-4">
          <h1 className="text-xl font-black leading-tight sm:text-2xl text-white">
            Hello, I am Parthib<span className="animate-wave ml-1">👋</span>
            <br />
            <span className="text-slate-400 inline-block mt-1">
              Currently building my own startup <span className="text-emerald-400">#buildinpublic</span>
            </span>
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <a href="#" className="social-icon group relative" aria-label="GitHub">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                GitHub
              </span>
            </a>
            <a href="#" className="social-icon group relative" aria-label="X">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                X (Twitter)
              </span>
            </a>
            <a href="#" className="social-icon group relative" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                LinkedIn
              </span>
            </a>
            <a href="#" className="social-icon group relative" aria-label="Reddit">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Reddit
              </span>
            </a>
            <a href="#" className="social-icon group relative" aria-label="Product Hunt">
               <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.52 12.1h-2.1v3.71h-1.84V8.2h4.24c2.12 0 3.42 1.45 3.42 2.95s-1.3 2.95-3.42 2.95zm-.04-2.02h-2.06v2.03h2.06c.75 0 1.31-.4 1.31-1.01s-.56-1.02-1.31-1.02z" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Product Hunt
              </span>
            </a>
          </div>
        </header>

        <section className="mt-6">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
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
