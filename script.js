// <!-- ================================
//        JAVASCRIPT
//        ================================ -->
// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("mobileDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  drawer.classList.toggle("open");
  drawerOverlay.classList.toggle("active");
  document.body.style.overflow = drawer.classList.contains("open")
    ? "hidden"
    : "";
});

drawerOverlay.addEventListener("click", closeDrawer);

function closeDrawer() {
  hamburger.classList.remove("active");
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Navbar background on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

// Tab Filtering
const tabBtns = document.querySelectorAll(".tab-btn");
const courseCards = document.querySelectorAll(".course-card");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    courseCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";
        setTimeout(() => {
          card.style.transition = "all 0.4s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Modal Logic
const modal = document.getElementById("enrollModal");

function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function closeModalOnBackdrop(e) {
  if (e.target === modal) closeModal();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeDrawer();
  }
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// // Form Handlers
// function handleContactSubmit(e) {
//   e.preventDefault();
//   const form = document.getElementById("contactForm");
//   showToast(
//     "Thank you! Your message has been sent. We will contact you shortly.",
//   );
//   form.reset();
// }

// function handleEnrollSubmit(e) {
//   e.preventDefault();
//   const form = document.getElementById("enrollForm");
//   showToast(
//     "Enrollment submitted successfully! Check your email for next steps.",
//   );
//   form.reset();
//   closeModal();
// }

// Animate chart bars on load
function animateBars() {
  const bars = document.querySelectorAll(".chart-bar-fill");
  bars.forEach((bar) => {
    const target = bar.dataset.width;
    setTimeout(() => {
      bar.style.width = target;
    }, 300);
  });
}

// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in to major sections
document
  .querySelectorAll(
    ".initiative-card, .course-card, .exec-card, .matrix-card, .impact-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Trigger chart animation when hero is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateBars();
        heroObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 },
);

heroObserver.observe(document.querySelector(".hero"));
