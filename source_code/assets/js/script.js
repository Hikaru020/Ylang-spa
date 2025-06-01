document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header-inner')) {
      navLinks.classList.remove('active');
    }
  });
  
  // Smooth scroll for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
      }
    });
  });
  
  // Product filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-card');
  
  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        productItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
          } else if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Form validation
  const contactForm = document.getElementById('consultation-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      
      // Simple validation
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Vui lòng nhập tên của bạn');
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Vui lòng nhập email của bạn');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Vui lòng nhập email hợp lệ');
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Vui lòng nhập nội dung tin nhắn');
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // If form is valid, submit or show success message
      if (isValid) {
        // You would typically send the form data to a server here
        // For demo purposes, we'll just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
  
  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error-input');
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error-input');
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});