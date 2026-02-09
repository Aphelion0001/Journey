import { ProductTimeline } from './components/ProductTimeline';
import { SocialIcon } from './components/SocialIcon';
import { dailyProgress } from './constants/products';
import { socialAccounts } from './constants/socials';

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
            {socialAccounts.map((account) => (
              <a
                key={account.key}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group relative"
                aria-label={account.name}
              >
                <SocialIcon accountKey={account.key} />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {account.tooltip}
                </span>
              </a>
            ))}
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
