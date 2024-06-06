document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = urlParams.get('model');
    fetchPhoneDetails(modelName);
    fetchReviews(modelName);
    fetchPriceDetails(modelName);
});

function fetchPhoneDetails(modelName) {
    fetch('techspecs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const phoneDetails = data.find(phone => phone.model === modelName);
            if (phoneDetails) {
                displayPhoneDetails(phoneDetails);
            } else {
                alert('Phone not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch phone details: ' + error.message);
        });
}

function displayPhoneDetails(phone) {
    const detailsContainer = document.getElementById('phone-details');
    detailsContainer.innerHTML = ''; // Clear any previous details

    const phoneInfo = [
        { title: 'Brand', value: phone.brand, icon: 'fas fa-mobile-alt' },
        { title: 'Model', value: phone.model, icon: 'fas fa-tag' },
        { title: 'Processor', value: phone.processor, icon: 'fas fa-microchip' },
        { title: 'Rear Camera', value: phone.camera.rear, icon: 'fas fa-camera' },
        { title: 'Front Camera', value: phone.camera.front, icon: 'fas fa-camera' },
        { title: 'Storage Options', value: Array.isArray(phone.storage_capacity) ? phone.storage_capacity.join(', ') : phone.storage, icon: 'fas fa-hdd' },
        { title: 'Display Size', value: phone.display.size, icon: 'fas fa-tv' },
        { title: 'Display Type', value: phone.display.type, icon: 'fas fa-tv' },
        { title: 'Display Resolution', value: phone.display.resolution, icon: 'fas fa-tv' },
        { title: 'Battery Size', value: phone.battery.size, icon: 'fas fa-battery-full' },
        { title: 'Operating System', value: phone.operating_system, icon: 'fas fa-cogs' },
    ];

    phoneInfo.forEach(info => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail-item');

        const iconDiv = document.createElement('i');
        iconDiv.classList.add(...info.icon.split(' ')); // Add multiple classes

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.innerText = info.title;

        const valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        valueDiv.innerText = info.value;

        detailDiv.appendChild(iconDiv);
        detailDiv.appendChild(titleDiv);
        detailDiv.appendChild(valueDiv);

        detailsContainer.appendChild(detailDiv);
    });
}

function fetchPriceDetails(modelName) {
    fetch('prices.json') // Assuming you have a prices.json file with phone prices
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const priceDetails = data.find(price => price.model === modelName);
            if (priceDetails) {
                displayPriceDetails(priceDetails);
            } else {
                alert('Price not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch price details: ' + error.message);
        });
}

function displayPriceDetails(priceDetails) {
    const priceContainer = document.getElementById('price');
    priceContainer.innerHTML = ''; // Clear any previous details

    const priceInfo = [
        { title: 'Price', value: `$${priceDetails.price}`, icon: 'fas fa-dollar-sign' },
        { title: 'Discount', value: `${priceDetails.discount}%`, icon: 'fas fa-tags' }
    ];

    priceInfo.forEach(info => {
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price-item');

        const iconDiv = document.createElement('i');
        iconDiv.classList.add(...info.icon.split(' ')); // Add multiple classes

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.innerText = info.title;

        const valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        valueDiv.innerText = info.value;

        priceDiv.appendChild(iconDiv);
        priceDiv.appendChild(titleDiv);
        priceDiv.appendChild(valueDiv);

        priceContainer.appendChild(priceDiv);
    });
}

function fetchReviews(modelName) {
    // Placeholder for actual fetch call to get reviews
    const reviews = [
        { text: "Great phone with amazing features!", rating: 5 },
        { text: "Good value for money.", rating: 4 },
        { text: "Battery life could be better.", rating: 3 }
    ];
    displayReviews(reviews);
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = ''; // Clear any previous reviews

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review-item');

        const textDiv = document.createElement('div');
        textDiv.classList.add('review-text');
        textDiv.innerText = review.text;

        const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('review-rating');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('fa', 'fa-star');
            if (i <= review.rating) {
                star.classList.add('checked');
            }
            ratingDiv.appendChild(star);
        }

        reviewDiv.appendChild(textDiv);
        reviewDiv.appendChild(ratingDiv);

        reviewsContainer.appendChild(reviewDiv);
    });
}

// Star rating functionality
const stars = document.querySelectorAll('.rating .fa-star');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            s.classList.toggle('checked', i <= index);
        });
    });
});

// Submit review functionality
document.getElementById('submit-review').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value;
    const rating = [...stars].filter(star => star.classList.contains('checked')).length;
    if (reviewText && rating) {
        const newReview = { text: reviewText, rating: rating };
        // Placeholder for actual submission logic
        console.log('Review submitted:', newReview);
        displayReviews([newReview, ...reviews]); // For demonstration purposes
    } else {
        alert('Please provide a review and a rating.');
    }
});

// Buy now button functionality
document.getElementById('buy-now').addEventListener('click', () => {
    // Placeholder for actual buy now logic
    alert('Buy Now button clicked!');
});

// Trade-In Modal functionality
const tradeInButton = document.getElementById('trade-in');
const tradeInModal = document.getElementById('trade-in-modal');
const closeModal = document.getElementById('close-modal');

tradeInButton.addEventListener('click', () => {
    tradeInModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    tradeInModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === tradeInModal) {
        tradeInModal.style.display = 'none';
    }
});

document.getElementById('fetch-trade-in-value').addEventListener('click', () => {
    const brand = document.getElementById('brand').value;
    const condition = document.getElementById('condition').value;
    fetch(`getTradeInValue.php?brand=${brand}&condition=${condition}`)
        .then(response => response.json())
        .then(data => {
            const tradeInValueDiv = document.getElementById('trade-in-value');
            tradeInValueDiv.innerText = `Trade-In Value: $${data.tradeInValue}`;
        })
        .catch(error => {
            console.error('Error fetching trade-in value:', error);
            alert('Failed to fetch trade-in value: ' + error.message);
        });
});
