/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Loader function for upcoming tasks
 */

/**
 * Node modules
 */
import { databases, Query } from '@/lib/appwrite';
import { startOfToday } from 'date-fns';

/**
 Custom modules
 */
import { getUserId } from '@/lib/utils';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID

const getTasks = async () => {
    try {
        return await databases.listDocuments(APPWRITE_DATABASE_ID, 'tasks',
            [
                Query.equal('completed', false), //get only uncompleted tasks
                Query.isNotNull('due_date'), //get tasks with due_dates
                Query.greaterThanEqual('due_date', startOfToday().
                    toISOString()), //get tasks due today or later
                Query.orderAsc('due_date'), //order by due_date ascending
                Query.equal('userId', getUserId()), //get only tasks for the logged in user
            ]
        )

    } catch (error) {
        console.log(error);
        throw new Error('Error getting upcoming tasks');
    }
}

const upcomingTaskLoader: LoaderFunction = async () => {
    const tasks = await getTasks();
    // console.log(tasks);
    return { tasks };
}

export default upcomingTaskLoader;
