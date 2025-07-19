export class TaskList {
    constructor(container, callbacks) {
        this.container = container;
        this.callbacks = callbacks;
    }

    render(tasks) {
        if (!tasks || tasks.length === 0) {
            this.renderEmptyState();
            return;
        }

        const tasksHtml = tasks.map(task => this.renderTask(task)).join('');
        this.container.innerHTML = tasksHtml;
        
        // Initialize feather icons after rendering
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        this.bindTaskEvents();
    }

    renderTask(task) {
        const priorityColor = this.getPriorityColor(task.priority);
        const statusBadge = this.getStatusBadge(task.status, task.completed);
        const dueDateClass = this.getDueDateClass(task.dueDate);
        
        return `
            <div class="task-item border rounded p-3 mb-3 ${task.completed ? 'task-completed' : ''}" data-task-id="${task.id}">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start">
                            <div class="form-check me-3">
                                <input class="form-check-input task-checkbox" type="checkbox" ${task.completed ? 'checked' : ''} 
                                       data-task-id="${task.id}">
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="task-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}">${this.escapeHtml(task.title)}</h6>
                                ${task.description ? `<p class="task-description text-muted mb-2">${this.escapeHtml(task.description)}</p>` : ''}
                                
                                <div class="task-meta d-flex flex-wrap gap-2 align-items-center">
                                    ${statusBadge}
                                    <span class="badge bg-${priorityColor}">
                                        <i data-feather="flag" class="icon-small me-1"></i>
                                        ${task.priority}
                                    </span>
                                    ${task.category ? `<span class="badge bg-secondary">
                                        <i data-feather="tag" class="icon-small me-1"></i>
                                        ${this.escapeHtml(task.category)}
                                    </span>` : ''}
                                    ${task.dueDate ? `<small class="text-muted ${dueDateClass}">
                                        <i data-feather="calendar" class="icon-small me-1"></i>
                                        Due: ${this.formatDate(task.dueDate)}
                                    </small>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 text-end">
                        <div class="task-actions">
                            ${!task.completed ? `
                                <div class="btn-group me-2" role="group">
                                    <button type="button" class="btn btn-sm btn-outline-warning status-btn" 
                                            data-task-id="${task.id}" data-status="pending" 
                                            ${task.status === 'pending' ? 'disabled' : ''}>
                                        <i data-feather="circle" class="icon-small"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-info status-btn" 
                                            data-task-id="${task.id}" data-status="in-progress"
                                            ${task.status === 'in-progress' ? 'disabled' : ''}>
                                        <i data-feather="clock" class="icon-small"></i>
                                    </button>
                                </div>
                            ` : ''}
                            
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-sm btn-outline-primary edit-btn" data-task-id="${task.id}">
                                    <i data-feather="edit" class="icon-small"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger delete-btn" data-task-id="${task.id}">
                                    <i data-feather="trash-2" class="icon-small"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="task-timestamps mt-2">
                            <small class="text-muted d-block">
                                Created: ${this.formatDateTime(task.createdAt)}
                            </small>
                            ${task.completedAt ? `<small class="text-success d-block">
                                Completed: ${this.formatDateTime(task.completedAt)}
                            </small>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        this.container.innerHTML = `
            <div class="text-center py-5">
                <i data-feather="inbox" class="icon-extra-large text-muted mb-3"></i>
                <h5 class="text-muted">No tasks found</h5>
                <p class="text-muted">Create your first task to get started!</p>
            </div>
        `;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    bindTaskEvents() {
        // Checkbox events
        this.container.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.dataset.taskId;
                this.callbacks.onToggleComplete(taskId);
            });
        });

        // Edit buttons
        this.container.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = e.target.closest('.edit-btn').dataset.taskId;
                // Get task data from somewhere (you'll need to pass this in)
                this.callbacks.onEdit({ id: taskId });
            });
        });

        // Delete buttons
        this.container.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = e.target.closest('.delete-btn').dataset.taskId;
                this.callbacks.onDelete(taskId);
            });
        });

        // Status buttons
        this.container.querySelectorAll('.status-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = e.target.dataset.taskId;
                const status = e.target.dataset.status;
                this.callbacks.onUpdateStatus(taskId, status);
            });
        });
    }

    getPriorityColor(priority) {
        switch (priority?.toLowerCase()) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'secondary';
        }
    }

    getStatusBadge(status, completed) {
        if (completed) {
            return '<span class="badge bg-success"><i data-feather="check-circle" class="icon-small me-1"></i>Completed</span>';
        }
        
        switch (status) {
            case 'in-progress':
                return '<span class="badge bg-info"><i data-feather="clock" class="icon-small me-1"></i>In Progress</span>';
            case 'pending':
            default:
                return '<span class="badge bg-warning"><i data-feather="circle" class="icon-small me-1"></i>Pending</span>';
        }
    }

    getDueDateClass(dueDate) {
        if (!dueDate) return '';
        
        const due = new Date(dueDate);
        const now = new Date();
        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'text-danger'; // Overdue
        if (diffDays <= 1) return 'text-warning'; // Due soon
        return '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
