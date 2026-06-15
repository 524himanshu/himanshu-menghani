/* ==================== scroll progress bar ==================== */
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
});

/* ==================== toggle icon navbar ==================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/* ==================== scroll sections active link ==================== */
const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) activeLink.classList.add('active');
    }
  });

  /* ==================== sticky navbar ==================== */
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* ==================== close mobile menu on scroll ==================== */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

/* ==================== scroll reveal ==================== */
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ==================== typed js ==================== */
document.addEventListener('DOMContentLoaded', () => {
  new Typed('.typed-text', {
    strings: ['Full Stack Developer', 'AI Engineer', 'RAG & LLM Builder', 'Asynchronous Systems Architect'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});

/* ==================== theme toggle (classic dark vs midnight black) ==================== */
const themeToggleBtn = document.getElementById('theme-toggle-btn');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

/* ==================== contact form validation & animations ==================== */
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    input.classList.add('touched');
  });
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Mark all fields as touched to trigger CSS validation styles
  formInputs.forEach(input => input.classList.add('touched'));
  
  if (!form.checkValidity()) return;

  const originalBtnText = submitBtn.textContent;
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  try {
    const res = await fetch('https://five24himanshu-github-io.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    // Switch to success state
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    submitBtn.textContent = '✓ Message Sent';
    
    // Increment local message count and update footer badge
    try {
      let currentMsgs = parseInt(localStorage.getItem('portfolio_messages') || '18');
      currentMsgs++;
      localStorage.setItem('portfolio_messages', currentMsgs.toString());
      const msgElement = document.getElementById('messages-count');
      if (msgElement) {
        msgElement.textContent = currentMsgs;
      }
    } catch (err) {
      console.warn("Failed to update local messages count", err);
    }
    
    showToast(data.message || 'Message sent successfully!');
    form.reset();
    
    formInputs.forEach(input => input.classList.remove('touched'));
    
    setTimeout(() => {
      submitBtn.classList.remove('success');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }, 3000);
  } catch (err) {
    console.error(err);
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    showToast('Failed to send message. Please try again later.');
  }
});

