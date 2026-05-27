// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 400);
});
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.main-navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.style.boxShadow = window.scrollY > 50
    ? '0 4px 20px rgba(0,0,0,0.12)'
    : '0 2px 20px rgba(0,0,0,0.08)';
});

// ===== BOOKING FORM VALIDATION =====
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const steps = document.querySelectorAll('.form-step');
  const stepDots = document.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(n) {
    steps.forEach((s, i) => s.style.display = i === n ? 'block' : 'none');
    stepDots.forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i < n) s.classList.add('done');
      if (i === n) s.classList.add('active');
    });
    currentStep = n;
  }

  function validateStep(n) {
    const stepEl = steps[n];
    const inputs = stepEl.querySelectorAll('[required]');
    let valid = true;
    inputs.forEach(inp => {
      const val = inp.value.trim();
      if (!val) {
        inp.classList.add('is-invalid');
        inp.classList.remove('is-valid');
        valid = false;
      } else {
        // Email validation
        if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          inp.classList.add('is-invalid');
          inp.classList.remove('is-valid');
          valid = false;
        } else {
          inp.classList.remove('is-invalid');
          inp.classList.add('is-valid');
        }
      }
    });
    return valid;
  }

  // Live validation
  form.querySelectorAll('input, select, textarea').forEach(inp => {
    inp.addEventListener('input', () => {
      if (inp.value.trim()) {
        inp.classList.remove('is-invalid');
        inp.classList.add('is-valid');
      }
    });
  });

  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) showStep(currentStep + 1);
    });
  });
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => showStep(currentStep - 1));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      showStep(currentStep + 1);
      // Success step
      const successEl = document.getElementById('bookingSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        steps[currentStep].style.display = 'none';
      }
    }
  });

  showStep(0);
}

// ===== GALLERY LIGHTBOX =====
function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  const lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;

  const lbImg = lb.querySelector('img');
  let current = 0;
  const imgs = Array.from(items).map(i => i.querySelector('img').src);

  function open(idx) {
    current = idx;
    lbImg.src = imgs[idx];
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => open((current - 1 + imgs.length) % imgs.length));
  lb.querySelector('.lb-next').addEventListener('click', () => open((current + 1) % imgs.length));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open((current - 1 + imgs.length) % imgs.length);
    if (e.key === 'ArrowRight') open((current + 1) % imgs.length);
  });
}

// ===== GALLERY FILTER =====
function initGalleryFilter() {
  const btns = document.querySelectorAll('.btn-filter');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.opacity = '0';
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  let current = 0;
  function show(n) {
    slides.forEach((s, i) => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(10px)';
      setTimeout(() => {
        s.style.display = i === n ? 'block' : 'none';
        if (i === n) setTimeout(() => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        }, 10);
      }, 200);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
    current = n;
  }

  dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  setInterval(() => show((current + 1) % slides.length), 5000);
  show(0);
}

// ===== PACKAGE PRICE UPDATE =====
function initPriceSummary() {
  const pkgSelect = document.getElementById('packageSelect');
  const summaryPkg = document.getElementById('summaryPkg');
  const summaryPrice = document.getElementById('summaryPrice');
  if (!pkgSelect) return;

  const prices = {
    'Bali Adventure': 1200,
    'Paris Romance': 2500,
    'Maldives Luxury': 3500,
    'Nepal Trekking': 1800,
    'Thailand Explorer': 1400,
    'Singapore City Tour': 1600
  };

  pkgSelect.addEventListener('change', () => {
    const pkg = pkgSelect.value;
    if (summaryPkg) summaryPkg.textContent = pkg || '—';
    if (summaryPrice && pkg && prices[pkg]) {
      summaryPrice.textContent = '$' + prices[pkg].toLocaleString();
    }
  });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = current;
      }, 20);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
  initGallery();
  initGalleryFilter();
  initTestimonials();
  initPriceSummary();
  initCounters();
});