/**
 * BANTY_FIT — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initCardMotion();
  initCounters();
  initFAQ();
  initContactForm();
  setActiveNavLink();

  initParallaxHero();
});

/* ---- Header scroll effect ---- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile navigation ---- */
function initMobileNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll motion for service & review cards ---- */
function initCardMotion() {
  const cards = document.querySelectorAll('.service-card.reveal, .review-card.reveal');
  if (!cards.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    cards.forEach(card => card.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  );

  cards.forEach(card => observer.observe(card));
}

/* ---- Animated counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* ---- FAQ accordion ---- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            const formSuccess = document.querySelector(".form-success");
            form.classList.add("hidden");

            if (formSuccess) {
                formSuccess.classList.add("visible");
            }

            form.reset();
        } else {
            alert("Ошибка отправки. Попробуйте ещё раз.");
            console.error(result);
        }
    } catch (error) {
        alert("Не удалось отправить заявку.");
        console.error(error);
    }
});
}

/* ---- Active nav link ---- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav__link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
/* ---- Premium Hero Parallax ---- */
function initParallaxHero() {
  const hero = document.querySelector('.hero');
  const glow = document.querySelector('.hero__glow');
  const glowLeft = document.querySelector('.hero__glow--left');

  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    hero.style.transform = `translateY(${scrolled * 0.15}px)`;

    if (glow) {
      glow.style.transform =
        `translateY(${scrolled * 0.2}px) scale(1.05)`;
    }

    if (glowLeft) {
      glowLeft.style.transform =
        `translateY(${scrolled * 0.12}px) scale(1.05)`;
    }
  });
}/* ---- Card Glow Effect ---- */
document.querySelectorAll('.benefit-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--mouse-x',
      `${e.clientX - rect.left}px`
    );

    card.style.setProperty(
      '--mouse-y',
      `${e.clientY - rect.top}px`
    );
  });
});
/* ---- Card Glow Effect ---- */
document.querySelectorAll('.benefit-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--mouse-x',
      `${e.clientX - rect.left}px`
    );

    card.style.setProperty(
      '--mouse-y',
      `${e.clientY - rect.top}px`
    );
  });
});
/* ---- Hero Word Rotation ---- */
const words = [
  "СИЛА",
  "ДИСЦИПЛИНА",
  "РЕЗУЛЬТАТ",
  "ТРАНСФОРМАЦИЯ"
];

const rotatingWord = document.getElementById("rotating-word");

if(rotatingWord){

  let index = 0;

  setInterval(() => {

    rotatingWord.classList.add("word-hide");

    setTimeout(() => {

      index++;

      if(index >= words.length){
        index = 0;
      }

      rotatingWord.textContent = words[index];

      rotatingWord.classList.remove("word-hide");
      rotatingWord.classList.add("word-show");

      setTimeout(() => {
        rotatingWord.classList.remove("word-show");
      },600);

    },500);

  },3000);
}

  const bgText = document.querySelector('.hero-bg-text');

  window.addEventListener('scroll', () => {
  
    if(!bgText) return;
  
    const scroll = window.scrollY;
  
    bgText.style.transform =
      `translate(-50%, calc(-50% + ${scroll * 0.12}px))`;
  
  });
  /* ---- Premium Hero Parallax ---- */

const hero = document.querySelector('.hero');

if(hero){

  document.addEventListener('mousemove',(e)=>{

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    document.querySelectorAll('.hero-bg-text').forEach(el=>{

      el.style.transform =
      `translate(${x}px, ${y}px)`;

    });

  });

}/* ---- Reveal Sections ---- */

const sections = document.querySelectorAll('.reveal-section');

const revealObserver = new IntersectionObserver(

(entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add('visible');

    }

  });

},

{
  threshold:0.15
}

);

sections.forEach(section=>{
  revealObserver.observe(section);
});
/* ---- Premium Loader ---- */

window.addEventListener("load",()=>{

  const loader = document.querySelector(".loader");

  if(loader){

    setTimeout(()=>{

      loader.classList.add("hidden");

    },2000);

  }

});
document.querySelectorAll('.review-card').forEach(card=>{

  card.addEventListener('mousemove',(e)=>{

    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--mouse-x',
      `${e.clientX - rect.left}px`
    );

    card.style.setProperty(
      '--mouse-y',
      `${e.clientY - rect.top}px`
    );

  });

});
/* ---- Reviews Scroll Depth ---- */

const reviewCards = document.querySelectorAll('.review-card');

