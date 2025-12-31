const Search = {
    // Fungsi Asynchronous untuk fetch ke Wikipedia
    wiki: async function(query) {
        try {
            // 1. Cari List Artikel
            const listUrl = `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
            const listRes = await fetch(listUrl);
            const listJson = await listRes.json();

            if (listJson.query?.search?.length > 0) {
                // 2. Ambil detail artikel pertama
                const bestMatch = listJson.query.search[0];
                const detailUrl = `https://id.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(bestMatch.title)}&format=json&origin=*`;
                const detailRes = await fetch(detailUrl);
                const detailJson = await detailRes.json();
                
                const pages = detailJson.query.pages;
                const pageId = Object.keys(pages)[0];
                
                return {
                    found: true,
                    title: pages[pageId].title,
                    extract: pages[pageId].extract, // Teks penuh
                    snippet: pages[pageId].extract.substring(0, 600) + "..." // Cuplikan
                };
            }
        } catch (e) {
            console.error("Wiki Error:", e);
        }
        return { found: false };
    }
};
