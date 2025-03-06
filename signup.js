document.addEventListener("DOMContentLoaded", function () {
    // Bubble animation container
    const bubbleContainer = document.querySelector(".bubble-container");

    for (let i = 0; i < 30; i++) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");

        let size = Math.random() * 80 + 20 + "px";
        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = Math.random() * 100 + "vw";
        bubble.style.animationDuration = Math.random() * 10 + 5 + "s";
        bubble.style.animationDelay = Math.random() * 5 + "s";

        bubbleContainer.appendChild(bubble);
    }

    // Handle Form Submission
    document.getElementById("user-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!fullName || !email || !username || !password) {
            document.getElementById("error-message").textContent = "Please fill all fields!";
            return;
        }

        // Store user details in localStorage
        const userData = { fullName, email, username, password };
        localStorage.setItem(username, JSON.stringify(userData));

        // Redirect to index.html
        window.location.href = "index.html";
    });
});
