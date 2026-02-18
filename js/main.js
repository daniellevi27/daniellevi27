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

// State
let currentProjectIndex = 0;
let isTravelMode = false;

// 1. PROJECT Functions
function openProject(index) {
    isTravelMode = false;
    currentProjectIndex = index;
    updateLightbox();
    showLightbox();
}

function changeProject(direction) {
    if (isTravelMode) return; // Disable arrows for travel items for now (optional)
    
    currentProjectIndex += direction;
    if (currentProjectIndex >= projects.length) currentProjectIndex = 0;
    if (currentProjectIndex < 0) currentProjectIndex = projects.length - 1;
    updateLightbox();
}

function updateLightbox() {
    if (isTravelMode) return;
    
    const p = projects[currentProjectIndex];
    lbImg.src = p.src;
    lbTitle.innerText = p.title;
    lbDesc.innerText = p.desc;
    lbTags.innerText = p.tags;
    lbTags.style.display = 'inline-block'; // Show tags for projects
    lbCounter.innerText = `0${currentProjectIndex + 1} / 0${projects.length}`;
}

// 2. TRAVEL Functions
function openTravelMemory(id) {
    const trip = travelData.find(t => t.id === id);
    if (!trip) return;

    isTravelMode = true;
    
    // Populate Lightbox with Travel Data
    lbImg.src = trip.image;
    lbTitle.innerText = trip.title;
    lbDesc.innerText = trip.desc;
    
    // Hide Project-specific elements
    lbTags.style.display = 'none';
    lbCounter.innerText = "TRAVEL LOG"; // Or "Trip 1 of X" if you want to code that later

    showLightbox();
}

// 3. UTILS
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

// 4. MAP LOGIC
function initMap() {
    const mapContainer = document.getElementById('map-pins-container');
    if(!mapContainer) return;

    // Generate Pins from travel-data.js
    travelData.forEach(trip => {
        const pin = document.createElement('button');
        pin.className = "absolute w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full border-2 border-white shadow-lg hover:bg-earth hover:scale-125 transition-all duration-300 z-10 group";
        // Position percentage
        pin.style.left = `${trip.x}%`;
        pin.style.top = `${trip.y}%`;
        
        // Tooltip (optional, shows title on hover)
        pin.innerHTML = `
            <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ${trip.title}
            </span>
        `;
        
        // Click Event
        pin.onclick = () => openTravelMemory(trip.id);
        
        mapContainer.appendChild(pin);
    });
}

function toggleMapZoom() {
    const container = document.getElementById('map-scroll-container');
    const map = document.getElementById('map-img');
    const zoomBtn = document.getElementById('zoom-btn');
    
    // Check if currently zoomed
    const isZoomed = container.classList.contains('overflow-auto');
    
    if (isZoomed) {
        // Zoom Out
        container.classList.remove('overflow-auto', 'h-[600px]', 'border-y', 'border-gray-200');
        map.classList.remove('min-w-[1500px]'); // Remove fixed large width
        zoomBtn.innerText = "+ ZOOM MAP";
    } else {
        // Zoom In
        container.classList.add('overflow-auto', 'h-[600px]', 'border-y', 'border-gray-200'); // Fixed height window to scroll inside
        map.classList.add('min-w-[1500px]'); // Force image to be huge
        zoomBtn.innerText = "- RESET VIEW";
    }
}

// 5. EVENT LISTENERS
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
    if (!isTravelMode) {
        if (e.key === "ArrowRight") changeProject(1);
        if (e.key === "ArrowLeft") changeProject(-1);
    }
});

// Run Map Init on Load
window.addEventListener('DOMContentLoaded', initMap);
