document.querySelectorAll('.faq-item').forEach(function(item) {
  item.addEventListener('click', function() {


    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(function(i) {
      i.classList.remove('open');
    });


    if (!isOpen) {
      item.classList.add('open');
    }
  });
});


var scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1 
});


var animatedElements = document.querySelectorAll(
  '.feat-card, .step-card, .price-card, .test-card, .stat-item'
);


animatedElements.forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';


  scrollObserver.observe(el);
});




document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var targetId = link.getAttribute('href');


    if (targetId === '#') return;

    var targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault(); 


      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});




var navbar = document.querySelector('.nav');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.12)';
  } else {
 
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
});




var contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var name    = contactForm.querySelector('input[type="text"]').value.trim();
    var email   = contactForm.querySelector('input[type="email"]').value.trim();
    var subject = contactForm.querySelectorAll('input[type="text"]')[1].value.trim();
    var message = contactForm.querySelector('textarea').value.trim();


    
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields before submitting.', 'error');
      return;
    }


    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }


    showFormMessage('Message sent successfully! We will get back to you soon.', 'success');
    contactForm.reset();
  });
}


function showFormMessage(text, type) {

  var existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  
  var msg = document.createElement('p');
  msg.className = 'form-message';
  msg.textContent = text;


  msg.style.marginTop = '10px';
  msg.style.fontSize = '14px';
  msg.style.padding = '10px 14px';
  msg.style.borderRadius = '8px';

  if (type === 'success') {
    msg.style.color = '#06d6c7';
    msg.style.background = 'rgba(6,214,199,0.08)';
    msg.style.border = '1px solid rgba(6,214,199,0.2)';
  } else {
    msg.style.color = '#ff6b6b';
    msg.style.background = 'rgba(255,107,107,0.08)';
    msg.style.border = '1px solid rgba(255,107,107,0.2)';
  }


  contactForm.parentNode.insertBefore(msg, contactForm.nextSibling);


  setTimeout(function() {
    if (msg) msg.remove();
  }, 4000);
}




var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav ul li a');

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY + 120; 

  sections.forEach(function(section) {
    var sectionTop    = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId     = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

      navLinks.forEach(function(link) {
        link.style.color = '';  
      });

      // Highlight the matching nav link
      var activeLink = document.querySelector('.nav ul li a[href="#' + sectionId + '"]');
      if (activeLink) {
        activeLink.style.color = '#4f8eff'; 
      }
    }
  });
});
