/* ============================================
   HYBRIQ PRIME NIG LTD — Main JavaScript
   Features: Navbar, Animations, Calculator,
             Booking Form, WhatsApp Link
   ============================================ */

/* ---- 1. STICKY NAVBAR WITH SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Add 'scrolled' class after scrolling 50px — changes navbar background
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- 2. HAMBURGER MENU (Mobile Nav) ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle && navToggle.classList.remove('open');
    navLinks  && navLinks.classList.remove('open');
  });
});

/* ---- 3. ACTIVE NAV LINK ---- */
// Highlight the current page in the nav
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---- 4. SCROLL REVEAL ANIMATION ---- */
// Elements with class 'reveal' animate in when they enter the viewport
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animations slightly for groups of elements
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ---- 5. PAINTING COST CALCULATOR ---- */
const calcForm = document.getElementById('calcForm');

if (calcForm) {
  calcForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const rooms     = parseInt(document.getElementById('calcRooms').value);
    const roomSize  = document.getElementById('calcRoomSize').value;
    const quality   = document.getElementById('calcQuality').value;

    /* --- Calculation Logic ---
       Room size base area (sq metres):
         small  = 20 sqm | medium = 35 sqm | large = 50 sqm
       Paint coverage: ~1 litre covers 10 sqm (2 coats)
       Labor rate per sqm: standard room ≈ ₦800/sqm
    */
    const sizeMap   = { small: 20, medium: 35, large: 50 };
    const sqm       = sizeMap[roomSize] * rooms;

    // Paint needed in litres (2 coats: divide area/5)
    const paintLitres = Math.ceil(sqm / 5);

    // Paint cost per litre
    const paintCostPerLitre = (quality === 'premium') ? 3500 : 1800;
    const paintCost = paintLitres * paintCostPerLitre;

    // Labor cost
    const laborRate = (quality === 'premium') ? 1200 : 800;
    const laborCost = sqm * laborRate;

    // Total
    const totalCost = paintCost + laborCost;

    // Format numbers with commas
    const fmt = (n) => '₦' + n.toLocaleString('en-NG');

    // Populate result display
    document.getElementById('resultArea').textContent   = sqm + ' sqm';
    document.getElementById('resultPaint').textContent  = paintLitres + ' litres';
    document.getElementById('resultLabor').textContent  = fmt(laborCost);
    document.getElementById('resultTotal').textContent  = fmt(totalCost);

    // Show the result panel
    document.getElementById('calcResult').classList.add('show');
  });
}

/* ---- 6. BOOKING FORM ---- */
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name     = document.getElementById('bName').value.trim();
    const phone    = document.getElementById('bPhone').value.trim();
    const location = document.getElementById('bLocation').value.trim();
    const service  = document.getElementById('bService').value;
    const date     = document.getElementById('bDate').value;

    // --- Build WhatsApp message ---
    const wa_number = '2349051297422'; 
    const message = encodeURIComponent(
      `Hello Hybriq Prime,\n\nI would like to book a service:\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📍 Location: ${location}\n` +
      `🛠 Service: ${service}\n` +
      `📅 Date: ${date}\n\n` +
      `Please confirm my booking. Thank you!`
    );

    const waLink = `https://wa.me/${23409051297422}?text=${message}`;

    // Store the WhatsApp link for the confirmation button
    document.getElementById('waBookingLink').href = waLink;

    // Hide form, show confirmation
    document.getElementById('bookingFormInner').style.display = 'none';
    document.getElementById('bookingConfirm').classList.add('show');
  });
}

/* ---- 7. CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('cName').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    const wa_number = '2349051297422'; // Replace with real number
    const waMsg = encodeURIComponent(`Hello Hybriq Prime,\n\nMy name is ${name}.\n\n${message}`);
    const waLink = `https://wa.me/${2349051297422}?text=${waMsg}`;

    // Send directly to WhatsApp
    window.open(waLink, '_blank');
    contactForm.reset();
    alert('Thank you! Your message will be sent via WhatsApp.');
  });
}

/* ---- 8. SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- 9. YEAR IN FOOTER ---- */
const yearEls = document.querySelectorAll('.current-year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());
