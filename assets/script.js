// Global variables
let allCourses = [];
let filteredCourses = [];
let currentDomain = '';
let currentSearch = '';

// DOM elements
let darkModeToggle;
let homeSearch;
let searchBtn;
let featuredCourses;
let pageTitle;
let pageDescription;
let resultsTitle;
let resultsCount;
let courseGrid;
let noResults;
let levelFilter;
let durationFilter;
let certificateFilter;
let applyFiltersBtn;
let clearFiltersBtn;
let clearFiltersNoResults;

    let domainSearch;
    let domainSearchBtn;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadCourses();
    setupEventListeners();
    handleUrlParameters();
    initializeDarkMode();
});

// Initialize DOM elements
function initializeElements() {
    darkModeToggle = document.getElementById('darkModeToggle');
    homeSearch = document.getElementById('homeSearch');
    searchBtn = document.getElementById('searchBtn');
    featuredCourses = document.getElementById('featuredCourses');
    pageTitle = document.getElementById('pageTitle');
    pageDescription = document.getElementById('pageDescription');
    resultsTitle = document.getElementById('resultsTitle');
    resultsCount = document.getElementById('resultsCount');
    courseGrid = document.getElementById('courseGrid');
    noResults = document.getElementById('noResults');
    levelFilter = document.getElementById('levelFilter');
    durationFilter = document.getElementById('durationFilter');
    certificateFilter = document.getElementById('certificateFilter');
    applyFiltersBtn = document.getElementById('applyFilters');
    clearFiltersBtn = document.getElementById('clearFilters');
    clearFiltersNoResults = document.getElementById('clearFiltersNoResults');
    domainSearch = document.getElementById('domainSearch');
    domainSearchBtn = document.getElementById('domainSearchBtn');
}

// Load courses from JSON file
async function loadCourses() {
    try {
        const response = await fetch('data/courses.json');
        allCourses = await response.json();
        
        // Update domain card counts
        updateDomainCounts();
        
        // Load featured courses on homepage
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            loadFeaturedCourses();
        }
        
        // Apply filters on domain page
        if (window.location.pathname.includes('domain.html')) {
            applyAllFilters();
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        if (featuredCourses) {
            featuredCourses.innerHTML = '<p>Error loading courses. Please try again later.</p>';
        }
        if (courseGrid) {
            courseGrid.innerHTML = '<p>Error loading courses. Please try again later.</p>';
        }
    }
}

// Update domain card counts
function updateDomainCounts() {
    const domains = ['Technology', 'Commerce', 'Arts & Humanities', 'Science', 'Design & Creativity'];
    domains.forEach(domain => {
        const count = allCourses.filter(course => course.domain === domain).length;
        const card = document.querySelector(`[data-domain="${domain}"]`);
        if (card) {
            const countElement = card.querySelector('.course-count');
            if (countElement) {
                countElement.textContent = `${count} courses`;
            }
        }
    });
}

// Load featured courses on homepage
function loadFeaturedCourses() {
    if (!featuredCourses) return;
    
    // Get random featured courses (max 6)
    const shuffled = [...allCourses].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 6);
    
    featuredCourses.innerHTML = '';
    featured.forEach(course => {
        featuredCourses.appendChild(createCourseCard(course));
    });
}

// Handle URL parameters
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    currentDomain = urlParams.get('domain') || '';
    currentSearch = urlParams.get('search') || '';
    
    if (currentDomain || currentSearch) {
        updatePageHeader();
    }
}

// Update page header based on parameters
function updatePageHeader() {
    if (!pageTitle || !pageDescription) return;
    
    if (currentDomain) {
        pageTitle.textContent = `${currentDomain} Courses`;
        pageDescription.textContent = `Free courses in ${currentDomain}`;
    } else if (currentSearch) {
        pageTitle.textContent = `Search Results`;
        pageDescription.textContent = `Courses matching "${currentSearch}"`;
    }

    if (domainSearch && currentSearch) {
        domainSearch.value = currentSearch;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Homepage search
    if (homeSearch) {
        homeSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleHomeSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleHomeSearch);
    }
    
    // Domain card clicks
    document.querySelectorAll('.domain-card').forEach(card => {
        card.addEventListener('click', function() {
            const domain = this.getAttribute('data-domain');
            if (domain) {
                window.location.href = `domain.html?domain=${encodeURIComponent(domain)}`;
            }
        });
    });
    
    // Filter controls
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyAllFilters);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    if (clearFiltersNoResults) {
        clearFiltersNoResults.addEventListener('click', clearAllFilters);
    }
    
    if (domainSearchBtn) {
        domainSearchBtn.addEventListener('click', handleDomainSearch);
    }

    if (domainSearch) {
        domainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleDomainSearch();
            }
        });
    }
    // Filter change listeners
    if (levelFilter) {
        levelFilter.addEventListener('change', applyAllFilters);
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', applyAllFilters);
    }
    
    if (certificateFilter) {
        certificateFilter.addEventListener('change', applyAllFilters);
    }
}

