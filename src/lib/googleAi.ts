/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Google AI module for the app.
 */

/**
 * Node modules
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Environment variables
 */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export default model;