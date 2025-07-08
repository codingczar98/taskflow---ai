/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description App action for the app
 */

/**
 * Custom modules
 */
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import type { Task } from '@/types';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createTask = async (data: Task) => {
    try {
        return await databases.createDocument(
            APPWRITE_DATABASE_ID,
            'tasks',
            generateID(),
            {
                ...data, userId: getUserId()
            }
        )
    }
    catch (error) {
        console.error(error);
    }

}

const updateTask = async (data: Task) => {
    const documetId = data.id;

    if (!documetId) throw new Error('Task id not found!');

    delete data.id; // remove id from data to avoid error

    try {
        return await databases.updateDocument(
            APPWRITE_DATABASE_ID,
            'tasks',
            documetId,
            data
        )
    }

    catch (error) {
        console.error(error);
    }

}

const deleteTask = async (data: Task) => {
    const documentId = data.id;

    if (!documentId) throw new Error('Task id not found!');

    try {
        return await databases.deleteDocument(
            APPWRITE_DATABASE_ID,
            'tasks',
            documentId
        )
    }

    catch (error) {
        console. log(error);
    }
}

const appAction: ActionFunction = async ({ request }) => {
    const data = await request.json() as Task;
    if (request.method === 'POST') {
        return await createTask(data);
    }
    if (request.method === 'PUT') {
        return await updateTask(data);
    }
    if (request.method === 'DELETE') {
        return await deleteTask(data);
    }
}

export default appAction;
