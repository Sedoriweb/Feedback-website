// Function to update the clock
function updateClock() {
    var now = new Date(); // Get the current date and time
    var hours = now.getHours(); // Get current hour
    var minutes = now.getMinutes(); // Get current minute
    var seconds = now.getSeconds(); // Get current second

    // Pad single digits with a leading zero
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    // Format the time string
    var timeString = hours + ":" + minutes + ":" + seconds;

    // Update the clock element
    document.getElementById('clock').textContent = timeString;
}

// Call updateClock() every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".Stars");
    const textarea = document.getElementById("Feedback");
    const submitButton = document.querySelector(".Submit");
    let selectedRating = 0; // Para malaman kung ilang stars ang napili

    // Star selection logic
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            selectedRating = index + 1; // I-set ang rating value
            stars.forEach(s => s.classList.remove("gold")); // Remove gold color sa lahat ng stars

            // Lagyan ng gold color ang napiling star at lahat ng nauna
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("gold");
            }
        });
    });

    // Submit feedback function
    submitButton.addEventListener("click", function () {
        const feedbackText = textarea.value.trim();

        if (selectedRating === 0 || feedbackText === "") {
            alert("Paki-pili ang rating at maglagay ng feedback bago mag-submit!");
            return;
        }

        const feedbackData = `Rating: ${selectedRating} stars\nFeedback: ${feedbackText}\n\n`;
        downloadFeedback(feedbackData); // I-download ang feedback sa .txt file

        // Reset stars and textarea
        stars.forEach(star => star.classList.remove("gold"));
        textarea.value = "";
        selectedRating = 0;
    });

    // Function para i-download ang feedback bilang .txt file
    function downloadFeedback(content) {
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "feedback.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    }
});

const keys = document.querySelectorAll(".key");
const input = document.getElementById("Feedback");

keys.forEach(key => {
    key.addEventListener("click", () =>{
        const keyValue = key.textContent;

        if (keyValue === "Delete"){
            input.value = input.value.slice(0, - 1);
        } else if (keyValue === 'Space'){
            input.value += " ";
        } else{
            input.value += keyValue;
        } 
    })
})