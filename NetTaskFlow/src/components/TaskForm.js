export class TaskForm {
    constructor(container, onSubmit) {
        this.container = container;
        this.onSubmit = onSubmit;
        this.currentTask = null;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <form id="task-form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="task-title" class="form-label">Task Title *</label>
                            <input type="text" class="form-control" id="task-title" required 
                                   placeholder="Enter task title">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="task-priority" class="form-label">Priority</label>
                            <select class="form-select" id="task-priority">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="task-status" class="form-label">Status</label>
                            <select class="form-select" id="task-status">
                                <option value="pending" selected>Pending</option>
                                <option value="in-progress">In Progress</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="task-category" class="form-label">Category</label>
                            <input type="text" class="form-control" id="task-category" 
                                   placeholder="e.g., Work, Personal, Shopping"
                                   list="category-suggestions">
                            <datalist id="category-suggestions">
                                <option value="Work">
                                <option value="Personal">
                                <option value="Shopping">
                                <option value="Health">
                                <option value="Learning">
                                <option value="Home">
                            </datalist>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="task-due-date" class="form-label">Due Date</label>
                            <input type="date" class="form-control" id="task-due-date">
                        </div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="task-description" class="form-label">Description</label>
                    <textarea class="form-control" id="task-description" rows="3" 
                              placeholder="Enter task description (optional)"></textarea>
                </div>
                
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">
                        <i data-feather="save" class="icon-small me-2"></i>
                        <span id="submit-text">Create Task</span>
                    </button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn">
                        <i data-feather="x" class="icon-small me-2"></i>
                        Cancel
                    </button>
                </div>
            </form>
        `;

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    bindEvents() {
        const form = this.container.querySelector('#task-form');
        const cancelBtn = this.container.querySelector('#cancel-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        cancelBtn.addEventListener('click', () => {
            this.reset();
        });

        // Set minimum date to today
        const dueDateInput = this.container.querySelector('#task-due-date');
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.min = today;
    }

    handleSubmit() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        // Add metadata
        if (this.currentTask) {
            formData.id = this.currentTask.id;
            formData.createdAt = this.currentTask.createdAt;
            formData.updatedAt = new Date().toISOString();
        } else {
            formData.id = this.generateId();
            formData.createdAt = new Date().toISOString();
            formData.completed = false;
        }

        this.onSubmit(formData);
    }

    getFormData() {
        return {
            title: this.container.querySelector('#task-title').value.trim(),
            description: this.container.querySelector('#task-description').value.trim(),
            priority: this.container.querySelector('#task-priority').value,
            status: this.container.querySelector('#task-status').value,
            category: this.container.querySelector('#task-category').value.trim(),
            dueDate: this.container.querySelector('#task-due-date').value || null
        };
    }

    validateForm(data) {
        const errors = [];

        if (!data.title) {
            errors.push('Task title is required');
        }

        if (data.title && data.title.length > 200) {
            errors.push('Task title must be less than 200 characters');
        }

        if (data.description && data.description.length > 1000) {
            errors.push('Description must be less than 1000 characters');
        }

        if (data.dueDate) {
            const dueDate = new Date(data.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (dueDate < today) {
                errors.push('Due date cannot be in the past');
            }
        }

        if (errors.length > 0) {
            this.showValidationErrors(errors);
            return false;
        }

        this.clearValidationErrors();
        return true;
    }

    showValidationErrors(errors) {
        this.clearValidationErrors();
        
        const errorHtml = `
            <div class="alert alert-danger validation-errors" role="alert">
                <strong>Please fix the following errors:</strong>
                <ul class="mb-0 mt-2">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        this.container.insertAdjacentHTML('afterbegin', errorHtml);
    }

    clearValidationErrors() {
        const existingErrors = this.container.querySelector('.validation-errors');
        if (existingErrors) {
            existingErrors.remove();
        }
    }

    loadTask(task) {
        this.currentTask = task;
        
        // Populate form fields
        this.container.querySelector('#task-title').value = task.title || '';
        this.container.querySelector('#task-description').value = task.description || '';
        this.container.querySelector('#task-priority').value = task.priority || 'medium';
        this.container.querySelector('#task-status').value = task.status || 'pending';
        this.container.querySelector('#task-category').value = task.category || '';
        this.container.querySelector('#task-due-date').value = task.dueDate || '';
        
        // Update submit button text
        this.container.querySelector('#submit-text').textContent = 'Update Task';
        
        // Focus on title field
        this.container.querySelector('#task-title').focus();
    }

    reset() {
        this.currentTask = null;
        this.container.querySelector('#task-form').reset();
        this.container.querySelector('#submit-text').textContent = 'Create Task';
        this.clearValidationErrors();
    }

    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}
