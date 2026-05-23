// ============================================
// TRAVELISTA - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ---- Search Tabs ----
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowH = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowH - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Run on load

  // ---- Sticky Navbar Shadow ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
  });

  // ---- Destination Card hover label ----
  document.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.querySelector('.dest-book').style.background = 'var(--primary)';
      this.querySelector('.dest-book').style.color = 'var(--dark)';
    });
    card.addEventListener('mouseleave', function () {
      this.querySelector('.dest-book').style.background = '';
      this.querySelector('.dest-book').style.color = '';
    });
  });

});
