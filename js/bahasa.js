const Bahasa = {
    patterns: [
        // Salam
        { 
            regex: /\b(halo|hai|hei|hey|pagi|siang|sore|malam)\b/i, 
            reply: () => {
                const replies = [
                    "Halo! Ada yang bisa saya bantu?",
                    "Hai 👋 Ada yang ingin ditanyakan?",
                    "Halo! Siap membantu kapan saja.",
                    "Hey! Mau bahas apa hari ini?"
                ];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        },

        // Perkenalan bot
        { 
            regex: /\b(siapa|apa)\s(kamu|namamu|bot|ini)\b/i, 
            reply: "Saya xyZ AI, asisten virtual berbasis JavaScript modular dengan sistem respon adaptif."
        },

        // Terima kasih
        { 
            regex: /\b(makasih|terima\s?kasih|thanks|thx)\b/i, 
            reply: () => {
                const replies = [
                    "Sama-sama 😄",
                    "Dengan senang hati!",
                    "Siap, semoga membantu 👍",
                    "Kapan pun kamu butuh!"
                ];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        },

        // Pujian
        {
            regex: /\b(keren|hebat|mantap|bagus)\b/i,
            reply: "Terima kasih 😄 Aku akan terus belajar jadi lebih baik."
        },

        // Emosi negatif / kasar
        {
            regex: /\b(bodoh|jelek|stupid|goblok|tolol)\b/i,
            reply: "Saya mengerti kalau kamu kesal. Kita coba selesaikan pelan-pelan ya."
        },

        // Tanya kemampuan
        {
            regex: /\b(bisa apa|fitur|kemampuan|fungsi)\b/i,
            reply: "Saya bisa menjawab pertanyaan, bantu coding, logika AI, dan banyak lagi."
        },

        // Tidak paham
        {
            regex: /\b(nggak ngerti|gak paham|bingung)\b/i,
            reply: "Tenang, jelaskan bagian mana yang bikin bingung. Aku bantu pelan-pelan."
        }
    ],

    match: function(text) {
        if (!text) return null;

        const cleanText = text.toLowerCase().trim();

        for (const p of this.patterns) {
            if (p.regex.test(cleanText)) {
                return typeof p.reply === "function"
                    ? p.reply()
                    : p.reply;
            }
        }

        // Fallback cerdas
        return "Hmm, aku belum sepenuhnya paham 🤔 Bisa dijelasin sedikit lagi?";
    }
};