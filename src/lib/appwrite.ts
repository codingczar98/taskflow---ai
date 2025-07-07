/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Appwrite module for the app
 */

/**
 * Node modules
 */
import { Client, Databases, ID, Query } from 'appwrite';

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);

export { databases, ID, Query };