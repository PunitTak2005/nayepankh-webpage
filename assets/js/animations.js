/**
 * NayePankh Foundation - Intersection Observer Engine & Performance Fluid Counters
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CORE SCROLL REVEAL ARRAYS ---
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Execution completes once layer presents
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 2. HARDWARE RUN ACTIVE MATRIC COUNTERS ---
    const counterElements = document.querySelectorAll('.counter-number');
    
    const runCounterEngine = (counterItem) => {
        const targetVal = parseInt(counterItem.getAttribute('data-target'), 10);
        const processingSpeed = targetVal / 100; // Normalizes duration profiles across uneven limits
        let initialVal = 0;

        const updateTick = () => {
            initialVal += Math.ceil(processingSpeed);
            if(initialVal >= targetVal) {
                counterItem.textContent = targetVal.toLocaleString() + "+";
            } else {
                counterItem.textContent = initialVal.toLocaleString();
                requestAnimationFrame(updateTick);
            }
        };
        requestAnimationFrame(updateTick);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                runCounterEngine(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    counterElements.forEach(counter => counterObserver.observe(counter));
});