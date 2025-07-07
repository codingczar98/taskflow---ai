/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Task create button component for the app
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';

/**
 * Assets
 */
import { CirclePlus } from 'lucide-react';

/**
 * Types
 */

/**
 * How omit works?
 * Omit is a utility type that removes properties from an object type.
 * it takes two type arguments: the first is the type you want to modify, and the second is the keys you want to remove.
 * it returns a new type with the specified keys removed.
 */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus />
      Add Task
    </Button>
  );
};

export default TaskCreateButton;
