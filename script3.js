document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorBox = document.getElementById("errorMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop standard page reload

            const emailInput = document.getElementById("email").value.trim().toLowerCase();
            const passwordInput = document.getElementById("password").value;

            // 1. Check for empty fields
            if (!emailInput || !passwordInput) {
                showMessage("Please fill in both email and password fields.", "error");
                return;
            }

            // 2. Fetch registered accounts from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            // 3. Look for a matching user
            const matchedUser = registeredUsers.find(
                (user) => user.email.toLowerCase() === emailInput && user.password === passwordInput
            );

            if (matchedUser) {
                // Set active user session
                localStorage.setItem("currentUser", JSON.stringify({
                    name: matchedUser.name,
                    email: matchedUser.email
                }));

                showMessage("Login successful! Redirecting...", "success");

                setTimeout(() => {
                    window.location.href = "travellogined.html";
                }, 1000);
            } else {
                // Demo fallback: if no users are in localStorage yet, allow login
                if (registeredUsers.length === 0) {
                    const fallbackName = emailInput.split("@")[0];
                    localStorage.setItem("currentUser", JSON.stringify({
                        name: fallbackName,
                        email: emailInput
                    }));

                    showMessage("Demo login successful! Redirecting...", "success");

                    setTimeout(() => {
                        window.location.href = "travellogined.html";
                    }, 1000);
                } else {
                    showMessage("Invalid email or password. Please try again.", "error");
                }
            }
        });
    }

    // Status / Alert handler
    function showMessage(msg, type) {
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
            alert(msg);
        }
    }
});

// Eye toggle for password visibility
function toggleVisibility(inputId, icon) {
    const field = document.getElementById(inputId);
    if (!field) return;

    if (field.type === "password") {
        field.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        field.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
