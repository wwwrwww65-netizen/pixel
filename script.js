document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Scroll Animation Observer
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        })
    }
    
    // Initial check
    handleScrollAnimation();
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Background Particles Effect
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2; // 2px to 7px
            const posX = Math.random() * 100; // 0% to 100%
            const posY = Math.random() * 100; // 0% to 100%
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10; // 10s to 20s
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            particle.style.position = 'absolute';
            particle.style.background = 'rgba(108, 92, 231, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // 5. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // We remove the strict isTouchDevice check because many laptops have both touchscreens and mice.
    let isUsingTouch = false;
    window.addEventListener('touchstart', () => { isUsingTouch = true; });
    window.addEventListener('mousemove', () => { isUsingTouch = false; });

    if (cursor && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            if (isUsingTouch) {
                cursor.style.display = 'none';
                cursorGlow.style.display = 'none';
                return;
            }
            cursor.style.display = 'block';
            cursorGlow.style.display = 'block';
            
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            }, 50);
        });

        const hoverElements = document.querySelectorAll('a, button, .service-card, .btn-glow');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (isUsingTouch) return;
                cursor.classList.add('hover');
                cursorGlow.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorGlow.classList.remove('hover');
            });
        });
    }

    // 6. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 7. 3D Tilt Effect for Service Cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isUsingTouch) return; // Skip if touching
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'none';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
            card.style.zIndex = '1';
        });
    });

    // 8. Contact Modal Logic
    const contactToggle = document.querySelector('.contact-toggle');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (contactToggle && contactModal) {
        contactToggle.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });

        modalBackdrop.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
    }

    // 9. Touch Ripple Effect for Mobile (only on TAP, not scroll)
    const touchTargets = document.querySelectorAll('.service-card, .portfolio-card, .btn-glow, .btn-primary, .contact-option, .nav-links a');

    touchTargets.forEach(el => {
        const currentPos = window.getComputedStyle(el).position;
        if (currentPos === 'static') el.style.position = 'relative';
        el.style.overflow = 'hidden';

        let touchStartX = 0;
        let touchStartY = 0;
        let rippleEl = null;

        el.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;

            const rect = el.getBoundingClientRect();
            rippleEl = document.createElement('span');
            rippleEl.classList.add('ripple-effect');
            rippleEl.style.left = (touch.clientX - rect.left - 30) + 'px';
            rippleEl.style.top  = (touch.clientY - rect.top  - 30) + 'px';
            el.appendChild(rippleEl);
        }, { passive: true });

        el.addEventListener('touchmove', (e) => {
            // إذا تحرك الإصبع أكثر من 10px = تمرير وليس نقر → احذف الموجة
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);
            if ((dx > 10 || dy > 10) && rippleEl) {
                rippleEl.remove();
                rippleEl = null;
            }
        }, { passive: true });

        el.addEventListener('touchend', () => {
            if (rippleEl) {
                rippleEl.addEventListener('animationend', () => rippleEl && rippleEl.remove());
            }
        }, { passive: true });
    });

    // 10.5 Blurred image background for portfolio cards
    document.querySelectorAll('.portfolio-img-wrapper').forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (!img) return;
        const blurBg = document.createElement('div');
        blurBg.classList.add('img-blur-bg');
        blurBg.style.backgroundImage = `url('${img.src}')`;
        wrapper.insertBefore(blurBg, img);
    });

    // 10. Touch Pulse on Cards (replaces mouse 3D tilt on mobile)
    const allTouchCards = document.querySelectorAll('.service-card, .portfolio-card');
    allTouchCards.forEach(card => {
        let isTap = true;

        card.addEventListener('touchstart', () => {
            isTap = true;
            card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            card.style.transform = 'scale(1.03)';
            // بطاقات الخدمات: توهج بنفسجي — بطاقات الأعمال: توهج سماوي
            if (card.classList.contains('portfolio-card')) {
                card.style.boxShadow = '0 15px 40px rgba(0, 206, 201, 0.4)';
            } else {
                card.style.boxShadow = '0 15px 40px rgba(108, 92, 231, 0.4)';
            }
        }, { passive: true });

        card.addEventListener('touchmove', () => {
            isTap = false;
            // إذا كان تمريراً ارجع للحجم الطبيعي فوراً
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '';
            }, 150);
        }, { passive: true });
    });
});
