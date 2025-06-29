// Preloader fade-out
window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("fade-out");
});

const navbar = document.getElementById('navbar');
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll('.nav-item');

// Scroll event
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 200);

  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Animate sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Back to top scroll
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Nav tap animation
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    link.classList.add("tap-animate");
    setTimeout(() => {
      link.classList.remove("tap-animate");
    }, 300);
  });
});
