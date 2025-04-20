document.addEventListener('DOMContentLoaded', function() {
    // Setup event listeners
    document.getElementById('profile-form').addEventListener('submit', handleProfileUpdate);
    document.getElementById('profile-photo').addEventListener('change', handleProfilePhotoChange);
    document.getElementById('certifications').addEventListener('change', handleCertificationsUpload);
    
    // Load initial profile data and reviews
    loadProfileData();
    loadReviews();
});

// Handle profile photo upload and preview
function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create or update preview element
            let preview = document.getElementById('profile-photo-preview');
            if (!preview) {
                preview = document.createElement('img');
                preview.id = 'profile-photo-preview';
                preview.className = 'profile-photo-preview';
                document.querySelector('.form-group:first-child').appendChild(preview);
            }
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('profile-photo').addEventListener('change', function (event) {
    const preview = document.getElementById('profile-photo-preview');
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = ''; // Reset if not an image
    }
});


// Handle certifications upload
function handleCertificationsUpload(event) {
    const files = event.target.files;
    const container = document.getElementById('certifications-list') || 
        createCertificationsListContainer();
    
    Array.from(files).forEach(file => {
        const item = document.createElement('div');
        item.className = 'certification-item';
        item.innerHTML = `
            <span>${file.name}</span>
            <button class="remove-certification" data-file="${file.name}">×</button>
        `;
        container.appendChild(item);
    });
}

function createCertificationsListContainer() {
    const container = document.createElement('div');
    container.id = 'certifications-list';
    container.className = 'certifications-list';
    document.querySelector('#certifications').parentNode.appendChild(container);
    return container;
}

// Load profile data from mock API
function loadProfileData() {
    // TODO: Replace with actual API call
    const mockProfile = {
        name: 'John Doe',
        specialization: 'Criminal Law',
        experience: 10,
        languages: 'English, Hindi, Tamil',
        barCouncilId: 'TN/1234/2010'
    };

    document.getElementById('name').value = mockProfile.name;
    document.getElementById('specialization').value = mockProfile.specialization;
    document.getElementById('experience').value = mockProfile.experience;
    document.getElementById('languages').value = mockProfile.languages;
    document.getElementById('bar-council-id').value = mockProfile.barCouncilId;
}

// Load reviews from mock API
function loadReviews() {
    // TODO: Replace with actual API call
    const mockReviews = [
        {
            client: 'Client A',
            rating: 5,
            comment: 'Excellent service! Very knowledgeable and helpful.',
            date: '2023-10-15'
        },
        {
            client: 'Client B',
            rating: 4,
            comment: 'Good advice, but a bit slow to respond to messages.',
            date: '2023-09-28'
        }
    ];

    const container = document.getElementById('reviews');
    mockReviews.forEach(review => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review-item';
        reviewEl.innerHTML = `
            <div class="review-header">
                <strong>${review.client}</strong>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <div class="review-date">${review.date}</div>
            <p>${review.comment}</p>
        `;
        container.appendChild(reviewEl);
    });
}

// Handle profile form submission
function handleProfileUpdate(event) {
    event.preventDefault();

    // Validate form
    if (!validateProfileForm()) {
        return;
    }

    // Gather profile data
    const profileData = {
        name: document.getElementById('name').value,
        specialization: document.getElementById('specialization').value,
        experience: document.getElementById('experience').value,
        languages: document.getElementById('languages').value,
        barCouncilId: document.getElementById('bar-council-id').value
    };

    // Handle file uploads
    const profilePhoto = document.getElementById('profile-photo').files[0];
    const certifications = document.getElementById('certifications').files;

    // TODO: Implement actual API call to save profile data and handle file uploads
    console.log('Profile data to save:', profileData);
    console.log('Profile photo:', profilePhoto);
    console.log('Certifications:', certifications);

    alert('Profile updated successfully!');
}

// Form validation
function validateProfileForm() {
    const requiredFields = ['name', 'specialization', 'experience', 'languages', 'bar-council-id'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
    }

    return isValid;
}
