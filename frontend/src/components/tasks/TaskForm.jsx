import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../common/Button';
import Input from '../common/Input';

const taskSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters.').max(120, 'Title is too long.'),
  description: z.string().trim().max(1000, 'Description is too long.').optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'completed'])
});

const TaskForm = ({ isSubmitting, onCancel, onSubmit, task }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    }
  });

  useEffect(() => {
    reset({
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'medium',
      status: task?.status || 'pending'
    });
  }, [reset, task]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Title" placeholder="Task title" error={errors.title?.message} {...register('title')} />
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Description</span>
        <textarea className="textarea-field" placeholder="Task details" {...register('description')} />
        {errors.description ? (
          <span className="mt-1.5 block text-xs font-medium text-rose-600 dark:text-rose-300">
            {errors.description.message}
          </span>
        ) : null}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Priority</span>
          <select className="select-field" {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Status</span>
          <select className="select-field" {...register('status')}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {task ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
