/**
 * Données de simulation pour les détails des événements
 */
const eventsData = {
    'jazz': {
        title: "Concert de Jazz de Minuit",
        img: "images/Jazz-Concert.webp",
        date: "22 Juin 2026",
        loc: "Blue Note, Lyon",
        desc: "Une expérience acoustique rare dans un cadre intimiste."
    },
    'tech': {
        title: "Conférence Web Design",
        img: "images/Tech-Conferences-2026.webp",
        date: "15 Mai 2026",
        loc: "Espace Congrès, Paris",
        desc: "Maîtrisez les dernières tendances du Responsive Web Design."
    }
};

// --- LOGIQUE ACCESSIBILITÉ (LECTURE VOCALE) ---
let isReading = false;

function toggleSpeech() {
    const audioBtn = document.getElementById('audio-desc');
    
    if (isReading) {
        // Arrête la lecture
        window.speechSynthesis.cancel();
        isReading = false;
        audioBtn.innerHTML = '🔊';
        audioBtn.style.background = "#2563eb";
    } else {
        // Récupère tout le texte du contenu principal
        const textToRead = document.querySelector('main').innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'fr-FR';

        utterance.onend = () => {
            isReading = false;
            audioBtn.innerHTML = '🔊';
            audioBtn.style.background = "#2563eb";
        };

        window.speechSynthesis.speak(utterance);
        isReading = true;
        audioBtn.innerHTML = '🛑';
        audioBtn.style.background = "#ef4444";
    }
}

// --- AFFICHAGE DYNAMIQUE DES DÉTAILS ---
function initDetail() {
    // Récupère le type (jazz ou tech) dans l'URL (?type=jazz)
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const data = eventsData[type];
    const container = document.getElementById('event-content');

    // Génère le HTML si l'événement existe
    if (container && data) {
        container.innerHTML = `
            <div class="detail-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: center;">
                <img src="${data.img}" alt="${data.title}" style="width: 100%; border-radius: 20px; max-height: 50vh; object-fit: cover;">
                <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${data.title}</h1>
                    <p style="font-size: 1.1rem; color: #4b5563; margin-bottom: 1.5rem;">${data.desc}</p>
                    <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e5e7eb; color: #000000;">
                        <p><strong>📅 Date :</strong> ${data.date}</p>
                        <p><strong>📍 Lieu :</strong> ${data.loc}</p>
                    </div>
                    <button class="btn-primary" style="margin-top: 2rem; width: 100%; padding: 1rem; border-radius: 50px; border:none; background: #2563eb; color:white; font-weight: bold; cursor:pointer;">S'inscrire à cet événement</button>
                </div>
            </div>`;
    }
}

// --- ÉCOUTEURS D'ÉVÉNEMENTS (LANCEMENT) ---
document.addEventListener('DOMContentLoaded', () => {
    // Si on est sur la page détails, on affiche les infos
    if (document.getElementById('event-content')) initDetail();

    // Active le bouton audio
    const audioBtn = document.getElementById('audio-desc');
    if (audioBtn) audioBtn.addEventListener('click', toggleSpeech);

    // Gère les boutons de filtres sur la page événements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Change le bouton actif
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtre les cartes
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
            });
        });
    });
});