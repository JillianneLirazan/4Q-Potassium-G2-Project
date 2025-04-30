document.addEventListener("DOMContentLoaded", function() {
    // Cookie functions
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    // Check for existing username on page load
    const greetingElement = document.getElementById("greeting");
    const storedUsername = getCookie("username");
    const playButton = document.getElementById("playButton");
    let isFirstTime = true; // Track if this is the first submission
    
    // Check if we have a stored username from a previous session
    if (storedUsername) {
        greetingElement.innerText = "Welcome back, " + storedUsername + "!";
        document.getElementById("username").value = storedUsername;
        playButton.disabled = false;
        isFirstTime = false;
    }

    // Handle form submission
    const form = document.getElementById("usernameForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            
            // Validation
            if (!username) {
                alert("Username cannot be empty!");
                return;
            }
            
            if (username.includes(" ")) {
                alert("Username cannot contain spaces!");
                return;
            }
            
            if (/[^a-zA-Z0-9]/.test(username)) {
                alert("Username can only contain letters and numbers!");
                return;
            }
            
            if (username.length < 3) {
                alert("Username must be at least 3 characters long!");
                return;
            }

            // Set cookie and update greeting
            setCookie("username", username, 1);
            
            if (isFirstTime) {
                greetingElement.innerText = "Welcome, " + username + "!";
                isFirstTime = false;
            } 
            {
                greetingElement.innerText = "Welcome back, " + username + "!";
            }
            
            playButton.disabled = false;
        });
    }

    // Play button functionality
    playButton.addEventListener("click", function() {
        window.location.href = 'difficulty.html';
    });
});