/* ==================== project filter tabs ==================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioBoxes.forEach(box => {
      const categories = box.dataset.category || '';
      if (filter === 'all' || categories.includes(filter)) {
        box.classList.remove('hidden');
      } else {
        box.classList.add('hidden');
      }
    });
  });
});

/* ==================== cursor glow ==================== */
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', (e) => {
  if (e.target.closest('a, button, .portfolio-box, .filter-btn, .tech-icon, .nft')) {
    cursorGlow.classList.add('hovering');
  } else {
    cursorGlow.classList.remove('hovering');
  }
});
/* ==================== skill concept mapping ==================== */
const skillRelations = {
  // Languages
  'javascript': ['next-js', 'react-js', 'node-express', 'cloudflare-workers', 'html-css', 'tailwind-css'],
  'python': ['fastapi', 'django-drf', 'flask', 'llms', 'agentic-ai', 'rag-pipelines', 'scikit-learn', 'pandas-numpy', 'celery', 'redis'],
  'sql': ['postgresql', 'fastapi', 'django-drf', 'flask', 'async-processing', 'api-design'],
  
  // AI/ML
  'llms': ['python', 'agentic-ai', 'rag-pipelines', 'prompt-engineering', 'cloudflare-workers', 'fastapi'],
  'agentic-ai': ['python', 'llms', 'rag-pipelines', 'prompt-engineering', 'cloudflare-workers', 'fastapi', 'redis', 'celery'],
  'rag-pipelines': ['python', 'llms', 'agentic-ai', 'prompt-engineering', 'postgresql', 'redis', 'fastapi'],
  'prompt-engineering': ['llms', 'agentic-ai', 'rag-pipelines'],
  'scikit-learn': ['python', 'pandas-numpy'],
  'pandas-numpy': ['python', 'scikit-learn'],

  // Backend
  'fastapi': ['python', 'sql', 'postgresql', 'redis', 'celery', 'docker', 'async-processing', 'api-design', 'rest-apis'],
  'django-drf': ['python', 'sql', 'postgresql', 'redis', 'celery', 'docker', 'rbac', 'api-design', 'rest-apis', 'jwt-auth'],
  'flask': ['python', 'sql', 'postgresql', 'mongodb', 'docker', 'api-design', 'rest-apis'],
  'node-express': ['javascript', 'mongodb', 'docker', 'api-design', 'rest-apis', 'jwt-auth'],
  'rest-apis': ['javascript', 'python', 'sql', 'fastapi', 'django-drf', 'flask', 'node-express', 'api-design', 'jwt-auth'],
  'jwt-auth': ['fastapi', 'django-drf', 'node-express', 'rest-apis', 'rbac'],
  'celery': ['python', 'redis', 'fastapi', 'django-drf', 'async-processing'],
  'redis': ['python', 'fastapi', 'django-drf', 'celery', 'async-processing', 'docker'],

  // Frontend
  'react-js': ['javascript', 'next-js', 'html-css', 'tailwind-css'],
  'next-js': ['javascript', 'react-js', 'html-css', 'tailwind-css', 'vercel-render', 'cloudflare-workers'],
  'tailwind-css': ['html-css', 'react-js', 'next-js'],
  'html-css': ['javascript', 'react-js', 'next-js', 'tailwind-css'],

  // Databases
  'postgresql': ['sql', 'python', 'fastapi', 'django-drf', 'flask', 'async-processing'],
  'mongodb': ['javascript', 'node-express', 'flask'],

  // Tools & Platforms
  'docker': ['fastapi', 'django-drf', 'flask', 'node-express', 'redis', 'postgresql'],
  'git-github': ['javascript', 'python', 'vercel-render', 'cloudflare-workers'],
  'postman': ['rest-apis', 'api-design', 'fastapi', 'django-drf', 'node-express'],
  'vercel-render': ['next-js', 'react-js', 'flask', 'node-express', 'git-github'],
  'cloudflare-workers': ['javascript', 'llms', 'agentic-ai', 'next-js', 'git-github'],

  // Concepts
  'rbac': ['django-drf', 'jwt-auth', 'api-design'],
  'async-processing': ['python', 'celery', 'redis', 'fastapi', 'postgresql'],
  'api-design': ['rest-apis', 'fastapi', 'django-drf', 'node-express', 'postman', 'rbac']
};

const skillSpans = document.querySelectorAll('.skills-list span');

skillSpans.forEach(span => {
  span.addEventListener('mouseover', () => {
    const currentSkill = span.getAttribute('data-skill');
    if (!currentSkill) return;

    const related = skillRelations[currentSkill] || [];

    skillSpans.forEach(s => {
      const otherSkill = s.getAttribute('data-skill');
      if (otherSkill === currentSkill || related.includes(otherSkill)) {
        s.classList.add('highlight');
        s.classList.remove('dimmed');
      } else {
        s.classList.add('dimmed');
        s.classList.remove('highlight');
      }
    });
  });

  span.addEventListener('mouseout', () => {
    skillSpans.forEach(s => {
      s.classList.remove('highlight');
      s.classList.remove('dimmed');
    });
  });
});

