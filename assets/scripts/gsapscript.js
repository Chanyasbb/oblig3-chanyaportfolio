gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  // === SMOOTH SCROLL TO FIRST SECTION ===
  const startButton = document.getElementById('startButton');
  const firstSection = document.querySelectorAll('section')[5]; // Adjust index if needed
  if (startButton && firstSection) {
    startButton.addEventListener('click', function () {
      gsap.to(window, {
        duration: 4,
        scrollTo: { y: firstSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    });
  }

  // === EARTH IMAGE CONTROL (Scene 2) ===
  const earthImg = document.querySelector(".scene-2 .earth-fixed img");
  if (earthImg) {
    // Hide Earth initially in case user reloads mid-scroll
    gsap.set(earthImg, { opacity: 0, visibility: "hidden" });

    // Show Earth when entering Scene 2 viewport
    ScrollTrigger.create({
      trigger: ".scene-2",
      start: "top center",
      end: "bottom top",
      onEnter: function () {
        gsap.to(earthImg, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out"
        });
      },
      onLeave: function () {
        gsap.to(earthImg, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onEnterBack: function () {
        gsap.to(earthImg, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out"
        });
      },
      onLeaveBack: function () {
        gsap.to(earthImg, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });

    // Additional ScrollTrigger to fade out Earth when scrolling past Scene 2 bottom
    ScrollTrigger.create({
      trigger: ".scene-2",
      start: "bottom bottom",
      onEnter: function () {
        gsap.to(earthImg, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onLeaveBack: function () {
        gsap.to(earthImg, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  }

  // === EARTH TYPING INTRO (Scene 1) ===
  const dotsSpan = document.getElementById("dots");
  const talkButton = document.getElementById("talkBtn");
  const scrollMessage = document.getElementById("scrollMessage");

  let typing = false;
  let dotInterval;
  let typeInterval;
  const message = "Hello, human. I’ve been feeling unwell...";

  function animateDots() {
    let dotCount = 0;
    dotInterval = setInterval(() => {
      if (dotsSpan) {
        dotsSpan.textContent = ".".repeat(dotCount % 4);
        dotCount++;
      }
    }, 500);
  }

  function typeMessage(text, el, callback) {
    let i = 0;
    if (el) el.textContent = "";

    typeInterval = setInterval(() => {
      if (i < text.length) {
        if (el) el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  animateDots();

  if (talkButton) {
    talkButton.addEventListener("click", function () {
      if (typing) return;
      typing = true;
      clearInterval(dotInterval);

      typeMessage(message, dotsSpan, function () {
        setTimeout(function () {
          if (scrollMessage) {
            scrollMessage.style.display = "block";
            gsap.to(scrollMessage, {
              opacity: 1,
              duration: 1,
              ease: "power2.out"
            });
          }
        }, 2000);
      });
    });
  }

  // === FACT LIST FADE-IN (Scene 2) ===
  gsap.utils.toArray(".facts-list li").forEach(function (fact) {
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

  // === TEXT BLOCKS FADE-IN (Scenes 4–6 etc.) ===
  const textBlocks = document.querySelectorAll('.text-block, .middle-text');
  textBlocks.forEach(function (block) {
    gsap.set(block, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: block,
      start: "top 100%",
      end: "bottom 30%",
      scrub: 0.5,
      onEnter: function () {
        gsap.to(block, { opacity: 1, y: 0, duration: 2, ease: "power2.out" });
      },
      onLeave: function () {
        gsap.to(block, { opacity: 0, y: -20, duration: 2, ease: "power2.in" });
      },
      onEnterBack: function () {
        gsap.to(block, { opacity: 1, y: 0, duration: 2, ease: "power2.out" });
      },
      onLeaveBack: function () {
        gsap.to(block, { opacity: 0, y: 20, duration: 2, ease: "power2.in" });
      }
    });
  });

  // === ACTION INTERACTIVITY (Scene 7) ===
  const actionsTaken = new Set();
  const earthResponseImage = document.getElementById('earthImage');
  const earthReactionText = document.getElementById('earthReaction');

  document.querySelectorAll('.action-card').forEach(function (card) {
    card.addEventListener('click', function () {
      const action = card.dataset.action;

      switch (action) {
        case 'plant':
          earthResponseImage.src = 'assets/images/earth-growing.svg';
          earthReactionText.textContent = "Mmm… I can breathe again.";
          break;
        case 'bike':
          earthResponseImage.src = 'assets/images/earth-breathing.svg';
          earthReactionText.textContent = "Pollution lessens… thank you!";
          break;
        case 'solar':
          earthResponseImage.src = 'assets/images/earth-smiling.svg';
          earthReactionText.textContent = "I feel brighter already!";
          break;
      }

      actionsTaken.add(action);
      if (actionsTaken.size === 3) {
        earthReactionText.textContent = "You’ve made a real difference!";
        gsap.to(earthResponseImage, {
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