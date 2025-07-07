import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Utility functions for the app
 */

/**
 * Node modules
 */
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns"
import { redirect } from "react-router"

/**
 * Capitalize the first letter of a string
 */
export function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Formate a date string to a custom formate
 * (e.g. 'Today', 'Tomorrow', 'Yesterday' , "dd MMM", "dd MM YYYY").
 */

// export function formatCustomDate(date: string | number | Date) {

//   const today = new Date();

//   //get the relative date string
//   const relativeDay = toTitleCase(formatRelative(date, today).split('at')[0]);
//   console.log(relativeDay);

//   //List of relative keywords to check
//   const relativeDays = ["Today", "Tomorrow", "Yesterday",
//     " aturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   //Return the relative day if it matches
//   if (relativeDays.includes(relativeDay)) {
//     return relativeDay;
//   }
//   return new Date(date).toDateString();
// }

export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  try {
    // Get the relative date string
    const relativeDay = toTitleCase(formatRelative(new Date(date), today).split(' at')[0]);

    // List of relative keywords to check
    const relativeDays = [
      "Today", "Tomorrow", "Yesterday",
      "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ];

    // Return the relative day if it matches
    if (relativeDays.includes(relativeDay)) {
      return relativeDay;
    }

    if (isSameYear(date, today)) {
      // If the date is in the current year, format as "dd MMM"
      return format(new Date(date), "dd MMM");
    } else {
      // If the date is not in the current year, format as "dd MMM yyyy"
      return format(new Date(date), "dd MMM yyyy");
    }

    // Fallback to formatted date string
    return format(new Date(date), "dd MMM yyyy");
  }
  catch (error) {
    console.error("Invalid date provided:", date, error);
    return "Invalid Date";
  }
}

/**
 * Return a color class based on the due date of a task
 */
export function getTaskDueDateColorClass(dueDate: Date | null,
  completed: boolean): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return "text-red-500 dark:text-red-400";
  }

  if (isToday(dueDate)) {
    return "text-green-500 dark:text-green-400";
  }
  if (isTomorrow(dueDate) && !completed) {
    return "text-yellow-500 dark:text-orange-400";
  }

}


/**
 * generate a unique Id by combining the current timestamp and a random number.
 * this function creates an identifier using the current time in milliseconds
 * (converted to a base 36 string) concatenated with a random number.
 * also converted to a base 36 string and sliced to remove unnecessary characters.
 * 
 * @returns {string} A unique identifier string.
 */
export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

/**
 * Redirect the user  to the auth Sync page if the user ID is not found in the local storage or 
 * return the user ID from the local storage.
 */
export function getUserId(): string {
  const clerkUserId = localStorage.getItem("clerkUserId");
  if (!clerkUserId) {
    redirect("/auth/sync");
    return '';
  }
  return clerkUserId;
}

/**
 * Truncates a string to a specified length and appends an ellipsis.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return `${str.slice(0, maxLength - 1)}...`;
  }
  return str;
}