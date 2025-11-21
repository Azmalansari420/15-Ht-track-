document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.themepunch-beta-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const websiteURL = document.getElementById('website_url');
        const websiteViews = document.getElementById('website_views');
        const srEngine = document.getElementById('sr_engine');
        const consent = document.getElementById('consent');
        let valid = true;

        // Name validation
        if (!name.value.trim()) {
            alert('Name is required.');
            name.focus();
            valid = false;
        }

        // Email validation
        if (valid && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            alert('Please enter a valid email address.');
            email.focus();
            valid = false;
        }

        // URL validation
        if (valid && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(websiteURL.value)) {
            alert('Please enter a valid website URL.');
            websiteURL.focus();
            valid = false;
        }

        // Website Views validation
        if (valid && (!websiteViews.value || websiteViews.value <= 0)) {
            alert('Website Views must be a positive number.');
            websiteViews.focus();
            valid = false;
        }

        // SR Engine validation
        if (valid && !srEngine.value) {
            alert('Please select an SR Engine.');
            srEngine.focus();
            valid = false;
        }

        // Consent validation
        if (valid && !consent.checked) {
            alert('You must agree to the consent for anonymous data.');
            consent.focus();
            valid = false;
        }

        if (!valid) e.preventDefault(); // Stop form submission
    });
});