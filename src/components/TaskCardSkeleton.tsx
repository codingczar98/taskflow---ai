/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Task Card Skeleton Component for the app
 */

/**
 * Components
 */
import { Skeleton } from '@/components/ui/skeleton';

const TaskCardSkeleton = () => {
  return (
    <div
      className='grid grid-cols-[max-content,1fr] gap-3 items-center 
    border-b pt-2 pb-3.5'
    >
      <Skeleton className='w-5 h-5 rounded-full' />
      <Skeleton className='h-3 me-10' />
    </div>
  );
};
export default TaskCardSkeleton;
