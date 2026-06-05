import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const getVisiblePages = (current, total) => {
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const end = Math.min(total, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ onPageChange, pagination }) => {
  if (!pagination || pagination.pages <= 1) {
    return null;
  }

  const pages = getVisiblePages(pagination.page, pagination.pages);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Task pagination">
      <button
        type="button"
        className="icon-button"
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            'h-10 min-w-10 rounded-lg border px-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-950',
            page === pagination.page
              ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950'
              : 'border-slate-200/80 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="icon-button"
        disabled={pagination.page >= pagination.pages}
        onClick={() => onPageChange(pagination.page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
