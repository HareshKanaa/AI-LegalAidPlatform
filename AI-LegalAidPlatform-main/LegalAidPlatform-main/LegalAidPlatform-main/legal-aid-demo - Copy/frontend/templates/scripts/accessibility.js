// Speech-to-Text (STT)
function startSpeechToText() {
    const output = document.getElementById("speech-output");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => { output.innerHTML = "Listening..."; };
    recognition.onspeechend = () => { recognition.stop(); };
    recognition.onresult = event => {
        output.innerHTML = event.results[0][0].transcript;
    };

    recognition.start();
}

async function translateText() {
    const text = document.getElementById("tts-text").value;
    if (!text.trim()) return alert("Please enter or paste text to translate.");

    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        const translatedText = data[0].map(item => item[0]).join(" ");
        document.getElementById("tts-text").value = translatedText;
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Translation error. Please try again.");
    }
}

// Font Size Adjustment
function changeFontSize(action) {
    let body = document.body;
    let currentSize = window.getComputedStyle(body, null).getPropertyValue('font-size');
    let newSize = action === "increase" ? parseFloat(currentSize) * 1.1 : parseFloat(currentSize) * 0.9;
    body.style.fontSize = newSize + "px";
}

// Keyboard Navigation
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        document.body.style.fontSize = "16px";
        document.body.classList.remove("high-contrast");
    }
});