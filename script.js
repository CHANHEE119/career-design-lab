// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Sticky nav style
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  hamburger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  });
});

// Smooth close nav on link click (desktop)
document.querySelectorAll('.nav__links a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
});

// Contact form
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();

    if (!name) { alert('이름을 입력해주세요.'); return; }
    if (!phone) { alert('연락처를 입력해주세요.'); return; }

    // Simulate submission
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '전송 중...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 900);
  });
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
