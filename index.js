document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }

    // Testimonial slider functionality
    const testimonialSlides = document.querySelector('.testimonial-slides');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    if (testimonialSlides && sliderDots.length > 0) {
        // Initialize slider
        function showSlide(index) {
            if (index >= sliderDots.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = sliderDots.length - 1;
            } else {
                currentSlide = index;
            }

            // Update slide position
            testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update active dot
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Add click event to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');

            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            // Email validation
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // Phone validation (optional field, but validate format if provided)
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');

            if (phoneInput.value.trim() && !/^[0-9()+\- ]+$/.test(phoneInput.value)) {
                phoneError.textContent = 'Please enter a valid phone number';
                isValid = false;
            } else {
                phoneError.textContent = '';
            }

            // Message validation
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');

            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message';
                isValid = false;
            } else {
                messageError.textContent = '';
            }

            // Form submission logic
            if (isValid) {
                const formSuccess = document.getElementById('formSuccess');
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.style.display = 'block';

                // Reset form after successful submission
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // 100px offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Initialize any dynamic background elements
    const dynamicBackgrounds = document.querySelectorAll('[data-bg-image]');

    dynamicBackgrounds.forEach(element => {
        const bgImageUrl = element.getAttribute('data-bg-image');
        if (bgImageUrl) {
            element.style.backgroundImage = `url(${bgImageUrl})`;
        }
    });

    // Service hover animations
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Gallery lightbox functionality (simple implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;

                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';

                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';

                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = imgAlt;

                // Assemble and append to body
                lightboxContent.appendChild(closeBtn);
                lightboxContent.appendChild(img);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);

                // Prevent scrolling while lightbox is open
                document.body.style.overflow = 'hidden';

                // Close lightbox functionality
                function closeLightbox() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }

                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
            });
        });
    }

    // Handle booking form initialization if exists
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        // Date picker initialization (simplified version)
        const dateInput = document.getElementById('appointment-date');

        if (dateInput) {
            // Set min date to today
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');

            dateInput.min = `${yyyy}-${mm}-${dd}`;

            // Set max date to 3 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            const maxYyyy = maxDate.getFullYear();
            const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
            const maxDd = String(maxDate.getDate()).padStart(2, '0');

            dateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
        }

        // Handle service selection and price update
        const serviceSelect = document.getElementById('service-select');
        const priceDisplay = document.getElementById('estimated-price');

        if (serviceSelect && priceDisplay) {
            serviceSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const price = selectedOption.getAttribute('data-price') || 'Varies';

                priceDisplay.textContent = price !== 'Varies' ? `$${price}` : price;
            });
        }
    }

    // Newsletter signup functionality
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput && emailInput.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                // Success message
                const successMsg = document.createElement('p');
                successMsg.className = 'newsletter-success';
                successMsg.textContent = 'Thank you for subscribing!';

                // Replace form with success message
                this.innerHTML = '';
                this.appendChild(successMsg);
            }
        });
    }

    // Add style for active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('.menu a').forEach(link => {
        const linkHref = link.getAttribute('href');

        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Add CSS classes for specific animations on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;

        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;

            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('in-view');
            }
        });
    }

    // Initial check and add scroll listener
    if (animatedElements.length > 0) {
        checkIfInView();
        window.addEventListener('scroll', checkIfInView);
    }
});
