// Register GSAP plugins you use
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll when Start button clicked
  const startButton = document.getElementById('startButton');
  const firstScene = document.querySelector('.scene');

  if (startButton && firstScene) {
    startButton.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: firstScene, offsetY: 0 },
        ease: "power2.inOut"
      });
    });
  }

  // Earth image in Scene 2 starts hidden
  const earthImg = document.querySelector('.scene-2 .earth-fixed img');
  if (earthImg) {
    gsap.set(earthImg, { opacity: 0, visibility: 'hidden' });

    ScrollTrigger.create({
      trigger: '.scene-2',
      start: 'top center',
      end: 'bottom top',
      onEnter: () => gsap.to(earthImg, { opacity: 1, visibility: 'visible', duration: 0.5 }),
      onLeave: () => gsap.to(earthImg, { opacity: 0, visibility: 'hidden', duration: 0.5 }),
      onEnterBack: () => gsap.to(earthImg, { opacity: 1, visibility: 'visible', duration: 0.5 }),
      onLeaveBack: () => gsap.to(earthImg, { opacity: 0, visibility: 'hidden', duration: 0.5 }),
    });
  }

  // Back to Top button functionality
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.style.display = 'none';

    backToTopBtn.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: "power2.inOut"
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
  }

  // Animate dots and type message on Hello button click
  const dotsSpan = document.getElementById('dots');
  const talkButton = document.getElementById('talkBtn');
  const scrollMessage = document.getElementById('scrollMessage');

  let typing = false;
  let dotInterval;
  let typeInterval;
  const message = "Hello, human. I’ve been feeling unwell...";

  function animateDots() {
    let dotCount = 0;
    dotInterval = setInterval(() => {
      if (dotsSpan) {
        dotsSpan.textContent = '.'.repeat(dotCount % 4);
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
    talkButton.addEventListener('click', () => {
      if (typing) return;
      typing = true;
      clearInterval(dotInterval);

      typeMessage(message, dotsSpan, () => {
        setTimeout(() => {
          if (scrollMessage) {
            scrollMessage.style.display = 'block';
            gsap.to(scrollMessage, { opacity: 1, duration: 1 });
          }
        }, 2000);
      });
    });
  }

  // Fade in facts on scroll
  gsap.utils.toArray('.facts-list li').forEach(fact => {
    gsap.from(fact, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: fact,
        start: 'top 100%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // Fade in text blocks on scroll
  const textBlocks = document.querySelectorAll('.text-block, .middle-text');
  textBlocks.forEach(block => {
    gsap.set(block, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: block,
      start: 'top 100%',
      end: 'bottom 30%',
      scrub: 0.5,
      onEnter: () => gsap.to(block, { opacity: 1, y: 0, duration: 2 }),
      onLeave: () => gsap.to(block, { opacity: 0, y: -20, duration: 2 }),
      onEnterBack: () => gsap.to(block, { opacity: 1, y: 0, duration: 2 }),
      onLeaveBack: () => gsap.to(block, { opacity: 0, y: 20, duration: 2 }),
    });
  });

  // Action cards update Earth image and text
  const actionsTaken = new Set();
  const earthResponseImage = document.getElementById('earthImage');
  const earthReactionText = document.getElementById('earthReaction');

  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;

      switch (action) {
        case 'plant':
          earthResponseImage.src = 'assets/images/happy-earth.svg';
          earthReactionText.textContent = "Mmm… I can breathe again.";
          break;
        case 'bike':
          earthResponseImage.src = 'assets/images/earth-breathing.svg';
          earthReactionText.textContent = "Pollution lessens… thank you!";
          break;
        case 'solar':
          earthResponseImage.src = 'assets/images/hopefull-earth.svg';
          earthReactionText.textContent = "I feel brighter already!";
          break;
      }

      actionsTaken.add(action);
      if (actionsTaken.size === 3) {
        earthReactionText.textContent = "You’ve made a real difference!";
        gsap.to(earthResponseImage, {
          scale: 1.1,
          duration: 1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        });
      }
    });
  });
});