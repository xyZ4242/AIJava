const Data = {
    botName: "xyZ AI",
    memory: {
        lastTopic: null,
        history: []
    },
    
    // Database Link Eksternal
  
    links: [
        { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'fab fa-google' },
        { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: 'fab fa-youtube' },
        { name: 'Wikipedia', url: 'https://id.wikipedia.org/wiki/', icon: 'fab fa-wikipedia-w' },
        { name: 'Maps', url: 'https://www.google.com/maps?q=', icon: 'fas fa-map-marker-alt' },

        { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'fab fa-microsoft' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: 'fas fa-search' },
        { name: 'GitHub', url: 'https://github.com/search?q=', icon: 'fab fa-github' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q=', icon: 'fab fa-stack-overflow' },
        { name: 'Twitter / X', url: 'https://twitter.com/search?q=', icon: 'fab fa-x-twitter' },
        { name: 'TikTok', url: 'https://www.tiktok.com/search?q=', icon: 'fab fa-tiktok' }
    ],
    
        // KONFIGURASI MATEMATIKA
    // (INI YANG KAMU EDIT KALAU MAU UBAH BEHAVIOR)
    // ==============================
    mathConfig: {
        operators: ['+', '-', '*', '/', '×', '÷', '^', '%', '√', 'π'],
        allowText: true,
        decimalLimit: 4,
        enableSmartParse: true
    },

    // Template Respon
    responses: {
        thinking: ["Memproses data...", "Mencari informasi...", "Sedang mengetik..."],
        notFound: "Saya tidak menemukan data internal. Berikut akses cepat ke web:",
        mathError: "Format matematika tidak valid."
    }
};
