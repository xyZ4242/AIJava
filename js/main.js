
const Main = {
    init: function() {
        // Event Listener untuk Enter key
        document.getElementById('userQuestion').addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                Main.process();
            }
        });
    },

    process: async function() {
        const inputField = document.getElementById('userQuestion');
        const rawInput = inputField.value.trim();
        if (!rawInput) return;

        // 1. UI Updates
        document.getElementById('welcomeScreen').style.display = 'none';
        UI.appendMessage('user', rawInput);
        inputField.value = '';
        inputField.style.height = 'auto';
        
        // 2. Tampilkan Loading
        const aiBubbleId = UI.appendMessage('ai', 'loading');

        // 3. ANALISA (Detector)
        const intent = Detector.analyze(rawInput);
        Data.memory.lastTopic = rawInput;

        // Simulasi berpikir
        await new Promise(r => setTimeout(r, 800));

        // 4. EKSEKUSI BERDASARKAN INTENT
        let responseHTML = "";
        let showLinks = false;

        switch (intent.type) {
            case 'MATH':
                const mathRes = Mtk.solve(intent.payload);
                responseHTML = Respond.formatMath(mathRes);
                break;

            case 'TIME':
                responseHTML = Respond.formatTime();
                break;

            case 'CHAT':
                responseHTML = intent.payload;
                break;
            
            case 'REASONING':
                responseHTML = intent.payload;
                break;

            case 'SEARCH':
                const wikiData = await Search.wiki(intent.payload);
                if (wikiData.found) {
                    responseHTML = Respond.formatWiki(wikiData);
                    showLinks = true;
                } else {
                    responseHTML = Respond.formatNotFound();
                    showLinks = true;
                }
                break;
        }

        // 5. RENDER FINAL
        await UI.typeEffect(aiBubbleId, responseHTML);
        
        if (showLinks) {
            UI.appendLinks(aiBubbleId, rawInput);
        }
    }
};

// Jalankan saat halaman siap
window.onload = Main.init;