/* ==================== live github repository fetcher ==================== */
async function fetchGithubStats() {
  const statContainers = document.querySelectorAll('.github-stats');
  
  // Cache to avoid hitting API rate limits unnecessarily
  const cacheKey = 'portfolio_github_stats';
  const cacheExpiryKey = 'portfolio_github_stats_expiry';
  const now = Date.now();
  
  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiry = localStorage.getItem(cacheExpiryKey);
  
  if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
    const stats = JSON.parse(cachedData);
    statContainers.forEach(container => {
      const repo = container.getAttribute('data-repo');
      if (stats[repo]) {
        container.querySelector('.stars').textContent = stats[repo].stars;
        container.querySelector('.forks').textContent = stats[repo].forks;
      }
    });
    return;
  }
  
  const fetchedStats = {};
  
  for (const container of statContainers) {
    const repo = container.getAttribute('data-repo');
    if (!repo) continue;
    
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      
      const stars = data.stargazers_count;
      const forks = data.forks_count;
      
      container.querySelector('.stars').textContent = stars;
      container.querySelector('.forks').textContent = forks;
      
      fetchedStats[repo] = { stars, forks };
    } catch (err) {
      console.warn(`Failed to fetch stats for ${repo}, using defaults.`, err);
      // Fallbacks
      if (repo.includes('drishti-ai')) {
        container.querySelector('.stars').textContent = '4';
        container.querySelector('.forks').textContent = '1';
      } else if (repo.includes('recruitiq')) {
        container.querySelector('.stars').textContent = '3';
        container.querySelector('.forks').textContent = '0';
      } else {
        container.querySelector('.stars').textContent = '2';
        container.querySelector('.forks').textContent = '0';
      }
    }
  }
  
  if (Object.keys(fetchedStats).length > 0) {
    localStorage.setItem(cacheKey, JSON.stringify(fetchedStats));
    localStorage.setItem(cacheExpiryKey, (now + 30 * 60 * 1000).toString()); // Cache for 30 minutes
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGithubStats();
});

/* ==================== Himanshu AI Chat Widget Logic ==================== */
const aiChatToggle = document.getElementById('ai-chat-toggle');
const aiChatClose = document.getElementById('ai-chat-close');
const aiChatWindow = document.getElementById('ai-chat-window');
const aiChatBody = document.getElementById('ai-chat-body');
const aiChatInputArea = document.getElementById('ai-chat-input-area');
const aiChatInput = document.getElementById('ai-chat-input');

// Toggle chat drawer
aiChatToggle.addEventListener('click', () => {
  aiChatWindow.classList.toggle('active');
  // Remove badge pulse on open
  const pulse = aiChatToggle.querySelector('.ai-badge-pulse');
  if (pulse) pulse.remove();
  
  // Scroll to bottom
  setTimeout(() => {
    aiChatBody.scrollTop = aiChatBody.scrollHeight;
  }, 100);
});

aiChatClose.addEventListener('click', () => {
  aiChatWindow.classList.remove('active');
});

// Preset chips handler
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('chat-chip')) {
    const question = e.target.getAttribute('data-question');
    if (question) {
      handleUserSend(question);
    }
  }
});

