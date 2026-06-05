import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ label, error, icon: Icon, rightElement, className, ...props }, ref) => (
  <label className="block">
    {label ? <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span> : null}
    <span className="relative block">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      ) : null}
      <input
        ref={ref}
        className={cn(Icon ? 'pl-9' : '', rightElement ? 'pr-11' : '', 'field', className)}
        {...props}
      />
      {rightElement ? <span className="absolute right-1 top-1/2 -translate-y-1/2">{rightElement}</span> : null}
    </span>
    {error ? <span className="mt-1.5 block text-xs font-medium text-rose-600 dark:text-rose-300">{error}</span> : null}
  </label>
));

Input.displayName = 'Input';

export default Input;
