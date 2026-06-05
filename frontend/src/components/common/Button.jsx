import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-slate-950 text-white shadow-soft hover:bg-slate-800 focus:ring-slate-300 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-white/20',
  secondary:
    'border border-slate-200/90 bg-white/80 text-slate-700 hover:bg-white focus:ring-sky-100 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-sky-950',
  danger:
    'bg-rose-600 text-white shadow-soft hover:bg-rose-700 focus:ring-rose-100 dark:focus:ring-rose-950',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus:ring-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:focus:ring-white/10'
};

const Button = ({
  children,
  className,
  disabled = false,
  icon: Icon,
  loading = false,
  variant = 'primary',
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    className={cn(
      'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
      variants[variant],
      className
    )}
    {...props}
    disabled={loading || disabled}
  >
    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
    {children}
  </button>
);

export default Button;
