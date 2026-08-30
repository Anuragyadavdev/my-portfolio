// =========================================
// CONSOLE.JS - Developer Console Easter Egg
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const toggleBtn = document.getElementById('consoleToggle');
    const overlay = document.getElementById('consoleOverlay');
    const output = document.getElementById('consoleOutput');
    const input = document.getElementById('consoleInput');
    
    let isOpen = false;
    let commandHistory = [];
    let historyIndex = -1;
    
    // ---------- Toggle Console ----------
    toggleBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        overlay.classList.toggle('open', isOpen);
        if (isOpen) {
            input.focus();
            // Reset placeholder
            input.placeholder = 'Type a command...';
        }
    });
    
    // ---------- Command Handler ----------
    function handleCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        if (!trimmed) return;
        
        // Add to history
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;
        
        // Echo the command
        addOutput(`<span class="prompt">$</span> ${cmd.trim()}`);
        
        // Process command
        switch(trimmed) {
            case 'help':
                addOutput(`
                    <span style="color: var(--accent-primary);">Available commands:</span><br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">help</span> &nbsp; - Show this help<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">about</span> &nbsp; - About Anurag<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">skills</span> &nbsp;- Show tech stack<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">projects</span> - Show projects<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">dsa</span> &nbsp;&nbsp;&nbsp; - DSA stats<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">contact</span> &nbsp;- Contact info<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">clear</span> &nbsp; - Clear console<br />
                    &nbsp;&nbsp;<span style="color: var(--accent-secondary);">whoami</span> &nbsp;- Who is Anurag?
                `);
                break;
                
            case 'about':
                addOutput(`
                    <span style="color: var(--text-primary);">Anurag Yadav</span><br />
                    <span style="color: var(--text-secondary);">B.Tech CSE | 2023-2027</span><br />
                    <span style="color: var(--text-secondary);">Software Developer | Full Stack Developer</span><br />
                    <span style="color: var(--text-secondary);">500+ DSA Problems Solved</span><br />
                    <span style="color: var(--text-muted);">"Building solutions, one problem at a time."</span>
                `);
                break;
                
            case 'skills':
                addOutput(`
                    <span style="color: var(--accent-primary);">Tech Stack</span><br />
                    <span style="color: var(--text-secondary);">Languages:</span> C, C++, JavaScript<br />
                    <span style="color: var(--text-secondary);">Frontend:</span> HTML, CSS, React, Tailwind, Bootstrap<br />
                    <span style="color: var(--text-secondary);">Backend:</span> Node.js, Spring Boot, REST APIs<br />
                    <span style="color: var(--text-secondary);">Database:</span> MySQL, MongoDB, Firebase<br />
                    <span style="color: var(--text-secondary);">Tools:</span> Git, GitHub, VS Code, Postman, IntelliJ<br />
                    <span style="color: var(--text-secondary);">Exploring:</span> Cloud, Docker, Jenkins, AI
                `);
                break;
                
            case 'projects':
                addOutput(`
                    <span style="color: var(--accent-primary);">Projects</span><br />
                    <span style="color: var(--text-secondary);">🔹 [Project 1]</span> - React + Node.js + MongoDB<br />
                    <span style="color: var(--text-secondary);">🔹 [Project 2]</span> - Spring Boot + MySQL + REST API<br />
                    <span style="color: var(--text-secondary);">🔹 [Project 3]</span> - React + Firebase + Tailwind<br />
                    <span style="color: var(--text-muted);">Check the projects section for details!</span>
                `);
                break;
                
            case 'dsa':
                addOutput(`
                    <span style="color: var(--accent-primary);">DSA Journey</span><br />
                    <span style="color: var(--text-secondary);">📊 500+ Problems Solved</span><br />
                    <span style="color: var(--text-secondary);">Arrays, Strings, Linked Lists, Trees, Graphs</span><br />
                    <span style="color: var(--text-secondary);">DP, Recursion, Binary Search, Sorting, Hashing</span><br />
                    <span style="color: var(--text-muted);">"Beyond Building — I Solve Problems"</span>
                `);
                break;
                
            case 'contact':
                addOutput(`
                    <span style="color: var(--accent-primary);">Contact Anurag</span><br />
                    <span style="color: var(--text-secondary);">📧 email@example.com</span><br />
                    <span style="color: var(--text-secondary);">🐙 github.com/yourusername</span><br />
                    <span style="color: var(--text-secondary);">🔗 linkedin.com/in/yourusername</span><br />
                    <span style="color: var(--text-secondary);">💻 leetcode.com/yourusername</span><br />
                    <span style="color: var(--text-secondary);">📚 geeksforgeeks.org/user/yourusername</span>
                `);
                break;
                
            case 'whoami':
                addOutput(`
                    <span style="color: var(--text-primary);">Anurag Yadav</span><br />
                    <span style="color: var(--text-secondary);">Software Developer who enjoys turning ideas into working products.</span><br />
                    <span style="color: var(--text-muted);">B.Tech CSE | 500+ DSA | Full Stack | Cloud | AI</span>
                `);
                break;
                
            case 'clear':
                output.innerHTML = '';
                break;
                
            default:
                addOutput(`<span class="error">Command not found: ${cmd.trim()}</span><br /><span style="color: var(--text-muted);">Type 'help' for available commands.</span>`);
        }
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
    
    // ---------- Add Output ----------
    function addOutput(html) {
        const div = document.createElement('div');
        div.innerHTML = html + '<br />';
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }
    
    // ---------- Input Events ----------
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = this.value;
            handleCommand(cmd);
            this.value = '';
            
            // Keep focus
            setTimeout(() => input.focus(), 10);
        }
        
        // Command history (up/down arrows)
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });
    
    // Close console on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            overlay.classList.remove('open');
            toggleBtn.focus();
        }
    });
    
    // ---------- Welcome Message ----------
    setTimeout(() => {
        addOutput(`
            <span style="color: var(--accent-secondary);">╔═══════════════════════════════════════╗</span><br />
            <span style="color: var(--accent-secondary);">║</span>  <span style="color: var(--text-primary);">👨‍💻 Developer Console v1.0</span>  <span style="color: var(--accent-secondary);">║</span><br />
            <span style="color: var(--accent-secondary);">╚═══════════════════════════════════════╝</span><br />
            <span style="color: var(--text-secondary);">Welcome to Anurag's interactive console.</span><br />
            <span style="color: var(--text-muted);">Type <span style="color: var(--accent-secondary);">help</span> to get started.</span>
        `);
    }, 500);
    
    console.log('🖥️ Developer Console loaded! Click the terminal icon to open.');
});