// Handle homepage search
function handleHomeSearch() {
    if (!homeSearch) return;
    
    const searchTerm = homeSearch.value.trim();
    if (searchTerm) {
        window.location.href = `domain.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

function handleDomainSearch() {
    if (!domainSearch) return;
    const searchTerm = domainSearch.value.trim();
    const urlParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
        urlParams.set('search', searchTerm);
    } else {
        urlParams.delete('search');
    }
    window.location.search = urlParams.toString();
}
// Apply all filters
function applyAllFilters() {
    if (!allCourses.length) return;
    
    filteredCourses = [...allCourses];
    
    // Apply domain filter
    if (currentDomain) {
        filteredCourses = filterByDomain(filteredCourses, currentDomain);
    }
    
    // Apply search filter
    if (currentSearch) {
        filteredCourses = filterBySearch(filteredCourses, currentSearch);
    }
    
    // Apply level filter
    if (levelFilter && levelFilter.value) {
        filteredCourses = filterByLevel(filteredCourses, levelFilter.value);
    }
    
    // Apply duration filter
    if (durationFilter && durationFilter.value) {
        filteredCourses = filterByDuration(filteredCourses, durationFilter.value);
    }
    
    // Apply certificate filter
    if (certificateFilter && certificateFilter.checked) {
        filteredCourses = filterByCertificate(filteredCourses);
    }
    
    renderCourses();
}

// Filter functions
function filterByDomain(courses, domain) {
    return courses.filter(course => course.domain === domain);
}

function filterBySearch(courses, searchTerm) {
    const term = searchTerm.toLowerCase();
    return courses.filter(course => 
        course.course_name.toLowerCase().includes(term) ||
        course.subdomain.toLowerCase().includes(term) ||
        course.domain.toLowerCase().includes(term)
    );
}

function filterByLevel(courses, level) {
    return courses.filter(course => course.level === level);
}

function filterByDuration(courses, durationRange) {
    return courses.filter(course => {
        const duration = parseInt(course.duration);
        switch (durationRange) {
            case '0-10':
                return duration >= 0 && duration <= 10;
            case '10-30':
                return duration > 10 && duration <= 30;
            case '30-50':
                return duration > 30 && duration <= 50;
            case '50+':
                return duration > 50;
            default:
                return true;
        }
    });
}

function filterByCertificate(courses) {
    return courses.filter(course => course.certificate === true);
}

// Clear all filters
function clearAllFilters() {
    if (levelFilter) levelFilter.value = '';
    if (durationFilter) durationFilter.value = '';
    if (certificateFilter) certificateFilter.checked = false;
    applyAllFilters();
}

// Render courses
function renderCourses() {
    if (!courseGrid || !resultsCount || !resultsTitle) return;
    
    courseGrid.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        courseGrid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = '0 courses found';
    } else {
        courseGrid.style.display = 'grid';
        noResults.style.display = 'none';
        resultsCount.textContent = `${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} found`;
        
        filteredCourses.forEach(course => {
            courseGrid.appendChild(createCourseCard(course));
        });
    }
    
    // Update results title
    if (currentDomain) {
        resultsTitle.textContent = `${currentDomain} Courses`;
    } else if (currentSearch) {
        resultsTitle.textContent = `Search Results`;
    } else {
        resultsTitle.textContent = 'All Courses';
    }
}

// Create course card HTML
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const platformColor = getPlatformColor(course.platform);
    const certificateBadge = course.certificate ? '<span class="certificate-badge">📜 Certificate</span>' : '';
    
    card.innerHTML = `
        <div class="course-header">
            <span class="platform-badge" style="background-color: ${platformColor}">${course.platform}</span>
            ${certificateBadge}
        </div>
        <h3 class="course-title">${course.course_name}</h3>
        <p class="course-subdomain">${course.subdomain}</p>
        <div class="course-details">
            <span class="course-level">${course.level}</span>
            <span class="course-duration">${course.duration}</span>
        </div>
        <div class="course-footer">
            <span class="course-language">${course.language}</span>
            <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-button">
                Go to Course
            </a>
        </div>
    `;
    
    return card;
}

// Get platform color
function getPlatformColor(platform) {
    const colors = {
        'Coursera': '#0056D3',
        'edX': '#02262B',
        'Udemy': '#A435F0',
        'Khan Academy': '#1966AE',
        'MIT OpenCourseWare': '#8B0000',
        'Harvard Online': '#A51C30',
        'Stanford Online': '#8C1515',
        'Google': '#4285F4',
        'Microsoft': '#00BCF2',
        'IBM': '#054ADA',
        'FutureLearn': '#DE00A5',
        'OpenLearn': '#FF6900',
        'Codecademy': '#1F4056',
        'freeCodeCamp': '#0A0A23',
        'Udacity': '#02B3E4'
    };
    return colors[platform] || '#6B7280';
}

// Dark mode functionality
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark');
        updateDarkModeIcon(true);
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeIcon(isDarkMode);
}

function updateDarkModeIcon(isDarkMode) {
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('.toggle-icon');
        if (icon) {
            icon.textContent = isDarkMode ? '☀️' : '🌙';
        }
    }
}