aiChatInputArea.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = aiChatInput.value.trim();
  if (text) {
    handleUserSend(text);
    aiChatInput.value = '';
  }
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
  aiChatBody.appendChild(msgDiv);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;
  return msgDiv;
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot typing-msg';
  typingDiv.innerHTML = `
    <div class="message-content typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  aiChatBody.appendChild(typingDiv);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;
  return typingDiv;
}

async function handleUserSend(messageText) {
  appendMessage('user', messageText);
  
  const typingIndicator = showTypingIndicator();
  
  // Wait a little bit to simulate thinking
  await new Promise(r => setTimeout(r, 800));
  
  try {
    // Try requesting the worker API
    const res = await fetch('https://cf-ai-web-coach.himanshu524.workers.dev/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });
    
    if (!res.ok) throw new Error('Worker response not ok');
    const data = await res.json();
    
    typingIndicator.remove();
    appendMessage('bot', data.response || data.message || getLocalAIResponse(messageText));
  } catch (err) {
    console.warn("Using local AI engine fallback:", err);
    typingIndicator.remove();
    const localResp = getLocalAIResponse(messageText);
    appendMessage('bot', localResp);
  }
}

function getLocalAIResponse(query) {
  const q = query.toLowerCase();
  
  if (q.includes('project') || q.includes('build') || q.includes('drishti') || q.includes('recruitiq')) {
    return "Himanshu has built several notable projects:<br><br>• <strong>DrishtiAI</strong>: Real-time pharmacovigilance adverse event detection (Twitter/Reddit streams) shortlisted for AI for Bharat 2026.<br>• <strong>RecruitIQ</strong>: Intelligent candidate ranking engine evaluating 100k profiles.<br>• <strong>CF AI Career Coach</strong>: Serverless Llama 3.3 chatbot on Cloudflare Workers.<br>• <strong>Playto Payout Engine</strong>: Async payout queue with Django & Celery.";
  }
  
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('database')) {
    return "Himanshu's tech stack includes:<br><br>• <strong>Languages</strong>: JavaScript, Python, SQL<br>• <strong>Backend</strong>: FastAPI, Django & DRF, Flask, Celery, Redis<br>• <strong>AI/ML</strong>: LLM integrations (Gemini, Llama, Claude), Agentic AI, RAG pipelines, Scikit-learn<br>• <strong>Frontend</strong>: Next.js, React.js, Tailwind CSS<br>• <strong>Databases & Tools</strong>: PostgreSQL, MongoDB, Docker, Cloudflare Workers";
  }
  
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('linkedin') || q.includes('hire') || q.includes('phone') || q.includes('number') || q.includes('mobile')) {
    return "You can reach Himanshu in several ways:<br><br>• <strong>Email</strong>: <a href='mailto:himanshumenghani524@gmail.com'>himanshumenghani524@gmail.com</a><br>• <strong>Phone</strong>: <a href='tel:+917769949282'>+91 77699 49282</a><br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/himanshumenghani524/' target='_blank'>himanshumenghani524</a><br>• Or fill out the <strong>Contact Form</strong> directly on this page!";
  }
  
  if (q.includes('experience') || q.includes('work') || q.includes('intern') || q.includes('octanet')) {
    return "Himanshu was a <strong>Web Development Intern</strong> at OctaNet Services Pvt Ltd (Sept 2023 – Oct 2023). He developed 3+ responsive web applications (including a prioritize-based task management system) and resolved rendering and styling bugs.";
  }
  
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('mumbai') || q.includes('degree')) {
    return "Himanshu graduated with a <strong>Bachelor of Engineering in Information Technology</strong> from Mumbai University (2021 - 2024). He completed his HSC Science board with an 80% score in 2021.";
  }
  
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greet')) {
    return "Hello! I'm Himanshu's AI assistant. Ask me anything about his projects, experience, skills, or achievements!";
  }
  
  return "That's an interesting question! Himanshu is a Full Stack Developer & AI Engineer focused on production-ready systems (FastAPI, Next.js, Celery, RAG pipelines). Feel free to check out his Projects or Journey sections, or drop an email to <a href='mailto:himanshumenghani524@gmail.com'>himanshumenghani524@gmail.com</a> or call <a href='tel:+917769949282'>+91 77699 49282</a>!";
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==================== Interactive System Architecture Drawers ==================== */
const projectArchitectures = {
  drishtiai: {
    title: "DrishtiAI",
    desc: "Real-time pharmacovigilance adverse event detection pipeline. Ingests data streams, performs NLP classification and PII redaction, stores structured incidents, and serves them via a Next.js dashboard.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "scispaCy", "Docker"],
    svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-drishti" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--main-color)" />
    </marker>
  </defs>
  <!-- Connection Edges -->
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-drishti)" d="M 110,100 L 138,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-drishti)" d="M 230,100 L 258,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-drishti)" d="M 350,100 L 378,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-drishti)" d="M 470,100 L 498,100" />
  
  <!-- Nodes -->
  <rect class="arch-node arch-node-active" x="20" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="65" y="98">
    <tspan x="65" dy="0" class="arch-text-title">Twitter/Reddit</tspan>
    <tspan x="65" dy="14">Streams</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="140" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="185" y="98">
    <tspan x="185" dy="0" class="arch-text-title">scispaCy</tspan>
    <tspan x="185" dy="14">Classification</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="260" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="305" y="98">
    <tspan x="305" dy="0" class="arch-text-title">Presidio</tspan>
    <tspan x="305" dy="14">PII Redaction</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="380" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="425" y="98">
    <tspan x="425" dy="0" class="arch-text-title">PostgreSQL</tspan>
    <tspan x="425" dy="14">&amp; Redis</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="500" y="75" width="80" height="50" rx="8" />
  <text class="arch-text" x="540" y="98">
    <tspan x="540" dy="0" class="arch-text-title">Next.js</tspan>
    <tspan x="540" dy="14">Dashboard</tspan>
  </text>
</svg>`
  },
  recruitiq: {
    title: "RecruitIQ",
    desc: "Automated recruitment ranking pipeline. Parses incoming PDF resumes, computes semantic embeddings, ranks candidates based on job description cosine similarity, and renders details via a real-time Streamlit dashboard.",
    tags: ["Python", "Streamlit", "MiniLM-L6-v2", "Cosine Similarity", "NLP"],
    svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-recruit" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--main-color)" />
    </marker>
  </defs>
  <!-- Connection Edges -->
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-recruit)" d="M 110,100 L 138,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-recruit)" d="M 230,100 L 258,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-recruit)" d="M 350,100 L 378,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-recruit)" d="M 470,100 L 498,100" />
  
  <!-- Nodes -->
  <rect class="arch-node arch-node-active" x="20" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="65" y="98">
    <tspan x="65" dy="0" class="arch-text-title">PDF Resume</tspan>
    <tspan x="65" dy="14">Parsing</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="140" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="185" y="98">
    <tspan x="185" dy="0" class="arch-text-title">miniLM</tspan>
    <tspan x="185" dy="14">Embeddings</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="260" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="305" y="98">
    <tspan x="305" dy="0" class="arch-text-title">Cosine</tspan>
    <tspan x="305" dy="14">Similarity</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="380" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="425" y="98">
    <tspan x="425" dy="0" class="arch-text-title">Quality &amp;</tspan>
    <tspan x="425" dy="14">Match Filters</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="500" y="75" width="80" height="50" rx="8" />
  <text class="arch-text" x="540" y="98">
    <tspan x="540" dy="0" class="arch-text-title">Streamlit</tspan>
    <tspan x="540" dy="14">Dashboard</tspan>
  </text>
