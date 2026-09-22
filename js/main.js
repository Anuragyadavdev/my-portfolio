// =========================================
// MAIN.JS - Navigation, Animations, Interactions
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- Navigation ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }
    
    // Close nav on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
    
    // ---------- Navbar scroll effect ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.06)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ---------- Hero Terminal Animation (dynamic) ----------
    function initHeroTerminal() {
        const terminalBody = document.getElementById('heroTerminal');
        if (!terminalBody) return;
        
        const lines = [
            { prompt: '$', cmd: 'whoami', output: 'anurag-yadav <span class="highlight">// Software Developer</span>', delay: 100 },
            { prompt: '$', cmd: 'current_focus', output: 'Full Stack Development <span class="highlight">+</span> Cloud <span class="highlight">+</span> AI', delay: 300 },
            { prompt: '$', cmd: 'problems_solved', output: '<span class="highlight">500+</span> DSA Problems', delay: 500 },
            { prompt: '$', cmd: 'status', output: '🚀 Building <span class="highlight">|</span> 📚 Learning <span class="highlight">|</span> 💡 Creating', delay: 700 },
            { prompt: '$', cmd: '<span style="color: var(--text-muted);">_</span>', output: '', delay: 900, isCursor: true }
        ];
        
        terminalBody.innerHTML = '';
        
        lines.forEach((line, index) => {
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.style.animationDelay = (index * 0.2) + 's';
            
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = line.prompt;
            
            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'cmd';
            cmdSpan.innerHTML = line.cmd;
            
            div.appendChild(promptSpan);
            div.appendChild(cmdSpan);
            
            if (line.output) {
                const outputSpan = document.createElement('span');
                outputSpan.className = 'output';
                outputSpan.innerHTML = line.output;
                div.appendChild(outputSpan);
            }
            
            if (line.isCursor) {
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                div.appendChild(cursor);
            }
            
            terminalBody.appendChild(div);
        });
    }
    
    initHeroTerminal();
    
    // ---------- Scroll Reveal (Intersection Observer) ----------
    const revealElements = document.querySelectorAll(
        '.section, .stat-card, .skill-card, .project-card, .journey-step, .dsa-category, .featured-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ---------- DSA Category Click ----------
    const dsaCategories = document.querySelectorAll('.dsa-category');
    const dsaViz = document.getElementById('dsaViz');
    
    const dsaMessages = {
        arrays: '📊 Arrays: Sequential data structures. O(1) access, O(n) search.',
        strings: '🔤 Strings: Text manipulation. Pattern matching, palindromes, anagrams.',
        linkedlist: '🔗 Linked Lists: Dynamic data chains. O(1) insert/delete at head.',
        trees: '🌳 Trees: Hierarchical structures. BST, AVL, traversals (DFS/BFS).',
        graphs: '📈 Graphs: Networks of nodes. BFS, DFS, Dijkstra, shortest paths.',
        dp: '🧩 Dynamic Programming: Overlapping subproblems. Memoization + tabulation.',
        binarysearch: '🔎 Binary Search: O(log n) search on sorted data. Divide and conquer.',
        recursion: '🔄 Recursion: Problems that call themselves. Base case + recursive step.',
        sorting: '📐 Sorting: Organizing data. Merge, Quick, Bubble, Selection sort.',
        hashing: '🔑 Hashing: O(1) average access. Hash functions, collision resolution.',
        twopointers: '👆 Two Pointers: Efficient array traversal. Used in sorting, searching.',
        graphalgo: '🧠 Graph Algorithms: Advanced graph techniques. Topological sort, MST, Floyd-Warshall.'
    };
    
    dsaCategories.forEach(cat => {
        cat.addEventListener('click', function() {
            const algo = this.dataset.algo;
            
            // Remove active class from all
            dsaCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Show visualization
            if (dsaViz) {
                const message = dsaMessages[algo] || '🧠 Exploring algorithms...';
                dsaViz.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <span style="font-size: 3rem; display: block; margin-bottom: 12px;">${message.split(' ')[0]}</span>
                        <p style="color: var(--text-secondary); font-size: 1rem; max-width: 400px; margin: 0 auto;">
                            ${message}
                        </p>
                        <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 16px; font-family: var(--font-mono);">
                            ⚡ Interactive visualization coming soon
                        </p>
                    </div>
                `;
            }
        });
    });
    
    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for reaching out! I\'ll get back to you soon. 🚀');
            this.reset();
        });
    }
    
    // ---------- Resume Button ----------
    // const resumeBtn = document.getElementById('resumeBtn');
    // const resumeDownload = document.getElementById('resumeDownload');
    
    // if (resumeBtn) {
    //     resumeBtn.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         alert('📄 Resume download will be available once you add your PDF file.\n\nPlace your resume at: assets/resume.pdf');
    //     });
    // }
    
    // if (resumeDownload) {
    //     resumeDownload.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         alert('📄 Resume download will be available once you add your PDF file.\n\nPlace your resume at: assets/resume.pdf');
    //     });
    // }
    
    // ---------- Social Links (placeholder) ----------
    const socialLinks = {
        githubLink: 'https://github.com/Anuragyadavdev',
        linkedinLink: 'https://www.linkedin.com/in/anurag-yadav-0a51022a1/',
        leetcodeLink: 'https://leetcode.com/u/ay073501/',
        gfgLink: 'https://www.geeksforgeeks.org/profile/ay073p91f',
        githubContact: 'https://github.com/Anuragyadavdev',
        linkedinContact: 'https://www.linkedin.com/in/anurag-yadav-0a51022a1/',
        leetcodeContact: 'https://leetcode.com/u/ay073501/',
        gfgContact: 'https://www.geeksforgeeks.org/profile/ay073p91f'
    };
    
    Object.keys(socialLinks).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = socialLinks[id];
        }
    });
    
    console.log('🚀 Anurag Yadav | Portfolio loaded successfully!');
    console.log('💡 Tip: Click the terminal icon in the bottom-right for an interactive console.');
});