// Lawyer Portal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard data
    fetchDashboardData();
    fetchCaseList();
    loadDocuments();
    loadTemplates();
    
    // Setup modal close button
    document.querySelector('.close').onclick = function() {
        document.getElementById('case-details-modal').style.display = 'none';
    };

    // Setup document upload form
    document.getElementById('document-upload-form').addEventListener('submit', handleDocumentUpload);
    
    // Setup template save button
    document.getElementById('save-as-template').addEventListener('click', saveTemplate);
});

function fetchDashboardData() {
    // TODO: Replace with actual API call
    const mockData = {
        totalCases: 12,
        pendingActions: 3,
        scheduledConsultations: 2,
        notifications: 5
    };

    document.getElementById('total-cases').textContent = mockData.totalCases;
    document.getElementById('pending-actions').textContent = mockData.pendingActions;
    document.getElementById('scheduled-consultations').textContent = mockData.scheduledConsultations;
    document.getElementById('notifications').textContent = mockData.notifications;
}

function fetchCaseList() {
    // TODO: Replace with actual API call
    const mockCases = [
        { 
            id: 1, 
            title: "Case 1", 
            client: "Client A", 
            status: "Open", 
            type: "Criminal",
            description: "Description of case 1",
            timeline: "2023-01-15: Case opened\n2023-02-20: First hearing"
        },
        { 
            id: 2, 
            title: "Case 2", 
            client: "Client B", 
            status: "Closed", 
            type: "Civil",
            description: "Description of case 2",
            timeline: "2023-03-10: Case opened\n2023-04-05: Settlement reached"
        }
    ];

    const caseListContainer = document.getElementById('case-list');
    caseListContainer.innerHTML = '';

    mockCases.forEach(caseItem => {
        const caseCard = document.createElement('div');
        caseCard.className = 'case-card';
        caseCard.innerHTML = `
            <h3>${caseItem.title}</h3>
            <p>Client: ${caseItem.client}</p>
            <p>Status: <span class="case-status ${caseItem.status.toLowerCase()}">${caseItem.status}</span></p>
            <p>Type: ${caseItem.type}</p>
        `;
        caseCard.onclick = () => showCaseDetails(caseItem);
        caseListContainer.appendChild(caseCard);
    });
}

function showCaseDetails(caseItem) {
    document.getElementById('case-title').textContent = caseItem.title;
    document.getElementById('case-client-info').innerHTML = `<strong>Client:</strong> ${caseItem.client}`;
    document.getElementById('case-description').innerHTML = `<strong>Description:</strong><br>${caseItem.description}`;
    document.getElementById('case-timeline').innerHTML = `<strong>Timeline:</strong><br>${caseItem.timeline.replace(/\n/g, '<br>')}`;
    document.getElementById('case-notes').value = '';
    document.getElementById('case-details-modal').style.display = 'block';
}

function saveCaseNotes() {
    const notes = document.getElementById('case-notes').value;
    // TODO: Implement API call to save notes
    console.log("Notes to save:", notes);
    alert("Notes saved successfully!");
}

function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    // TODO: Implement actual filtering logic
    console.log("Applying filters:", {statusFilter, typeFilter, dateFilter});
    fetchCaseList(); // Refresh case list
}

// Document Management Functions
function handleDocumentUpload(e) {
    e.preventDefault();
    const files = document.getElementById('document-upload-input').files;
    
    if (files.length === 0) {
        document.getElementById('upload-status').textContent = 'Please select at least one file';
        return;
    }

    // TODO: Implement actual file upload to server
    const uploadStatus = document.getElementById('upload-status');
    uploadStatus.textContent = `Uploading ${files.length} file(s)...`;
    
    // Mock upload simulation
    setTimeout(() => {
        uploadStatus.textContent = `Successfully uploaded ${files.length} file(s)`;
        loadDocuments(); // Refresh document list
    }, 1500);
}

function loadDocuments() {
    // TODO: Replace with actual API call
    const mockDocuments = [
        { id: 1, name: 'Contract_Agreement.pdf', type: 'pdf', date: '2023-10-15', size: '2.4 MB' },
        { id: 2, name: 'Court_Filing.docx', type: 'doc', date: '2023-10-10', size: '1.1 MB' },
        { id: 3, name: 'Client_Photo.jpg', type: 'image', date: '2023-10-05', size: '3.2 MB' }
    ];

    const container = document.getElementById('document-list-items');
    container.innerHTML = '';

    mockDocuments.forEach(doc => {
        const docElement = document.createElement('div');
        docElement.className = 'document-item';
        docElement.innerHTML = `
            <div class="document-icon ${doc.type}"></div>
            <div class="document-info">
                <h4>${doc.name}</h4>
                <p>Uploaded: ${doc.date} • ${doc.size}</p>
            </div>
            <div class="document-actions">
                <button class="view-btn" data-id="${doc.id}">View</button>
                <button class="download-btn" data-id="${doc.id}">Download</button>
            </div>
        `;
        container.appendChild(docElement);
    });
}

