import { AlertTriangle, CheckCircle2, Clock3, ListChecks } from 'lucide-react';

const statConfig = [
  { key: 'total', label: 'Total', icon: ListChecks, accent: 'text-sky-600 dark:text-sky-300' },
  { key: 'pending', label: 'Pending', icon: Clock3, accent: 'text-amber-600 dark:text-amber-300' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, accent: 'text-emerald-600 dark:text-emerald-300' },
  { key: 'highPriority', label: 'High priority', icon: AlertTriangle, accent: 'text-rose-600 dark:text-rose-300' }
];

const TaskStats = ({ stats }) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {statConfig.map(({ key, label, icon: Icon, accent }) => (
      <div key={key} className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">{stats?.[key] ?? 0}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/80 shadow-sm dark:bg-white/10">
            <Icon className={`h-5 w-5 ${accent}`} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TaskStats;
