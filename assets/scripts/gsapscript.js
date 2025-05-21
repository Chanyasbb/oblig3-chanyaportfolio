// All GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  // === SMOOTH SCROLL TO FIRST SECTION ===
  const startButton = document.getElementById('startButton'); 
  if (startButton) {
    startButton.addEventListener('click', function () {
      const firstSection = document.querySelectorAll('section')[5]; 
      if (firstSection) {
        gsap.to(window, {
          duration: 4,
          scrollTo: { y: firstSection, offsetY: 0 },
          ease: "power2.inOut"
        }); 
      }
    });
  }

  // === EARTH TYPING INTRO (Scene 1) ===
  const dotsSpan = document.getElementById("dots");
  const button = document.getElementById("talkBtn");
  const scrollMessage = document.getElementById("scrollMessage");

  let typing = false;
  let dotInterval;
  let typeInterval;
  const message = "Hello, human. I’ve been feeling unwell...";

  function animateDots() {
    let dotCount = 0;
    dotInterval = setInterval(() => {
      dotsSpan.textContent = ".".repeat(dotCount % 4);
      dotCount++;
    }, 500);
  }

  function typeMessage(text, el, callback) {
    let i = 0;
    el.textContent = "";

    typeInterval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  animateDots();

  if (button) {
    button.addEventListener("click", () => {
      if (typing) return;
      typing = true;
      clearInterval(dotInterval);

      typeMessage(message, dotsSpan, () => {
        setTimeout(() => {
          scrollMessage.style.display = "block";
          gsap.to(scrollMessage, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          });
        }, 2000);
      });
    });
  }

  // === FACT LIST FADE-IN (Scene 2) ===
  gsap.utils.toArray(".facts-list li").forEach((fact) => {
    gsap.from(fact, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: fact,
        start: "top 100%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // === EARTH IMAGE FADE-IN ON SCROLL (Scene 2) ===
  gsap.timeline({
    scrollTrigger: {
      trigger: ".scene-2",
      start: "top center",
      end: "bottom top",
      scrub: true,
    }
  })
  .fromTo(".scene-2 .earth-fixed img",
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
  );

  // === TEXT BLOCKS FADE-IN (Scenes 4–6 etc.) ===
  const textBlocks = document.querySelectorAll('.text-block, .middle-text');
  textBlocks.forEach(block => {
    gsap.set(block, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: block,
      start: "top 100%",
      end: "bottom 30%",
      scrub: 0.5,
      onEnter: () => {
        gsap.to(block, { opacity: 1, y: 0, duration: 2, ease: "power2.out" });
      },
      onLeave: () => {
        gsap.to(block, { opacity: 0, y: -20, duration: 2, ease: "power2.in" });
      },
      onEnterBack: () => {
        gsap.to(block, { opacity: 1, y: 0, duration: 2, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to(block, { opacity: 0, y: 20, duration: 2, ease: "power2.in" });
      }
    });
  });

  gsap.registerPlugin(ScrollTrigger);

gsap.to(".scene3-earth", {
  scrollTrigger: {
    trigger: ".scene-3",
    start: "top center",
    end: "bottom top",
    scrub: true
  },
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power2.out"
});

  // === ACTION INTERACTIVITY (Scene 7) ===
  const actionsTaken = new Set();
  const earthImage = document.getElementById('earthImage');
  const reactionText = document.getElementById('earthReaction');

  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;

      // Change Earth image and text
      switch (action) {
        case 'plant':
          earthImage.src = 'assets/images/earth-growing.svg';
          reactionText.textContent = "Mmm… I can breathe again.";
          break;
        case 'bike':
          earthImage.src = 'assets/images/earth-breathing.svg';
          reactionText.textContent = "Pollution lessens… thank you!";
          break;
        case 'solar':
          earthImage.src = 'assets/images/earth-smiling.svg';
          reactionText.textContent = "I feel brighter already!";
          break;
      }

      // Track unique actions
      actionsTaken.add(action);
      if (actionsTaken.size === 3) {
        reactionText.textContent = "You’ve made a real difference!";
        gsap.to(earthImage, {
          scale: 1.1,
          duration: 1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      }
    });
  });

});