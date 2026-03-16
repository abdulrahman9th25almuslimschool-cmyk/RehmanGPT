// ── Elements ──
const sidebar    = document.getElementById('sidebar');
const overlay    = document.getElementById('overlay');
const hamburger  = document.getElementById('hamburger');
const screenTag  = document.getElementById('screenTag');
const msgInput   = document.getElementById('msgInput');
const sendBtn    = document.getElementById('sendBtn');
const messages   = document.getElementById('messages');
const typingRow  = document.getElementById('typingRow');
const newChatBtn = document.getElementById('newChatBtn');
const chatItems  = document.querySelectorAll('.chat-item');

// ── Sidebar Toggle (Mobile) ──
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', closeSidebar);

// ── Active Chat Item ──
chatItems.forEach(item => {
  item.addEventListener('click', () => {
    chatItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    closeSidebar();
  });
});

// ── Screen Tag (Responsive Label) ──
function updateScreenTag() {
  const w = window.innerWidth;
  if (w <= 480)       screenTag.textContent = 'Mobile View';
  else if (w <= 700)  screenTag.textContent = 'Tablet View';
  else                screenTag.textContent = 'Desktop View';
}

updateScreenTag();
window.addEventListener('resize', updateScreenTag);

// ── Auto-resize Textarea ──
msgInput.addEventListener('input', () => {
  msgInput.style.height = 'auto';
  msgInput.style.height = msgInput.scrollHeight + 'px';
});

// ── Send Message on Enter (Shift+Enter = new line) ──
msgInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ── Send Message Function ──
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  // User bubble
  addMessage(text, 'user');

  // Reset input
  msgInput.value = '';
  msgInput.style.height = 'auto';

  // Show typing indicator
  typingRow.style.display = 'flex';
  scrollToBottom();

  // Simulate AI reply after 1.5s
  setTimeout(() => {
    typingRow.style.display = 'none';
    const reply = getReply(text);
    addMessage(reply, 'ai');
    scrollToBottom();
  }, 1500);
}

// ── Add Message to Chat ──
function addMessage(text, sender) {
  const row = document.createElement('div');
  row.classList.add('msg-row');
  if (sender === 'user') row.classList.add('user');

  const avatarDiv = document.createElement('div');
  avatarDiv.classList.add('msg-avatar');
  avatarDiv.classList.add(sender === 'ai' ? 'ai' : 'uav');
  avatarDiv.textContent = sender === 'ai' ? 'AI' : 'AK';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.classList.add(sender === 'ai' ? 'ai' : 'user');
  bubble.textContent = text;

  row.appendChild(avatarDiv);
  row.appendChild(bubble);

  // Insert before typing indicator
  messages.insertBefore(row, typingRow);
  scrollToBottom();
}

// ── Auto Scroll to Bottom ──
function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

// ── Simple Static Replies ──
function getReply(input) {
  const msg = input.toLowerCase();

  if (msg.includes('while'))
    return 'While loop ka example:\n\ni = 0\nwhile i < 5:\n    print(i)\n    i += 1\n\nYeh tab tak chalega jab tak condition true ho.';
  if (msg.includes('for') || msg.includes('loop'))
    return 'For loop: for i in range(5): print(i) — yeh 0 se 4 tak print karta hai!';
  if (msg.includes('css') || msg.includes('flexbox'))
    return 'Flexbox ke liye: display: flex; justify-content: center; align-items: center; — yeh element ko center kar deta hai.';
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('salam'))
    return 'Wa Alaikum Assalam! Koi bhi coding ka sawal poochein, main tayyar hoon.';
  if (msg.includes('shukriya') || msg.includes('thanks'))
    return 'Koi baat nahi! Aur koi cheez chahiye toh zaroor poochein.';

  return 'Yeh aik acha sawal hai! Iske baray mein aur detail chahiye toh batayein — main poori tarha samjhaunga.';
}

// ── New Chat Button ──
newChatBtn.addEventListener('click', () => {
  // Clear all messages except first AI greeting
  const allRows = messages.querySelectorAll('.msg-row:not(#typingRow)');
  allRows.forEach((row, i) => {
    if (i > 0) row.remove(); // Keep first greeting
  });
  typingRow.style.display = 'none';
  msgInput.value = '';
  msgInput.style.height = 'auto';
  chatItems.forEach(i => i.classList.remove('active'));
  closeSidebar();
});
