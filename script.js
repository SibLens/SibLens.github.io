// ==========================================
// SIBLENS PHOTOGRAPHY
// Main JavaScript
// ==========================================


// ------------------------------------------
// MOBILE NAVIGATION
// ------------------------------------------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close the mobile menu when a link is clicked

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ------------------------------------------
// AUTOMATIC COPYRIGHT YEAR
// ------------------------------------------

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ------------------------------------------
// CONTACT FORM - TEMPORARY
// ------------------------------------------

// The contact form isn't connected to your email yet.
// We'll set this up later.

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        formMessage.textContent =
            "Thanks for your message! Our contact form will be available soon.";

    });

}