// ===== Messaging System =====
let currentConversation = null;
const socket = new WebSocket('wss://your-websocket-endpoint.com');

// Initialize messaging system
function initMessaging() {
    // Load conversations
    loadConversations();
    
    // Setup event listeners
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // WebSocket handlers
    socket.onopen = () => console.log('WebSocket connection established');
    socket.onmessage = handleIncomingMessage;
    socket.onclose = () => console.log('WebSocket connection closed');
}

// Load conversation list
function loadConversations() {
    // TODO: Replace with actual API call
    const mockConversations = [
        { id: 'conv1', clientName: 'John Doe', lastMessage: 'Hello, I need help with my case', timestamp: '10:30 AM' },
        { id: 'conv2', clientName: 'Jane Smith', lastMessage: 'Thanks for the documents', timestamp: 'Yesterday' }
    ];
    
    const container = document.getElementById('conversations');
    container.innerHTML = '';
    
    mockConversations.forEach(conv => {
        const convEl = document.createElement('div');
        convEl.className = 'conversation-item';
        convEl.innerHTML = `
            <strong>${conv.clientName}</strong>
            <p>${conv.lastMessage}</p>
            <small>${conv.timestamp}</small>
        `;
        convEl.addEventListener('click', () => selectConversation(conv.id));
        container.appendChild(convEl);
    });
}

// Select conversation and load messages
function selectConversation(conversationId) {
    currentConversation = conversationId;
    
    // Highlight selected conversation
    document.querySelectorAll('.conversation-item').forEach(el => {
        el.classList.toggle('active', el.dataset.conversationId === conversationId);
    });
    
    // TODO: Load messages for this conversation from API
    const mockMessages = [
        { id: 'msg1', sender: 'client', content: 'Hello, I need help with my case', timestamp: '10:30 AM' },
        { id: 'msg2', sender: 'lawyer', content: 'How can I help you today?', timestamp: '10:32 AM' }
    ];
    
    displayMessages(mockMessages);
}

// Display messages in chat
function displayMessages(messages) {
    const container = document.getElementById('message-container');
    container.innerHTML = '';
    
    messages.forEach(msg => {
        const msgEl = document.createElement('div');
        msgEl.className = `message ${msg.sender === 'lawyer' ? 'sent' : 'received'}`;
        msgEl.innerHTML = `
            <div>${msg.content}</div>
            <small>${msg.timestamp}</small>
        `;
        container.appendChild(msgEl);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Send new message
function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();
    
    if (!content || !currentConversation) return;
    
    // Create message object
    const message = {
        conversationId: currentConversation,
        content: content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // TODO: Send via WebSocket
    socket.send(JSON.stringify({
        type: 'new_message',
        data: message
    }));
    
    // Add to UI immediately
    displayMessages([{
        id: 'temp-' + Date.now(),
        sender: 'lawyer',
        content: content,
        timestamp: message.timestamp
    }]);
    
    // Clear input
    input.value = '';
}

// Handle incoming messages
function handleIncomingMessage(event) {
    const data = JSON.parse(event.data);
    
    if (data.type === 'new_message' && data.data.conversationId === currentConversation) {
        displayMessages([{
            id: data.data.id,
            sender: 'client',
            content: data.data.content,
            timestamp: data.data.timestamp
        }]);
    }
}

// Initialize messaging system when DOM is loaded
document.addEventListener('DOMContentLoaded', initMessaging);

// Template Management
function saveTemplate() {
    // TODO: Implement template saving logic
    alert('Template saved successfully!');
    loadTemplates();
}

function loadTemplates() {
    // TODO: Replace with actual API call
    const mockTemplates = [
        { id: 1, name: 'Standard NDA', type: 'docx', lastModified: '2023-09-20' },
        { id: 2, name: 'Lease Agreement', type: 'docx', lastModified: '2023-09-15' }
    ];

    const container = document.getElementById('template-list');
    container.innerHTML = '';

    mockTemplates.forEach(template => {
        const templateElement = document.createElement('div');
        templateElement.className = 'template-item';
        templateElement.innerHTML = `
            <h4>${template.name}</h4>
            <p>Last modified: ${template.lastModified}</p>
            <button class="use-template" data-id="${template.id}">Use Template</button>
        `;
        container.appendChild(templateElement);
    });
}