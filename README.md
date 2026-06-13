# NayePankh Foundation Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

A modern, high-performance, and fully responsive static website built for **NayePankh Foundation** to showcase its humanitarian drives, volunteer networks, and community impact initiatives.

**Live Demo:** [https://punittak2005.github.io/nayepankh-webpage/](https://punittak2005.github.io/nayepankh-webpage/)  
**GitHub Repository:** [https://github.com/punittak2005/nayepankh-webpage](https://github.com/punittak2005/nayepankh-webpage)

---

## 📋 Project Overview

NayePankh Foundation is a youth-led NGO establishing grassroots social change parameters across Indian communities. This web portal provides an overview of the NGO's narrative, active sectors, and achievements. Visitors can explore impact metrics, view moments of transformation in the interactive gallery, read FAQs, and sign up as volunteers or contact the headquarters directly.

---

## ✨ Features

### 1. Unified Responsive Design
* Optimized for a seamless experience on all screens (Desktops, Laptops, Tablets, and Mobile Devices).
* Clean flexbox and grid layouts ensuring a consistent viewing experience.

### 2. Native System-Adaptive Dark Mode
* Automatically adapts to the user's system preferences (dark/light theme).
* Toggle theme instantly via the navbar action button with a smooth color fade transition.

### 3. Hardware-Accelerated Animations
* Fluent, lightweight reveal animations on scroll using the custom IntersectionObserver script.
* Hover zoom, elevations, and scale easing on cards, icons, and buttons.

### 4. Moments of Transformation Gallery
* High-definition custom impact photography displaying food drives, educational kits, and healthcare camps.
* Spacious 3-column grid layout on desktop, converting to 2 columns on tablets and 1 column on mobiles.
* Full-screen interactive Media Lightbox with keyboard navigation (`ArrowLeft`/`ArrowRight`), touch swipe support, zoom effects, caption syncing, and body-scroll locking.

### 5. Voices of Impact (Testimonials)
* Frosted glassmorphic (`backdrop-filter: blur(12px)`) testimonial cards with colorful letter initials and verified status badges.
* Integrated loop-free auto-sliding engine syncing with an autoplay progress bar that pauses on hover/focus and resumes dynamically.

### 6. Interactive FAQ Search Engine
* 20 detailed FAQs covering the foundation, volunteering, donations, and events.
* Real-time query search filtering questions and answers, highlighting keywords dynamically with a "No Results Found" fallback.
* Fully keyboard navigable and screen-reader friendly (WAI-ARIA specifications).

### 7. Volunteer Onboarding Registration Form
* Clean user input interface on the Join Drive page (`volunteer.html`).
* Custom inline loading states and transition effects on submit: hides the form, shows a spinner, and slides up a green success notification card.
* Quick resetting loop enabling users to "Register Another Volunteer" without page reloads.

### 8. Premium Contact Page
* Interactive, responsive Google Maps embed of Udaipur's Headquarters.
* Call-to-action buttons below the map for **Get Directions** (opening routing in a new tab) and **Contact Office** (`tel:+919876543210`).
* Clickable details for phone, email, and address.
* Animated inline success card on submit with transition focus management.

---

## 🛠️ Technologies Used

* **Structure:** HTML5 (Semantic elements, ARIA attributes)
* **Styling:** Vanilla CSS3 (Custom properties, grid, flexbox, keyframes, glassmorphism)
* **Logic:** Vanilla JavaScript (ES6+, IntersectionObserver, requestAnimationFrame)
* **Icons:** Font Awesome 6.7.2 CDN (Brand icons and interface accents)
* **Fonts:** Inter & Poppins (Loaded via Google Fonts API)

---

## 📂 Folder Structure

```directory
nayepankh-webpage/
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet with layout definitions
│   │   ├── animations.css    # Keyframe keymaps for reveal triggers
│   │   └── responsive.css    # Responsive media query adaptations
│   ├── js/
│   │   ├── script.js         # Core slide, lightbox, search, and form logic
│   │   ├── darkmode.js       # System theme checking and toggles
│   │   └── animations.js     # Scroll-triggered viewport reveals
│   └── images/
│       ├── logo.png          # PNG logo for fallback support
│       ├── logo.svg          # Scaleable vector logo for Favicons
│       ├── hero-bg.jpg       # Landing page hero header cover
│       └── gallery/          # Folder storing local gallery visual assets
├── index.html                # Homepage
├── about.html                # About Narrative
├── initiatives.html          # Active Sectors
├── volunteer.html            # Join Drive / Onboarding
├── contact.html              # Support Core & Location Map
├── .gitignore                # File configuration exclusions
└── README.md                 # Project documentation
```

---

## 🚀 GitHub Pages Deployment

This site is deployed to GitHub Pages directly from the `main` branch. 

### Deployment Steps
1. Initialized git repository locally: `git init`.
2. Structured root directory files and committed changes.
3. Created a public repository `nayepankh-webpage` under user profile.
4. Linked remote: `git remote add origin https://github.com/punittak2005/nayepankh-webpage.git`.
5. Pushed local branch: `git push -u origin main`.
6. Configured GitHub Pages source to serve `/root` from `main` branch.

---

## 📸 Screenshots

*(Placeholder sections for application previews)*
* **Desktop View**: Sleek homepage with hero banner and slider.
* **Responsive Mobile Views**: Stacked forms and layouts.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author
Developed and enhanced by **punittak2005** as part of the NayePankh Foundation frontend enhancement project.
