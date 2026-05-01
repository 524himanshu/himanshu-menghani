/* ==================== toggle icon navbar ==================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/* ==================== scroll sections active link ==================== */
const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) activeLink.classList.add('active');
    }
  });

  /* ==================== sticky navbar ==================== */
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* ==================== close mobile menu on scroll ==================== */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

/* ==================== scroll reveal ==================== */
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ==================== typed js ==================== */
document.addEventListener('DOMContentLoaded', () => {
  new Typed('.typed-text', {
    strings: ['Full Stack Developer', 'AI Integration Developer', 'Next.js & Flask Builder'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});

/* ==================== dark / light theme toggle ==================== */
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // swap icon between moon (light mode) and sun (dark mode)
  if (document.body.classList.contains('dark-theme')) {
    themeToggle.classList.remove('bx-moon');
    themeToggle.classList.add('bx-sun');
  } else {
    themeToggle.classList.remove('bx-sun');
    themeToggle.classList.add('bx-moon');
  }
});

/* ==================== contact form — single handler only ==================== */
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  try {
    const res = await fetch('https://five24himanshu-github-io.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    showToast(data.message || 'Message sent successfully!');
    form.reset();
  } catch (err) {
    console.error(err);
    showToast('Failed to send message. Please try again later.');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

/* ==================== toast notification ==================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
