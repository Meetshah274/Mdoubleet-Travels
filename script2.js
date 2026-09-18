document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const errorBox = document.getElementById("errorMessage");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop standard page reload

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            // 1. Check for empty fields
            if (!name || !email || !password || !confirmPassword) {
                displayMessage("Please fill in all required fields.", "error");
                return;
            }

            // 2. Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                displayMessage("Please enter a valid email address.", "error");
                return;
            }

            // 3. Minimum password length
            if (password.length < 6) {
                displayMessage("Password must be at least 6 characters long.", "error");
                return;
            }

            // 4. Check if passwords match
            if (password !== confirmPassword) {
                displayMessage("Passwords do not match. Please try again.", "error");
                return;
            }

            // 5. Check if user already exists in localStorage
            let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                displayMessage("An account with this email already exists. Please log in.", "error");
                return;
            }

            // 6. Save new user to localStorage
            const newUser = {
                name: name,
                email: email,
                password: password // In real backends this is hashed; for front-end demos this works cleanly
            };

            users.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(users));

            // Set current active session
            localStorage.setItem("currentUser", JSON.stringify({ name: name, email: email }));

            displayMessage("Sign up successful! Redirecting...", "success");

            // Redirect to the logged-in home page after a brief moment
            setTimeout(() => {
                window.location.href = "travellogined.html";
            }, 1000);
        });
    }

    // Helper function to show errors or success messages
    function displayMessage(msg, type) {
        if (errorBox) {
            errorBox.textContent = msg;
            errorBox.style.display = "block";
            if (type === "success") {
                errorBox.style.backgroundColor = "#dcfce7";
                errorBox.style.color = "#15803d";
                errorBox.style.borderColor = "#86efac";
            } else {
                errorBox.style.backgroundColor = "#fee2e2";
                errorBox.style.color = "#b91c1c";
                errorBox.style.borderColor = "#f87171";
            }
        } else {
            // Fallback alert if errorMessage div isn't present in HTML
            alert(msg);
        }
    }
});

// Password view/hide toggle function
function toggleVisibility(inputId, icon) {
    const inputField = document.getElementById(inputId);
    if (!inputField) return;

    if (inputField.type === "password") {
        inputField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        inputField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
