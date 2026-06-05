const SkeletonCard = ({ view = 'grid' }) => (
  <div
    className={`glass-card rounded-lg p-5 ${view === 'list' ? 'min-h-[150px]' : 'min-h-[230px]'} animate-pulse`}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
      <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-white/10" />
    </div>
    <div className="mt-5 space-y-3">
      <div className="h-3 w-full rounded bg-slate-200 dark:bg-white/10" />
      <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
      <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
    </div>
    <div className="mt-8 flex items-center justify-between">
      <div className="h-4 w-28 rounded bg-slate-200 dark:bg-white/10" />
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
