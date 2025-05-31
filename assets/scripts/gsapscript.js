document.addEventListener('DOMContentLoaded', function () {

  // first set up of ScrollTrigger 
  // When user press the "Start" button is clicked, scroll smoothly to the first main section.
  const startButton = document.getElementById('startButton');
  const firstSection = document.querySelector('.scene');

  if (startButton && firstSection) {
    startButton.addEventListener('click', function () {
      gsap.to(window, {
        duration: 4,
        scrollTo: { y: firstSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    });
  }

  // This is for to show or hide the Earth image in Scene 2 depending on scroll position. 
  // I added this because then the image will show up when the user scrolls to the Scene 2 section and past 
  const earthImg = document.querySelector(".scene-2 .earth-fixed img");
  if (earthImg) {
    gsap.set(earthImg, { opacity: 0, visibility: "hidden" });

    ScrollTrigger.create({
      trigger: ".scene-2",
      start: "top center",
      end: "bottom top",
      onEnter: () => gsap.to(earthImg, { opacity: 1, visibility: "visible", duration: 0.5 }),
      onLeave: () => gsap.to(earthImg, { opacity: 0, visibility: "hidden", duration: 0.5 }),
      onEnterBack: () => gsap.to(earthImg, { opacity: 1, visibility: "visible", duration: 0.5 }),
      onLeaveBack: () => gsap.to(earthImg, { opacity: 0, visibility: "hidden", duration: 0.5 }),
    });

    ScrollTrigger.create({
      trigger: ".scene-2",
      start: "bottom bottom",
      onEnter: () => gsap.to(earthImg, { opacity: 0, visibility: "hidden", duration: 0.5 }),
      onLeaveBack: () => gsap.to(earthImg, { opacity: 1, visibility: "visible", duration: 0.5 }),
    });
  }

  // Animate dots and type a message when user clicks the talk button in Scene 1.
  // cool animation of dots and typing effect i played aroun with. 
  const dotsSpan = document.getElementById("dots");
  const talkButton = document.getElementById("talkBtn");
  const scrollMessage = document.getElementById("scrollMessage");

  let typing = false;
  let dotInterval; // Interval for the dots animation the effect
  let typeInterval;
  const message = "Hello, human. I’ve been feeling unwell..."; 

  function animateDots() {
    let dotCount = 0;
    dotInterval = setInterval(() => {
      if (dotsSpan) {
        dotsSpan.textContent = ".".repeat(dotCount % 4); // Cycle through 0 to 3 dots i wanted to make it look alive and that there is something happening.
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

//This tells the user to continue (guideance abit) 

  if (talkButton) {
    talkButton.addEventListener("click", () => {
      if (typing) return;
      typing = true;
      clearInterval(dotInterval);

      typeMessage(message, dotsSpan, () => {
        setTimeout(() => {
          if (scrollMessage) {
            scrollMessage.style.display = "block";
            gsap.to(scrollMessage, { opacity: 1, duration: 1 });
          }
        }, 2000);
      });
    });
  }

  // Animate each fact item to fade in when scrolled into view.
  gsap.utils.toArray(".facts-list li").forEach(fact => {
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

  // Fade in text blocks as they enter the viewport and fade out when leaving.
  const textBlocks = document.querySelectorAll('.text-block, .middle-text');
  textBlocks.forEach(block => {
    gsap.set(block, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: block,
      start: "top 100%",
      end: "bottom 30%",
      scrub: 0.5,
      onEnter: () => gsap.to(block, { opacity: 1, y: 0, duration: 2 }),
      onLeave: () => gsap.to(block, { opacity: 0, y: -20, duration: 2 }),
      onEnterBack: () => gsap.to(block, { opacity: 1, y: 0, duration: 2 }),
      onLeaveBack: () => gsap.to(block, { opacity: 0, y: 20, duration: 2 }),
    });
  });

  // Handle action cards clicks to update Earth’s response image and text.
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
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      }
    });
  });

  // Back to top button: show on scroll down and scroll smoothly to top on click.
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.style.display = 'none'; // Hide button initially

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
  }

});