</svg>`
  },
  careercoach: {
    title: "CF AI Career Coach",
    desc: "Serverless AI career mentorship assistant. Routes chat requests through Cloudflare Workers, queries low-latency Llama 3.3 models via Workers AI, and retains session state utilizing Cloudflare Durable Objects.",
    tags: ["Cloudflare Workers", "Workers AI", "Llama 3.3", "Durable Objects", "Wrangler"],
    svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-coach" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--main-color)" />
    </marker>
  </defs>
  <!-- Connection Edges -->
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-coach)" d="M 140,100 L 178,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-coach)" d="M 280,100 L 318,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-coach)" d="M 420,100 L 458,100" />
  
  <!-- Nodes -->
  <rect class="arch-node arch-node-active" x="40" y="75" width="100" height="50" rx="8" />
  <text class="arch-text" x="90" y="98">
    <tspan x="90" dy="0" class="arch-text-title">Portfolio</tspan>
    <tspan x="90" dy="14">Client UI</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="180" y="75" width="100" height="50" rx="8" />
  <text class="arch-text" x="230" y="98">
    <tspan x="230" dy="0" class="arch-text-title">CF Workers</tspan>
    <tspan x="230" dy="14">API Router</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="320" y="75" width="100" height="50" rx="8" />
  <text class="arch-text" x="370" y="98">
    <tspan x="370" dy="0" class="arch-text-title">Workers AI</tspan>
    <tspan x="370" dy="14">Llama 3.3 LLM</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="460" y="75" width="100" height="50" rx="8" />
  <text class="arch-text" x="510" y="98">
    <tspan x="510" dy="0" class="arch-text-title">Durable Objects</tspan>
    <tspan x="510" dy="14">Session Context</tspan>
  </text>
</svg>`
  },
  payoutengine: {
    title: "Playto Payout Engine",
    desc: "Asynchronous transaction payout orchestrator. Handles user reward payouts asynchronously by queuing tasks from Django DRF via a Redis Message Broker, executing them reliably in Celery workers, and persisting transactions in PostgreSQL.",
    tags: ["Django DRF", "Celery", "Redis", "PostgreSQL", "Docker", "REST API"],
    svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-payout" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--main-color)" />
    </marker>
  </defs>
  <!-- Connection Edges -->
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-payout)" d="M 110,100 L 138,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-payout)" d="M 230,100 L 258,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-payout)" d="M 350,100 L 378,100" />
  <path class="arch-edge arch-edge-active" marker-end="url(#arrow-payout)" d="M 470,100 L 498,100" />
  
  <!-- Nodes -->
  <rect class="arch-node arch-node-active" x="20" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="65" y="98">
    <tspan x="65" dy="0" class="arch-text-title">API Payout</tspan>
    <tspan x="65" dy="14">Request</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="140" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="185" y="98">
    <tspan x="185" dy="0" class="arch-text-title">Django DRF</tspan>
    <tspan x="185" dy="14">Endpoint</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="260" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="305" y="98">
    <tspan x="305" dy="0" class="arch-text-title">Redis</tspan>
    <tspan x="305" dy="14">Message Broker</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="380" y="75" width="90" height="50" rx="8" />
  <text class="arch-text" x="425" y="98">
    <tspan x="425" dy="0" class="arch-text-title">Celery</tspan>
    <tspan x="425" dy="14">Worker Queue</tspan>
  </text>
  
  <rect class="arch-node arch-node-active" x="500" y="75" width="80" height="50" rx="8" />
  <text class="arch-text" x="540" y="98">
    <tspan x="540" dy="0" class="arch-text-title">PostgreSQL</tspan>
    <tspan x="540" dy="14">DB Store</tspan>
  </text>
