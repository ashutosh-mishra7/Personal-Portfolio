// ===== Theme Toggle Functionality =====
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');
document.body.classList.toggle('dark-mode', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  
  // Animate the toggle button
  themeToggle.style.transform = 'scale(1.1) rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1) rotate(0)';
  }, 300);
});

// ===== Smooth Scrolling for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Add active class to clicked nav item
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
    
    // Smooth scroll to target
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
  
  // Show/hide back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

// ===== Back to Top Button =====
document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Typed.js Effect for Hero Section =====
const typed = new Typed('.typed-text', {
  strings: ['Frontend Developer', 'UI/UX Designer', 'JavaScript Enthusiast', 'Problem Solver'],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|',
  smartBackspace: true
});

// ===== Project Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== Form Validation and Submission =====
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector('button');
  const originalBtnText = submitBtn.textContent;
  
  // Client-side validation
  let isValid = true;
  formInputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff7675';
      isValid = false;
    } else {
      input.style.borderColor = 'rgba(108, 92, 231, 0.2)';
    }
  });
  
  if (!isValid) {
    return;
  }
  
  // Simulate form submission (replace with actual fetch request)
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  
  try {
    // In a real implementation, you would use fetch() to send data to your backend
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thank you! Your message has been sent successfully.</p>
    `;
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    formInputs.forEach(input => {
      input.nextElementSibling.style.transform = 'translateY(0)';
    });
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again later.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    submitBtn.style.opacity = '1';
  }
});

// ===== Intersection Observer for Scroll Animations =====
const animateOnScroll = (elements, className, threshold = 0.2) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });
  
  elements.forEach(element => observer.observe(element));
};

// Animate sections when they come into view
const animatedSections = document.querySelectorAll('.section');
animateOnScroll(animatedSections, 'animate');

// Animate project cards
const projects = document.querySelectorAll('.project-card');
animateOnScroll(projects, 'animate', 0.1);

// ===== Custom Cursor Effect =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;
let followerX = 0;
let followerY = 0;
let speed = 0.1;
let followerSpeed = 0.04;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const animateCursor = () => {
  // Main cursor
  posX += (mouseX - posX) * speed;
  posY += (mouseY - posY) * speed;
  cursor.style.left = `${posX}px`;
  cursor.style.top = `${posY}px`;
  
  // Follower cursor
  followerX += (mouseX - followerX) * followerSpeed;
  followerY += (mouseY - followerY) * followerSpeed;
  cursorFollower.style.left = `${followerX}px`;
  cursorFollower.style.top = `${followerY}px`;
  
  requestAnimationFrame(animateCursor);
};

animateCursor();

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll(
  'a, button, .nav-link, .project-card, .form-group input, .form-group textarea'
);

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
    cursorFollower.style.borderColor = 'var(--primary-color)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.borderColor = 'rgba(var(--primary-rgb), 0.3)';
  });
});

// ===== Mobile Navigation =====
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav').appendChild(mobileMenuToggle);

mobileMenuToggle.addEventListener('click', () => {
  document.body.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (document.body.classList.contains('mobile-menu-open')) {
      document.body.classList.remove('mobile-menu-open');
    }
  });
});

// ===== Skills Animation =====
const skillBars = document.querySelectorAll('.skill-progress');
animateOnScroll(skillBars, 'animate-width');

// ===== Preloader Animation =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 500);
  }
});

// ===== Service Worker Registration for PWA =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// ===== Dynamic Year in Footer =====
document.querySelector('.current-year').textContent = new Date().getFullYear();

// ===== Image Lazy Loading =====
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Project Modal =====
const projectModals = document.querySelectorAll('.project-modal');
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
document.body.appendChild(modalOverlay);

document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = link.getAttribute('data-project-id');
    const modal = document.querySelector(`.project-modal[data-project="${projectId}"]`);
    
    if (modal) {
      modal.classList.add('active');
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

modalOverlay.addEventListener('click', () => {
  closeAllModals();
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});

function closeAllModals() {
  projectModals.forEach(modal => modal.classList.remove('active'));
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== Scroll Reveal Animation =====
const scrollReveal = ScrollReveal({
  origin: 'bottom',
  distance: '60px',
  duration: 1000,
  delay: 200,
  reset: false
});

scrollReveal.reveal('.section-header, .about-content, .about-image, .project-card, .contact-info, .contact-form', {
  interval: 200
});

// ===== Particle.js Background for Hero Section =====
if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#6c5ce7' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#6c5ce7', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' }
      }
    }
  });
}

// // Add this to your script.js
// function showCookieBanner() {
//     if (!localStorage.getItem('cookieConsent')) {
//         const banner = document.createElement('div');
//         banner.className = 'cookie-banner';
//         banner.innerHTML = `
//             <p>We use cookies to enhance your experience. By continuing, you agree to our 
//             <a href="privacy.html">Cookie Policy</a>.</p>
//             <button id="accept-cookies">Accept</button>
//         `;
//         document.body.appendChild(banner);
        
//         document.getElementById('accept-cookies').addEventListener('click', () => {
//             localStorage.setItem('cookieConsent', 'true');
//             banner.remove();
//         });
//     }
// }

// // Call on page load
// showCookieBanner();