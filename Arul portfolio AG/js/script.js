/**
 * Arul Selvan K M - Portfolio Interaction Logic
 * Pure Vanilla JavaScript (ES6)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // 2. Hero Canvas Particle Background
    initCanvas();

    // 3. Typing Animation
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "Building Intelligent Systems that Solve Real-World Problems",
        "Full Stack Developer",
        "AI Enthusiast",
        "Computer Science Engineering Student"
    ];
    let i = 0;
    let j = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;

    function loopTyping() {
        isEnd = false;
        typingText.innerHTML = currentPhrase.join('');

        if (i < phrases.length) {
            if (!isDeleting && j <= phrases[i].length) {
                currentPhrase.push(phrases[i][j]);
                j++;
                typingText.innerHTML = currentPhrase.join('');
            }

            if (isDeleting && j <= phrases[i].length) {
                currentPhrase.pop(phrases[i][j]);
                j--;
                typingText.innerHTML = currentPhrase.join('');
            }

            if (j == phrases[i].length) {
                isEnd = true;
                isDeleting = true;
            }

            if (isDeleting && j == 0) {
                currentPhrase = [];
                isDeleting = false;
                i++;
                if (i == phrases.length) i = 0;
            }
        }
        const speed = isEnd ? 2000 : isDeleting ? 50 : 100;
        setTimeout(loopTyping, speed);
    }
    loopTyping();

    // 4. Intersection Observer for Reveals
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // If it's the funded section, start counter
                if (entry.target.id === 'funded') {
                    startCounter();
                }

                // If it's the skills section, animate bars
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });

    // 5. Skills Progress Animation
    function animateSkills() {
        const progresses = document.querySelectorAll('.skill-progress');
        progresses.forEach(prog => {
            prog.style.width = prog.getAttribute('data-width');
        });
    }

    // 6. Funding Counter
    function startCounter() {
        const counter = document.getElementById('funding-counter');
        const target = parseInt(counter.getAttribute('data-target'));
        const count = 0;
        const speed = 200;

        const updateCount = () => {
            const current = parseInt(counter.innerText.replace('₹', '').replace(/,/g, ''));
            const inc = target / speed;

            if (current < target) {
                counter.innerText = `₹${Math.ceil(current + inc).toLocaleString()}`;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = `₹${(12.5).toLocaleString()} Lakhs`;
            }
        };
        updateCount();
    }

    // 7. 3D Card Tilt Effect
    const cards = document.querySelectorAll('.project-inner');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 8. AI Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    const botResponses = {
        "skills": "Arul is proficient in Java, Python, and C. He specializes in Full Stack development with Spring Boot and Node.js, and is highly skilled in Machine Learning and Data Analytics.",
        "projects": "Arul has built several impressive projects including a Freelancing Platform, a Bank Management System, and a Healthcare Medication Reminder. His favorite is the IoT Based Warehouse Security System!",
        "internship": "Arul interned at Yaazh Tech Pvt Ltd as a Frontend Developer Intern, where he contributed to building a robust Bank Management System using Java and Spring Boot.",
        "funded": "Arul's project 'IoT Based Warehouse Security System' received a funding of ₹12.5 Lakhs from MSME 4.0!",
        "contact": "You can reach Arul at +91 9655576962 or email him at arulselvanmahalingam@gmail.com.",
        "default": "I'm not sure about that. Try asking about his skills, projects, internship, or contact details!"
    };

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-msg' : 'bot-msg'}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleChat() {
        const text = chatInput.value.toLowerCase();
        if (!text) return;

        addMessage(chatInput.value, true);
        chatInput.value = '';

        setTimeout(() => {
            let response = botResponses.default;
            if (text.includes('skill')) response = botResponses.skills;
            else if (text.includes('project')) response = botResponses.projects;
            else if (text.includes('intern')) response = botResponses.internship;
            else if (text.includes('funded')) response = botResponses.funded;
            else if (text.includes('contact')) response = botResponses.contact;

            addMessage(response, false);
        }, 500);
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

    // 9. Form Ripple & Interaction
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 10. Navbar Scroll Effect & Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        let current = "";

        // Scroll glass effect
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active link tracking
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    }, { passive: true });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'Message Sent!';
            btn.style.background = '#28a745';
            contactForm.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
});

// Canvas Setup Function
function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        const count = window.innerWidth < 768 ? 50 : 150;
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();
}
