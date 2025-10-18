import { writable } from 'svelte/store';

export const currentFile = writable<string | null>(null);
export const openFiles = writable<string[]>([]);
export const fileContents = writable<Map<string, string>>(new Map());
export const currentDirectory = writable<string>('');
