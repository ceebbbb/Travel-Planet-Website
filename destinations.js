// Variables for destinations & filters //
let travelSpots = [];
let spotGrid = document.getElementById('destinations-grid');
let searchBox = document.getElementById('destination-search');
let searchBtn = document.getElementById('search-button');
let regionDropdown = document.getElementById('region-filter');
let budgetDropdown = document.getElementById('budget-filter');
let activityDropdown = document.getElementById('activity-filter');
let sortDropdown = document.getElementById('sort-by');
let resetBtn = document.getElementById('reset-filters');
let resultText = document.getElementById('result-count');
let noSpotsMessage = document.getElementById('no-results');

// Load data and set up the page //
window.onload = function() {
    loadDestinationsData();
    setupEventListeners();
    loadFavourites();
};

// Fetch JSON destinations data //
function loadDestinationsData() {
    fetch('destinations.json')
        .then(response => response.json())
        .then(data => {
            travelSpots = data;
            showAllSpots();
        })
        .catch(error => {
            console.error('Error fetching destinations:', error);
            spotGrid.innerHTML = '<div class="error-message">Failed to load destinations. Please try again later.</div>';
        });
}

function setupEventListeners() {
    // Search button and filter events //
    searchBtn.onclick = filterSpots;
    searchBox.onkeyup = function(event) {
        if (event.key === 'Enter') filterSpots();
    };
    
    // Filter dropdown menus //
    regionDropdown.onchange = filterSpots;
    budgetDropdown.onchange = filterSpots;
    activityDropdown.onchange = filterSpots;
    sortDropdown.onchange = filterSpots;
    
    // Reset button //
    resetBtn.onclick = clearFilters;
}

// Display all travel destinations //
function showAllSpots() {
    showTravelSpots(travelSpots);
}

function filterSpots() {
    let searchWords = searchBox.value.toLowerCase().trim();
    let selectedRegion = regionDropdown.value;
    let selectedBudget = budgetDropdown.value;
    let selectedActivity = activityDropdown.value;
    
    // Find spots matching all filters //
    let matchingSpots = travelSpots.filter(spot => {
        // Search text match //
        let matchesSearch = searchWords === '' || 
            spot.name.toLowerCase().includes(searchWords) || 
            spot.country.toLowerCase().includes(searchWords) || 
            spot.description.toLowerCase().includes(searchWords);
        
        // Region match //
        let matchesRegion = selectedRegion === '' || spot.region === selectedRegion;
        
        // Budget match //
        let matchesBudget = selectedBudget === '' || spot.budget === selectedBudget;
        
        // Activity match //
        let matchesActivity = selectedActivity === '' || 
            spot.activities.includes(selectedActivity);
        
        // Include spot if it matches all filters //
        return matchesSearch && matchesRegion && matchesBudget && matchesActivity;
    });
    
    sortSpots(matchingSpots);
    showTravelSpots(matchingSpots);
}

// Sort spots based on selected option //
function sortSpots(spots) {
    let sortBy = sortDropdown.value;
    
    if (sortBy === 'popularity') {
        spots.sort((a, b) => b.rating - a.rating);
    } 
    else if (sortBy === 'price-low') {
        spots.sort((a, b) => 
            parseFloat(a.price.replace('£', '').replace(',', '')) - 
            parseFloat(b.price.replace('£', '').replace(',', ''))
        );
    } 
    else if (sortBy === 'price-high') {
        spots.sort((a, b) => 
            parseFloat(b.price.replace('£', '').replace(',', '')) - 
            parseFloat(a.price.replace('£', '').replace(',', ''))
        );
    }
}

// Clear all filters //
function clearFilters() {
    searchBox.value = '';
    regionDropdown.value = '';
    budgetDropdown.value = '';
    activityDropdown.value = '';
    sortDropdown.value = 'popularity';
    
    showAllSpots();
}

// Travel Cards on page //
function showTravelSpots(spots) {
    spotGrid.innerHTML = '';
    
    resultText.textContent = `Showing ${spots.length} ${spots.length === 1 ? 'destination' : 'destinations'}`;
    noSpotsMessage.style.display = spots.length === 0 ? 'block' : 'none';
    spots.forEach(spot => {
        spotGrid.appendChild(makeSpotCard(spot));
    });
}

// Travel Destination Cards //
function makeSpotCard(spot) {
    let card = document.createElement('div');
    card.className = 'destination-card';
    
    // HTML //
    card.innerHTML = `
        <div class="destination-image" style="background-image: url('${spot.image}');"></div>
        <div class="destination-info">
            <h3 class="destination-name">${spot.name}</h3>
            <div class="destination-rating">
                <span class="stars">${spot.stars}</span>
                <span class="rating-value">${spot.rating}</span>
            </div>
            <p>${spot.description}</p>
            <div class="destination-price">From ${spot.price}pp</div>
            <div class="destination-buttons">
                <button class="view-details-btn" data-id="${spot.id}">View Details</button>
                <button class="favourite-btn" data-id="${spot.id}">❤️</button>
            </div>
        </div>
    `;

    // Favourite Button //
    let favBtn = card.querySelector('.favourite-btn');
    let favId = `fav-${spot.id}`;
    let isFavourited = localStorage.getItem(favId) !== null;
    
    updateFavButton(favBtn, isFavourited);
    
    favBtn.addEventListener('click', function () {
        if (isFavourited) {
            localStorage.removeItem(favId);
            isFavourited = false;
        } else {
            localStorage.setItem(favId, JSON.stringify(spot));
            isFavourited = true;
        }
        updateFavButton(favBtn, isFavourited);
        loadFavourites();
    });

    // View Details Button //
    card.querySelector('.view-details-btn').addEventListener('click', () => {
        showSpotDetails(spot.id);
    });
    
    return card;
}

