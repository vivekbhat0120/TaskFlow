import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { cn } from '../../utils/cn';
import { formatDate } from '../../utils/formatDate';

const TaskCard = ({ onDelete, onEdit, onToggleStatus, task, view = 'grid' }) => {
  const completed = task.status === 'completed';

  return (
    <article
      className={cn(
        'glass-card group rounded-lg p-5 hover:-translate-y-1',
        view === 'list' && 'grid gap-4 md:grid-cols-[1fr_auto] md:items-center'
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3
            className={cn(
              'break-words text-lg font-bold text-slate-950 dark:text-white',
              completed && 'text-slate-500 line-through decoration-2 dark:text-slate-400'
            )}
          >
            {task.title}
          </h3>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Badge value={task.status} />
            <Badge value={task.priority} />
          </div>
        </div>
        <p className="mt-3 line-clamp-3 min-h-[4.5rem] break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
          {task.description || 'No description added.'}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
          Created {formatDate(task.createdAt)}
        </p>
      </div>

      <div className={cn('mt-5 flex items-center gap-2', view === 'list' && 'mt-0 justify-end')}>
        <button
          type="button"
          className="icon-button"
          onClick={() => onToggleStatus(task)}
          aria-label={completed ? 'Mark pending' : 'Mark completed'}
          title={completed ? 'Mark pending' : 'Mark completed'}
        >
          {completed ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4" />}
        </button>
        <button type="button" className="icon-button" onClick={() => onEdit(task)} aria-label="Edit task" title="Edit task">
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="icon-button hover:text-rose-600 dark:hover:text-rose-300"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
