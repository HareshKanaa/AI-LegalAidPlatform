from flask import Flask, request, jsonify, render_template
from ai.nlp.legal_chatbot import LegalChatbot
import pdfkit

app = Flask(__name__)
chatbot = LegalChatbot()

# Chatbot endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    response = chatbot.get_response(data["query"])
    return jsonify(response)

# Document generation endpoint
@app.route('/api/generate_will', methods=['POST'])
def generate_will():
    data = request.json
    rendered_html = render_template(
        "will_template.html",
        name=data["name"],
        address=data["address"]
    )
    pdfkit.from_string(rendered_html, "output/will.pdf")
    return jsonify({"status": "success", "path": "output/will.pdf"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)