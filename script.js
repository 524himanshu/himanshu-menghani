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
  
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('linkedin') || q.includes('hire')) {
    return "You can reach Himanshu in several ways:<br><br>• <strong>Email</strong>: <a href='mailto:himanshumenghani524@gmail.com'>himanshumenghani524@gmail.com</a><br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/himanshumenghani524/' target='_blank'>himanshumenghani524</a><br>• Or fill out the <strong>Contact Form</strong> directly on this page!";
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
  
  return "That's an interesting question! Himanshu is a Full Stack Developer & AI Engineer focused on production-ready systems (FastAPI, Next.js, Celery, RAG pipelines). Feel free to check out his Projects or Journey sections, or drop an email to <a href='mailto:himanshumenghani524@gmail.com'>himanshumenghani524@gmail.com</a>!";
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
