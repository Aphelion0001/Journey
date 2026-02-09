import { useState } from 'react';
import type { FormEvent } from 'react';
import { waitlistTableByProject } from '../constants/waitlist';
import type { ProductProgress } from '../types/app';
import { supabase } from '../utils/supabase';

export function ProductTimeline({ product }: { product: ProductProgress }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      return;
    }

    setStatus('loading');

    try {
      const waitlistTable = waitlistTableByProject[product.logoKey.toLowerCase()] ?? 'Circuit';
      const { error } = await supabase
        .from(waitlistTable)
        .insert({ email: email.trim().toLowerCase() });

      if (error && error.code !== '23505') {
        throw error;
      }

      console.log('Successfully submitted to waitlist');
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Error submitting to waitlist:', err);
      setStatus('error');
    }
  }

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

      {status === 'success' ? (
        <div className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-500/15 px-3 text-sm font-medium text-emerald-200">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M9.55 18L3.85 12.3L5.275 10.875L9.55 15.15L18.725 5.975L20.15 7.4L9.55 18Z" />
          </svg>
          <span>You are on the waitlist.</span>
        </div>
      ) : (
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
            disabled={status === 'loading'}
            className="h-10 shrink-0 cursor-pointer rounded-lg border border-white/35 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.11em] text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs font-medium text-red-300">Could not join waitlist. Please try again.</p>
      )}

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
                  OnWaitlist: <span className="font-semibold">{item.onWaitlist}</span>
                </p>
                {isCurrent && <span className="text-xs font-semibold uppercase tracking-[0.11em] text-green-200">Today</span>}
              </div>

              <div
                className={`mt-2 overflow-hidden rounded-md border border-white/10 bg-white/5 text-xs leading-relaxed text-slate-200 transition-all duration-200 ${
                  isCurrent || isFuture
                    ? 'max-h-64 p-2 opacity-100'
                    : 'max-h-0 p-0 opacity-0 group-hover:max-h-64 group-hover:p-2 group-hover:opacity-100 group-focus-within:max-h-64 group-focus-within:p-2 group-focus-within:opacity-100'
                }`}
              >
                {isFuture && (
                  <span className="mb-2 inline-block rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-300">
                    ToBeDone
                  </span>
                )}
                <ul className="list-disc space-y-1 pl-4">
                  {item.workDone.map((point, pointIndex) => (
                    <li key={`${item.day}-point-${pointIndex}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
