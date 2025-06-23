// Navigation and scroll tracking
let activeSection = '';

// Form data
const formData = {
  name: '',
  email: '',
  message: ''
};

// Photo gallery data
const photos = [
  { src: '/images/band1.jpg', alt: 'Yaazda! Band Photo 1' },
  { src: '/images/band2.jpg', alt: 'Yaazda! Band Photo 2' },
  { src: '/images/band3.jpg', alt: 'Yaazda! Band Photo 3' },
  { src: '/images/band4.jpg', alt: 'Yaazda! Band Photo 4' }
];

let currentPhotoIndex = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeForm();
  initializePhotoGallery();
  handleScroll(); // Set initial state
});

// Navigation functionality
function initializeNavigation() {
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Add click listeners to navigation buttons
  const navButtons = document.querySelectorAll('[data-section]');
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      scrollToSection(sectionId);
    });
  });
}

function handleScroll() {
  const sections = ['events', 'about', 'videos', 'photos', 'contact'];
  const scrollPosition = window.scrollY + 100; // Offset for better detection
  const navContainer = document.querySelector('.nav-container');
  
  // Add scrolled class for compact navigation
  if (window.scrollY > 50) {
    navContainer.classList.add('scrolled');
  } else {
    navContainer.classList.remove('scrolled');
  }

  // Update active section
  let newActiveSection = '';
  
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        newActiveSection = section;
        break;
      }
    }
  }

  // Handle hero section
  if (window.scrollY < 100) {
    newActiveSection = '';
  }

  // Update navigation if section changed
  if (newActiveSection !== activeSection) {
    activeSection = newActiveSection;
    updateNavigation();
  }
}

function updateNavigation() {
  const navButtons = document.querySelectorAll('[data-section]');
  navButtons.forEach(button => {
    const sectionId = button.getAttribute('data-section');
    if (sectionId === activeSection) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Form functionality
function initializeForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Add input event listeners
  nameInput.addEventListener('input', function() {
    formData.name = this.value;
  });

  emailInput.addEventListener('input', function() {
    formData.email = this.value;
  });

  messageInput.addEventListener('input', function() {
    formData.message = this.value;
  });

  // Add form submit listener
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Handle form submission here
  console.log('Form submitted:', formData);
  alert('Thank you for your message! We\'ll get back to you soon.');
  
  // Reset form
  document.getElementById('contact-form').reset();
  formData.name = '';
  formData.email = '';
  formData.message = '';
}

// Photo gallery functionality
function initializePhotoGallery() {
  const photoItems = document.querySelectorAll('.photo-item');
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-image');
  const closeBtn = document.getElementById('modal-close');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');

  // Add click listeners to photos
  photoItems.forEach((photo, index) => {
    photo.addEventListener('click', function() {
      currentPhotoIndex = index;
      openPhotoModal();
    });
  });

  // Close modal
  closeBtn.addEventListener('click', closePhotoModal);
  
  // Close modal when clicking outside image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closePhotoModal();
    }
  });

  // Navigation buttons
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showPreviousPhoto();
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextPhoto();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closePhotoModal();
          break;
        case 'ArrowLeft':
          showPreviousPhoto();
          break;
        case 'ArrowRight':
          showNextPhoto();
          break;
      }
    }
  });
}

function openPhotoModal() {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-image');
  
  modalImg.src = photos[currentPhotoIndex].src;
  modalImg.alt = photos[currentPhotoIndex].alt;
  modal.classList.add('active');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photo-modal');
  modal.classList.remove('active');
  
  // Restore body scroll
  document.body.style.overflow = '';
}

function showPreviousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  updateModalImage();
}

function showNextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  updateModalImage();
}

function updateModalImage() {
  const modalImg = document.getElementById('modal-image');
  modalImg.src = photos[currentPhotoIndex].src;
  modalImg.alt = photos[currentPhotoIndex].alt;
}