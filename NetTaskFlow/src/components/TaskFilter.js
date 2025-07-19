export class TaskFilter {
    constructor(container, onFilterChange) {
        this.container = container;
        this.onFilterChange = onFilterChange;
        this.currentFilter = 'all';
        this.currentSort = 'createdAt-desc';
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="d-flex align-items-center">
                        <label class="form-label me-3 mb-0">Filter Tasks:</label>
                        <div class="btn-group" role="group" aria-label="Task filters">
                            <input type="radio" class="btn-check" name="taskFilter" id="filter-all" value="all" checked>
                            <label class="btn btn-outline-primary" for="filter-all">
                                <i data-feather="list" class="icon-small me-1"></i>
                                All
                            </label>

                            <input type="radio" class="btn-check" name="taskFilter" id="filter-pending" value="pending">
                            <label class="btn btn-outline-warning" for="filter-pending">
                                <i data-feather="circle" class="icon-small me-1"></i>
                                Pending
                            </label>

                            <input type="radio" class="btn-check" name="taskFilter" id="filter-progress" value="in-progress">
                            <label class="btn btn-outline-info" for="filter-progress">
                                <i data-feather="clock" class="icon-small me-1"></i>
                                In Progress
                            </label>

                            <input type="radio" class="btn-check" name="taskFilter" id="filter-completed" value="completed">
                            <label class="btn btn-outline-success" for="filter-completed">
                                <i data-feather="check-circle" class="icon-small me-1"></i>
                                Completed
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="d-flex align-items-center justify-content-md-end">
                        <label for="task-sort" class="form-label me-3 mb-0">Sort by:</label>
                        <select class="form-select" id="task-sort" style="width: auto;">
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="dueDate-asc">Due Date (Earliest)</option>
                            <option value="dueDate-desc">Due Date (Latest)</option>
                            <option value="priority-desc">Priority (High to Low)</option>
                            <option value="priority-asc">Priority (Low to High)</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i data-feather="search" class="icon-small"></i>
                        </span>
                        <input type="text" class="form-control" id="search-tasks" 
                               placeholder="Search tasks by title or description...">
                        <button class="btn btn-outline-secondary" type="button" id="clear-search">
                            <i data-feather="x" class="icon-small"></i>
                        </button>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i data-feather="tag" class="icon-small"></i>
                        </span>
                        <input type="text" class="form-control" id="filter-category" 
                               placeholder="Filter by category..."
                               list="existing-categories">
                        <datalist id="existing-categories">
                            <!-- Categories will be populated dynamically -->
                        </datalist>
                        <button class="btn btn-outline-secondary" type="button" id="clear-category">
                            <i data-feather="x" class="icon-small"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    bindEvents() {
        // Filter radio buttons
        this.container.querySelectorAll('input[name="taskFilter"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.applyFilters();
            });
        });

        // Sort dropdown
        this.container.querySelector('#task-sort').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Search input
        const searchInput = this.container.querySelector('#search-tasks');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentSearch = e.target.value.trim();
                this.applyFilters();
            }, 300);
        });

        // Clear search button
        this.container.querySelector('#clear-search').addEventListener('click', () => {
            searchInput.value = '';
            this.currentSearch = '';
            this.applyFilters();
        });

        // Category filter
        const categoryInput = this.container.querySelector('#filter-category');
        let categoryTimeout;
        categoryInput.addEventListener('input', (e) => {
            clearTimeout(categoryTimeout);
            categoryTimeout = setTimeout(() => {
                this.currentCategory = e.target.value.trim();
                this.applyFilters();
            }, 300);
        });

        // Clear category button
        this.container.querySelector('#clear-category').addEventListener('click', () => {
            categoryInput.value = '';
            this.currentCategory = '';
            this.applyFilters();
        });
    }

    applyFilters() {
        const filterData = {
            status: this.currentFilter,
            sort: this.currentSort,
            search: this.currentSearch || '',
            category: this.currentCategory || ''
        };
        
        this.onFilterChange(filterData);
    }

    updateCategories(categories) {
        const datalist = this.container.querySelector('#existing-categories');
        datalist.innerHTML = categories
            .map(category => `<option value="${this.escapeHtml(category)}">`)
            .join('');
    }

    getActiveFilters() {
        return {
            status: this.currentFilter,
            sort: this.currentSort,
            search: this.currentSearch || '',
            category: this.currentCategory || ''
        };
    }

    resetFilters() {
        // Reset to default values
        this.currentFilter = 'all';
        this.currentSort = 'createdAt-desc';
        this.currentSearch = '';
        this.currentCategory = '';

        // Update UI
        this.container.querySelector('#filter-all').checked = true;
        this.container.querySelector('#task-sort').value = 'createdAt-desc';
        this.container.querySelector('#search-tasks').value = '';
        this.container.querySelector('#filter-category').value = '';

        this.applyFilters();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
