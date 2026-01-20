export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'POLO - Programming Online Language Organizer';

export const LANGUAGES = [
  // Mandatory languages - most prominent
  { key: 'c', name: 'C', icon: '🔧', priority: 'mandatory' },
  { key: 'cpp', name: 'C++', icon: '⚡', priority: 'mandatory' },
  { key: 'java', name: 'Java', icon: '☕', priority: 'mandatory' },
  // Additional languages
  { key: 'python', name: 'Python', icon: '🐍', priority: 'optional' },
  { key: 'javascript', name: 'JavaScript', icon: '🟨', priority: 'optional' },
  { key: 'csharp', name: 'C#', icon: '💜', priority: 'optional' }
];

export const CATEGORIES = [
  { value: 'programming', label: 'Programming' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'data-structures', label: 'Data Structures' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'databases', label: 'Databases' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'other', label: 'Other' }
];

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'hard', label: 'Hard', color: 'red' }
];

export const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', color: '#0077b5' },
  { key: 'github', label: 'GitHub', color: '#333' },
  { key: 'instagram', label: 'Instagram', color: '#E4405F' },
  { key: 'youtube', label: 'YouTube', color: '#FF0000' },
  { key: 'twitter', label: 'Twitter', color: '#1DA1F2' }
];
