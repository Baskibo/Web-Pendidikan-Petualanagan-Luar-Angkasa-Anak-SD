/* --- DATA PLANETS --- */
// Ganti URL gambar dengan path file lokal Anda (misal: 'assets/mercury.png')
const planetsData = [
    { id: 'mercury', name: 'Merkurius', role: 'Planet Terkecil', img: 'picture/Merkurius3.png', dist: '57,9 Juta km', temp: '-173°C s/d 427°C', moons: 'Tidak ada', diam: '4.879 km', fact: 'Merkurius bergerak paling cepat untuk mengelilingi Matahari.', gravity: 0.38 },
    { id: 'venus', name: 'Venus', role: 'Bintang Fajar', img: 'picture/Venus.png', dist: '108,2 Juta km', temp: '462 °C', moons: 'Tidak ada', diam: '12.109 km', fact: 'Venus lebih panas daripada planet lain meskipun bukan yang terdekat ke Matahari.', gravity: 0.91 },
    { id: 'earth', name: 'Bumi', role: 'Planet Biru', img: 'picture/Bumi3.png', dist: '149,6 Juta km', temp: '14 °C (Rata-rata)', moons: '1 (Bulan)', diam: '12.742 km', fact: 'Satu-satunya planet yang diketahui memiliki kehidupan.', gravity: 1.0 },
    { id: 'mars', name: 'Mars', role: 'Planet Merah', img: 'picture/Mars.png', dist: '227,9 Juta km', temp: '-63 °C', moons: '2', diam: '6.779 km', fact: 'Memiliki gunung berapi terbesar di tata surya, Olympus Mons.', gravity: 0.38 },
    { id: 'jupiter', name: 'Jupiter', role: 'Planet Terbesar', img: 'picture/Jupiter.png', dist: '778,5 Juta km', temp: '-108 °C', moons: '79+', diam: '139.820 km', fact: 'Bintik Merah Raksasa adalah badai yang lebih besar dari Bumi.', gravity: 2.34 },
    { id: 'saturn', name: 'Saturnus', role: 'Planet Bercincin', img: 'picture/Saturnus3.png', dist: '1,4 Miliar km', temp: '-139 °C', moons: '82+', diam: '116.460 km', fact: 'Cincinnya terdiri dari es, batu, dan debu.', gravity: 1.06 },
    { id: 'uranus', name: 'Uranus', role: 'Planet Miring', img: 'picture/Uranus.png', dist: '2,9 Miliar km', temp: '-197 °C', moons: '27', diam: '50.724 km', fact: 'Berputar miring di sisinya, berbeda dengan planet lain.', gravity: 0.92 },
    { id: 'neptune', name: 'Neptunus', role: 'Planet Berangin', img: 'picture/Neptunus.png', dist: '4,5 Miliar km', temp: '-201 °C', moons: '14', diam: '49.244 km', fact: 'Memiliki angin tercepat di tata surya.', gravity: 1.19 }
];

/* --- NAVIGATION --- */
/* Cari fungsi navigateTo di script.js dan ganti dengan ini */
function navigateTo(pageId) {
    // 1. Ambil semua elemen dengan class 'page'
    const allPages = document.querySelectorAll('.page');

    // 2. Sembunyikan semua halaman
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // 3. Tampilkan halaman yang dituju
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');

        // 4. Pastikan tampilan langsung ke atas (bukan scroll)
        window.scrollTo(0, 0);
    }

    // 5. Inisialisasi ulang konten jika masuk ke halaman tertentu
    if (pageId === 'menu-page') {
        renderPlanetGrid();
    }
    if (pageId === 'sort-game') {
        initSortGame();
    }
}
/* --- MENU & MODAL --- */
function renderPlanetGrid() {
    const grid = document.getElementById('planet-grid');
    grid.innerHTML = '';
    planetsData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.onclick = () => showPlanetModal(p);
        card.innerHTML = `
            <img src="${p.img}" class="planet-img" alt="${p.name}">
            <div class="planet-name">${p.name}</div>
            <div class="planet-role">${p.role}</div>
        `;
        grid.appendChild(card);
    });
}

