const Reasoning = {
    // Logika sederhana: Deteksi kata kunci sebab akibat
    analyze: function(text) {
        text = text.toLowerCase();

        if (text.includes('jika') && text.includes('maka')) {
            return "Itu adalah struktur logika implikasi (If-Then). Dalam pemrograman, ini disebut Conditional Statement.";
        }
        
        if (text.includes('kenapa') || text.includes('mengapa')) {
            // Placeholder logic, di masa depan bisa dikoneksikan ke knowledge graph
            return "Pertanyaan 'Mengapa' membutuhkan analisis kausalitas. Untuk saat ini, saya sarankan mencari penjelasannya di Wikipedia.";
        }

        return null;
    }
};
