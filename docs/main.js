// Toggle mobile menu button and icon
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  // open/close nav and swap the icon class
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Close nav when a link inside nav is clicked (mobile behavior)
navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Highlight effect on header H1 that follows the mouse via CSS variables
const headerH1 = document.getElementById('highlightText');

if (headerH1) {
  // Initialize CSS vars to a safe default
  headerH1.style.setProperty('--mouse-x', '100%');
  headerH1.style.setProperty('--mouse-y', '100%');

  headerH1.addEventListener('mousemove', (e) => {
    // Calculate mouse position relative to element and set CSS vars
    const rect = headerH1.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    headerH1.style.setProperty('--mouse-x', `${x}px`);
    headerH1.style.setProperty('--mouse-y', `${y}px`);
  });
}


// Feature slides (carousel) with dots and autoplay
const slides = document.querySelectorAll('.feature__slide');
const slidesContainer = document.querySelector('.feature__slides');
const dotsContainer = document.querySelector('.feature__dots');
let currentIndex = 0;
const slideCount = slides.length;
let autoplayInterval;

// Create dot controls dynamically and wire click handlers
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('feature__dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.feature__dot');

function goToSlide(index) {
  // Move slides container to show the requested slide
  currentIndex = index;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
  resetAutoplay();
}

function updateDots() {
  // Update active state on dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  // Advance to next slide (wrap around)
  currentIndex = (currentIndex + 1) % slideCount;
  goToSlide(currentIndex);
}

function startAutoplay() {
  // Start automatic slide advance every 10s
  autoplayInterval = setInterval(nextSlide, 10000);
}

function resetAutoplay() {
  // Restart autoplay (useful after manual navigation)
  clearInterval(autoplayInterval);
  startAutoplay();
}

startAutoplay();


// ScrollReveal configuration and usage for entrance animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Reveal header container elements
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about-label", {
  ...scrollRevealOption,
  delay: 200,
  viewFactor: 0.01, // start when a tiny portion enters viewport
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".about-summary", {
  ...scrollRevealOption,
  delay: 400,
  viewFactor: 0.01,
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".about-stats", {
  ...scrollRevealOption,
  delay: 600,
  viewFactor: 0.01,
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// Reveal lists of cards with an interval between each
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  interval: 100,
});

// About Us Page: Mission & Vision
ScrollReveal().reveal(".about-mv__left", {
  ...scrollRevealOption,
  origin: "left",
  delay: 200,
});
ScrollReveal().reveal(".about-mv__right", {
  ...scrollRevealOption,
  origin: "right",
  delay: 400,
});
ScrollReveal().reveal(".about-mv__left2", {
  ...scrollRevealOption,
  origin: "left",
  delay: 200,
});
ScrollReveal().reveal(".about-mv__right2", {
  ...scrollRevealOption,
  origin: "right",
  delay: 400,
});

// About Us Page: Our Values
ScrollReveal().reveal(".values-info", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".value-card", {
  ...scrollRevealOption,
  interval: 200,
});


// Make room cards clickable and keyboard-accessible
document.addEventListener('DOMContentLoaded', () => {
  const roomCards = document.querySelectorAll('.room__card');

  roomCards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      // Read data-room-id and navigate to details page
      const roomId = card.getAttribute('data-room-id');
      if (roomId) {
        window.location.href = `room-details.html?id=${encodeURIComponent(roomId)}`;
      }
    });

    // For keyboard accessibility (Enter or Space key)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});

// Expand hostel cards on hover
document.querySelectorAll('.hostel-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('expanded');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('expanded');
  });
});

// IntersectionObserver to animate headings/paragraphs in .bg-photo-section as they enter viewport
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".bg-photo-section h2");
  const paragraphs = document.querySelectorAll(".bg-photo-section p");

  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class and stop observing that element
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  headings.forEach(el => observer.observe(el));
  paragraphs.forEach(el => observer.observe(el));
});

// Intersection Observer to fade in overlay text on scroll into view for the intro section
const introSection = document.getElementById('introSection');
const overlay = document.getElementById('overlayContent');
const video = document.getElementById('introVideo');
const toggleBtn = document.getElementById('toggleBtn');

