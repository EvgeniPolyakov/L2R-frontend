let language = "Russian";

function setLanguage(lang) {
    language = lang;

    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach(emoji => {
        emoji.classList.remove("active");
        if (emoji.id === lang.toLowerCase()) {
            emoji.classList.add("active");
        }
    });
}

const transcribeBtn = document.getElementById("transcribeBtn");
transcribeBtn.addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");

    const data = {
        language: language,
        text: inputText
    };

    fetch("http://13.51.86.117:8080/transcribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseData => {
            outputText.value = responseData.transcription;
        })
        .catch(error => console.error("Error:", error));
});
