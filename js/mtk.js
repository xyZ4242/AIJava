const Mtk = {

    // =============================  
    // 1. KONFIGURASI & REGEX  
    // =============================  
    config: {
        decimalPlaces: 2,
        allowText: true
    },

    regex: {
        number: /-?\d+(\.\d+)?/g, // Menangkap integer, desimal, negatif
        fraction: /(\d+)\/(\d+)/g, // Menangkap pecahan
    },

    // =============================  
    // 2. DETEKSI SOAL  
    // =============================  
    isMath(text) {
    if (!Data.mathConfig.allowText) return false;
    // Tambahkan deteksi simbol matematika
    return (
        /\d/.test(text) &&
        (/(hitung|berapa|jumlah|hasil|luas|keliling|volume|sisa|total|per|masing)/i.test(text) || 
         /[+\-*/÷π√%^()]/.test(text))
    );
},


    // =============================  
    // 3. PARSER SOAL CERITA (LOGIKA BARU)
    // =============================  
    parseStory(text) {
        const t = text.toLowerCase();
        // Ekstrak semua angka
        const nums = [...t.matchAll(this.regex.number)].map(n => parseFloat(n[0]));

        // --- A. ARITMATIKA SOSIAL & PEKERJA (Soal 2) ---
        if (t.includes("pekerja") && (t.includes("hari") || t.includes("waktu"))) {
            // Logika: Proyek berhenti dan butuh tambahan pekerja
            if (t.includes("terhenti") || t.includes("berhenti")) {
                return {
                    type: "PEKERJA_TERHENTI",
                    totalHari: nums[0],
                    totalPekerja: nums[1],
                    hariBerjalan: nums[2],
                    hariBerhenti: nums[3]
                };
            }
        }

        // --- B. BARISAN & DERET (Soal 5, 7) ---
        if (t.includes("barisan") || t.includes("suku")) {
            // Mencari suku berikutnya (simple pattern)
            if (t.includes("berikutnya")) {
                return { type: "BARISAN_NEXT", data: nums };
            }
            // Aritmatika (Un atau Sn)
            if (t.includes("aritmatika") || t.includes("aritmetika")) {
                return { type: "BARISAN_ARITMATIKA", data: nums, text: t };
            }
        }

        // --- C. HIMPUNAN / DIAGRAM VENN (Soal 8) ---
        if ((t.includes("gemar") || t.includes("suka")) && t.includes("siswa")) {
            return {
                type: "HIMPUNAN_GANDA",
                total: nums[0], // Biasanya angka pertama adalah total siswa
                sukaA: nums[1],
                sukaB: nums[2],
                sukaKeduanya: t.includes("keduanya") ? nums[3] : null
            };
        }

        // --- D. GEOMETRI LANJUTAN ---
        // Belah Ketupat (Soal 11)
        if (t.includes("belah ketupat")) {
            if (t.includes("diagonal") && t.includes("keliling")) {
                return { type: "BELAH_KETUPAT_KOMPLEKS", d1: nums[0], keliling: nums[1] };
            }
            if (t.includes("luas")) return { type: "BELAH_KETUPAT_LUAS", d1: nums[0], d2: nums[1] };
        }
        
        // Kubus (Soal 13)
        if (t.includes("kubus")) {
            if (t.includes("diagonal sisi") || t.includes("diagonal bidang")) {
                return { type: "KUBUS_DIAGONAL_SISI", d: nums[0] };
            }
        }

        // --- E. FUNGSI LINEAR (Soal 9) ---
        if (t.includes("fungsi") && t.includes("f(x)")) {
            return { type: "FUNGSI_LINEAR", text: t }; // Membutuhkan parsing kompleks, dikembalikan ke solver umum
        }

        // --- F. SKALA & KESEBANGUNAN (Soal 12) ---
        if (t.includes("bayangan") && t.includes("tinggi")) {
            return {
                type: "KESEBANGUNAN",
                h1: nums[0], b1: nums[1], b2: nums[2]
            };
        }

        return null; // Lanjut ke kalkulator biasa
    },

    // =============================  
    // 4. SOLVER UTAMA  
    // =============================  
    solve(text) {
        try {
            // 1. Coba Parse Soal Cerita
            const story = this.parseStory(text);

            if (story) {
                switch (story.type) {
                    
                    case "PEKERJA_TERHENTI":
                        // Rumus: Tambahan = (Pekerja * HariBerhenti) / SisaHariEfektif
                        const sisaHari = story.totalHari - story.hariBerjalan - story.hariBerhenti;
                        const bebanTertunda = story.totalPekerja * story.hariBerhenti;
                        const tambahan = bebanTertunda / sisaHari;
                        return {
                            success: true,
                            result: Math.ceil(tambahan),
                            desc: `Tambahan pekerja: (${story.totalPekerja} org × ${story.hariBerhenti} hari) ÷ ${sisaHari} hari sisa`
                        };

                    case "BARISAN_NEXT":
                        // Deteksi pola sederhana (beda tetap)
                        const arr = story.data;
                        const diff1 = arr[1] - arr[0];
                        const diff2 = arr[2] - arr[1];
                        if (diff1 === diff2) {
                            return { success: true, result: arr[arr.length-1] + diff1, desc: `Pola: +${diff1}` };
                        }
                        // Pola bertingkat (Soal 5: 3,4,6,9 -> +1, +2, +3)
                        const beda1 = arr[1]-arr[0]; // 1
                        const beda2 = arr[2]-arr[1]; // 2
                        if (beda2 - beda1 === 1) {
                            const lastNum = arr[arr.length-1];
                            const lastDiff = arr[arr.length-1] - arr[arr.length-2];
                            return { success: true, result: lastNum + (lastDiff + 1), desc: "Pola bertingkat (+1, +2, +3...)" };
                        }
                        break;

                    case "HIMPUNAN_GANDA":
                        // Rumus: Total = (A + B - Both) + TidakSuka
                        // Mencari yang tidak suka keduanya (Soal 8)
                        if (story.sukaKeduanya !== null) {
                            const gabungan = (story.sukaA + story.sukaB) - story.sukaKeduanya;
                            const tidakSuka = story.total - gabungan;
                            return {
                                success: true,
                                result: tidakSuka,
                                desc: `Total (${story.total}) - (A+B-Irisan)`
                            };
                        }
                        break;

                    case "BELAH_KETUPAT_KOMPLEKS":
                        // Cari sisi dari keliling
                        const s = story.keliling / 4;
                        // Cari setengah d2 menggunakan Pythagoras: (d2/2)^2 = s^2 - (d1/2)^2
                        const halfD1 = story.d1 / 2;
                        const halfD2 = Math.sqrt((s**2) - (halfD1**2));
                        const d2 = halfD2 * 2;
                        const luas = 0.5 * story.d1 * d2;
                        return {
                            success: true,
                            result: luas,
                            desc: `Sisi=${s}, d2=${d2}, Luas=1/2×${story.d1}×${d2}`
                        };

                    case "KUBUS_DIAGONAL_SISI":
                        // Diagonal sisi = s√2 -> s = d / √2
                        const rusuk = story.d / Math.sqrt(2);
                        const lp = 6 * (rusuk ** 2);
                        return {
                            success: true,
                            result: Math.round(lp),
                            desc: `Rusuk=${story.d}/√2, LP=6×s²`
                        };
                    
                    case "KESEBANGUNAN":
                        // h1/b1 = h2/b2 -> h2 = (h1 * b2) / b1
                        const h2 = (story.h1 * story.b2) / story.b1;
                        return {
                            success: true,
                            result: h2,
                            desc: `(${story.h1} ÷ ${story.b1}) × ${story.b2}`
                        };
                }
            }

            // 2. Kalkulator Umum (Fallback)
            // Membersihkan input agar aman dievaluasi
            let expr = text
                .toLowerCase()
                .replace(/x/g, '*')      // ganti x dengan *
                .replace(/×/g, '*')
                .replace(/:/g, '/')      // ganti : dengan /
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')    // ganti ^ dengan ** (pangkat)
                .replace(/,/g, '.')      // ganti koma desimal
                .replace(/[^\d+\-*/().%\s**]/g, ''); // Hapus karakter non-math

            // Evaluasi matematika
            const result = Function(`"use strict"; return (${expr})`)();

            return {
                success: true,
                result: parseFloat(result.toFixed(this.config.decimalPlaces)),
                type: "CALCULATOR",
                formula: expr
            };

        } catch (e) {
            return { 
                success: false, 
                error: "Maaf, belum bisa memproses format soal ini.",
                debug: e.message 
            };
        }
    }
};
          
