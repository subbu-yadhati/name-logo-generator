// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const loadingIndicator = document.getElementById('loading');
const resultsGrid = document.getElementById('results-grid');
const resultTemplate = document.getElementById('result-template');

// Mock data for logo generation
const logoShapes = {
    'minimal': ['circle', 'square', 'triangle', 'hexagon', 'diamond'],
    'abstract': ['blob', 'wave', 'swirl', 'splash', 'dots'],
    'geometric': ['cube', 'pyramid', 'polygon', 'grid', 'line-art'],
    'mascot': ['robot', 'animal', 'character', 'person', 'monster'],
    'lettermark': ['initial', 'monogram', 'wordmark', 'typeface', 'script']
};

const colorPalettes = {
    'blues': ['#1A237E', '#2196F3', '#BBDEFB', '#E3F2FD'],
    'greens': ['#1B5E20', '#4CAF50', '#C8E6C9', '#E8F5E9'],
    'reds': ['#B71C1C', '#F44336', '#FFCDD2', '#FFEBEE'],
    'purples': ['#4A148C', '#9C27B0', '#E1BEE7', '#F3E5F5'],
    'monochrome': ['#212121', '#616161', '#BDBDBD', '#F5F5F5'],
    'vibrant': ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50'],
    'pastel': ['#FFD3E0', '#D4F0F0', '#FCE4EC', '#F3E5F5']
};

// Startup name generation logic
const generateStartupName = (industry, keywords, style) => {
    // Dictionary of prefix and suffix options by style
    const nameComponents = {
        'modern': {
            prefixes: ['Nova', 'Nexus', 'Pulse', 'Flux', 'Sphere', 'Prism', 'Pivot', 'Peak', 'Evo', 'Atom'],
            suffixes: ['ify', 'io', 'HQ', 'Sync', 'Labs', 'X', 'Wave', 'Hub', 'Base', 'Tech']
        },
        'quirky': {
            prefixes: ['Wobble', 'Giggle', 'Noodle', 'Pickle', 'Squiggle', 'Waffle', 'Fizz', 'Boop', 'Ziggy', 'Quirk'],
            suffixes: ['Ninja', 'Potato', 'Panda', 'Wizard', 'Doodle', 'Spark', 'Penguin', 'Monster', 'Buddy', 'Wombat']
        },
        'professional': {
            prefixes: ['Optima', 'Veridian', 'Acumen', 'Cascade', 'Meridian', 'Lumina', 'Axiom', 'Vertex', 'Sentinel', 'Paragon'],
            suffixes: ['Corp', 'Group', 'Partners', 'Solutions', 'Ventures', 'Capital', 'Global', 'Systems', 'Advisors', 'Associates']
        },
        'futuristic': {
            prefixes: ['Quantum', 'Nano', 'Hyper', 'Nebula', 'Vortex', 'Zenith', 'Cyber', 'Astro', 'Fusion', 'Neuron'],
            suffixes: ['Matrix', 'AI', 'Byte', 'Logic', 'Sphere', 'Zero', 'Tron', 'Flux', 'Nova', 'Link']
        },
        'playful': {
            prefixes: ['Happy', 'Sunny', 'Bounce', 'Sprout', 'Giggle', 'Twirl', 'Jolly', 'Bubble', 'Pop', 'Wink'],
            suffixes: ['Joy', 'Play', 'Fun', 'Smile', 'Hop', 'Beans', 'Buddy', 'Pals', 'Friends', 'Gang']
        }
    };

    // Industry-specific words
    const industryWords = {
        'tech': ['Code', 'Byte', 'Tech', 'Dev', 'App', 'Net', 'Cloud', 'Data', 'Cyber', 'Algo'],
        'finance': ['Cash', 'Coin', 'Bank', 'Fund', 'Wealth', 'Pay', 'Money', 'Capital', 'Trade', 'Stock'],
        'health': ['Vita', 'Care', 'Med', 'Well', 'Health', 'Life', 'Cure', 'Bio', 'Heart', 'Heal'],
        'food': ['Spice', 'Taste', 'Flavor', 'Bite', 'Feast', 'Dish', 'Cook', 'Eat', 'Food', 'Meal'],
        'education': ['Learn', 'Think', 'Edu', 'Skill', 'Mind', 'Know', 'Teach', 'Study', 'Smart', 'Brain'],
        'retail': ['Shop', 'Store', 'Mart', 'Buy', 'Goods', 'Market', 'Retail', 'Brand', 'Item', 'Deal'],
        'travel': ['Trip', 'Tour', 'Wander', 'Journey', 'Go', 'Cruise', 'Voyage', 'Explore', 'Trek', 'Visit'],
        'entertainment': ['Fun', 'Joy', 'Play', 'Show', 'Media', 'View', 'Watch', 'Stream', 'Stage', 'Act']
    };

    // Parse keywords
    let keywordArray = [];
    if (keywords && keywords.trim() !== '') {
        keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
    }
    
    // Generate name components
    const styleComponents = nameComponents[style];
    const industryComponent = industryWords[industry];
    
    // Generate several options
    let names = [];
    
    // Method 1: Prefix + Industry word
    names.push(
        randomElement(styleComponents.prefixes) + 
        randomElement(industryComponent)
    );
    
    // Method 2: Keyword + Suffix
    if (keywordArray.length > 0) {
        const keyword = randomElement(keywordArray);
        const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        names.push(capitalizedKeyword + randomElement(styleComponents.suffixes));
    } else {
        names.push(
            randomElement(industryComponent) + 
            randomElement(styleComponents.suffixes)
        );
    }
    
    // Method 3: Prefix + Suffix
    names.push(
        randomElement(styleComponents.prefixes) + 
        randomElement(styleComponents.suffixes)
    );
    
    // Method 4: Industry + Keyword mashup
    if (keywordArray.length > 0) {
        const keyword = randomElement(keywordArray);
        const industryWord = randomElement(industryComponent);
        
        // Take first part of industry word and last part of keyword
        const firstPart = industryWord.substring(0, Math.ceil(industryWord.length / 2));
        const lastPart = keyword.substring(Math.floor(keyword.length / 2));
        
        names.push(firstPart + lastPart);
    } else {
        // If no keywords, use another combination method
        names.push(
            randomElement(styleComponents.prefixes) + 
            randomElement(industryComponent).toLowerCase()
        );
    }

    // Return 3 randomly selected options
    return shuffle(names).slice(0, 3);
};

