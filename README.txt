Chanya´s oblig 3 implements and changes 

INFO:
This my version oblig 3 where i experimented with more interactivity on the site and js!
I want to make something i am proud of and felt something that was me and show my passion for web dev.
So for oblig 3 implements i kept the codes, concpet and the same story style but used my styles into this. 


what i did: 
- I used the current js codes i wanted to make and implement this project (a bit started froms scratch) to how i would make it.
something that felt more my style and me. I wanted to make it fun and interactive.
- i wanted to grab attention and make it more fun and informing than just making it a story. 
- instead i made it like a game where it is more modern and pleasing to a wider audience. 
- As someone who likes playing games like Terreria and Stardew Valley this style really inspired me to make this. 

the images:
- i hand drew these on this website: 
https://www.piskelapp.com/p/create/sprite/
- export it, add to illustrator and turn them into svgs!


Story & concept: 
- I kept the same concept as the first submission which was SDG 13 -climate action and earth not being listened to.
- I wanted this whole site to be more interactive along the way and keep it simple and lighter on the animations, js and images.
- I wanted it to be educational while also targetting youger audience from age 13+ 
- I made it look and feel like a game that is a familiar aesthetic and art style.  


Html: 
- same structure and content, just more spesific and using more classes 
- i wrapped everyting in main this time for reabability and used a validator to help. 

SCSS Overview
Text Box Styling:
- Instead of using images for speech bubbles or text boxes, I experimented with pure SCSS to create these elements. This approach provides more flexibility for styling and responsiveness without relying on image assets.
Responsive Design:
- Specific containers and components are styled differently using media queries to ensure they look good and function well on smaller screens. This includes adjusting widths, stacking layouts vertically, resizing images, and tweaking font sizes for better readability and usability on mobile devices.
Variables for Colors and Typography:
- The SCSS uses variables for primary and secondary colors, background, and text colors to maintain consistent theming throughout the site. Fonts for body text and titles are set as variables for easy global management.
Base Styles:
- The base font sizes, margins, and background colors are set on the html and body tags. Headings use a separate font family for clear hierarchy.
Hero Section:
- The .screen--hero class creates a full viewport hero area with a background image, floating earth and cloud animations, and text content aligned side-by-side on larger screens. The start button style here is reused elsewhere for consistency.
Animations:
- Keyframes for floating clouds and the earth create subtle continuous movement, adding life to the hero section and other scenes.
	•	Scene Layouts:
- Each scene is styled as a flex container with specific arrangements. For example:
	•	Scene 1 uses a two-column layout with an earth image and speech bubble text.
	•	Scene 2 has a fixed-position earth image beside a facts list, arranged horizontally on larger screens and stacked vertically on smaller screens.
	•	Accessibility - Reduced Motion:
A media query listens for the user’s system preference for reduced motion and disables or greatly reduces all animations and transitions accordingly. This respects users who may be sensitive to motion effects.
Responsive Adjustments:
- Media queries adjust layout, image sizes, text sizes, and button widths to maintain usability and visual appeal on screens narrower than 600px.



JS: 
GSAP Animations:
- The site uses GSAP (GreenSock Animation Platform) for smooth and performant animations, such as fading elements in and out and floating effects on the earth and clouds.
Scroll-triggered Animations:
- Using GSAP’s ScrollTrigger plugin, text boxes and other elements appear and disappear as the user scrolls through different sections, creating an engaging storytelling experience.
Smooth Scrolling:
- The “Start” button triggers smooth scrolling to a specific content section, improving navigation flow and user experience.
Interactive Earth Responses:
- When the user clicks certain buttons (action cards), the earth reacts with different images and messages, simulating a conversational or reactive interface.
Back to Top Button:
- A button appears after scrolling down a bit, allowing users to smoothly scroll back to the top of the page.



List of Animations
	•	Float: Smooth up-and-down movement applied to elements like the earth and clouds.
	•	Blink: Cursor blinking effect used in the text box to simulate typing.
	•	Pulse: Subtle scaling effect that makes elements gently grow and shrink, like the sun icon.

LIVE SERVER: https://chanyas.folk.ntnu.no/oblig3-chanspixelworld/index.html
OLD LIVE SERVER: https://chanyas.folk.ntnu.no/oblig3-group-3.0/index.html