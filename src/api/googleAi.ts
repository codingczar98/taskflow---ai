/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Google AI api.
 */

/**
 * Custom modules
 */
import model from '@/lib/googleAi';

const generateProjectTasks = async (prompt: string) => {
    model.generationConfig = {
        responseMimeType: 'application/json'
    }
    try {
        const result = await model.generateContent(`
            Generate and return a list of tasks based on the provided
            prompt and the given JSON schema.

            Prompt: ${prompt}   

            Task Schema:
            {
            content: string; // Description of the task
            due_date: Date | null; // Due date of the task, can be null if no due date is provided
            }

            Requirements:
            1. Ensure tasks align with the provided prompt.
            2. Set the 'due_date' relative to today's date: ${new Date()}.
            3. Return an array of tasks matching the schema.

            Output: Array<Task>
    `);
        return result.response.text();
    }
    catch (err) {
        console.log('Error generating tasks:', err)
    }
}

export { generateProjectTasks }