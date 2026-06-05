import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="flex min-h-screen items-center justify-center px-4 py-8">
    <section className="glass-panel w-full max-w-lg rounded-lg p-8 text-center">
      <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Page not found</h1>
      <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
        The page you requested is unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
    </section>
  </main>
);

export default NotFoundPage;