// Change fav button //
function updateFavButton(button, isFavourited) {
    if (isFavourited) {
        button.textContent = "♥️";
        button.classList.add("active-fav");
    } else {
        button.textContent = "♡";
        button.classList.remove("active-fav");
    }
}

// Load and display favorites //
function loadFavourites() {
    const favGrid = document.getElementById("favourites-grid");
    favGrid.innerHTML = '';

    const keys = Object.keys(localStorage).filter(k => k.startsWith('fav-'));
    const favourites = keys.map(key => JSON.parse(localStorage.getItem(key)));

    if (favourites.length === 0) {
        favGrid.innerHTML = '<p>No favourites yet.</p>';
    } else {
        favourites.forEach(spot => {
            favGrid.appendChild(makeSpotCard(spot));
        });
    }

    showAllSpots();
}

// BACK TO TOP BUTTON //

document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", function () {
        backToTopBtn.classList.toggle("show", window.scrollY > 300);
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// MODAL SECTION //

let modal = document.createElement('div');
modal.className = 'details-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div id="modal-details"></div>
    </div>
`;
document.body.appendChild(modal);

// Modal Elements //
let closeModal = document.querySelector('.close-modal');
let modalDetails = document.getElementById('modal-details');

// Close modal when clicking X or outside //
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

// Display destination details in modal //
function showSpotDetails(spotId) {
    let spot = travelSpots.find(s => s.id === spotId);
    if (!spot) return;
    
    let activities = spot.activities.map(activity => 
        `<span class="feature-tag">${activity.charAt(0).toUpperCase() + activity.slice(1)}</span>`
    ).join('');

    let mustSeeList = spot.mustSee.map(item => `<li>${item}</li>`).join('');
    
    // Create accommodation options list
    let accommodationList = spot.accommodationOptions ? 
        spot.accommodationOptions.map(item => `<li>${item}</li>`).join('') : '';

    // MODAL DETAILS HTML //
    modalDetails.innerHTML = `
        <div class="modal-header">
            <h2>${spot.name}</h2>
            <div class="destination-location">${spot.country}, ${spot.region}</div>
        </div>
        
        <div class="modal-image" style="background-image: url('${spot.image}')"></div>
        
        <div class="modal-info">
            <div class="info-row">
                <div class="info-item">
                    <h4>Rating</h4>
                    <div class="rating-stars">${spot.stars} <span class="rating-value">${spot.rating}</span></div>
                </div>
                <div class="info-item">
                    <h4>Price</h4>
                    <div class="price-value">From ${spot.price}</div>
                </div>
                <div class="info-item">
                    <h4>Budget Category</h4>
                    <div class="budget-value">${spot.budget.charAt(0).toUpperCase() + spot.budget.slice(1)}</div>
                </div>
            </div>
            
            <div class="description-section">
                <h4>Description</h4>
                <p>${spot.description}</p>
            </div>
            
            <div class="travel-details-grid">
                <div class="detail-item">
                    <h4>Flight Time</h4>
                    <p>${spot.flightTime}</p>
                </div>
                <div class="detail-item">
                    <h4>Time Zone</h4>
                    <p>${spot.timeZone}</p>
                </div>
                <div class="detail-item">
                    <h4>Best Time to Visit</h4>
                    <p>${spot.bestTimeToVisit}</p>
                </div>
                <div class="detail-item">
                    <h4>Language</h4>
                    <p>${spot.language}</p>
                </div>
                <div class="detail-item">
                    <h4>Currency</h4>
                    <p>${spot.currency}</p>
                </div>
                <div class="detail-item">
                    <h4>Exchange Rate</h4>
                    <p>${spot.exchangeRate}</p>
                </div>
                <div class="detail-item">
                    <h4>Visa Requirements</h4>
                    <p>${spot.visaRequirements}</p>
                </div>
            </div>
            
            <div class="cost-section">
                <h4>Cost Breakdown</h4>
                <div class="costs-grid">
                    <div class="cost-item">
                        <span class="cost-label">Accommodation:</span>
                        <span class="cost-value">${spot.averageAccommodationCost}</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Meals:</span>
                        <span class="cost-value">${spot.averageMealCost}</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Local Transportation:</span>
                        <span class="cost-value">${spot.localTransportation}</span>
                    </div>
                </div>
            </div>
            
            <div class="must-see-section">
                <h4>Must-See Attractions</h4>
                <ul class="must-see-list">${mustSeeList}</ul>
            </div>
            
            <div class="activities-section">
                <h4>Activities</h4>
                <div class="activities-tags">${activities}</div>
            </div>
            
            <div class="cuisine-section">
                <h4>Local Cuisine</h4>
                <p>${spot.localCuisine}</p>
            </div>
            
            <div class="tips-section">
                <h4>Travel Tips</h4>
                <p>${spot.travelTips}</p>
            </div>
            
            <div class="accommodation-section">
                <h4>Accommodation Options</h4>
                <ul class="accommodation-list">${accommodationList}</ul>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}