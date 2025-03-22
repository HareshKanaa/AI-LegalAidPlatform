// 🌟 Smooth Scroll to Sections
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        
        const sectionId = this.getAttribute('href').substring(1); // Remove #
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 🔄 Toggle Chatbot, Legal Templates, and Lawyer Directory Expansion
document.querySelectorAll('.module .btn').forEach(button => {
    button.addEventListener('click', function () {
        const module = this.parentElement;
        module.classList.toggle('expanded');

        if (module.classList.contains('expanded')) {
            module.style.maxHeight = module.scrollHeight + "px";
        } else {
            module.style.maxHeight = "200px";
        }
    });
});

// 🎭 Responsive Navbar Toggle for Mobile
const navbarToggle = document.createElement('div');
navbarToggle.innerHTML = "&#9776;"; // Hamburger icon
navbarToggle.classList.add('navbar-toggle');
document.querySelector('.navbar').appendChild(navbarToggle);

navbarToggle.addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('open');
});

// ✨ Hero Image Fade-in Effect on Scroll
window.addEventListener('scroll', function () {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        let position = heroImage.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            heroImage.classList.add('fade-in');
        }
    }
});

// 🔄 Reset Modules on Resize
window.addEventListener('resize', function () {
    document.querySelectorAll('.module').forEach(module => {
        module.style.maxHeight = "200px";
        module.classList.remove('expanded');
    });
});
