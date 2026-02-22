// --- PROJECT LIGHTBOX DATA ---
const projects = [
    {
        src: "shop-vac.png",
        title: "Shop Vac Optimization",
        desc: "Designed a part in SolidWorks to secure a shop vac hose in a way to improve ergonomics and increase table space. Utilized precise calculations for O-ring groove dimensions to ensure a vacuum-tight seal.",
        tags: "·SolidWorks ·3D Printing"
    },
    {
        src: "press-tool.png",
        title: "Custom Press Tooling",
        desc: "Modeled and prototyped custom press tooling to optimize assembly. Digitized reference batch settings to eliminate data loss risks. This project involved rapid prototyping iterations to ensure fitment.",
        tags: "·Automation ·Prototyping"
    },
    {
        src: "work-instruction.png",
        title: "Visual SOP Design",
        desc: "My example of 'Before & After' technical document transformations. Converting text-heavy confusing manuals into intuitive visual guides using technical illustration techniques.",
        tags: "·Technical Writing ·Process Documents"
    }
];

// --- SHARED LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbDesc = document.getElementById('lb-desc');
const lbTags = document.getElementById('lb-tags');
const lbCounter = document.getElementById('lb-counter');

// Layout Elements for dynamic shifting
const infoPanel = document.getElementById('lb-info-panel');
const imgPanel = document.getElementById('lb-img-panel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// State tracking
let currentProjectIndex = 0;
let currentTravelIndex = 0;
let currentMode = 'project'; // 'project', 'travel', or 'map'

// Helper to reset the Lightbox to standard split-view
function resetLightboxLayout() {
    infoPanel.style.display = 'flex';
    imgPanel.classList.add('md:w-2/3');
    imgPanel.classList.remove('w-full');
    btnPrev.style.display = 'block';
    btnNext.style.display = 'block';
    lbImg.classList.remove('p-0');
    lbImg.classList.add('p-2', 'md:p-6');
}

// 1. PROJECT Functions
function openProject(index) {
    currentMode = 'project';
    currentProjectIndex = index;
    resetLightboxLayout();
    updateLightbox();
    showLightbox();
}

// 2. TRAVEL Functions
function openTravelMemory(id) {
    currentMode = 'travel';
    // Find the index of the clicked country in our travelData array
    currentTravelIndex = travelData.findIndex(t => t.id === id);
    if (currentTravelIndex === -1) currentTravelIndex = 0; // fallback
    
    resetLightboxLayout();
    updateLightbox();
    showLightbox();
}

// 3. MAP Functions (Full Screen Image)
function openMapLightbox() {
    currentMode = 'map';
    
    // Hide info panel and arrows, make image full width
    infoPanel.style.display = 'none';
    imgPanel.classList.remove('md:w-2/3');
    imgPanel.classList.add('w-full');
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
    
    // Remove padding so the map uses maximum screen real estate
    lbImg.classList.remove('p-2', 'md:p-6');
    lbImg.classList.add('p-0');
    
    lbImg.src = 'dlworld.png';
    showLightbox();
}

// 4. SHARED Functions
function changeProject(direction) {
    if (currentMode === 'map') return; // No cycling in map mode
    
    if (currentMode === 'project') {
        currentProjectIndex += direction;
        if (currentProjectIndex >= projects.length) currentProjectIndex = 0;
        if (currentProjectIndex < 0) currentProjectIndex = projects.length - 1;
    } else if (currentMode === 'travel') {
        currentTravelIndex += direction;
        if (currentTravelIndex >= travelData.length) currentTravelIndex = 0;
        if (currentTravelIndex < 0) currentTravelIndex = travelData.length - 1;
    }
    
    updateLightbox();
}

function updateLightbox() {
    if (currentMode === 'project') {
        const p = projects[currentProjectIndex];
        lbImg.src = p.src;
        lbTitle.innerText = p.title;
        lbDesc.innerText = p.desc;
        lbTags.innerText = p.tags;
        lbTags.style.display = 'inline-block';
        lbCounter.innerText = `0${currentProjectIndex + 1} / 0${projects.length}`;
    } 
    else if (currentMode === 'travel') {
        const t = travelData[currentTravelIndex];
        lbImg.src = t.image;
        lbTitle.innerText = t.title;
        lbDesc.innerText = t.desc;
        lbTags.style.display = 'none'; // Hide tags for travel log
        lbCounter.innerText = `LOCATION ${currentTravelIndex + 1} OF ${travelData.length}`;
    }
}

function showLightbox() {
    lightbox.classList.remove('hidden');
    setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('opacity-0');
    setTimeout(() => lightbox.classList.add('hidden'), 300);
    document.body.style.overflow = 'auto';
}

// Keyboard Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changeProject(1);
    if (e.key === "ArrowLeft") changeProject(-1);
});
