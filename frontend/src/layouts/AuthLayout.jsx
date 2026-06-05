import brandMark from '../assets/brand-mark.svg';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout = ({ children }) => (
  <main className="flex min-h-screen items-center justify-center px-4 py-8">
    <div className="grid w-full max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="glass-panel hidden min-h-[620px] rounded-lg p-8 lg:flex lg:flex-col lg:justify-around">
        <div className="flex items-center gap-3">
          <img src={brandMark} alt="TaskFlow" className="h-12 w-12 rounded-lg shadow-soft" />
          <div>
            <p className="text-xl font-extrabold text-slate-950 dark:text-white">TaskFlow</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Work dashboard</p>
          </div>
        </div>
        <div>
          <p className="max-w-md text-5xl font-extrabold leading-tight text-slate-950 dark:text-white">
            Organize the work that matters today.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {['Plan', 'Focus', 'Finish'].map((item) => (
              <div key={item} className="rounded-lg border border-white/70 bg-white/70 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/10">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel min-h-[620px] rounded-lg p-5 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={brandMark} alt="TaskFlow" className="h-11 w-11 rounded-lg shadow-soft lg:hidden" />
            <div>
              <p className="text-lg font-extrabold text-slate-950 dark:text-white">TaskFlow</p>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Task management</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex min-h-[475px] w-full max-w-md flex-col justify-center">{children}</div>
      </section>
    </div>
  </main>
);

export default AuthLayout;
