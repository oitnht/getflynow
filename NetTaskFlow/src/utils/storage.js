export class StorageService {
    constructor() {
        this.storage = this.getAvailableStorage();
    }

    getAvailableStorage() {
        // Check if localStorage is available
        if (this.isStorageAvailable('localStorage')) {
            return localStorage;
        }
        
        // Fallback to sessionStorage
        if (this.isStorageAvailable('sessionStorage')) {
            console.warn('localStorage not available, using sessionStorage');
            return sessionStorage;
        }
        
        // Fallback to in-memory storage
        console.warn('Web Storage not available, using in-memory storage');
        return this.createMemoryStorage();
    }

    isStorageAvailable(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    createMemoryStorage() {
        const memoryStore = new Map();
        
        return {
            getItem: (key) => memoryStore.get(key) || null,
            setItem: (key, value) => memoryStore.set(key, value),
            removeItem: (key) => memoryStore.delete(key),
            clear: () => memoryStore.clear(),
            get length() {
                return memoryStore.size;
            },
            key: (index) => {
                const keys = Array.from(memoryStore.keys());
                return keys[index] || null;
            }
        };
    }

    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            this.storage.setItem(this.getStorageKey(key), serializedValue);
        } catch (error) {
            console.error('Error saving to storage:', error);
            throw new Error('Failed to save data');
        }
    }

    get(key) {
        try {
            const serializedValue = this.storage.getItem(this.getStorageKey(key));
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }

    remove(key) {
        try {
            this.storage.removeItem(this.getStorageKey(key));
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }

    clear() {
        try {
            // Only clear TaskMaster related keys
            const keys = this.getAllKeys();
            keys.forEach(key => {
                if (key.startsWith('taskmaster_')) {
                    this.storage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }

    getAllKeys() {
        const keys = [];
        try {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key) {
                    keys.push(key);
                }
            }
        } catch (error) {
            console.error('Error getting storage keys:', error);
        }
        return keys;
    }

    getStorageKey(key) {
        return `taskmaster_${key}`;
    }

    // Backup and restore functionality
    exportData() {
        try {
            const data = {};
            const keys = this.getAllKeys();
            
            keys.forEach(key => {
                if (key.startsWith('taskmaster_')) {
                    const value = this.storage.getItem(key);
                    if (value) {
                        data[key] = value;
                    }
                }
            });
            
            return {
                timestamp: new Date().toISOString(),
                data: data
            };
        } catch (error) {
            console.error('Error exporting data:', error);
            throw new Error('Failed to export data');
        }
    }

    importData(exportedData) {
        try {
            if (!exportedData || !exportedData.data) {
                throw new Error('Invalid export data');
            }

            // Clear existing data
            this.clear();

            // Import new data
            Object.entries(exportedData.data).forEach(([key, value]) => {
                this.storage.setItem(key, value);
            });

            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            throw new Error('Failed to import data');
        }
    }

    // Get storage usage information
    getStorageInfo() {
        try {
            const keys = this.getAllKeys();
            let totalSize = 0;
            
            keys.forEach(key => {
                const value = this.storage.getItem(key);
                if (value) {
                    totalSize += key.length + value.length;
                }
            });

            return {
                totalKeys: keys.length,
                totalSize: totalSize,
                formattedSize: this.formatBytes(totalSize),
                availableQuota: this.getStorageQuota()
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getStorageQuota() {
        // Estimate storage quota (most browsers have 5-10MB for localStorage)
        if (navigator.storage && navigator.storage.estimate) {
            return navigator.storage.estimate()
                .then(estimate => ({
                    quota: estimate.quota,
                    usage: estimate.usage,
                    formattedQuota: this.formatBytes(estimate.quota || 0),
                    formattedUsage: this.formatBytes(estimate.usage || 0)
                }))
                .catch(() => null);
        }
        
        return Promise.resolve({
            quota: 5 * 1024 * 1024, // Estimate 5MB
            usage: 0,
            formattedQuota: '5 MB (estimated)',
            formattedUsage: '0 Bytes'
        });
    }

    // Compress data to save space
    compress(data) {
        // Simple compression by removing whitespace from JSON
        return JSON.stringify(data);
    }

    decompress(compressedData) {
        try {
            return JSON.parse(compressedData);
        } catch (error) {
            console.error('Error decompressing data:', error);
            return null;
        }
    }
}
