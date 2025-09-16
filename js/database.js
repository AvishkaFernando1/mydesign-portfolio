// Simple Database Module using localStorage
class Database {
    constructor(name) {
        this.name = name;
        this.data = this.load();
    }

    // Load data from localStorage
    load() {
        const savedData = localStorage.getItem(this.name);
        return savedData ? JSON.parse(savedData) : {};
    }

    // Save data to localStorage
    save() {
        localStorage.setItem(this.name, JSON.stringify(this.data));
    }

    // Set a value in the database
    set(key, value) {
        this.data[key] = value;
        this.save();
        return value;
    }

    // Get a value from the database
    get(key) {
        return this.data[key];
    }

    // Get all data
    getAll() {
        return this.data;
    }

    // Remove an item from the database
    remove(key) {
        delete this.data[key];
        this.save();
    }

    // Clear all data
    clear() {
        this.data = {};
        this.save();
    }
}

// Example usage:
// const db = new Database('myAppDB');
// db.set('users', [{ id: 1, name: 'John' }]);
// const users = db.get('users');
// db.remove('users');
// db.clear();
