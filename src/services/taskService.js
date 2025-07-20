import { StorageService } from '../utils/storage.js';

export class TaskService {
    constructor() {
        this.storage = new StorageService();
        this.tasks = [];
        this.loadTasks();
    }

    async loadTasks() {
        try {
            const storedTasks = this.storage.get('tasks') || [];
            this.tasks = storedTasks;
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = [];
        }
    }

    async saveTasks() {
        try {
            this.storage.set('tasks', this.tasks);
        } catch (error) {
            console.error('Error saving tasks:', error);
            throw new Error('Failed to save tasks');
        }
    }

    async getTasks() {
        await this.loadTasks();
        return [...this.tasks];
    }

    getAllTasks() {
        return [...this.tasks];
    }

    async createTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'medium',
            status: taskData.status || 'pending',
            category: taskData.category || '',
            dueDate: taskData.dueDate || null,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(task);
        await this.saveTasks();
        return task;
    }

    async updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }

        const existingTask = this.tasks[taskIndex];
        const updatedTask = {
            ...existingTask,
            ...updates,
            id: taskId, // Ensure ID doesn't change
            createdAt: existingTask.createdAt, // Preserve creation date
            updatedAt: new Date().toISOString()
        };

        this.tasks[taskIndex] = updatedTask;
        await this.saveTasks();
        return updatedTask;
    }

    async deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }

        this.tasks.splice(taskIndex, 1);
        await this.saveTasks();
        return true;
    }

    async getTask(taskId) {
        await this.loadTasks();
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return { ...task };
    }

    async toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        task.updatedAt = new Date().toISOString();

        await this.saveTasks();
        return task;
    }

    async updateTaskStatus(taskId, status) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.status = status;
        task.updatedAt = new Date().toISOString();

        await this.saveTasks();
        return task;
    }

    async searchTasks(query) {
        await this.loadTasks();
        const lowerQuery = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(lowerQuery) ||
            task.description.toLowerCase().includes(lowerQuery) ||
            (task.category && task.category.toLowerCase().includes(lowerQuery))
        );
    }

    async getTasksByCategory(category) {
        await this.loadTasks();
        return this.tasks.filter(task => 
            task.category && task.category.toLowerCase() === category.toLowerCase()
        );
    }

    async getTasksByStatus(status) {
        await this.loadTasks();
        if (status === 'completed') {
            return this.tasks.filter(task => task.completed);
        }
        return this.tasks.filter(task => !task.completed && task.status === status);
    }

    async getTasksByPriority(priority) {
        await this.loadTasks();
        return this.tasks.filter(task => task.priority === priority);
    }

    async getOverdueTasks() {
        await this.loadTasks();
        const now = new Date();
        return this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate < now;
        });
    }

    async getTasksDueToday() {
        await this.loadTasks();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < tomorrow;
        });
    }

    async getTaskStatistics() {
        await this.loadTasks();
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = this.tasks.filter(task => !task.completed && task.status === 'pending').length;
        const inProgress = this.tasks.filter(task => !task.completed && task.status === 'in-progress').length;
        const overdue = await this.getOverdueTasks();

        return {
            total,
            completed,
            pending,
            inProgress,
            overdue: overdue.length,
            completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
        };
    }

    async getAllCategories() {
        await this.loadTasks();
        const categories = new Set();
        this.tasks.forEach(task => {
            if (task.category) {
                categories.add(task.category);
            }
        });
        return Array.from(categories).sort();
    }

    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    // Utility method to sort tasks
    sortTasks(tasks, sortBy) {
        const [field, direction] = sortBy.split('-');
        const isAsc = direction === 'asc';

        return tasks.sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            // Handle different data types
            if (field === 'dueDate') {
                valueA = valueA ? new Date(valueA) : new Date('9999-12-31');
                valueB = valueB ? new Date(valueB) : new Date('9999-12-31');
            } else if (field === 'priority') {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                valueA = priorityOrder[valueA] || 0;
                valueB = priorityOrder[valueB] || 0;
            } else if (field === 'createdAt' || field === 'updatedAt') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
            } else if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return isAsc ? -1 : 1;
            if (valueA > valueB) return isAsc ? 1 : -1;
            return 0;
        });
    }

    // Utility method to filter tasks
    filterTasks(tasks, filters) {
        let filtered = [...tasks];

        // Filter by status
        if (filters.status && filters.status !== 'all') {
            if (filters.status === 'completed') {
                filtered = filtered.filter(task => task.completed);
            } else {
                filtered = filtered.filter(task => !task.completed && task.status === filters.status);
            }
        }

        // Filter by search query
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                (task.category && task.category.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (filters.category) {
            const category = filters.category.toLowerCase();
            filtered = filtered.filter(task =>
                task.category && task.category.toLowerCase().includes(category)
            );
        }

        return filtered;
    }
}
