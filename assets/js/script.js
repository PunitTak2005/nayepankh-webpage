/**
 * NayePankh Foundation - UI Core Interactions, Mobile Hamburger Menu, Slider, and Lightbox Elements
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STICKY NAVBAR MANAGEMENT ---
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // --- 2. INTERACTIVE HAMBURGER MENU ENGINE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close dropdown menu layer upon selecting anchor navigation points
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 3. ACCORDION ACCESSIBILITY, TOGGLES & REAL-TIME SEARCH ENGINE ---
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const faqAccordion = document.getElementById('faqAccordion');
    const faqSearchInput = document.getElementById('faqSearchInput');
    const faqSearchClear = document.getElementById('faqSearchClear');
    const faqNoResults = document.getElementById('faqNoResults');

    // 3a. Accordion Toggle and Accessibility Logic
    accordionTriggers.forEach((trigger, idx) => {
        // Save original question text for search highlighting
        const textSpan = trigger.querySelector('span:not(.accordion-icon)');
        if (textSpan) {
            textSpan.dataset.originalText = textSpan.textContent;
        }

        trigger.addEventListener('click', () => {
            const parentItem = trigger.parentElement;
            const contentPanel = trigger.nextElementSibling;
            const isOpen = parentItem.classList.contains('active');

            // Collapse all open items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = null;
                    content.setAttribute('aria-hidden', 'true');
                }
                const btn = item.querySelector('.accordion-trigger');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // If it was closed, open it now
            if (!isOpen) {
                parentItem.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                contentPanel.setAttribute('aria-hidden', 'false');
                contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
            }
        });

        // Keyboard navigation (Up/Down arrow keys, Home, End)
        trigger.addEventListener('keydown', (e) => {
            let targetIdx = -1;
            const visibleTriggers = Array.from(accordionTriggers).filter(btn => {
                return btn.parentElement.style.display !== 'none';
            });
            const currentVisibleIdx = visibleTriggers.indexOf(trigger);

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                targetIdx = (currentVisibleIdx + 1) % visibleTriggers.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                targetIdx = (currentVisibleIdx - 1 + visibleTriggers.length) % visibleTriggers.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetIdx = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                targetIdx = visibleTriggers.length - 1;
            }

            if (targetIdx !== -1 && visibleTriggers[targetIdx]) {
                visibleTriggers[targetIdx].focus();
            }
        });
    });

    // 3b. Real-Time Search Logic
    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', () => {
            const query = faqSearchInput.value.trim().toLowerCase();
            
            // Show/Hide Clear button
            if (faqSearchClear) {
                faqSearchClear.style.display = query ? 'flex' : 'none';
            }

            let visibleCount = 0;

            accordionTriggers.forEach(trigger => {
                const parentItem = trigger.parentElement;
                const textSpan = trigger.querySelector('span:not(.accordion-icon)');
                const originalText = textSpan.dataset.originalText;
                const answerBody = parentItem.querySelector('.accordion-body');
                const answerText = answerBody ? answerBody.textContent.toLowerCase() : '';

                if (!query) {
                    // Reset to default state
                    textSpan.innerHTML = originalText;
                    parentItem.style.display = '';
                    visibleCount++;
                    return;
                }

                // Check if either question or answer matches query
                const matchQuestion = originalText.toLowerCase().indexOf(query);
                const matchAnswer = answerText.indexOf(query) !== -1;

                if (matchQuestion !== -1 || matchAnswer) {
                    parentItem.style.display = '';
                    visibleCount++;

                    // Highlight query inside the question trigger text
                    if (matchQuestion !== -1) {
                        const start = matchQuestion;
                        const end = start + query.length;
                        textSpan.innerHTML = originalText.substring(0, start) + 
                            `<mark class="faq-highlight">${originalText.substring(start, end)}</mark>` + 
                            originalText.substring(end);
                    } else {
                        textSpan.innerHTML = originalText; // keep text plain if match is in answer only
                    }
                } else {
                    parentItem.style.display = 'none';
                    // Auto-collapse if hidden
                    parentItem.classList.remove('active');
                    const content = parentItem.querySelector('.accordion-content');
                    if (content) {
                        content.style.maxHeight = null;
                        content.setAttribute('aria-hidden', 'true');
                    }
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Handle no results display
            if (faqNoResults) {
                faqNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
            if (faqAccordion) {
                faqAccordion.style.display = visibleCount === 0 ? 'none' : 'flex';
            }
        });

        // 3c. Clear Search Logic
        if (faqSearchClear) {
            faqSearchClear.addEventListener('click', () => {
                faqSearchInput.value = '';
                faqSearchInput.focus();
                faqSearchInput.dispatchEvent(new Event('input'));
            });
        }
    }

    // --- 4. PREMIUM TESTIMONIAL CAROUSEL ENGINE ---
    const slider = document.getElementById('testimonialSlider');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const progressBar = document.getElementById('sliderProgressBar');

    if (slider && sliderWrapper) {
        const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            let currentIndex = 0;
            
            // Autoplay state values
            let autoplayTimer = null;
            let autoplayStartTime = 0;
            let autoplayRemaining = 5000;
            const autoplayDuration = 5000;
            let autoplayActive = false;

            // 4a. Dynamic Dot Navigation Generator
            const dotsContainer = document.createElement('div');
            dotsContainer.classList.add('slider-dots');
            dotsContainer.setAttribute('role', 'tablist');
            dotsContainer.setAttribute('aria-label', 'Testimonial Slide Indicators');

            const dots = [];
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
                dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    goToSlide(i, true);
                });

                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
            sliderWrapper.appendChild(dotsContainer);

            // 4b. Slide State Updater
            const updateSlideState = (index, focusActive = false) => {
                slides.forEach((slide, idx) => {
                    if (idx === index) {
                        slide.classList.add('active');
                        slide.setAttribute('aria-hidden', 'false');
                        slide.setAttribute('tabindex', '0');
                        if (focusActive) {
                            slide.focus();
                        }
                    } else {
                        slide.classList.remove('active');
                        slide.setAttribute('aria-hidden', 'true');
                        slide.setAttribute('tabindex', '-1');
                    }
                });

                // Update tab selection indicators
                dots.forEach((dot, idx) => {
                    if (idx === index) {
                        dot.classList.add('active');
                        dot.setAttribute('aria-selected', 'true');
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.classList.remove('active');
                        dot.setAttribute('aria-selected', 'false');
                        dot.setAttribute('aria-current', 'false');
                    }
                });
            };

            // 4c. Navigation Core Slide Switcher
            const goToSlide = (index, userInitiated = false) => {
                currentIndex = index;
                updateSlideState(currentIndex, userInitiated);

                // Restart progress bar
                startAutoplay();
            };

            // 4d. Controls Click Bindings
            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', () => {
                    goToSlide((currentIndex + 1) % totalSlides, true);
                });
                prevBtn.addEventListener('click', () => {
                    goToSlide((currentIndex - 1 + totalSlides) % totalSlides, true);
                });
            }

            // 4e. Autoplay Progress Bar Timing Controller
            const resetProgressBar = () => {
                if (!progressBar) return;
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                progressBar.offsetHeight; // force repaint reflow
            };

            const animateProgressBar = (duration) => {
                if (!progressBar) return;
                progressBar.style.transition = `width ${duration}ms linear`;
                progressBar.style.width = '100%';
            };

            const startAutoplay = () => {
                stopAutoplay();
                autoplayActive = true;
                autoplayRemaining = autoplayDuration;
                autoplayStartTime = Date.now();
                resetProgressBar();
                animateProgressBar(autoplayDuration);

                autoplayTimer = setTimeout(() => {
                    if (autoplayActive) {
                        goToSlide((currentIndex + 1) % totalSlides, false);
                    }
                }, autoplayDuration);
            };

            const stopAutoplay = () => {
                autoplayActive = false;
                if (autoplayTimer) {
                    clearTimeout(autoplayTimer);
                    autoplayTimer = null;
                }
                resetProgressBar();
            };

            const pauseAutoplay = () => {
                if (!autoplayActive || !autoplayTimer) return;
                
                const elapsed = Date.now() - autoplayStartTime;
                autoplayRemaining = Math.max(0, autoplayRemaining - elapsed);
                clearTimeout(autoplayTimer);
                autoplayTimer = null;

                // Freeze progress bar immediately
                const computedWidth = window.getComputedStyle(progressBar).width;
                progressBar.style.transition = 'none';
                progressBar.style.width = computedWidth;
            };

            const resumeAutoplay = () => {
                if (!autoplayActive) return;
                autoplayStartTime = Date.now();

                // Resume progress bar from current percent
                progressBar.style.transition = `width ${autoplayRemaining}ms linear`;
                progressBar.style.width = '100%';

                autoplayTimer = setTimeout(() => {
                    if (autoplayActive) {
                        goToSlide((currentIndex + 1) % totalSlides, false);
                    }
                }, autoplayRemaining);
            };

            // Initialize slide active states
            updateSlideState(0, false);
            startAutoplay();

            // Hover & Focus Autoplay Pause Bindings
            sliderWrapper.addEventListener('mouseenter', pauseAutoplay);
            sliderWrapper.addEventListener('mouseleave', resumeAutoplay);
            
            // Pause on focus anywhere inside the wrapper, resume on blur
            sliderWrapper.addEventListener('focusin', pauseAutoplay);
            sliderWrapper.addEventListener('focusout', (e) => {
                // Check if focus moved outside the slider wrapper
                if (!sliderWrapper.contains(e.relatedTarget)) {
                    resumeAutoplay();
                }
            });

            // 4f. Accessible Keyboard Navigation
            sliderWrapper.setAttribute('tabindex', '0');
            sliderWrapper.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToSlide((currentIndex - 1 + totalSlides) % totalSlides, true);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToSlide((currentIndex + 1) % totalSlides, true);
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    goToSlide(0, true);
                } else if (e.key === 'End') {
                    e.preventDefault();
                    goToSlide(totalSlides - 1, true);
                }
            });

            // 4g. Swipe Gestures for Mobile (with threshold detection)
            let startX = 0;
            let startY = 0;
            let deltaX = 0;
            let isDragging = false;

            slider.addEventListener('touchstart', (e) => {
                pauseAutoplay();
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                deltaX = 0;
                isDragging = true;
            }, { passive: true });

            slider.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                deltaX = currentX - startX;
                const deltaY = currentY - startY;

                // Prevent vertical scroll if swiping horizontal slider
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (e.cancelable) e.preventDefault();
                }
            }, { passive: false });

            slider.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                const threshold = 50;
                if (deltaX < -threshold) {
                    goToSlide((currentIndex + 1) % totalSlides, true);
                } else if (deltaX > threshold) {
                    goToSlide((currentIndex - 1 + totalSlides) % totalSlides, true);
                } else {
                    resumeAutoplay();
                }
            }, { passive: true });
        }
    }

    // --- 5. PREMIUM GALLERY GRID, FILTER & LIGHTBOX ENGINE ---
    const galleryGrid = document.getElementById('galleryGrid');
    const filterPills = document.querySelectorAll('.filter-pill');
    
    if (galleryGrid) {
        const galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
        
        // 5a. Image Lazy Loading Controller
        const lazyLoadImage = (imgElement) => {
            if (!imgElement || !imgElement.getAttribute('data-src')) return;
            imgElement.src = imgElement.getAttribute('data-src');
            imgElement.removeAttribute('data-src');
            imgElement.classList.add('lazy-loaded');
        };

        // Lazy load observer when gallery items enter viewport
        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('.gallery-img');
                    if (img) lazyLoadImage(img);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        galleryItems.forEach(item => itemObserver.observe(item));

        // 5b. Interactive Category Filtering Logic
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Toggle active filter pill class
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filterValue = pill.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const matches = (filterValue === 'all' || category === filterValue);

                    // Clear any existing hidden timer
                    if (item.dataset.timeoutId) {
                        clearTimeout(parseInt(item.dataset.timeoutId));
                        item.removeAttribute('data-timeoutId');
                    }

                    if (matches) {
                        item.classList.remove('hidden');
                        // Force a reflow to trigger CSS transitions
                        item.offsetHeight;
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        
                        const timeoutId = setTimeout(() => {
                            item.classList.add('hidden');
                        }, 400); // 400ms transition time matching CSS
                        item.dataset.timeoutId = timeoutId;
                    }
                });
            });
        });

        // 5c. Upgraded Full-Featured Lightbox System
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxFullscreen = document.getElementById('lightboxFullscreen');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxCounter = document.getElementById('lightboxCounter');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxTag = document.getElementById('lightboxTag');
        const lightboxLocation = document.getElementById('lightboxLocation');
        const lightboxDate = document.getElementById('lightboxDate');

        let currentLightboxIdx = 0;

        const getVisibleItems = () => {
            return galleryItems.filter(item => !item.classList.contains('hidden'));
        };

        const updateLightboxImage = (index) => {
            const visibleItems = getVisibleItems();
            if (visibleItems.length === 0) return;

            currentLightboxIdx = (index + visibleItems.length) % visibleItems.length;
            const targetItem = visibleItems[currentLightboxIdx];
            
            const targetImg = targetItem.querySelector('.gallery-img');
            const targetSrc = targetImg.getAttribute('data-src') || targetImg.getAttribute('src');
            const title = targetItem.getAttribute('data-title') || '';
            const desc = targetItem.getAttribute('data-desc') || '';
            const date = targetItem.getAttribute('data-date') || '';
            const location = targetItem.getAttribute('data-location') || '';
            
            const tagEl = targetItem.querySelector('.overlay-tag');
            const tag = tagEl ? tagEl.textContent : '';

            // Zoom out/fade out animation state before loading new asset
            lightboxImage.classList.remove('loaded');

            if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIdx + 1} / ${visibleItems.length}`;
            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxCaption) lightboxCaption.textContent = desc;
            if (lightboxLocation) lightboxLocation.textContent = location;
            if (lightboxDate) lightboxDate.textContent = date;
            if (lightboxTag) lightboxTag.textContent = tag;

            lightboxImage.src = targetSrc;
            lightboxImage.onload = () => {
                lightboxImage.classList.add('loaded');
            };
        };

        const openLightbox = (index) => {
            document.body.classList.add('lightbox-open');
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            updateLightboxImage(index);
        };

        const closeLightbox = () => {
            document.body.classList.remove('lightbox-open');
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log(err));
            }
        };

        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                lightbox.requestFullscreen().catch(err => {
                    console.log(`Fullscreen activation failed: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        };

        // Attach open triggers to item inner click using event delegation
        galleryGrid.addEventListener('click', (e) => {
            const itemInner = e.target.closest('.gallery-item-inner');
            if (!itemInner) return;

            const item = itemInner.closest('.gallery-item');
            const visibleItems = getVisibleItems();
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            // Close lightbox only when clicking background layers
            if (e.target === lightbox || e.target.classList.contains('lightbox-container') || e.target.classList.contains('lightbox-content-box')) {
                closeLightbox();
            }
        });

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                updateLightboxImage(currentLightboxIdx - 1);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                updateLightboxImage(currentLightboxIdx + 1);
            });
        }

        if (lightboxFullscreen) {
            lightboxFullscreen.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFullscreen();
            });
        }

        // Accessible Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                updateLightboxImage(currentLightboxIdx - 1);
            } else if (e.key === 'ArrowRight') {
                updateLightboxImage(currentLightboxIdx + 1);
            }
        });

        // Mobile Touch Gestures (Swiping)
        let lightboxStartX = 0;
        let lightboxStartY = 0;
        let lightboxDeltaX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            lightboxStartX = e.touches[0].clientX;
            lightboxStartY = e.touches[0].clientY;
        }, { passive: true });

        lightbox.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            lightboxDeltaX = currentX - lightboxStartX;
            const deltaY = currentY - lightboxStartY;

            // Block vertical page scrolling only if user is actively swiping horizontally
            if (Math.abs(lightboxDeltaX) > Math.abs(deltaY)) {
                if (e.cancelable) e.preventDefault();
            }
        }, { passive: false });

        lightbox.addEventListener('touchend', () => {
            const swipeThreshold = 50;
            if (Math.abs(lightboxDeltaX) > swipeThreshold) {
                if (lightboxDeltaX > 0) {
                    updateLightboxImage(currentLightboxIdx - 1); // Swipe right -> previous
                } else {
                    updateLightboxImage(currentLightboxIdx + 1); // Swipe left -> next
                }
            }
            lightboxDeltaX = 0;
        }, { passive: true });
    }

    // --- 6. FLOATING CONTEXT BACK TO TOP TRIGGER LAYER ---
    const backToTopBtn = document.getElementById('backToTop');
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 7. BUTTON INTERACTIVE MOUSE CLICK RIPPLE INJECTIONS ---
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rippleSpan = document.createElement('span');
            rippleSpan.classList.add('ripple-element');
            
            const positionBox = this.getBoundingClientRect();
            const calcX = e.clientX - positionBox.left;
            const calcY = e.clientY - positionBox.top;
            
            rippleSpan.style.left = `${calcX}px`;
            rippleSpan.style.top = `${calcY}px`;
            
            this.appendChild(rippleSpan);
            setTimeout(() => { rippleSpan.remove(); }, 600);
        });
    });

    // --- 8. SUBMISSION LOG FORM PREVENTIONS ---
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        const formContainer = document.querySelector('#contactFormContainer');
        const successCard = document.querySelector('#contactSuccessCard');
        const submitBtn = document.querySelector('#contactSubmitBtn');
        const sendAnotherBtn = document.querySelector('#sendAnotherBtn');
        const firstInput = document.querySelector('#contactName');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message... <span class="spinner"></span>';

            // Simulate form submission delay (1.5 seconds)
            setTimeout(() => {
                // Reset form values
                contactForm.reset();

                // Smoothly hide form and show success card
                formContainer.style.display = 'none';
                successCard.style.display = 'block';
                
                // Trigger animation on next frame
                requestAnimationFrame(() => {
                    successCard.classList.add('show');
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    // Accessibility focus management
                    successCard.focus();
                });
            }, 1500);
        });

        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', () => {
                // Reset button text
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Communications';

                // Hide success card and show form again
                successCard.classList.remove('show');
                setTimeout(() => {
                    successCard.style.display = 'none';
                    formContainer.style.display = 'block';
                    // Focus on the first input
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 300); // Wait for fade out transition
            });
        }
    }

    const volunteerForm = document.querySelector('#volunteerForm');
    if (volunteerForm) {
        const formContainer = document.querySelector('#volunteerFormContainer');
        const successCard = document.querySelector('#volunteerSuccessCard');
        const submitBtn = document.querySelector('#volSubmitBtn');
        const registerAnotherBtn = document.querySelector('#registerAnotherBtn');
        const firstInput = document.querySelector('#volName');

        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Submitting <span class="spinner"></span>';

            // Simulate form submission delay (1.5 seconds)
            setTimeout(() => {
                // Reset form values
                volunteerForm.reset();

                // Smoothly hide form and show success card
                formContainer.style.display = 'none';
                successCard.style.display = 'block';
                
                // Trigger animation on next frame
                requestAnimationFrame(() => {
                    successCard.classList.add('show');
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    // Accessibility focus management
                    successCard.focus();
                });
            }, 1500);
        });

        if (registerAnotherBtn) {
            registerAnotherBtn.addEventListener('click', () => {
                // Reset button text
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Registration';

                // Hide success card and show form again
                successCard.classList.remove('show');
                setTimeout(() => {
                    successCard.style.display = 'none';
                    formContainer.style.display = 'block';
                    // Focus on the first input
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 300); // Wait for fade out transition
            });
        }
    }
});