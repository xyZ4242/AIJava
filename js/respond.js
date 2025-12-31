const Respond = {
    formatMath: function(resultObj) {
        if (!resultObj.success) return Data.responses.mathError;
        return `
            <div class="result-box">
                <div class="label">Kalkulasi:</div>
                <div class="value" style="font-family: monospace; font-size: 1.2rem;">${resultObj.formula}</div>
                <hr style="border-color: #444; margin: 5px 0;">
                <div class="label">Hasil:</div>
                <div class="value" style="font-size: 1.5rem; font-weight: bold; color: #8AB4F8;">${resultObj.result}</div>
            </div>
        `;
    },

    formatWiki: function(wikiData) {
        return `
            <h3>📖 ${wikiData.title}</h3>
            <p style="margin-top: 10px; line-height: 1.6;">${wikiData.snippet}</p>
            <br>
            <small style="color: #aaa;">Sumber: Wikipedia Indonesia</small>
        `;
    },

    formatTime: function() {
        const now = new Date();
        return `
            <div style="font-size: 2rem; font-weight: 300;">
                ${now.toLocaleTimeString('id-ID')} <span style="font-size: 1rem;">WIB</span>
            </div>
            <div style="color: #aaa;">${now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        `;
    },
    
    // Fallback jika tidak ditemukan
    formatNotFound: function(query) {
        return `
            <p>${Data.responses.notFound}</p>
        `;
    }
};
