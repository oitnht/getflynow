import { TaskList } from './components/TaskList.js';
import { TaskForm } from './components/TaskForm.js';
import { TaskFilter } from './components/TaskFilter.js';
import { TaskService } from './services/taskService.js';
import { AuthService } from './services/authService.js';

class TaskMasterApp {
    constructor() {
        this.taskService = new TaskService();
        this.authService = new AuthService();
        this.taskList = null;
        this.taskForm = null;
        this.taskFilter = null;
        this.currentFilter = 'all';
        
        this.init();
    }

    async init() {
        // Initialize Feather Icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Initialize authentication
        this.authService.init((user) => {
            this.handleAuthStateChange(user);
        });

        // Initialize components
        this.initializeComponents();
        
        // Bind events
        this.bindEvents();
        
        // Initial load
        await this.loadTasks();
        this.updateStatistics();
    }

    initializeComponents() {
        // Initialize Task Form
        const taskFormContainer = document.getElementById('task-form-container');
        this.taskForm = new TaskForm(taskFormContainer, (taskData) => {
            this.handleTaskSubmit(taskData);
        });

        // Initialize Task Filter
        const taskFilterContainer = document.getElementById('task-filter-container');
        this.taskFilter = new TaskFilter(taskFilterContainer, (filter) => {
            this.handleFilterChange(filter);
        });

        // Initialize Task List
        const taskListContainer = document.getElementById('task-list-container');
        this.taskList = new TaskList(taskListContainer, {
            onEdit: (task) => this.handleTaskEdit(task),
            onDelete: (taskId) => this.handleTaskDelete(taskId),
            onToggleComplete: (taskId) => this.handleTaskToggleComplete(taskId),
            onUpdateStatus: (taskId, status) => this.handleTaskUpdateStatus(taskId, status)
        });
    }

    bindEvents() {
        // Auth events
        document.getElementById('login-btn')?.addEventListener('click', () => {
            this.authService.login();
        });

        document.getElementById('signup-btn')?.addEventListener('click', () => {
            this.authService.signup();
        });

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.authService.logout();
        });
    }

    handleAuthStateChange(user) {
        const authSection = document.getElementById('auth-section');
        const userSection = document.getElementById('user-section');
        const authRequired = document.getElementById('auth-required');
        const appContent = document.getElementById('app-content');

        if (user) {
            // User is logged in
            authSection.classList.add('d-none');
            userSection.classList.remove('d-none');
            authRequired.classList.add('d-none');
            appContent.classList.remove('d-none');
            
            document.getElementById('user-email').textContent = user.email;
            
            // Load user's tasks
            this.loadTasks();
        } else {
            // User is not logged in
            authSection.classList.remove('d-none');
            userSection.classList.add('d-none');
            authRequired.classList.remove('d-none');
            appContent.classList.add('d-none');
        }
    }

    async loadTasks() {
        try {
            this.showLoading(true);
            const tasks = await this.taskService.getTasks();
            this.displayTasks(tasks);
            this.updateStatistics();
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Failed to load tasks. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    displayTasks(tasks) {
        let filteredTasks = tasks;
        
        // Apply current filter
        if (this.currentFilter !== 'all') {
            filteredTasks = tasks.filter(task => {
                switch (this.currentFilter) {
                    case 'completed':
                        return task.completed;
                    case 'pending':
                        return !task.completed && task.status === 'pending';
                    case 'in-progress':
                        return !task.completed && task.status === 'in-progress';
                    default:
                        return true;
                }
            });
        }

        this.taskList.render(filteredTasks);
    }

    updateStatistics() {
        const tasks = this.taskService.getAllTasks();
        
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const progressTasks = tasks.filter(task => !task.completed && task.status === 'in-progress').length;
        const pendingTasks = tasks.filter(task => !task.completed && task.status === 'pending').length;

        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        document.getElementById('progress-tasks').textContent = progressTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
    }

    async handleTaskSubmit(taskData) {
        try {
            if (taskData.id) {
                await this.taskService.updateTask(taskData.id, taskData);
            } else {
                await this.taskService.createTask(taskData);
            }
            
            this.taskForm.reset();
            await this.loadTasks();
            this.showSuccess(taskData.id ? 'Task updated successfully!' : 'Task created successfully!');
        } catch (error) {
            console.error('Error saving task:', error);
            this.showError('Failed to save task. Please try again.');
        }
    }

    handleTaskEdit(task) {
        this.taskForm.loadTask(task);
        // Scroll to form
        document.getElementById('task-form-container').scrollIntoView({ behavior: 'smooth' });
    }

    async handleTaskDelete(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await this.taskService.deleteTask(taskId);
                await this.loadTasks();
                this.showSuccess('Task deleted successfully!');
            } catch (error) {
                console.error('Error deleting task:', error);
                this.showError('Failed to delete task. Please try again.');
            }
        }
    }

    async handleTaskToggleComplete(taskId) {
        try {
            const task = this.taskService.getAllTasks().find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                task.completedAt = task.completed ? new Date().toISOString() : null;
                await this.taskService.updateTask(taskId, task);
                await this.loadTasks();
            }
        } catch (error) {
            console.error('Error updating task:', error);
            this.showError('Failed to update task. Please try again.');
        }
    }

    async handleTaskUpdateStatus(taskId, status) {
        try {
            const task = this.taskService.getAllTasks().find(t => t.id === taskId);
            if (task) {
                task.status = status;
                await this.taskService.updateTask(taskId, task);
                await this.loadTasks();
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            this.showError('Failed to update task status. Please try again.');
        }
    }

    handleFilterChange(filter) {
        this.currentFilter = filter;
        const tasks = this.taskService.getAllTasks();
        this.displayTasks(tasks);
    }

    showLoading(show) {
        const spinner = document.getElementById('loading-spinner');
        if (show) {
            spinner.classList.remove('d-none');
        } else {
            spinner.classList.add('d-none');
        }
    }

    showSuccess(message) {
        this.showAlert(message, 'success');
    }

    showError(message) {
        this.showAlert(message, 'danger');
    }

    showAlert(message, type) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        const container = document.querySelector('.container');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = alertHtml;
        container.insertBefore(tempDiv.firstElementChild, container.firstElementChild);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const alert = container.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskMasterApp();
});
