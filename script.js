/* ===================================================
   ÉLECTROPRO — JAVASCRIPT PRINCIPAL
   Navbar scroll · Menu mobile · Animations · Formulaire
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────
  // 1. NAVBAR — sticky + scroll effect
  // ──────────────────────────────────────
  const navbar = document.getElementById('navbar');

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();


  // ──────────────────────────────────────
  // 2. MENU HAMBURGER (mobile)
  // ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Fermer le menu en cliquant sur un lien
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Fermer le menu en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });


  // ──────────────────────────────────────
  // 3. ANIMATIONS AU SCROLL (IntersectionObserver)
  // ──────────────────────────────────────
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Délai progressif pour les éléments d'une même section
          const siblings = entry.target.parentElement?.querySelectorAll('[data-anim], .service-card, .review-card');
          let delay = 0;
          if (siblings) {
            siblings.forEach((el, idx) => {
              if (el === entry.target) delay = idx * 100;
            });
          }
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-anim], .service-card, .review-card').forEach(el => {
    animObserver.observe(el);
  });


  // ──────────────────────────────────────
  // 4. NAVIGATION ACTIVE LINK
  // ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? '#fff'
              : '';
            link.style.background = link.getAttribute('href') === `#${id}`
              ? 'rgba(255,255,255,0.1)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => sectionObserver.observe(section));


  // ──────────────────────────────────────
  // 5. FORMULAIRE DE CONTACT
  // ──────────────────────────────────────
  const form       = document.getElementById('contactForm');
  const btnText    = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');
  const btnSubmit  = form.querySelector('.btn-submit');
  const success    = document.getElementById('formSuccess');
  const error      = document.getElementById('formError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset messages
    success.style.display = 'none';
    error.style.display   = 'none';

    // Validation basique
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !phone || !message) {
      error.style.display = 'block';
      error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error.textContent = '❌ Veuillez saisir une adresse email valide.';
      error.style.display = 'block';
      return;
    }

    // Simulation envoi (remplacer par fetch() vers votre backend)
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline';
    btnSubmit.disabled = true;

    try {
      // --- EXEMPLE D'INTÉGRATION RÉELLE ---
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, phone, message })
      // });
      // if (!response.ok) throw new Error('Erreur serveur');

      // Simulation délai réseau
      await new Promise(resolve => setTimeout(resolve, 1800));

      // Succès
      form.reset();
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      error.textContent = '❌ Une erreur est survenue. Veuillez réessayer ou nous appeler directement.';
      error.style.display = 'block';
    } finally {
      btnText.style.display    = 'inline';
      btnLoading.style.display = 'none';
      btnSubmit.disabled = false;
    }
  });

  // Nettoyer les messages d'erreur lors de la saisie
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      error.style.display   = 'none';
    });
  });


  // ──────────────────────────────────────
  // 6. SMOOTH SCROLL — ancres internes
  // ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });


  // ──────────────────────────────────────
  // 7. FAB CALL — masquer si header visible
  // ──────────────────────────────────────
  const fabCall = document.querySelector('.fab-call');

  if (fabCall) {
    const fabObserver = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth <= 768) {
          fabCall.style.opacity = entry.isIntersecting ? '0' : '1';
          fabCall.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        }
      },
      { threshold: 0.5 }
    );

    const hero = document.getElementById('accueil');
    if (hero) fabObserver.observe(hero);
  }

});
