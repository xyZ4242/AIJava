const Detector = {
    analyze: function(inputRaw) {
        const input = inputRaw.trim();
        const lower = input.toLowerCase();

        // 1. Matematika
        if (Mtk.isMath(input)) {
            return { type: 'MATH', payload: input };
        }

        // 2. Waktu
        if ((lower.includes('jam') || lower.includes('waktu')) &&
            (lower.includes('sekarang') || lower.includes('berapa'))) {
            return { type: 'TIME' };
        }

        // 3. Pertanyaan Fakta → SEARCH
        if (
            /^(siapa|apa|dimana|kapan|siapakah|apakah)\s+/i.test(lower)
            && lower.split(" ").length <= 6
        ) {
            return { type: 'SEARCH', payload: input };
        }

        // 4. Chat
        const chatReply = Bahasa.match(input);
        if (chatReply) {
            return { type: 'CHAT', payload: chatReply };
        }

        // 5. Reasoning
        const logicReply = Reasoning.analyze(input);
        if (logicReply) {
            return { type: 'REASONING', payload: logicReply };
        }

        // 6. Default Search
        return { type: 'SEARCH', payload: input };
    }
};