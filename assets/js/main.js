// // Mixitup Filter

// let mixerProjects = mixitup('.project_container',{
//     selectors: {
//         target: '.project_item',
//     },
//     animation: {
//         duration: 300,
//     }
// });

// // Active Work

// const linkWork = document.querySelectorAll('.category_btn')

// function activeWork(){
//     linkWork.forEach((a)=> a.classList.remove('active-work'))
//     this.classList.add('active-work')
// }

// linkWork.forEach((a) => a.addEventListener('click',activeWork))


// // Testimonials Swiper
// var testiSwiper = new Swiper('.testimonial_container', {
//         loop: true,
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//         pagination: {
//           el: '.swiper-pagination',
//         },
//         mousewheel: true,
//         keyboard: true,
//       });



// // Contact Form

// const contactForm = document.getElementById('contact-form'),
//       contactName = document.getElementById('contact-name'),
//       contactEmail = document.getElementById('contact-email'),
//       Message = document.getElementById('message'),
//       contactMessage = document.getElementById('contact-message');

// const sendEmail = (e) => {
//     e.preventDefault();

//     // ១. ពិនិត្យមើលតម្លៃ Input នីមួយៗ (ថែម .value លើ Message)
//     if (contactName.value.trim() === '' || contactEmail.value.trim() === '' || Message.value.trim() === '') {
//         contactMessage.classList.remove('color-light');
//         contactMessage.classList.add('color-dark');
//         contactMessage.textContent = 'Please fill in all fields...';
//         return;
//     }

//     // ២. ប្តូរមកប្រើ sendForm វិញ (serviceID, templateID, #formID, publicKey)
//     emailjs.sendForm('service_jzmzfia', 'template_vmi9sdy', '#contact-form', 'i0lNVsMi1KaQQ-h6e')
//         .then(() => {
//             // បង្ហាញសារជោគជ័យ
//             contactMessage.classList.remove('color-dark');
//             contactMessage.classList.add('color-light');
//             contactMessage.textContent = 'Message sent successfully';

//             // សម្អាត Input Box ទាំងអស់ក្នុង Form
//             contactForm.reset();

//             // លុបសារចេញវិញក្រោយ 5 វិនាទី
//             setTimeout(() => {
//                 contactMessage.textContent = '';
//             }, 5000);
//         })
//         .catch((error) => {
//             contactMessage.classList.remove('color-light');
//             contactMessage.classList.add('color-dark');
//             contactMessage.textContent = 'Something went wrong, please try again!!';
//             console.error('EmailJS Error:', error);
//         });
// };

// contactForm.addEventListener('submit', sendEmail);

/* ==================== INITIALIZE EMAILJS ==================== */
emailjs.init({
    publicKey: "i0lNVsMi1KaQQ-h6e"
});

/* ==================== SHOW / HIDE MOBILE MENU ==================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// បើក Menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// បិទ Menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// បិទ Menu ពេលចុចលើ Link ណាមួយ
const navLinks = document.querySelectorAll('.nav_link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ==================== MIXITUP FILTER PORTFOLIO ==================== */
let mixerProjects = mixitup('.project_container', {
    selectors: {
        target: '.project_item',
    },
    animation: {
        duration: 300,
    }
});

// ផ្លាស់ប្តូរ Active Class លើប៊ូតុង Filter
const linkWork = document.querySelectorAll('.category_btn');

function activeWork() {
    linkWork.forEach(btn => btn.classList.remove('active-work'));
    this.classList.add('active-work');
}

linkWork.forEach(btn => btn.addEventListener('click', activeWork));

/* ==================== SWIPER TESTIMONIALS ==================== */
const testiSwiper = new Swiper('.testimonial_container', {
    loop: true,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: false,
    keyboard: true,
});

/* ==================== CONTACT FORM (EMAILJS) ==================== */
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessageInput = document.getElementById('message');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    // ពិនិត្យមើល Input នីមួយៗ
    if (
        contactName.value.trim() === '' || 
        contactEmail.value.trim() === '' || 
        contactMessageInput.value.trim() === ''
    ) {
        contactMessage.style.color = '#ff4757';
        contactMessage.textContent = 'Please fill in all fields...';
        return;
    }

    // បង្ហាញសញ្ញាកំពុងផ្ញើ
    contactMessage.style.color = '#eccc68';
    contactMessage.textContent = 'Sending message... ';

    // បញ្ជូន Form element ផ្ទាល់ និងដាក់ Public Key ក្នុង Options
    emailjs.sendForm(
        'service_uonazfl', 
        'template_7d8aotx', 
        contactForm, 
        {
            publicKey: 'i0lNVsMi1KaQQ-h6e'
        }
    )
    .then((res) => {
        console.log('SUCCESS!', res.status, res.text);
        contactMessage.style.color = '#2ed573';
        contactMessage.textContent = 'Message sent successfully';
        contactForm.reset();

        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
    })
    .catch((error) => {
        console.error('EmailJS Error Detail:', error);
        contactMessage.style.color = '#ff4757';
        contactMessage.textContent = 'Something went wrong, please try again!!';
    });
};

contactForm.addEventListener('submit', sendEmail);
