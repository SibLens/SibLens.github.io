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
// CONTACT FORM
// ------------------------------------------

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const thankYouPanel = document.getElementById("thankYouPanel");

if (contactForm) {

    const submitButton =
        contactForm.querySelector(".submit-button");

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        formMessage.textContent = "";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(contactForm.action, {

                method: "POST",

                body: formData,

                headers: {
                    Accept: "application/json"
                }

            });

            if (!response.ok) {
                throw new Error("Submission failed.");
            }

            contactForm.reset();

// Hide the form
contactForm.style.display = "none";

// Show the thank you panel
thankYouPanel.classList.add("active");

setTimeout(() => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}, 6000);

setTimeout(() => {

    // Hide the thank you panel
    thankYouPanel.classList.remove("active");

    // Show the form again
    contactForm.style.display = "block";

    submitButton.disabled = false;

    submitButton.innerHTML =
        'Send Message <span>→</span>';

    formMessage.textContent = "";

    formMessage.className =
        "form-message";

}, 7000);

        }

        catch (error) {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Send Message <span>→</span>';

            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

            formMessage.className =
                "form-message error";

        }

    });

}
// ==========================================
// PHOTO LIGHTBOX
// ==========================================

const albumImages = document.querySelectorAll(
    ".album-photo img, .gallery-item img"
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxFullGallery =
    document.getElementById("lightboxFullGallery");
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

    const isHomepageGallery =
        document.querySelector(".gallery-item") !== null &&
        lightboxFullGallery !== null;


    // Homepage Gallery:
    // Going forward after Photo 6 shows
    // the View Full Gallery option.

    if (isHomepageGallery && index >= albumImages.length) {

        currentImageIndex = albumImages.length;

        lightboxImage.style.display = "none";
        lightboxFullGallery.style.display = "block";

        lightboxNext.style.display = "none";

        return;
    }


    // Homepage Gallery:
    // Going backwards from the end screen
    // returns to Photo 6.

    if (isHomepageGallery && index < 0) {

        currentImageIndex = 0;

    }


    // Adventure albums continue looping normally.

    else if (!isHomepageGallery && index < 0) {

        currentImageIndex = albumImages.length - 1;

    }

    else if (!isHomepageGallery && index >= albumImages.length) {

        currentImageIndex = 0;

    }

    else {

        currentImageIndex = index;

    }


    // Show the photo again

    lightboxImage.style.display = "block";

    if (lightboxFullGallery) {
        lightboxFullGallery.style.display = "none";
    }

    lightboxNext.style.display = "";

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
// ==========================================
// OPEN FULL GALLERY AT A SPECIFIC PHOTO
// ==========================================

const urlParams = new URLSearchParams(window.location.search);
const startPhoto = urlParams.get("start");

if (startPhoto && albumImages.length > 0) {

    const startIndex = parseInt(startPhoto, 10) - 1;

    if (
        startIndex >= 0 &&
        startIndex < albumImages.length
    ) {

        currentImageIndex = startIndex;

        lightboxImage.src =
            albumImages[currentImageIndex].src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

}