function animateReviewsDepth(){
  reviewCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const distance = Math.abs(rect.top + rect.height / 2 - center);
    const intensity = Math.max(0, 1 - distance / center);

    card.style.setProperty('--review-depth', intensity);

    if(intensity > 0.55){
      card.style.transform = `translateY(-${intensity * 10}px) scale(${1 + intensity * 0.025})`;
    }
  });
}

window.addEventListener('scroll', animateReviewsDepth, { passive:true });
animateReviewsDepth();
/* ---- Service Cards Glow ---- */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});
/* ---- Premium Stats Tilt ---- */

document.querySelectorAll('.premium-stat').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - .5) * 10;
    const rotateX = (y / rect.height - .5) * -10;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
/* ---- Service Card 3D Mouse Tilt ---- */

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-14px) scale(1.025)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
/* ---- Soft Services Scroll ---- */

const softServiceCards = document.querySelectorAll('.service-card');

function updateSoftServicesScroll(){
  softServiceCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const cardCenter = rect.top + rect.height / 2;

    const distance = (cardCenter - center) / center;
    const limited = Math.max(-1, Math.min(1, distance));

    const side = index % 2 === 0 ? -1 : 1;

    card.style.transform = `
      translateY(${limited * -12}px)
      rotateY(${limited * side * 3}deg)
      scale(${1 - Math.abs(limited) * 0.025})
    `;

    card.style.opacity = 1 - Math.abs(limited) * 0.08;
    card.style.filter = `blur(${Math.abs(limited) * 1.2}px)`;
  });
}

window.addEventListener('scroll', updateSoftServicesScroll, { passive:true });
window.addEventListener('resize', updateSoftServicesScroll);
updateSoftServicesScroll();
/* ---- BANTY_FIT Cinematic Loader ---- */

window.addEventListener('load', () => {
  const loader = document.querySelector('.bf-loader');

  if(loader){
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2600);
  }
});
/* ---- Global Premium Scroll Reveal ---- */

const revealItems = document.querySelectorAll(
  '.section, .page-hero, .dumbbell-scene, .premium-stats, .services-grid, .reviews-grid, .cta-banner'
);

revealItems.forEach((item, index) => {
  item.classList.add('scroll-reveal');

  if(index % 3 === 1) item.classList.add('delay-1');
  if(index % 3 === 2) item.classList.add('delay-2');
});

const globalRevealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold:.12
});

revealItems.forEach(item=>{
  globalRevealObserver.observe(item);
});
/* ===== EARTH INTRO ===== */

let introAlreadyStarted = false;

