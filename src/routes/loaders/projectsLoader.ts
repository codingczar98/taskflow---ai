/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Loader function for the projects page
 */

/**
 * Node Modules
 */
import { databases, Query } from '@/lib/appwrite';

/**
 * Custom modules
 */
import { getUserId } from '@/lib/utils';

/**
 * Environment Variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';

const getProjects = async (query: string) => {

    try {
        return await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            'projects',
            [
                Query.contains('name', query),
                Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
                Query.equal('userId', getUserId()),
                Query.orderDesc('$createdAt'),
            ]
        );
    }
    catch (error) {
        console.error(error);
        throw new Error('Error getting projects');
    }

}

const projectsLoader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    // console.log(query);

    const projects = await getProjects(query);
    console.log(projects);
    return { projects }
}

export default projectsLoader;