import { Grid2X2, List, Plus, Search } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { cn } from '../../utils/cn';

const viewButtons = [
  { value: 'grid', icon: Grid2X2, label: 'Grid view' },
  { value: 'list', icon: List, label: 'List view' }
];

const TaskFilters = ({ filters, onAddTask, onFilterChange, onViewChange, view }) => (
  <div className="glass-panel rounded-lg p-4">
    <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_160px_160px_190px_auto_auto]">
      <Input
        aria-label="Search tasks"
        icon={Search}
        placeholder="Search tasks"
        value={filters.search}
        onChange={(event) => onFilterChange('search', event.target.value)}
      />
      <select
        className="select-field"
        aria-label="Filter by status"
        value={filters.status}
        onChange={(event) => onFilterChange('status', event.target.value)}
      >
        <option value="all">All status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select
        className="select-field"
        aria-label="Filter by priority"
        value={filters.priority}
        onChange={(event) => onFilterChange('priority', event.target.value)}
      >
        <option value="all">All priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        className="select-field"
        aria-label="Sort tasks"
        value={filters.sort}
        onChange={(event) => onFilterChange('sort', event.target.value)}
      >
        <option value="createdAt:desc">Newest first</option>
        <option value="createdAt:asc">Oldest first</option>
        <option value="updatedAt:desc">Recently updated</option>
        <option value="title:asc">Title A to Z</option>
        <option value="priority:desc">Priority high first</option>
      </select>
      <div className="flex h-11 items-center rounded-lg border border-slate-200/90 bg-white/80 p-1 dark:border-white/10 dark:bg-slate-950/70">
        {viewButtons.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            className={cn(
              'flex h-9 w-10 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
              view === value && 'bg-slate-950 text-white shadow-sm hover:text-white dark:bg-white dark:text-slate-950 dark:hover:text-slate-950'
            )}
            onClick={() => onViewChange(value)}
            aria-label={label}
            title={label}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <Button icon={Plus} onClick={onAddTask} className="w-full whitespace-nowrap">
        Add task
      </Button>
    </div>
  </div>
);

export default TaskFilters;
