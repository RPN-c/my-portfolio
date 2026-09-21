/**
 * RY Pheaneak - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. MOBILE DRAWER NAVIGATION ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav_link');

    // បើក Mobile Menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // បិទ Mobile Menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // បិទ Menu ដោយស្វ័យប្រវត្តពេលចុចលើ Link ណាមួយ
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==================== 2. ACTIVE NAV LINK ON SCROLL ==================== */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav_menu a[href*='${sectionId}']`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    /* ==================== 3. PORTFOLIO FILTERING ==================== */
    const filterButtons = document.querySelectorAll('.category_btn');
    const projectItems = document.querySelectorAll('.project_item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // ដក active class ចេញពីប៊ូតុងទាំងអស់ រួចដាក់លើប៊ូតុងដែលទើបចុច
            filterButtons.forEach(b => b.classList.remove('active-work'));
            btn.classList.add('active-work');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'grid';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    /* ==================== 4. TESTIMONIALS SWIPER ==================== */
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial_container', {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    /* ==================== 5. CONTACT FORM & EMAILJS ==================== */
    // Initialize EmailJS ដោយប្រើ Public Key របស់អ្នក
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: 'i0lNVsMi1KaQQ-h6e'
        });
    }

    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                contactMessage.style.color = '#f87171';
                contactMessage.textContent = 'Please fill in all fields.';
                return;
            }

            contactMessage.style.color = '#38bdf8';
            contactMessage.textContent = 'Sending message...';

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('service_uonazfl', 'template_7d8aotx', contactForm)
                    .then(() => {
                        contactMessage.style.color = '#4ade80';
                        contactMessage.textContent = 'Message sent successfully!';
                        contactForm.reset();

                        setTimeout(() => {
                            contactMessage.textContent = '';
                        }, 5000);
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        contactMessage.style.color = '#f87171';
                        contactMessage.textContent = 'Failed to send message. Please try again.';
                    });
            } else {
                // Fallback simulation ប្រសិនបើមិនទាន់ភ្ជាប់អ៊ីនធឺណិត
                setTimeout(() => {
                    contactMessage.style.color = '#4ade80';
                    contactMessage.textContent = 'Message sent successfully! (Demo)';
                    contactForm.reset();
                }, 1000);
            }
        });
    }
});