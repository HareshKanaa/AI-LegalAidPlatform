async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    const chatBox = document.getElementById("chatMessages");

    if (userInput === "") return;

    // Show user message
    const userMessage = `<p class="user-message"><strong>You:</strong> ${userInput}</p>`;
    chatBox.innerHTML += userMessage;

    // Show loading...
    const loadingMsg = `<p class='bot-message' id="loading">Bot is typing...</p>`;
    chatBox.innerHTML += loadingMsg;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send to backend
    try {
        const response = await fetch('http://localhost:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        // Remove loading
        document.getElementById("loading").remove();

        const botResponse = `<p class='bot-message'><strong>Bot:</strong> ${data.reply}</p>`;
        chatBox.innerHTML += botResponse;

        // Speak reply
        speakText(data.reply);
    } catch (error) {
        document.getElementById("loading").remove();
        chatBox.innerHTML += `<p class='bot-message'><strong>Bot:</strong> Error talking to ChatGPT.</p>`;
        console.error("Error:", error);
    }
    
    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;


}
// Display bot response
setTimeout(() => {
        chatBox.innerHTML += botResponse;
        chatBox.scrollTop = chatBox.scrollHeight;

        // Extract and speak plain text from HTML response
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = botResponse;
        const plainText = tempDiv.textContent || tempDiv.innerText;
        speakText(plainText);
    }, 500);
       
    // 🎙️ Voice to Text using Web Speech API
function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser doesn't support speech recognition. Please use Chrome.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        console.log("Listening...");
    };

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log("You said: ", speechResult);
        document.getElementById("userInput").value = speechResult;
        sendMessage(); // Auto-send after recognizing speech
    };

    recognition.onerror = (event) => {
        alert("Error occurred in recognition: " + event.error);
    };

    recognition.start();
}

// 🗣️ Bot response as voice
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        window.speechSynthesis.speak(utterance);
    }
}