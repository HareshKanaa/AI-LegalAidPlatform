from transformers import pipeline

class LegalChatbot:
    def __init__(self):
        # Use a lightweight model for demo purposes
        self.nlp_model = pipeline(
            "text-classification", 
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
    
    def get_response(self, query):
        # Mock legal intent classification
        result = self.nlp_model(query)[0]
        intent = result["label"]
        confidence = result["score"]
        
        # Simple response template
        responses = {
            "POSITIVE": "Based on your query, this appears to be a civil matter. Consult a lawyer for specifics.",
            "NEGATIVE": "This query may relate to criminal law. Seek professional legal advice."
        }
        return {
            "intent": intent,
            "confidence": confidence,
            "response": responses.get(intent, "Please consult a lawyer.")
        }