const UI = {

    aiLogoURL: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg", 

    toggleSidebar: function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    },

    autoGrow: function(element) {
        element.style.height = "auto";
        element.style.height = (element.scrollHeight) + "px";
    },

    fillInput: function(text) {
        const input = document.getElementById('userQuestion');
        input.value = text;
        this.autoGrow(input);
        input.focus();
    },

    // Menambah Bubble
    appendMessage: function(role, htmlContent) {
        const container = document.getElementById('chatContainer');
        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper';

        if (role === 'user') {
            // Bubble User
            wrapper.innerHTML = `
                <div class="user-msg">
                    <div class="user-content">${htmlContent}</div>
                </div>`;
        } else {
            // Bubble AI dengan LOGO IMAGE
            const uniqueId = 'ai-' + Date.now();
            wrapper.innerHTML = `
                <div class="ai-msg">
                    <div class="ai-avatar">
                        <img src="${this.aiLogoURL}" alt="xyZ AI Logo">
                    </div>
                    <div class="ai-content" id="${uniqueId}">
                        <div class="loading-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>`;
            
            container.appendChild(wrapper);
            container.scrollTop = container.scrollHeight;
            return uniqueId;
        }

        container.appendChild(wrapper);
        container.scrollTop = container.scrollHeight;
    },

    // Efek Mengetik
    typeEffect: function(elementId, htmlText) {
        return new Promise(resolve => {
            const element = document.getElementById(elementId);
            element.innerHTML = htmlText; // Render HTML langsung
            
            // Reset opacity untuk animasi
            element.style.opacity = 0;
            element.style.animation = "fadeIn 0.5s forwards"; 
            
            // Simulasi delay sedikit agar terasa natural
            setTimeout(resolve, 600); 
        });
    },

    // Membuat Tombol Link (Google/Youtube)
    appendLinks: function(targetId, query) {
        // Cek apakah element target masih ada
        const target = document.getElementById(targetId);
        if (!target) return;

        const grid = document.createElement('div');
        grid.className = 'source-grid';

        // Pastikan Data.links ada (dari data.js)
        if (typeof Data !== 'undefined' && Data.links) {
            Data.links.forEach(node => {
                const link = document.createElement('a');
                link.className = 'link-tag';
                link.target = '_blank';
                link.href = node.url + encodeURIComponent(query);
                link.innerHTML = `<i class="${node.icon}"></i> ${node.name}`;
                grid.appendChild(link);
            });
            target.appendChild(grid);
        }
    }
};