// Tagline generation
const generateTagline = (industry, name, keywords) => {
    const taglineTemplates = [
        "Reimagining [industry] for tomorrow",
        "[industry] solutions for the modern world",
        "Your [industry] partner in excellence",
        "Innovative [industry] for everyone",
        "The future of [industry] is here",
        "Transforming [industry], one [keyword] at a time",
        "Where [keyword] meets [industry]",
        "Empowering your [industry] journey",
        "[industry] simplified",
        "Beyond ordinary [industry]"
    ];
    
    const template = randomElement(taglineTemplates);
    let tagline = template.replace('[industry]', industry);
    
    // Try to use a keyword if available
    if (keywords && keywords.trim() !== '') {
        const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
        if (keywordArray.length > 0) {
            const keyword = randomElement(keywordArray);
            tagline = tagline.replace('[keyword]', keyword);
        } else {
            tagline = tagline.replace('[keyword]', industry);
        }
    } else {
        tagline = tagline.replace('[keyword]', industry);
    }
    
    return tagline;
};

// Generate SVG logo
const generateLogo = (name, logoStyle, colorScheme) => {
    const colors = colorPalettes[colorScheme];
    const mainColor = colors[0];
    const secondaryColor = colors[1];
    const accentColor = colors[2];
    
    // Create base SVG
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">`;
    
    // Get first letter or first two letters of name
    const initials = name.substring(0, name.length > 8 ? 1 : 2).toUpperCase();
    
    // Generate different logo types based on style
    switch (logoStyle) {
        case 'minimal':
            const shape = randomElement(logoShapes.minimal);
            if (shape === 'circle') {
                svg += `
                    <circle cx="100" cy="100" r="80" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="60" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (shape === 'square') {
                svg += `
                    <rect x="30" y="30" width="140" height="140" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="60" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (shape === 'triangle') {
                svg += `
                    <polygon points="100,20 180,160 20,160" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="50" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (shape === 'hexagon') {
                svg += `
                    <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="50" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else {
                // Diamond
                svg += `
                    <polygon points="100,20 180,100 100,180 20,100" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="50" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            }
            break;
            
        case 'abstract':
            const abstractType = randomElement(logoShapes.abstract);
            if (abstractType === 'blob') {
                svg += `
                    <path d="M160,100 C160,60 140,30 100,30 C60,30 30,70 30,100 C30,130 60,170 100,170 C140,170 160,140 160,100 Z" fill="${mainColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (abstractType === 'wave') {
                svg += `
                    <path d="M30,100 C60,60 90,140 130,80 C170,20 190,100 170,150 C150,200 90,170 50,150 C10,130 0,140 30,100 Z" fill="${mainColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (abstractType === 'swirl') {
                svg += `
                    <path d="M100,30 C130,30 160,40 160,100 C160,160 100,170 100,170 C40,170 30,120 50,90 C70,60 100,70 100,90 C100,110 80,110 80,100" stroke="${mainColor}" stroke-width="15" fill="none" />
                    <circle cx="100" cy="100" r="40" fill="${secondaryColor}" />
                    <text x="100" y="115" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else {
                // Abstract dots or splash
                svg += `
                    <circle cx="70" cy="80" r="50" fill="${mainColor}" />
                    <circle cx="130" cy="120" r="40" fill="${secondaryColor}" />
                    <circle cx="100" cy="90" r="45" fill="${accentColor}" />
                    <text x="100" y="100" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            }
            break;
            
        case 'geometric':
            const geoShape = randomElement(logoShapes.geometric);
            if (geoShape === 'cube') {
                svg += `
                    <polygon points="70,60 130,60 160,90 130,120 70,120 40,90" fill="${mainColor}" />
                    <polygon points="70,120 130,120 130,160 70,160" fill="${secondaryColor}" />
                    <polygon points="130,120 160,90 160,130 130,160" fill="${accentColor}" />
                    <text x="100" y="100" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            } else if (geoShape === 'pyramid') {
                svg += `
                    <polygon points="100,40 160,140 40,140" fill="${mainColor}" />
                    <polygon points="100,40 160,140 100,140" fill="${secondaryColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            } else if (geoShape === 'grid') {
                svg += `
                    <rect x="40" y="40" width="120" height="120" fill="${mainColor}" />
                    <line x1="40" y1="80" x2="160" y2="80" stroke="${secondaryColor}" stroke-width="5" />
                    <line x1="40" y1="120" x2="160" y2="120" stroke="${secondaryColor}" stroke-width="5" />
                    <line x1="80" y1="40" x2="80" y2="160" stroke="${secondaryColor}" stroke-width="5" />
                    <line x1="120" y1="40" x2="120" y2="160" stroke="${secondaryColor}" stroke-width="5" />
                    <circle cx="100" cy="100" r="30" fill="${accentColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            } else {
                // Polygon shape
                svg += `
                    <polygon points="100,40 140,60 160,100 140,140 100,160 60,140 40,100 60,60" fill="${mainColor}" />
                    <polygon points="100,60 130,75 140,100 130,125 100,140 70,125 60,100 70,75" fill="${secondaryColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            }
            break;
            
        case 'mascot':
            // Simple icon character for mascot style
            const mascotType = randomElement(logoShapes.mascot);
            
            if (mascotType === 'robot') {
                svg += `
                    <rect x="60" y="50" width="80" height="80" rx="10" fill="${mainColor}" />
                    <circle cx="80" cy="80" r="10" fill="${accentColor}" />
                    <circle cx="120" cy="80" r="10" fill="${accentColor}" />
                    <rect x="75" y="100" width="50" height="10" fill="${accentColor}" />
                    <rect x="70" y="130" width="60" height="30" rx="5" fill="${secondaryColor}" />
                    <text x="100" y="153" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            } else if (mascotType === 'animal') {
                // Simplified animal face
                svg += `
                    <circle cx="100" cy="100" r="60" fill="${mainColor}" />
                    <circle cx="80" cy="85" r="10" fill="white" />
                    <circle cx="120" cy="85" r="10" fill="white" />
                    <circle cx="80" cy="85" r="5" fill="black" />
                    <circle cx="120" cy="85" r="5" fill="black" />
                    <ellipse cx="100" cy="110" rx="15" ry="10" fill="${secondaryColor}" />
                    <text x="100" y="150" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            } else {
                // Generic character
                svg += `
                    <circle cx="100" cy="100" r="60" fill="${mainColor}" />
                    <circle cx="80" cy="85" r="8" fill="white" />
                    <circle cx="120" cy="85" r="8" fill="white" />
                    <path d="M80,120 Q100,140 120,120" stroke="${secondaryColor}" stroke-width="8" fill="none" />
                    <text x="100" y="160" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                `;
            }
            break;
            
        case 'lettermark':
            const letterStyle = randomElement(logoShapes.lettermark);
            if (letterStyle === 'initial') {
                svg += `
                    <circle cx="100" cy="100" r="80" fill="${mainColor}" />
                    <text x="100" y="130" font-family="Arial" font-size="100" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (letterStyle === 'monogram') {
                svg += `
                    <rect x="30" y="30" width="140" height="140" rx="20" fill="${mainColor}" />
                    <text x="100" y="130" font-family="Arial" font-size="90" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            } else if (letterStyle === 'wordmark') {
                // Simplified wordmark
                svg += `
                    <rect x="20" y="80" width="160" height="40" fill="${mainColor}" />
                    <text x="100" y="110" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle" fill="white">${name.toUpperCase()}</text>
                `;
            } else {
                // Typeface or script style
                svg += `
                    <circle cx="100" cy="100" r="80" fill="${mainColor}" />
                    <text x="100" y="120" font-family="Arial" font-size="80" font-style="italic" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
                `;
            }
            break;
            
        default:
            // Default to a simple lettermark
            svg += `
                <circle cx="100" cy="100" r="70" fill="${mainColor}" />
                <text x="100" y="120" font-family="Arial" font-size="70" font-weight="bold" text-anchor="middle" fill="${accentColor}">${initials}</text>
            `;
    }
    
    svg += `</svg>`;
    return svg;
};

// Helper functions
const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Create a result card
const createResultCard = (name, tagline, logoSvg) => {
    const template = resultTemplate.content.cloneNode(true);
    
    template.querySelector('.startup-name').textContent = name;
    template.querySelector('.tagline').textContent = tagline;
    template.querySelector('.logo').innerHTML = logoSvg;
    
    // Add event listeners for buttons
    const saveBtn = template.querySelector('.btn-save');
    const refreshBtn = template.querySelector('.btn-refresh');
    
    saveBtn.addEventListener('click', () => {
        // Change button to "Saved"
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
        saveBtn.disabled = true;
        saveBtn.style.backgroundColor = '#4CAF50';
        saveBtn.style.color = 'white';
    });
    
    refreshBtn.addEventListener('click', () => {
        // Get the card element
        const card = refreshBtn.closest('.result-card');
        const industry = document.getElementById('industry').value;
        const keywords = document.getElementById('keywords').value;
        const nameStyle = document.getElementById('style').value;
        const logoStyle = document.getElementById('logoStyle').value;
        const colorScheme = document.getElementById('colorScheme').value;
        
        // Generate new content
        const newName = generateStartupName(industry, keywords, nameStyle)[0];
        const newTagline = generateTagline(industry, newName, keywords);
        const newLogo = generateLogo(newName, logoStyle, colorScheme);
        
        // Update the card
        card.querySelector('.startup-name').textContent = newName;
        card.querySelector('.tagline').textContent = newTagline;
        card.querySelector('.logo').innerHTML = newLogo;
        
        // Reset save button
        card.querySelector('.btn-save').innerHTML = '<i class="fas fa-heart"></i> Save';
        card.querySelector('.btn-save').disabled = false;
        card.querySelector('.btn-save').style.backgroundColor = '';
        card.querySelector('.btn-save').style.color = '';
    });
    
    return template;
};

// Generate results
const generateResults = () => {
    // Show loading indicator
    loadingIndicator.style.display = 'flex';
    resultsGrid.innerHTML = '';
    
    // Get form values
    const industry = document.getElementById('industry').value;
    const keywords = document.getElementById('keywords').value;
    const nameStyle = document.getElementById('style').value;
    const logoStyle = document.getElementById('logoStyle').value;
    const colorScheme = document.getElementById('colorScheme').value;
    
    // Simulate API call delay (remove in production)
    setTimeout(() => {
        // Generate 4 startup ideas
        const names = generateStartupName(industry, keywords, nameStyle);
        
        // Create result cards (we'll use the first 3 names)
        for (let i = 0; i < 3; i++) {
            const name = names[i] || `Startup${i+1}`;
            const tagline = generateTagline(industry, name, keywords);
            const logo = generateLogo(name, logoStyle, colorScheme);
            
            const card = createResultCard(name, tagline, logo);
            resultsGrid.appendChild(card);
        }
        
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }, 1500);
};

// Event listeners
generateBtn.addEventListener('click', generateResults);

// Initialize with default results
window.addEventListener('DOMContentLoaded', () => {
    // Wait for a moment to simulate initial load
    setTimeout(() => {
        generateResults();
    }, 500);
});