/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Loader function for completed tasks
 */

/**
 * Node modules
 */
import { databases, Query } from '@/lib/appwrite';

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
                Query.equal('completed', true), //get only completed tasks
                Query.orderDesc('$updatedAt'), //order by updatedAt descending
                Query.equal('userId', getUserId()), //get only tasks for the logged in user
            ]
        )

    } catch (error) {
        console.log(error);
        throw new Error('Error getting completed tasks');
    }
}

const completedTaskLoader: LoaderFunction = async () => {
    const tasks = await getTasks();
    // console.log(tasks);
    return { tasks };
}

export default completedTaskLoader;