function showPlanetModal(planet) {
    document.getElementById('modal-img').src = planet.img;
    document.getElementById('modal-name').innerText = planet.name;
    document.getElementById('modal-desc').innerText = `"${planet.role}"`;
    document.getElementById('modal-dist').innerText = planet.dist;
    document.getElementById('modal-temp').innerText = planet.temp;
    document.getElementById('modal-moons').innerText = planet.moons;
    document.getElementById('modal-diam').innerText = planet.diam;
    document.getElementById('modal-fact-text').innerText = planet.fact;

    document.getElementById('planet-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('planet-modal').style.display = 'none';
}

/* --- GAME 1: SORT PLANETS --- */
let draggedItem = null;

function initSortGame() {
    const dropContainer = document.getElementById('drop-zones');
    const dragContainer = document.getElementById('drag-items');
    dropContainer.innerHTML = '';
    dragContainer.innerHTML = '';

    // Create 8 Drop Zones
    for (let i = 0; i < 8; i++) {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.dataset.index = i;
        zone.innerHTML = `<span>Planet #${i + 1}<br>Seret kesini</span>`;

        // Drag Events
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('hovered'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('hovered'));
        zone.addEventListener('drop', handleDrop);
        dropContainer.appendChild(zone);
    }

    // Create Shuffled Planets
    const shuffled = [...planetsData].sort(() => Math.random() - 0.5);
    shuffled.forEach(p => {
        const dragItem = document.createElement('div');
        dragItem.className = 'draggable-planet';
        dragItem.draggable = true;
        dragItem.dataset.id = p.id;
        dragItem.innerHTML = `<img src="${p.img}"><p>${p.name}</p>`;

        dragItem.addEventListener('dragstart', () => draggedItem = dragItem);
        dragItem.addEventListener('dragend', () => draggedItem = null);
        dragContainer.appendChild(dragItem);
    });

    // Hide Result
    document.getElementById('sort-result').classList.add('hidden');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('hovered');
    if (draggedItem && !this.querySelector('.draggable-planet')) {
        this.innerHTML = ''; // Clear placeholder text
        this.appendChild(draggedItem);
    }
}

function resetSortGame() {
    initSortGame();
}

function checkSortAnswer() {
    const zones = document.querySelectorAll('.drop-zone');
    let correctCount = 0;

    zones.forEach((zone, index) => {
        const item = zone.querySelector('.draggable-planet');
        // Reset classes
        zone.classList.remove('correct', 'wrong');

        if (item) {
            const planetId = item.dataset.id;
            // planetsData is already sorted sun to far (mercury is index 0)
            if (planetId === planetsData[index].id) {
                zone.classList.add('correct');
                correctCount++;
            } else {
                zone.classList.add('wrong');
            }
        }
    });

    const msgTitle = document.getElementById('sort-msg-title');
    const msgDesc = document.getElementById('sort-msg-desc');
    const resultOverlay = document.getElementById('sort-result');

    if (correctCount === 8) {
        msgTitle.innerText = "Luar Biasa!";
        msgDesc.innerText = "8/8 Kamu berhasil mengurutkan semua planet!";
        msgTitle.style.color = "#00ff00";
    } else {
        msgTitle.innerText = "Hampir Benar!";
        msgDesc.innerText = `${correctCount}/8 Coba lagi, kamu pasti bisa!`;
        msgTitle.style.color = "#ff6600";
    }
    resultOverlay.classList.remove('hidden');
}

function closeSortResult() {
    document.getElementById('sort-result').classList.add('hidden');
}

/* --- CALCULATOR --- */
function calculateWeight() {
    const weight = parseFloat(document.getElementById('weight-input').value);
    const resultGrid = document.getElementById('weight-results');
    resultGrid.innerHTML = '';

    if (!weight) return;

    // Special case for Moon (add moon to list manually for display)
    const locations = [
        { name: 'Bulan', gravity: 0.165, img: 'https://cdn-icons-png.flaticon.com/512/2949/2949009.png' },
        ...planetsData
    ];

    locations.forEach(loc => {
        const resultWeight = (weight * loc.gravity).toFixed(2);
        const diffText = loc.gravity < 1 ? "Lebih ringan!" : (loc.gravity > 1 ? "Lebih berat!" : "Sama seperti di Bumi!");

        const div = document.createElement('div');
        div.className = `weight-card ${loc.id === 'earth' ? 'highlight' : ''}`;
        div.innerHTML = `
            <img src="${loc.img}" style="width:40px;">
            <h5>${loc.name}</h5>
            <div class="weight-val">${resultWeight} kg</div>
            <div class="weight-status">${diffText}</div>
        `;
        resultGrid.appendChild(div);
    });
}

/* --- QUIZ SYSTEM --- */
const questions = [
    { q: "Planet manakah yang paling dekat dengan Matahari?", options: ["Venus", "Bumi", "Merkurius", "Mars"], ans: 2, reason: "Merkurius adalah planet yang paling dekat dengan Matahari, berjarak 57,9 juta km." },
    { q: "Planet apakah yang dijuluki 'Planet Merah'?", options: ["Mars", "Jupiter", "Saturnus", "Venus"], ans: 0, reason: "Mars tampak kemerahan karena oksida besi di permukaannya." },
    { q: "Planet terbesar di tata surya kita adalah?", options: ["Bumi", "Saturnus", "Uranus", "Jupiter"], ans: 3, reason: "Jupiter adalah planet gas raksasa dan terbesar di tata surya." },
    { q: "Planet manakah yang memiliki cincin paling indah?", options: ["Jupiter", "Saturnus", "Neptunus", "Uranus"], ans: 1, reason: "Sistem cincin Saturnus adalah yang paling luas dan terlihat jelas." },
    { q: "Satu-satunya planet yang diketahui memiliki kehidupan adalah?", options: ["Mars", "Bumi", "Venus", "Europa"], ans: 1, reason: "Bumi memiliki air cair dan atmosfer yang mendukung kehidupan." },
    { q: "Planet manakah yang memiliki suhu paling panas?", options: ["Merkurius", "Venus", "Mars", "Bumi"], ans: 1, reason: "Atmosfer tebal Venus memerangkap panas (efek rumah kaca), membuatnya lebih panas dari Merkurius." },
    { q: "Berapa jumlah bulan yang dimiliki Bumi?", options: ["1", "2", "Tidak ada", "5"], ans: 0, reason: "Bumi hanya memiliki satu satelit alami yaitu Bulan." },
    { q: "Planet manakah yang berotasi menyamping (miring)?", options: ["Neptunus", "Uranus", "Saturnus", "Mars"], ans: 1, reason: "Uranus berotasi dengan kemiringan ekstrem, hampir 90 derajat." },
    { q: "Apa nama galaksi tempat tata surya kita berada?", options: ["Andromeda", "Bima Sakti", "Triangulum", "Sombrero"], ans: 1, reason: "Kita berada di galaksi Bima Sakti (Milky Way)." },
    { q: "Planet terjauh dari Matahari adalah?", options: ["Uranus", "Pluto", "Neptunus", "Saturnus"], ans: 2, reason: "Sejak Pluto dianggap planet kerdil, Neptunus adalah planet terjauh." }
];

let currentQIndex = 0;
let score = 0;

function startQuiz() {
    currentQIndex = 0;
    score = 0;

    document.getElementById('quiz-progress-bar').style.width = '0%';

    navigateTo('quiz-page');
    loadQuestion();
}


function loadQuestion() {
    const q = questions[currentQIndex];
    document.getElementById('question-number').innerText = currentQIndex + 1;
    document.getElementById('question-text').innerText = q.q;
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('btn-next-q').classList.add('hidden');

    updateProgressBar(); // ⬅️ WAJIB ADA DI SINI

    const optsContainer = document.getElementById('quiz-options');
    optsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        // A, B, C, D labels
        const labels = ['A', 'B', 'C', 'D'];
        btn.innerText = `${labels[idx]}. ${opt}`;
        btn.onclick = () => checkAnswer(idx, btn);
        optsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIdx, btnElement) {
    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    const q = questions[currentQIndex];
    const feedbackBox = document.getElementById('quiz-feedback');
    const fbIcon = document.getElementById('feedback-icon');
    const fbTitle = document.getElementById('feedback-title');
    const fbDesc = document.getElementById('feedback-desc');

    feedbackBox.classList.remove('hidden', 'correct', 'wrong');

    if (selectedIdx === q.ans) {
        // Benar
        btnElement.classList.add('correct');
        score += 10;
        document.getElementById('current-score').innerText = score;
        feedbackBox.classList.add('correct');
        fbIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        fbTitle.innerText = "Jawaban Benar!";
    } else {
        // Salah
        btnElement.classList.add('wrong');
        // Highlight correct answer
        buttons[q.ans].classList.add('correct');
        feedbackBox.classList.add('wrong');
        fbIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        fbTitle.innerText = "Jawaban Salah!";
    }

    fbDesc.innerText = q.reason;
    document.getElementById('btn-next-q').classList.remove('hidden');

    // Check if last question
    if (currentQIndex === questions.length - 1) {
        document.getElementById('btn-next-q').innerText = "Lihat Hasil Akhir";
    } else {
        document.getElementById('btn-next-q').innerText = "Soal Berikutnya >";
    }
}

function nextQuestion() {
    if (currentQIndex < questions.length - 1) {
        currentQIndex++;
        loadQuestion();
    } else {
        // End of Quiz
        alert(`Quiz Selesai! Skor Akhir Kamu: ${score}/100`);
        navigateTo('menu-page');
    }
}

function updateProgressBar() {
    const total = questions.length;
    const current = currentQIndex + 1;
    const percent = (current / total) * 100;

    document.getElementById('quiz-progress-bar').style.width = percent + '%';
}


/* 🎵 BACKGROUND MUSIC SYSTEM */
const playlist = [
    { title: "Stars and Planets", src: 'Music/3.mp3' },
    { title: "Galaxy Adventure", src: 'Music/2.mp3' },
    { title: "Space Platypus", src: 'Music/Platypus 2.mp3' },
    { title: "Alien Adventure", src: 'Music/4.mp3' },
    { title: "Journey Through Space", src: 'Music/1.mp3' }
    
];

let currentTrack = 0;
let isPlaying = false;
const bgMusic = document.getElementById('bg-music');

bgMusic.src = playlist[currentTrack].src;
updateMusicInfo();

function updateMusicInfo() {
    document.getElementById("music-title").innerText =
        playlist[currentTrack].title;
}


bgMusic.volume = 0.5;

// Play / Pause
function toggleMusic() {
    const icon1 = document.getElementById('music-icon');
    const icon2 = document.getElementById('music-icon-panel');

    if (bgMusic.paused) {
        bgMusic.play();
        isPlaying = true;
        icon1.className = icon2.className = 'fas fa-pause';
    } else {
        bgMusic.pause();
        isPlaying = false;
        icon1.className = icon2.className = 'fas fa-play';
    }

    document.getElementById('music-panel').classList.toggle('hidden');
}

// Next & Previous
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    bgMusic.src = playlist[currentTrack].src;
    updateMusicInfo();
    bgMusic.play();
}

