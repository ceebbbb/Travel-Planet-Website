// REVIEWS SECTION //

window.onload = function() {
    const container = document.getElementById('reviewsContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const allReviews = document.querySelectorAll('.review-card');
    
    if (container && prevButton && nextButton && allReviews.length > 0) {
        let currentSlide = 0;
        let totalSlides = allReviews.length;
        let autoSlideTimer;
        
        function showSlide(slideNumber) {
            currentSlide = (slideNumber + totalSlides) % totalSlides;
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        function startAutoSlide() {
            autoSlideTimer = setInterval(() => showSlide(currentSlide + 1), 3000);
        }
        
        prevButton.onclick = () => showSlide(currentSlide - 1);
        nextButton.onclick = () => showSlide(currentSlide + 1);
        
        container.onmouseover = () => clearInterval(autoSlideTimer);
        container.onmouseout = startAutoSlide;
        
        showSlide(0);
        startAutoSlide();
    }
};

// FEATURED DESTINATIONS //

// Function to load featured destinations from JSON file //
function loadFeaturedDestinations() {
    fetch('destinations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(destinations => {
            displayFeaturedDestinations(destinations);
        })
        .catch(error => {
            console.error('Error loading destinations:', error);
        });
}
// Function to display featured destinations //
function displayFeaturedDestinations(destinations) {
    const destinationsGrid = document.querySelector('.destinations-grid');
    
    if (destinationsGrid) {
        destinationsGrid.innerHTML = '';
        // Display 6 destinations //
        const featuredCount = Math.min(destinations.length, 6);
        for (let i = 0; i < featuredCount; i++) {
            const destination = destinations[i];
            // DESTINATION CARDS HTML //
            const destinationCard = document.createElement('div');
            destinationCard.className = 'destination-card';
            
            destinationCard.innerHTML = `
                <a href="destinations.html?id=${destination.id}">
                    <div class="destination-image" style="background-image: url('${destination.image}')"></div>
                    <div class="destination-info">
                        <h3 class="destination-name">${destination.name}</h3>
                        <div class="destination-price">From ${destination.price}pp</div>
                        <div class="destination-rating">${destination.stars} ${destination.rating}</div>
                        <p class="destination-description">${destination.description}</p>
                    </div>
                </a>
            `;
            destinationsGrid.appendChild(destinationCard);
        }
    }
}
// Call destinations function //
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedDestinations();
    
    initCarousel();
    initDestinations();
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', validateForm);
    }
});

// DESTINATION SLIDESHOW OBJECTS //

const carouselData = [
    {
        image: "Images/homeslideshow1.png",
        title: "Bernese Oberland, Switzerland",
        description: "Experience the breathtaking beauty of snow capped mountains and bright blue glacial lakes"
    },
    {
        image: "Images/homeslideshow2.jpg",
        title: "Kyoto, Japan",
        description: "Immerse yourself in ancient temples, traditional gardens, and vibrant culture"
    },
    {
        image: "Images/homeslideshow4.jpg",
        title: "Bali, Indonesia",
        description: "Discover paradise with stunning beaches, lush rice terraces, and spiritual retreats"
    },
    {
        image: "Images/homeslideshow3.jpg",
        title: "Marrakech, Morocco",
        description: "Get lost in colorful markets, historic palaces, and the magic of North Africa"
    }
];

// CAROUSEL VARIABLES //

let currentSlide = 0;
let slideInterval;

// CAROUSEL FUNCTIONS //

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    carousel.innerHTML = '';
    
    carouselData.forEach((slide, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) item.classList.add('active');
        item.style.backgroundImage = `url(${slide.image})`;
        
        item.innerHTML = `
            <div class="carousel-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
            </div>
        `;
        carousel.appendChild(item);
    });

    currentSlide = 0;
    startSlideshow();
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length === 0) return;
    
    const currentActiveSlide = document.querySelector('.carousel-item.active');
    if (currentActiveSlide) currentActiveSlide.classList.remove('active');
    
    slides[slideIndex].classList.add('active');
    currentSlide = slideIndex;
    resetSlideshow();
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length === 0) return;
    
    goToSlide((currentSlide + 1) % slides.length);
}

function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Initialize destinations function //
function initDestinations() {
}

// FORM VALIDATION FOR NEWSLETTER //

function validateForm(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    
    let isValid = true;
    
    // Name validation //
    nameError.style.display = nameInput.value.trim() === '' ? 'block' : 'none';
    if (nameInput.value.trim() === '') isValid = false;
    
    // Email validation //
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    emailError.style.display = emailValid ? 'none' : 'block';
    if (!emailValid) isValid = false;
    
    // If valid, show success message //
    if (isValid) {
        e.target.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initDestinations();
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', validateForm);
    }
});