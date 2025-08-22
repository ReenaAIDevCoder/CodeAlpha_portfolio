// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Project upload functionality
document.querySelectorAll('.project-upload input[type="file"]').forEach(upload => {
    upload.addEventListener('change', function() {
        const fileName = this.files[0]?.name || 'No file selected';
        this.nextElementSibling.textContent = fileName;
    });
});

// View project modal
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', function() {
        const modal = document.querySelector('.project-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    });
});

// Close modal
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.project-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal when clicking outside
document.querySelectorAll('.project-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});

// Add animation classes on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scrolled');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize project modals
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check if dark mode is preferred by the system
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
    });

    // Listen for system preference changes
    prefersDarkScheme.addListener((e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.add('active');
        } else {
            document.body.classList.remove('dark-mode');
            darkModeToggle.classList.remove('active');
        }
    });

    projects.forEach((project, index) => {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}">
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    });
});