window.addEventListener('load', () => {
  if (introAlreadyStarted) return;
  introAlreadyStarted = true;

  const intro = document.getElementById('introVideo');
  const movie = document.getElementById('introMovie');

  if (window.innerWidth <= 768) {
    if (intro) intro.classList.add('hidden');
    document.body.classList.remove('intro-playing');
    document.body.classList.add('intro-finished');
    return;
  }

  if (!intro || !movie) return;

  document.body.classList.add('intro-playing');

  const closeIntro = () => {
    intro.classList.add('hidden');
    document.body.classList.remove('intro-playing');
    document.body.classList.add('intro-finished');

    movie.pause();
    movie.currentTime = 0;
  };

  movie.addEventListener('ended', closeIntro, { once: true });

  movie.currentTime = 0;
  movie.play().catch(closeIntro);

  setTimeout(closeIntro, 3600);
});
/* =====================================================
   PARTNERS — SCROLL GALLERIES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const desktopMQ = window.matchMedia("(min-width: 981px)");

  function initScrollGallery(showcase, imageSelector) {

    const images = showcase.querySelectorAll(imageSelector);
    const info = showcase.querySelector(".partner-info");

    if (!images.length || !info) return null;

    let currentIndex = -1;

    function setActiveImage(index) {

      if (index === currentIndex) return;

      currentIndex = index;

      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });

      showcase.dispatchEvent(
        new CustomEvent("gallerychange", {
          detail: { index, total: images.length }
        })
      );

    }

    function updateGallery() {

      if (!desktopMQ.matches) return;

      const rect = info.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollInside = window.scrollY - sectionTop;
      const maxScroll = info.offsetHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setActiveImage(0);
        return;
      }

      const progress = Math.max(
        0,
        Math.min(1, scrollInside / maxScroll)
      );

      const index = Math.min(
        images.length - 1,
        Math.floor(progress * images.length)
      );

      setActiveImage(index);

    }

    window.addEventListener("scroll", updateGallery, { passive: true });
    desktopMQ.addEventListener("change", updateGallery);
    updateGallery();

    return { setActiveImage, images };

  }


  /* --- Reveal all partner sections --- */

  document.querySelectorAll(".partner-showcase").forEach((section) => {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          section.classList.add("show");
        }

      });

    }, { threshold: 0.12 });

    observer.observe(section);

  });


  /* --- Text reveal for partner blocks --- */

  document.querySelectorAll(".partner-info").forEach((info) => {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          info.classList.add("reveal");
        }

      });

    }, { threshold: 0.2 });

    observer.observe(info);

  });


  /* --- GeneticLab --- */

  const geneticShowcase =
    document.querySelector(".partner-showcase:not(.partner-showcase--auto)");

  if (geneticShowcase) {
    initScrollGallery(
      geneticShowcase,
      ".partner-gallery--desktop .partner-image"
    );
  }


  /* --- Brand_auto --- */

  const autoShowcase =
    document.querySelector(".partner-showcase--auto");

  if (autoShowcase) {

    const autoGallery =
      autoShowcase.querySelector(".partner-gallery--desktop");

    const galleryApi = initScrollGallery(
      autoShowcase,
      ".partner-gallery--desktop .partner-image"
    );

    if (autoGallery && galleryApi) {

      const indicator = document.createElement("div");
      indicator.className = "auto-gallery-indicator";

      galleryApi.images.forEach((_, index) => {

        const dot = document.createElement("span");

        if (index === 0) dot.classList.add("active");

        indicator.appendChild(dot);

      });

      autoGallery.appendChild(indicator);

      const counter = document.createElement("div");
      counter.className = "auto-gallery-counter";
      counter.textContent =
        `01 / ${String(galleryApi.images.length).padStart(2, "0")}`;

      autoGallery.appendChild(counter);

      autoShowcase.addEventListener("gallerychange", (event) => {

        const { index, total } = event.detail;

        indicator.querySelectorAll("span").forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });

        counter.textContent =
          `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

      });

    }

    const autoRevealObserver = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          autoShowcase.classList.add("auto-visible");
        }

      });

    }, { threshold: 0.15 });

    autoRevealObserver.observe(autoShowcase);

  }


  /* --- Promo code --- */

  const copyPromo = document.getElementById("copyPromo");
  const promoText = document.getElementById("promoText");

  if (copyPromo && promoText) {

    copyPromo.addEventListener("click", () => {

      navigator.clipboard.writeText(promoText.textContent.trim());

      const message = document.querySelector(".copy-message");

      if (message) {
        message.classList.add("show");
        setTimeout(() => message.classList.remove("show"), 2500);
      }

      copyPromo.textContent = "Скопировано ✓";

      setTimeout(() => {
        copyPromo.textContent = "Скопировать промокод";
      }, 2000);

    });

  }


  /* --- Mobile swipers --- */

  function initPartnerSwipers() {

    if (typeof Swiper === "undefined") return;

    const isMobile = !desktopMQ.matches;

    document.querySelectorAll(".partner-swiper, .auto-swiper").forEach((el) => {

      const paginationEl =
        el.querySelector(".swiper-pagination");

      if (isMobile && !el.swiper) {

        new Swiper(el, {
          effect: "fade",
          fadeEffect: { crossFade: true },
          speed: 900,
          grabCursor: true,
          pagination: {
            el: paginationEl,
            clickable: true
          }
        });

      } else if (!isMobile && el.swiper) {

        el.swiper.destroy(true, true);

      }

    });

  }

  if (document.querySelector(".partner-swiper, .auto-swiper")) {
    initPartnerSwipers();
    desktopMQ.addEventListener("change", initPartnerSwipers);
  }

});

/* =====================================================
   GIVEAWAY ENVELOPE OPEN
===================================================== */

const giveawayEnvelope = document.querySelector("#giveawayEnvelope");

console.log("Giveaway:", giveawayEnvelope);


function createGiftParticles(){

    const rect = giveawayEnvelope.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + 100;


    for(let i = 0; i < 40; i++){

        const spark = document.createElement("span");

        spark.className = "spark";


        spark.style.left = centerX + "px";
        spark.style.top = centerY + "px";


        const x = (Math.random() - 0.5) * 350;
        const y = -(Math.random() * 250 + 80);


        spark.style.setProperty("--x", x + "px");
        spark.style.setProperty("--y", y + "px");


        document.body.appendChild(spark);


        setTimeout(()=>{
            spark.remove();
        },1200);

    }

}


function createGiftFlash(){

    const flash = document.createElement("div");

    flash.className = "giveaway-flash";

    document.body.appendChild(flash);


    setTimeout(()=>{
        flash.remove();
    },700);

}



if(giveawayEnvelope){

    giveawayEnvelope.addEventListener("click",()=>{

        giveawayEnvelope.classList.toggle("open");


        if(giveawayEnvelope.classList.contains("open")){

            createGiftParticles();

            createGiftFlash();

        }

    });

}