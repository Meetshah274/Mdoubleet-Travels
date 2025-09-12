function validateLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill in both email and password fields.");
        return false;
    }

    alert("Login successful!");
    return true;
}