if (introSection && video && toggleBtn) {
  const options = {
    root: null,
    threshold: 0.5,
  };

  const introObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When intro section is at least 50% visible, show overlay text
        introSection.classList.add('show');
      } else {
        // If not intersecting and video isn't active, hide overlay
        if (!introSection.classList.contains('video-active')) {
          introSection.classList.remove('show');
        }
      }
    });
  }, options);

  introObserver.observe(introSection);

  let playing = false;

  // Toggle play/pause of intro video and adjust overlay classes
  toggleBtn.addEventListener('click', () => {
    if (!playing) {
      introSection.classList.add('video-active');
      introSection.classList.remove('show');
      video.play();
      playing = true;
    } else {
      video.pause();
      introSection.classList.remove('video-active');
      introSection.classList.add('show');
      playing = false;
    }
  });

  // Ensure video starts paused and possibly blurred/overlaid
  video.pause(); // Start paused and blurred
}

const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// --- GOOGLE MAP INITIALIZATION ---
window.initMap = function () {
  const mapElement = document.getElementById("map");
  if (!mapElement) return; // Stop if map div not found

  const nyali = { lat: -4.0346, lng: 39.6995 }; // Nyali Estate, Mombasa

  const map = new google.maps.Map(mapElement, {
    center: nyali,
    zoom: 15,
    styles: [
      { featureType: "water", stylers: [{ color: "#245401" }] },
      { featureType: "landscape", stylers: [{ color: "#f6ac0f" }] },
      { featureType: "road", stylers: [{ color: "#357d01" }] },
    ],
  });

  new google.maps.Marker({
    position: nyali,
    map,
    title: "Nyali Estate, Mombasa",
  });
};

// --- DYNAMICALLY LOAD GOOGLE MAPS SCRIPT ---
(function loadGoogleMaps() {
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) return; // Avoid duplicates

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyADsn9oO6AC1SKgikn6adoZHrfh77yDA0U&callback=initMap"; // Dummy key for testing
  script.async = true;
  document.head.appendChild(script);
})();
// --- END GOOGLE MAP INITIALIZATION ---


const section = document.getElementById('animatedSection');
const text1 = document.getElementById('text1');
const button = document.getElementById('seeStoreButton');

if (section && text1 && button) {
  // Ensure button hidden initially and positioned
  button.style.opacity = '0.5';

  // Intersection observer to detect when section is at least 50% visible
  const animatedSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger text1 animation sliding down
        text1.classList.add('visible');

        // After text1 finishes sliding down, trigger button
        text1.addEventListener('transitionend', () => {
          button.classList.add('visible');
        }, { once: true });

        // Stop observing after first trigger
        animatedSectionObserver.unobserve(section);
      }
    });
  }, { threshold: 0.5 });

  animatedSectionObserver.observe(section);
}

const slider = document.querySelector('.carousel-wrapper');

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}
// Count up animation
function countUp(element, target, duration = 2000) {
  let start = 0;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  function step() {
    start++;
    element.textContent = start + "+";
    if (start < target) {
      setTimeout(step, stepTime);
    }
  }
  step();
}

// Trigger when page loads
window.addEventListener('load', () => {
  const numbers = document.querySelectorAll('.stat-number');
  numbers.forEach((numEl) => {
    const target = parseInt(numEl.getAttribute('data-target'), 10);
    countUp(numEl, target, 1500);
  });
});

// Shader loading animation (vanilla JS version)

let camera, scene, renderer, uniforms;
let canvas = document.getElementById("shader-canvas");

function initShader() {
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.position.z = 1;

  const geometry = new THREE.PlaneGeometry(2, 2);

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform vec2 resolution;
    uniform float time;

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / 
                min(resolution.x, resolution.y);

      float t = time * 0.05;
      float lineWidth = 0.002;

      vec3 color = vec3(0.0);

      for(int j = 0; j < 3; j++){
        for(int i = 0; i < 5; i++){
          color[j] += lineWidth * float(i*i) / 
                      abs(fract(t - 0.01*float(j) + float(i)*0.01)*5.0 
                      - length(uv) 
                      + mod(uv.x+uv.y, 0.2));
        }
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  uniforms = {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  resizeShader();
  window.addEventListener("resize", resizeShader);

  animate();
}

function resizeShader() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  uniforms.resolution.value.set(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value += 0.03;
  renderer.render(scene, camera);
}

initShader();

// ▶ Hide loading screen when page fully loads
window.addEventListener("load", () => {
  const loader = document.getElementById("shader-loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 1000);
  }
});



// Reveal Team Section Header
ScrollReveal().reveal(".section-grid .caption", {
  ...scrollRevealOption,
  delay: 200,
});
ScrollReveal().reveal(".section-grid .title", {
  ...scrollRevealOption,
  delay: 400,
});
ScrollReveal().reveal(".section-grid .subtitle", {
  ...scrollRevealOption,
  delay: 600,
});
ScrollReveal().reveal(".section-grid .description", {
  ...scrollRevealOption,
  delay: 800,
});
