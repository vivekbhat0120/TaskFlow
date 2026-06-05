import { LogOut, Plus, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SkeletonCard from '../components/common/SkeletonCard';
import ThemeToggle from '../components/common/ThemeToggle';
import Pagination from '../components/tasks/Pagination';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskForm from '../components/tasks/TaskForm';
import TaskStats from '../components/tasks/TaskStats';
import { useAuth } from '../context/AuthContext';
import { useDebounce } from '../hooks/useDebounce';
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
  updateTaskStatus
} from '../services/taskService';
import { cn } from '../utils/cn';

const defaultFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  sort: 'createdAt:desc',
  page: 1,
  limit: 9
};

const emptyStats = {
  total: 0,
  pending: 0,
  completed: 0,
  highPriority: 0
};

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState(() => localStorage.getItem('taskflow_view') || 'grid');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(emptyStats);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 9, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    localStorage.setItem('taskflow_view', view);
  }, [view]);

  const queryParams = useMemo(() => {
    const [sortBy, sortOrder] = filters.sort.split(':');
    return {
      search: debouncedSearch,
      status: filters.status,
      priority: filters.priority,
      sortBy,
      sortOrder,
      page: filters.page,
      limit: filters.limit
    };
  }, [debouncedSearch, filters.limit, filters.page, filters.priority, filters.sort, filters.status]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks(queryParams);
      setTasks(data.tasks || []);
      setStats(data.stats || emptyStats);
      setPagination(data.pagination || { total: 0, page: 1, limit: filters.limit, pages: 1 });
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [filters.limit, queryParams]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
      page: key === 'page' ? value : 1
    }));
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, values);
        toast.success('Task updated.');
        await loadTasks();
      } else {
        await createTask(values);
        toast.success('Task created.');
        setFilters((current) => ({ ...current, page: 1 }));
        if (filters.page === 1) {
          await loadTasks();
        }
      }
      closeModal();
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(task._id);
      toast.success('Task deleted.');
      if (tasks.length === 1 && filters.page > 1) {
        updateFilter('page', filters.page - 1);
      } else {
        await loadTasks();
      }
    } catch (requestError) {
      toast.error(requestError.message);
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await updateTaskStatus(task._id, nextStatus);
      toast.success(nextStatus === 'completed' ? 'Task completed.' : 'Task reopened.');
      await loadTasks();
    } catch (requestError) {
      toast.error(requestError.message);
    }
  };

  const hasFilters = Boolean(filters.search || filters.status !== 'all' || filters.priority !== 'all');

  return (
    <div className="space-y-5 animate-fade-in">
      <header className="glass-panel rounded-lg p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">Welcome back</p>
            <h1 className="mt-1 break-words text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
              {user?.name || 'Task manager'}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <Button icon={RefreshCw} variant="secondary" onClick={loadTasks} loading={loading}>
              Refresh
            </Button>
            <Button icon={LogOut} variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <TaskStats stats={stats} />

      <TaskFilters
        filters={filters}
        onAddTask={openCreateModal}
        onFilterChange={updateFilter}
        onViewChange={setView}
        view={view}
      />

      {error ? (
        <div className="glass-card rounded-lg p-5 text-sm font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      <section
        className={cn(
          view === 'grid'
            ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
            : 'flex flex-col gap-4'
        )}
      >
        {loading
          ? Array.from({ length: view === 'grid' ? 6 : 4 }, (_, index) => <SkeletonCard key={index} view={view} />)
          : tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                view={view}
                onDelete={handleDelete}
                onEdit={openEditModal}
                onToggleStatus={handleToggleStatus}
              />
            ))}
      </section>

      {!loading && tasks.length === 0 ? (
        <div className="glass-panel rounded-lg px-5 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white/80 shadow-sm dark:bg-white/10">
            <Plus className="h-6 w-6 text-slate-500 dark:text-slate-300" />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-slate-950 dark:text-white">
            {hasFilters ? 'No matching tasks' : 'No tasks yet'}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
            {hasFilters ? 'Adjust your search or filters to see more results.' : 'Create your first task and keep momentum visible.'}
          </p>
          <Button icon={Plus} onClick={openCreateModal} className="mt-5">
            Add task
          </Button>
        </div>
      ) : null}

      {!loading && tasks.length > 0 ? (
        <div className="flex flex-col items-center justify-between gap-3 py-2 sm:flex-row">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Showing {tasks.length} of {pagination.total} tasks
          </p>
          <Pagination pagination={pagination} onPageChange={(page) => updateFilter('page', page)} />
        </div>
      ) : null}

      <Modal isOpen={modalOpen} onClose={closeModal} title={editingTask ? 'Edit task' : 'Add task'}>
        <TaskForm
          isSubmitting={submitting}
          onCancel={closeModal}
          onSubmit={handleTaskSubmit}
          task={editingTask}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
