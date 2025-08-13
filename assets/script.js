let currentEditingCategory = null;
let currentEditingLink = null;

const defaultCategories = [
    {
        name: 'Development',
        gradient: 'dev',
        links: [
            { name: 'GitHub', url: 'https://github.com' },
            { name: 'GitLab', url: 'https://gitlab.com' },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
            { name: 'MDN Docs', url: 'https://developer.mozilla.org' },
            { name: 'CodePen', url: 'https://codepen.io' },
            { name: 'JSFiddle', url: 'https://jsfiddle.net' },
            { name: 'Replit', url: 'https://replit.com' }
        ]
    },
    {
        name: 'Linux/DevOps',
        gradient: 'linux',
        links: [
            { name: 'ArchWiki', url: 'https://wiki.archlinux.org' },
            { name: 'DigitalOcean', url: 'https://digitalocean.com' },
            { name: 'Docker Hub', url: 'https://hub.docker.com' },
            { name: 'Kubernetes', url: 'https://kubernetes.io' },
            { name: 'AWS Console', url: 'https://aws.amazon.com/console' },
            { name: 'Terraform', url: 'https://terraform.io' },
            { name: 'Linux.org', url: 'https://linux.org' }
        ]
    },
    {
        name: 'Learning',
        gradient: 'learning',
        links: [
            { name: 'LeetCode', url: 'https://leetcode.com' },
            { name: 'HackerRank', url: 'https://hackerrank.com' },
            { name: 'Coursera', url: 'https://coursera.org' },
            { name: 'freeCodeCamp', url: 'https://freecodecamp.org' },
            { name: 'Udemy', url: 'https://udemy.com' },
            { name: 'Khan Academy', url: 'https://khanacademy.org' },
            { name: 'edX', url: 'https://edx.org' }
        ]
    },
    {
        name: 'Tools',
        gradient: 'tools',
        links: [
            { name: 'VS Code', url: 'https://code.visualstudio.com' },
            { name: 'Postman', url: 'https://postman.com' },
            { name: 'Figma', url: 'https://figma.com' },
            { name: 'Notion', url: 'https://notion.so' },
            { name: 'Obsidian', url: 'https://obsidian.md' },
            { name: 'Insomnia', url: 'https://insomnia.rest' },
            { name: 'Canva', url: 'https://canva.com' }
        ]
    },
    {
        name: 'Tech News',
        gradient: 'news',
        links: [
            { name: 'Hacker News', url: 'https://news.ycombinator.com' },
            { name: 'Dev.to', url: 'https://dev.to' },
            { name: 'TechCrunch', url: 'https://techcrunch.com' },
            { name: 'Ars Technica', url: 'https://arstechnica.com' },
            { name: 'The Verge', url: 'https://theverge.com' },
            { name: 'Wired', url: 'https://wired.com' },
            { name: 'r/programming', url: 'https://reddit.com/r/programming' }
        ]
    },
    {
        name: 'Security',
        gradient: 'security',
        links: [
            { name: 'OWASP', url: 'https://owasp.org' },
            { name: 'Kali Linux', url: 'https://kali.org' },
            { name: 'Metasploit', url: 'https://metasploit.com' },
            { name: 'Nmap', url: 'https://nmap.org' },
            { name: 'Wireshark', url: 'https://wireshark.org' },
            { name: 'Burp Suite', url: 'https://burpsuite.net' },
            { name: 'CVE Database', url: 'https://cve.mitre.org' }
        ]
    }
];

