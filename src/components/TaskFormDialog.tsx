/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Task form dialog for the app
 */

/**
 * Node modules
 */
import { useEffect, useState } from 'react';
import { useLocation, useFetcher } from 'react-router';
import { startOfToday } from 'date-fns';

/**
 * Components
 */
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '@/components/TaskForm';

/**
 * Types
 */
import type { PropsWithChildren } from 'react';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  /**
   * Hooks
   */
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  /**
   * Effects
   */
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        const target = event.target as HTMLElement;
        if (target.localName === ' textarea') return;
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0 !rounded-xl'>
        <TaskForm
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            project: null,
          }}
          mode='create'
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'POST',
              encType: 'application/json',
            });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