// Volume
function setVolume(val) {
    bgMusic.volume = val;
}

// Auto next when track ends
bgMusic.addEventListener('ended', nextTrack);

// Autoplay after first interaction
document.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play().catch(() => { });
        isPlaying = true;
        document.getElementById('music-icon').className = 'fas fa-pause';
        document.getElementById('music-icon-panel').className = 'fas fa-pause';
    }
}, { once: true });

bgMusic.addEventListener("timeupdate", () => {
    const current = formatTime(bgMusic.currentTime);
    const total = formatTime(bgMusic.duration);
    document.getElementById("music-time").innerText =
        `${current} / ${total}`;
});

function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

window.addEventListener("load", () => {
    bgMusic.play().then(() => {
        isPlaying = true;
        document.getElementById("music-icon").className = "fas fa-pause";
        document.getElementById("music-icon-panel").className = "fas fa-pause";
    }).catch(() => {
        // Jika browser blokir, akan play setelah klik pertama
    });
});

function closeMusicPanel() {
    document.getElementById("music-panel").classList.add("hidden");
}

document.addEventListener("click", function (e) {
    const panel = document.getElementById("music-panel");
    const controller = document.getElementById("music-controller");

    if (
        !panel.classList.contains("hidden") &&
        !panel.contains(e.target) &&
        !controller.contains(e.target)
    ) {
        panel.classList.add("hidden");
    }
});

document.getElementById("music-panel").addEventListener("click", function (e) {
    e.stopPropagation();
});

document.getElementById("music-controller").addEventListener("click", function (e) {
    e.stopPropagation();
});
