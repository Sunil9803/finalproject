const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contactSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            contactSuccess.style.display = 'none';
        }, 3000);
    });
}
