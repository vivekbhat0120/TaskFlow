import { cn } from '../../utils/cn';

const styles = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-400/15 dark:text-amber-200 dark:ring-amber-300/20',
  completed: 'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-300/20',
  low: 'bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-400/15 dark:text-sky-200 dark:ring-sky-300/20',
  medium: 'bg-violet-100 text-violet-800 ring-violet-200 dark:bg-violet-400/15 dark:text-violet-200 dark:ring-violet-300/20',
  high: 'bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-400/15 dark:text-rose-200 dark:ring-rose-300/20'
};

const Badge = ({ value, className }) => (
  <span
    className={cn(
      'inline-flex h-7 items-center rounded-full px-2.5 text-xs font-bold capitalize ring-1',
      styles[value] || styles.pending,
      className
    )}
  >
    {value}
  </span>
);

export default Badge;
