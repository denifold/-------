Nazar Kosyk — Portfolio Website

A responsive, single-page personal portfolio built with HTML, Tailwind CSS and vanilla JavaScript. It presents my resume as an interactive website: work experience timeline, projects, skills, education and a contact form.

Live demo: https://denifold.github.io/portfolio/

Features
Fully responsive layout: mobile, tablet and desktop
Dark / light theme with saved preference and no flash on load
Typing effect that cycles through my roles in the hero section
Animated counters and scroll-reveal animations (Intersection Observer)
Expandable experience timeline with keyboard support (Enter / Space)
Project filter (All / Frontend / Data)
Active menu highlighting (scroll spy), scroll progress bar and "back to top" button
Contact form with validation, character counter and mailto: delivery (no backend needed)
Copy email button using the Clipboard API
Accessibility: semantic HTML, ARIA attributes, focus states, prefers-reduced-motion support
Tech Stack
Area	Technology
Markup	HTML5
Styling	Tailwind CSS (CDN) + a small custom stylesheet
Logic	Vanilla JavaScript (ES6+)
Tools	Git, GitHub, GitHub Pages

No build step and no dependencies to install.

Project Structure
.
├── index.html   # page markup and Tailwind config
├── style.css    # custom styles (animations, nav underline, reduced motion)
├── script.js    # all interactivity
└── README.md
Run Locally
Clone the repository:
bash
   git clone https://github.com/denifold/portfolio.git
   cd portfolio
Open index.html in your browser, or use a local server such as the VS Code Live Server extension.

An internet connection is required because Tailwind CSS is loaded from its CDN.

Customization
Photo: replace the src of the hero <img> in index.html with your own image.
Links: update the GitHub and LinkedIn links in index.html.
Content: edit the text directly in index.html. The roles for the typing effect are in the roles array in script.js.
Colors: change the brand palette in the tailwind.config block in index.html.
Deployment

The site is deployed with GitHub Pages from the main branch (root folder). Every push to main updates the live site automatically.

About Me

Computer Science graduate (Lviv Polytechnic National University, 2026) with experience in technical support, e-commerce data handling and teaching front-end basics. I focus on data accuracy, root cause analysis and clear communication, and I'm looking for a role in data curation, data analysis or technical support.

Contact: nazar.kosux@ukr.net

License

Feel free to use this project as a template for your own portfolio.