</svg>`
  }
};

const archDrawerOverlay = document.getElementById('arch-drawer-overlay');
const archDrawer = document.getElementById('arch-drawer');
const drawerCloseBtn = document.getElementById('drawer-close');
const drawerTitle = document.getElementById('drawer-title');
const drawerDesc = document.getElementById('drawer-desc');
const drawerTags = document.getElementById('drawer-tags');
const drawerSvgContainer = document.getElementById('drawer-svg-container');

// Open drawer
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-arch');
  if (btn) {
    const projectId = btn.getAttribute('data-project');
    const project = projectArchitectures[projectId];
    if (project) {
      drawerTitle.textContent = project.title;
      drawerDesc.textContent = project.desc;
      drawerTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
      drawerSvgContainer.innerHTML = project.svg;
      
      archDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
});

// Close drawer function
function closeDrawer() {
  if (archDrawerOverlay) {
    archDrawerOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

if (drawerCloseBtn) {
  drawerCloseBtn.addEventListener('click', closeDrawer);
}

if (archDrawerOverlay) {
  archDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === archDrawerOverlay) {
      closeDrawer();
    }
  });
}

// Esc key to close drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
  }
});

/* ==================== Serverless Visitor Analytics Badge ==================== */
async function fetchVisitorAnalytics() {
  const visitorCountEl = document.getElementById('visitor-count');
  const messagesCountEl = document.getElementById('messages-count');
  
  // Set up local storage fallback stats (initialize if empty)
  let localViews = parseInt(localStorage.getItem('portfolio_views') || '142');
  let localMsgs = parseInt(localStorage.getItem('portfolio_messages') || '18');
  
  // Increment view count on each page load
  localViews++;
  localStorage.setItem('portfolio_views', localViews.toString());
  
  // Initially show local counts
  if (visitorCountEl) visitorCountEl.textContent = localViews;
  if (messagesCountEl) messagesCountEl.textContent = localMsgs;
  
  try {
    // Attempt to hit the Cloudflare Worker endpoint
    const res = await fetch('https://cf-ai-web-coach.himanshu524.workers.dev/api/visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ views: localViews, messages: localMsgs })
    });
    
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data && typeof data.views !== 'undefined') {
          localStorage.setItem('portfolio_views', data.views.toString());
          if (visitorCountEl) visitorCountEl.textContent = data.views;
        }
        if (data && typeof data.messages !== 'undefined') {
          localStorage.setItem('portfolio_messages', data.messages.toString());
          if (messagesCountEl) messagesCountEl.textContent = data.messages;
        }
      }
    }
  } catch (err) {
    console.warn("Analytics API request failed, using local fallback.", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchVisitorAnalytics();
});
