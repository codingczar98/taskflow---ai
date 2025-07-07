/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Project action for the app
 */

/**
 * Node modules
 */
import { redirect } from 'react-router';

/**
 * Custom modules
 */
import { databases } from '@/lib/appWrite';
import { generateID, getUserId } from '@/lib/utils';
import { generateProjectTasks } from '@/api/googleAi';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;


/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import type { ProjectForm, Project } from '@/types';
import { Models } from 'appwrite';

type aiGenTask = {
    content: string;
    due_date: Date | null;
}

const createProject = async (data: ProjectForm) => {
    let project: Models.Document | null = null;
    const aiTaskGen = data.ai_task_gen;
    const taskGenPrompt = data.task_gen_prompt;

    let aiGeneratedTasks: aiGenTask[] = [];

    try {
        project = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            'projects',
            generateID(),
            {
                name: data.name,
                color_name: data.color_name,
                color_hex: data.color_hex,
                userId: getUserId(),
            }
        )
    } catch (error) {
        console.error('Error creating project:', error);
    }

    /**
     * Generate tasks using AI
     * If AI task generation is enabled
     */
    if (aiTaskGen) {
        try {
            aiGeneratedTasks = JSON.parse(await generateProjectTasks(taskGenPrompt) || '');
            console.log(aiGeneratedTasks);
        } catch (error) {
            console.error('Error generating tasks:', error);
        }
    }

    /**
     * Create tasks for the project
     * If AI task generation is enabled, use the generated tasks
     */
    if (aiGeneratedTasks.length) {
        const promises = aiGeneratedTasks.map((task) => {
            return databases.createDocument(
                APPWRITE_DATABASE_ID,
                'tasks',
                generateID(),
                {
                    ...task,
                    project: project?.$id,
                    userId: getUserId(),
                }
            )
        });

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error creating project tasks:', error);
        }
    }


    return redirect(`/app/projects/${project?.$id}`,);

}
const updateProject = async (data: ProjectForm) => {
    const documentId = data.id;

    if (!documentId)
        throw new Error('Project id not found');

    try {
        return await databases.updateDocument(
            APPWRITE_DATABASE_ID,
            'projects',
            documentId,
            {
                name: data.name,
                color_name: data.color_name,
                color_hex: data.color_hex,
            }
        );

    } catch (error) {
        console.error('Error updating project:', error);
    }
}
const deleteProject = async (data: Project) => {
    const documentId = data.id;

    if (!documentId)
        throw new Error('No project found with this ID');

    try {
        await databases.deleteDocument(
            APPWRITE_DATABASE_ID,
            'projects',
            documentId
        );
    } catch (error) {
        console.error('Error deleting project:', error);
    }

}


const projectAction: ActionFunction = async ({ request }) => {
    const method = request.method;
    const data = await request.json() as ProjectForm;

    if (method === 'POST' || method === 'PUT') {
        return await createProject(data);
    }

    if (method === 'PUT') {
        return await updateProject(data);
    }

    if (method === 'DELETE') {
        return await deleteProject(data);
    }

    throw new Error('Invalid method');
}

export default projectAction;