document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-profile-form');
    const profilePhotoInput = document.getElementById('profile-photo');
    const previewContainer = document.getElementById('profile-photo-preview-container');

    profilePhotoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let preview = document.getElementById('profile-photo-preview');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'profile-photo-preview';
                    previewContainer.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        const formData = new FormData(form);
        // For demonstration, log form data keys and values
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        alert('Profile saved successfully!');
        form.reset();
        const preview = document.getElementById('profile-photo-preview');
        if (preview) {
            preview.remove();
        }
    });
});
