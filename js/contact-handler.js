// Contact Form Handler
class ContactHandler {
    constructor() {
        this.db = new Database('portfolioContacts');
        this.form = document.getElementById('contactForm');
        this.initialize();
    }

    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            id: Date.now(),
            name: this.form.querySelector('[name="name"]').value,
            email: this.form.querySelector('[name="email"]').value,
            subject: this.form.querySelector('[name="subject"]').value,
            message: this.form.querySelector('[name="message"]').value,
            date: new Date().toISOString(),
            read: false
        };

        // Save to database
        this.saveContact(formData);
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        this.form.reset();
    }

    saveContact(contactData) {
        // Get existing contacts or initialize empty array
        const contacts = this.db.get('contacts') || [];
        
        // Add new contact
        contacts.push(contactData);
        
        // Save back to database
        this.db.set('contacts', contacts);
        
        // Log for debugging (remove in production)
        console.log('Contact saved:', contactData);
        console.log('All contacts:', this.db.get('contacts'));
    }

    showSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
        successMsg.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        `;

        // Insert after form
        this.form.parentNode.insertBefore(successMsg, this.form.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => successMsg.remove(), 500);
        }, 5000);
    }

    // Get all contacts (for admin panel)
    static getAllContacts() {
        const db = new Database('portfolioContacts');
        return db.get('contacts') || [];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form handler if form exists
    if (document.getElementById('contactForm')) {
        new ContactHandler();
    }

    // Example: Display number of messages in console (for admin)
    const db = new Database('portfolioContacts');
    const contactCount = (db.get('contacts') || []).length;
    console.log(`Total messages in database: ${contactCount}`);
});
