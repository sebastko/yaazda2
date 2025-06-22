// Form data storage
let formData = {
    name: '',
    email: '',
    message: ''
};

// Active section tracking
let activeSection = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollTracking();
    initializeContactForm();
});

// Scroll tracking for navigation highlighting
function initializeScrollTracking() {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
}

function handleScroll() {
    const sections = ['events', 'about', 'videos', 'photos', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
            }
        }
    }

    // Handle hero section
    if (window.scrollY < 100) {
        setActiveSection('');
    }
}

function setActiveSection(section) {
    if (activeSection === section) return;
    
    activeSection = section;
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (section && btn.textContent.toLowerCase() === section) {
            btn.classList.add('active');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Add input event listeners for real-time form data updates
    nameInput.addEventListener('input', (e) => {
        formData.name = e.target.value;
    });

    emailInput.addEventListener('input', (e) => {
        formData.email = e.target.value;
    });

    messageInput.addEventListener('input', (e) => {
        formData.message = e.target.value;
    });

    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get current form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Update form data
    formData = { name, email, message };

    // Log form data (in a real application, you would send this to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    document.getElementById('contactForm').reset();
    formData = { name: '', email: '', message: '' };
}

// Utility function to handle image loading
function handleImageLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', handleImageLoad);