function renderCategories(categories) {
    const linksGrid = document.getElementById('linksGrid');
    linksGrid.innerHTML = categories.map(category => `
        <div class="category">
            <h3 class="category-title ${category.gradient}-title">${category.name}</h3>
            <div class="category-links">
                ${category.links.map(link => `
                    <a href="${link.url}" target="_blank" class="link" title="${link.name} - ${link.url}">${link.name}</a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderCategoryManager(categories) {
    const categoryManager = document.getElementById('categoryManager');

    categoryManager.innerHTML = `
        <table class="main-table">
            <tbody>
                ${categories.map((category, categoryIndex) => `
                    <tr class="category-row">
                        <td colspan="3" class="category-header-cell">
                            ${category.name}
                            <div class="category-actions">
                                <button class="icon-btn" onclick="editCategory(${categoryIndex})" title="Edit Category">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="icon-btn" onclick="deleteCategory(${categoryIndex})" title="Delete Category">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <table class="links-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>URL</th>
                                        <th>Edit url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${category.links.map((link, linkIndex) => `
                                        <tr>
                                            <td>${link.name}</td>
                                            <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${link.url}">${link.url}</td>
                                            <td class="link-actions">
                                                <button class="icon-btn" onclick="editLink(${categoryIndex}, ${linkIndex})" title="Edit Link">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="icon-btn" onclick="deleteLink(${categoryIndex}, ${linkIndex})" title="Delete Link">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            <button class="btn btn-small" onclick="addLink(${categoryIndex})" style="margin-top: 8px;">
                                <i class="fas fa-plus"></i> Add Link
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    
    const categories = settings.categories || defaultCategories;
    renderCategories(categories);
    renderCategoryManager(categories);
    
    if (settings.userName) {
        document.getElementById('userName').value = settings.userName;
    }
    
    if (settings.showImage !== undefined) {
        document.getElementById('showImage').checked = settings.showImage;
        toggleImageVisibility(settings.showImage);
    }
    
    if (settings.selectedImage) {
        document.getElementById('mainImage').src = settings.selectedImage;
        updateImageSelection(settings.selectedImage);
    }
    
    if (settings.bgColor) {
        document.getElementById('bgColor').value = settings.bgColor;
        document.documentElement.style.setProperty('--color-bg', settings.bgColor);
    }
    
    if (settings.searchEngine) {
        document.getElementById('searchEngine').value = settings.searchEngine;
    }
    
    if (settings.timeFormat24 !== undefined) {
        document.getElementById('timeFormat24').checked = settings.timeFormat24;
    }
    
    if (settings.showSeconds !== undefined) {
        document.getElementById('showSeconds').checked = settings.showSeconds;
    }
}

function saveSettings() {
    const categories = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}').categories || defaultCategories;
    
    const settings = {
        categories: categories,
        userName: document.getElementById('userName').value,
        showImage: document.getElementById('showImage').checked,
        selectedImage: document.getElementById('mainImage').src,
        bgColor: document.getElementById('bgColor').value,
        searchEngine: document.getElementById('searchEngine').value,
        timeFormat24: document.getElementById('timeFormat24').checked,
        showSeconds: document.getElementById('showSeconds').checked
    };
    
    localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
}

function toggleSettings() {
    const overlay = document.querySelector('.off-canvas-overlay');
    const menu = document.querySelector('.off-canvas-menu');
    
    overlay.classList.toggle('active');
    menu.classList.toggle('active');
}

function toggleImageVisibility(show) {
    const image = document.getElementById('mainImage');
    image.style.display = show ? 'block' : 'none';
    saveSettings();
}

function updateImageSelection(imageSrc) {
    document.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.image === imageSrc) {
            option.classList.add('selected');
        }
    });
}

function setCustomImage() {
    const customUrl = document.getElementById('customImageUrl').value;
    if (customUrl) {
        document.getElementById('mainImage').src = customUrl;
        updateImageSelection(customUrl);
        saveSettings();
    }
}

function addCategory() {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    
    const newCategory = {
        name: 'New Category',
        gradient: 'dev',
        links: []
    };
    
    categories.push(newCategory);
    settings.categories = categories;
    localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
    
    renderCategories(categories);
    renderCategoryManager(categories);
}

function editCategory(categoryIndex) {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    const category = categories[categoryIndex];
    
    currentEditingCategory = categoryIndex;
    document.getElementById('categoryNameInput').value = category.name;
    document.getElementById('categoryGradient').value = category.gradient;
    document.getElementById('categoryModal').style.display = 'block';
}

function saveCategoryChanges() {
    if (currentEditingCategory === null) return;
    
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    
    categories[currentEditingCategory].name = document.getElementById('categoryNameInput').value;
    categories[currentEditingCategory].gradient = document.getElementById('categoryGradient').value;
    
    settings.categories = categories;
    localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
    
    renderCategories(categories);
    renderCategoryManager(categories);
    closeCategoryModal();
}

function deleteCategory(categoryIndex) {
    if (confirm('Are you sure you want to delete this category?')) {
        const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
        const categories = settings.categories || defaultCategories;
        
        categories.splice(categoryIndex, 1);
        settings.categories = categories;
        localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
        
        renderCategories(categories);
        renderCategoryManager(categories);
    }
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
    currentEditingCategory = null;
}

function addLink(categoryIndex) {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    
    const newLink = {
        name: 'New Link',
        url: 'https://example.com'
    };
    
    categories[categoryIndex].links.push(newLink);
    settings.categories = categories;
    localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
    
    renderCategories(categories);
    renderCategoryManager(categories);
}

function editLink(categoryIndex, linkIndex) {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    const link = categories[categoryIndex].links[linkIndex];
    
    currentEditingCategory = categoryIndex;
    currentEditingLink = linkIndex;
    document.getElementById('linkNameInput').value = link.name;
    document.getElementById('linkUrlInput').value = link.url;
    document.getElementById('linkModal').style.display = 'block';
}

function saveLinkChanges() {
    if (currentEditingCategory === null || currentEditingLink === null) return;
    
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    const categories = settings.categories || defaultCategories;
    
    categories[currentEditingCategory].links[currentEditingLink].name = document.getElementById('linkNameInput').value;
    categories[currentEditingCategory].links[currentEditingLink].url = document.getElementById('linkUrlInput').value;
    
    settings.categories = categories;
    localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
    
    renderCategories(categories);
    renderCategoryManager(categories);
    closeLinkModal();
}

function deleteLink(categoryIndex, linkIndex) {
    if (confirm('Are you sure you want to delete this link?')) {
        const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
        const categories = settings.categories || defaultCategories;
        
        categories[categoryIndex].links.splice(linkIndex, 1);
        settings.categories = categories;
        localStorage.setItem('browserHomeSettings', JSON.stringify(settings));
        
        renderCategories(categories);
        renderCategoryManager(categories);
    }
}

function closeLinkModal() {
    document.getElementById('linkModal').style.display = 'none';
    currentEditingCategory = null;
    currentEditingLink = null;
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
        localStorage.clear();
        localStorage.setItem('selectedImage', './assets/image/img01.gif');
        
        document.getElementById('userName').value = '';
        document.getElementById('showImage').checked = true;
        
        document.querySelectorAll('.image-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector('.image-option[data-image="./assets/image/img01.gif"]').classList.add('selected');
        
        updateImageDisplay();
        updatePersonalization();
        
        // Refresh the page
        location.reload();
    }
}

function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    const searchEngine = document.getElementById('searchEngine').value;
    
    let searchUrl;
    switch (searchEngine) {
        case 'google':
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'duckduckgo':
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            break;
        case 'yahoo':
            searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    window.open(searchUrl, '_blank');
    document.getElementById('searchInput').value = '';
}

function updateInfoBar() {
    const now = new Date();
    const timeFormat24 = document.getElementById('timeFormat24').checked;
    const showSeconds = document.getElementById('showSeconds').checked;
    const userName = document.getElementById('userName').value || 'KAWSAR';
    
    let greeting;
    if (now.getHours() < 12) greeting = 'GOOD MORNING';
    else if (now.getHours() < 17) greeting = 'GOOD AFTERNOON';
    else greeting = 'GOOD EVENING';
    
    let timeString;
    if (timeFormat24) {
        timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: showSeconds ? '2-digit' : undefined
        });
    } else {
        timeString = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: 'numeric', 
            minute: '2-digit',
            second: showSeconds ? '2-digit' : undefined
        });
    }
    
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = now.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
   document.getElementById('info-bar').innerHTML = 
    `${greeting}, <span style="font-weight: 500;">${userName}</span><span class="info-separator"> | </span>${timeString}<span class="info-separator"> | </span>${dayName}<span class="info-separator"> | </span>${dateString}`;

}

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    updateInfoBar();
    setInterval(updateInfoBar, 1000);
    
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
    document.getElementById('userName').addEventListener('input', saveSettings);
    document.getElementById('showImage').addEventListener('change', function() {
        toggleImageVisibility(this.checked);
    });
    document.getElementById('bgColor').addEventListener('change', function() {
        document.documentElement.style.setProperty('--color-bg', this.value);
        saveSettings();
    });
    document.getElementById('searchEngine').addEventListener('change', saveSettings);
    document.getElementById('timeFormat24').addEventListener('change', saveSettings);
    document.getElementById('showSeconds').addEventListener('change', saveSettings);
    
    document.querySelectorAll('.image-option').forEach(option => {
        option.addEventListener('click', function() {
            const imageSrc = this.dataset.image;
            document.getElementById('mainImage').src = imageSrc;
            updateImageSelection(imageSrc);
            saveSettings();
        });
    });
    
    window.addEventListener('click', function(event) {
        const categoryModal = document.getElementById('categoryModal');
        const linkModal = document.getElementById('linkModal');
        
        if (event.target === categoryModal) {
            closeCategoryModal();
        }
        if (event.target === linkModal) {
            closeLinkModal();
        }
    });
});

window.addEventListener('load', function() {
    loadSettings();
    if (!localStorage.getItem('selectedImage')) {
        localStorage.setItem('selectedImage', './assets/image/img01.gif');
    }
    updateImageDisplay();
});

function updateImageDisplay() {
    const selectedImage = localStorage.getItem('selectedImage');
    document.getElementById('mainImage').src = selectedImage;
    updateImageSelection(selectedImage);
}

function updatePersonalization() {
    const settings = JSON.parse(localStorage.getItem('browserHomeSettings') || '{}');
    document.documentElement.style.setProperty('--color-bg', settings.bgColor || '#000000');
}
