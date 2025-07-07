/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Loader function for the app
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
                Query.equal('userId', getUserId()), //get only tasks for the logged in user
                Query.equal('completed', false), //get only uncompleted tasks
                Query.isNull('project') //get only tasks without project
            ]
        )

    } catch (error) {
        console.log(error);
        throw new Error('Error getting inbox tasks');
    }
}

const inboxTaskLoader: LoaderFunction = async () => {
    const tasks = await getTasks();
    // console.log(tasks);
    return { tasks };
}

export default inboxTaskLoader;
