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
// ==========================================
// PHOTO LIGHTBOX
// ==========================================

const albumImages = document.querySelectorAll(".album-photo img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;


// Open the lightbox

albumImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImageIndex = index;

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Show the selected image

function showImage(index) {

    if (index < 0) {
        currentImageIndex = albumImages.length - 1;
    }

    else if (index >= albumImages.length) {
        currentImageIndex = 0;
    }

    else {
        currentImageIndex = index;
    }

    lightboxImage.src =
        albumImages[currentImageIndex].src;

}


// Previous photo

lightboxPrev.addEventListener("click", () => {

    showImage(currentImageIndex - 1);

});


// Next photo

lightboxNext.addEventListener("click", () => {

    showImage(currentImageIndex + 1);

});


// Close the lightbox

lightboxClose.addEventListener("click", () => {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

});
// ==========================================
// LIGHTBOX KEYBOARD CONTROLS
// ==========================================

document.addEventListener("keydown", (event) => {

    // Only use keyboard controls when
    // the lightbox is open

    if (!lightbox.classList.contains("active")) {
        return;
    }


    // Right arrow = next photo

    if (event.key === "ArrowRight") {

        showImage(currentImageIndex + 1);

    }


    // Left arrow = previous photo

    if (event.key === "ArrowLeft") {

        showImage(currentImageIndex - 1);

    }


    // Escape = close lightbox

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

});
// ==========================================
// LIGHTBOX MOBILE SWIPE CONTROLS
// ==========================================

let touchStartX = 0;
let touchEndX = 0;


// Record where the user starts touching

lightbox.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


// Record where the user's swipe ends

lightbox.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


// Work out which direction the user swiped

function handleSwipe() {

    const swipeDistance =
        touchStartX - touchEndX;

    const minimumSwipeDistance = 50;


    // Swipe left = next photo

    if (swipeDistance > minimumSwipeDistance) {

        showImage(currentImageIndex + 1);

    }


    // Swipe right = previous photo

    if (swipeDistance < -minimumSwipeDistance) {

        showImage(currentImageIndex - 1);

    }

}
