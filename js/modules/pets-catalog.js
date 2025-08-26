// Pets Catalog Module

// Sample pet data
const petsData = [
  {
    id: 1,
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: '2 years',
    ageCategory: 'adult',
    size: 'large',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    description: 'Friendly and energetic Golden Retriever looking for an active family.',
    tags: ['Vaccinated', 'Trained', 'Good with kids'],
    goodWith: ['children', 'dogs'],
    special: [],
    shelter: 'Happy Paws Shelter',
    location: 'New York, NY',
    adoptionFee: 250
  },
  {
    id: 2,
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese Mix',
    age: '3 years',
    ageCategory: 'adult',
    size: 'small',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
    description: 'Beautiful Siamese mix with striking blue eyes. Very affectionate.',
    tags: ['Indoor', 'Calm', 'Vaccinated'],
    goodWith: ['cats'],
    special: [],
    shelter: 'City Animal Rescue',
    location: 'Los Angeles, CA',
    adoptionFee: 150
  },
  {
    id: 3,
    name: 'Charlie',
    species: 'dog',
    breed: 'Labrador Mix',
    age: '6 months',
    ageCategory: 'baby',
    size: 'medium',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&h=300&fit=crop',
    description: 'Playful puppy full of energy and love. Great for families.',
    tags: ['Puppy', 'Energetic', 'Training needed'],
    goodWith: ['children', 'dogs', 'cats'],
    special: [],
    shelter: 'Paws & Hearts Rescue',
    location: 'Chicago, IL',
    adoptionFee: 300
  },
  {
    id: 4,
    name: 'Bella',
    species: 'cat',
    breed: 'Persian',
    age: '4 years',
    ageCategory: 'adult',
    size: 'small',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&h=300&fit=crop',
    description: 'Elegant Persian cat with a calm and loving personality.',
    tags: ['Long-haired', 'Indoor only', 'Quiet'],
    goodWith: [],
    special: ['urgent'],
    shelter: 'Feline Friends Society',
    location: 'Houston, TX',
    adoptionFee: 200
  },
  {
    id: 5,
    name: 'Rocky',
    species: 'dog',
    breed: 'German Shepherd',
    age: '4 years',
    ageCategory: 'adult',
    size: 'large',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=300&fit=crop',
    description: 'Loyal and protective German Shepherd. Great guard dog.',
    tags: ['Trained', 'Protective', 'Active'],
    goodWith: ['children'],
    special: [],
    shelter: 'K9 Companions',
    location: 'Phoenix, AZ',
    adoptionFee: 275
  },
  {
    id: 6,
    name: 'Mittens',
    species: 'cat',
    breed: 'Tabby',
    age: '1 year',
    ageCategory: 'young',
    size: 'small',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    description: 'Young and playful tabby cat who loves to explore.',
    tags: ['Playful', 'Curious', 'Good with kids'],
    goodWith: ['children', 'cats'],
    special: [],
    shelter: 'Whiskers Haven',
    location: 'Philadelphia, PA',
    adoptionFee: 125
  },
  {
    id: 7,
    name: 'Daisy',
    species: 'dog',
    breed: 'Beagle',
    age: '5 years',
    ageCategory: 'adult',
    size: 'medium',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=300&fit=crop',
    description: 'Sweet Beagle with a gentle nature. Perfect family pet.',
    tags: ['Gentle', 'Family-friendly', 'Vaccinated'],
    goodWith: ['children', 'dogs', 'cats'],
    special: [],
    shelter: 'Happy Tails Rescue',
    location: 'San Antonio, TX',
    adoptionFee: 225
  },
  {
    id: 8,
    name: 'Shadow',
    species: 'cat',
    breed: 'Black Cat',
    age: '8 years',
    ageCategory: 'senior',
    size: 'small',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=300&fit=crop',
    description: 'Senior cat looking for a quiet retirement home.',
    tags: ['Senior', 'Calm', 'Indoor'],
    goodWith: [],
    special: ['urgent', 'special-needs'],
    shelter: 'Senior Pets Sanctuary',
    location: 'San Diego, CA',
    adoptionFee: 50
  },
  {
    id: 9,
    name: 'Buddy',
    species: 'dog',
    breed: 'Mixed Breed',
    age: '3 years',
    ageCategory: 'adult',
    size: 'medium',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    description: 'Friendly mixed breed dog with lots of love to give.',
    tags: ['Friendly', 'Adaptable', 'Trained'],
    goodWith: ['children', 'dogs'],
    special: [],
    shelter: 'Second Chance Animal Shelter',
    location: 'Dallas, TX',
    adoptionFee: 175
  },
  {
    id: 10,
    name: 'Whiskers',
    species: 'cat',
    breed: 'Maine Coon Mix',
    age: '2 years',
    ageCategory: 'adult',
    size: 'medium',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=300&fit=crop',
    description: 'Majestic Maine Coon mix with a playful personality.',
    tags: ['Large breed', 'Playful', 'Social'],
    goodWith: ['cats', 'dogs'],
    special: [],
    shelter: 'Purrfect Match Rescue',
    location: 'Seattle, WA',
    adoptionFee: 180
  },
  {
    id: 11,
    name: 'Scout',
    species: 'dog',
    breed: 'Border Collie',
    age: '2 years',
    ageCategory: 'adult',
    size: 'medium',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400&h=300&fit=crop',
    description: 'Intelligent Border Collie needs an active home.',
    tags: ['Very Active', 'Intelligent', 'Needs space'],
    goodWith: ['children'],
    special: [],
    shelter: 'Active Dogs Rescue',
    location: 'Denver, CO',
    adoptionFee: 300
  },
  {
    id: 12,
    name: 'Smokey',
    species: 'cat',
    breed: 'Russian Blue',
    age: '5 years',
    ageCategory: 'adult',
    size: 'small',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&h=300&fit=crop',
    description: 'Beautiful Russian Blue with a calm demeanor.',
    tags: ['Quiet', 'Independent', 'Low maintenance'],
    goodWith: [],
    special: [],
    shelter: 'Elite Cats Rescue',
    location: 'Boston, MA',
    adoptionFee: 250
  }
];

// State management
let currentFilters = {
  species: [],
  age: [],
  size: [],
  gender: [],
  goodWith: [],
  special: [],
  search: ''
};

let currentSort = 'newest';
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 12;

// Initialize catalog
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('petsGrid')) {
    initializePetsCatalog();
  }
});

function initializePetsCatalog() {
  renderPets();
  initializeFilters();
  initializeControls();
  initializeMobileFilters();
}

// Render pets
function renderPets() {
  const grid = document.getElementById('petsGrid');
  if (!grid) return;
  
  // Apply filters
  let filteredPets = filterPets(petsData);
  
  // Apply sorting
  filteredPets = sortPets(filteredPets);
  
  // Update results count
  document.getElementById('resultsCount').textContent = filteredPets.length;
  
  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPets = filteredPets.slice(startIndex, startIndex + itemsPerPage);
  
  // Clear grid
  grid.innerHTML = '';
  
  // Add loading state
  grid.classList.add('loading');
  
  // Render pets
  setTimeout(() => {
    grid.classList.remove('loading');
    
    if (paginatedPets.length === 0) {
      grid.innerHTML = `
        <div class="empty-state col-span-full">
          <div class="empty-state-icon">🐾</div>
          <h3>No pets found</h3>
          <p>Try adjusting your filters or search criteria</p>
          <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
        </div>
      `;
    } else {
      paginatedPets.forEach(pet => {
        grid.appendChild(createPetCard(pet));
      });
    }
    
    // Update pagination
    updatePagination(filteredPets.length);
  }, 300);
}

// Create pet card
function createPetCard(pet) {
  const card = document.createElement('div');
  card.className = currentView === 'list' ? 'pet-card-list' : 'card pet-card';
  
  const urgentBadge = pet.special.includes('urgent') ? '<span class="card-badge">Urgent</span>' : '';
  
  card.innerHTML = `
    <div class="card-image">
      <img src="${pet.image}" alt="${pet.name}">
      ${urgentBadge}
      <button class="card-favorite" aria-label="Add to favorites">❤️</button>
    </div>
    <div class="card-body">
      <span class="card-category">${pet.species} • ${pet.breed}</span>
      <h3 class="card-title">${pet.name}</h3>
      <p class="card-description">${pet.description}</p>
      <div class="pet-card-tags">
        ${pet.tags.slice(0, 2).map(tag => `<span class="pet-card-tag">${tag}</span>`).join('')}
      </div>
      <div class="card-meta">
        <div>
          <span class="text-sm text-gray">${pet.age}</span><br>
          <span class="text-xs text-gray">${pet.location}</span>
        </div>
        <a href="details.html?id=${pet.id}" class="btn btn-primary btn-sm">View Details</a>
      </div>
    </div>
  `;
  
  // Add click handler
  card.addEventListener('click', function(e) {
    if (!e.target.closest('button') && !e.target.closest('a')) {
      window.location.href = `details.html?id=${pet.id}`;
    }
  });
  
  // Add favorite handler
  const favoriteBtn = card.querySelector('.card-favorite');
  favoriteBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    updateFavoriteCount(this.classList.contains('active'));
  });
  
  return card;
}

// Filter pets
function filterPets(pets) {
  return pets.filter(pet => {
    // Search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      const matchesSearch = 
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm) ||
        pet.description.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    
    // Species filter
    if (currentFilters.species.length > 0) {
      if (!currentFilters.species.includes(pet.species)) return false;
    }
    
    // Age filter
    if (currentFilters.age.length > 0) {
      if (!currentFilters.age.includes(pet.ageCategory)) return false;
    }
    
    // Size filter
    if (currentFilters.size.length > 0) {
      if (!currentFilters.size.includes(pet.size)) return false;
    }
    
    // Gender filter
    if (currentFilters.gender.length > 0) {
      if (!currentFilters.gender.includes(pet.gender)) return false;
    }
    
    // Good with filter
    if (currentFilters.goodWith.length > 0) {
      const hasAllGoodWith = currentFilters.goodWith.every(item => 
        pet.goodWith.includes(item)
      );
      if (!hasAllGoodWith) return false;
    }
    
    // Special categories filter
    if (currentFilters.special.length > 0) {
      const hasSpecial = currentFilters.special.some(item => 
        pet.special.includes(item)
      );
      if (!hasSpecial) return false;
    }
    
    return true;
  });
}

// Sort pets
function sortPets(pets) {
  const sorted = [...pets];
  
  switch(currentSort) {
    case 'newest':
      // In real app, would sort by date added
      sorted.reverse();
      break;
    case 'oldest':
      // In real app, would sort by date added
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'age-young':
      sorted.sort((a, b) => {
        const ageOrder = ['baby', 'young', 'adult', 'senior'];
        return ageOrder.indexOf(a.ageCategory) - ageOrder.indexOf(b.ageCategory);
      });
      break;
    case 'age-old':
      sorted.sort((a, b) => {
        const ageOrder = ['baby', 'young', 'adult', 'senior'];
        return ageOrder.indexOf(b.ageCategory) - ageOrder.indexOf(a.ageCategory);
      });
      break;
  }
  
  return sorted;
}

// Initialize filters
function initializeFilters() {
  // Search
  const searchInput = document.getElementById('searchPets');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function() {
      currentFilters.search = this.value;
      currentPage = 1;
      renderPets();
    }, 300));
  }
  
  // Checkbox filters
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const filterType = this.name;
      const value = this.value;
      
      if (this.checked) {
        if (!currentFilters[filterType]) currentFilters[filterType] = [];
        currentFilters[filterType].push(value);
      } else {
        const index = currentFilters[filterType].indexOf(value);
        if (index > -1) {
          currentFilters[filterType].splice(index, 1);
        }
      }
      
      currentPage = 1;
      renderPets();
    });
  });
  
  // Apply filters button
  const applyBtn = document.querySelector('.filters-sidebar .btn-primary');
  if (applyBtn) {
    applyBtn.addEventListener('click', function() {
      renderPets();
      
      // Close mobile filters if open
      const sidebar = document.querySelector('.filters-sidebar');
      if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        document.querySelector('.filter-overlay')?.classList.remove('active');
      }
    });
  }
  
  // Clear filters
  document.getElementById('clearFilters')?.addEventListener('click', clearAllFilters);
}

// Initialize controls
function initializeControls() {
  // Sort control
  document.getElementById('sortBy')?.addEventListener('change', function() {
    currentSort = this.value;
    renderPets();
  });
  
  // View controls
  document.getElementById('gridView')?.addEventListener('click', function() {
    currentView = 'grid';
    document.querySelector('.view-btn.active')?.classList.remove('active');
    this.classList.add('active');
    renderPets();
  });
  
  document.getElementById('listView')?.addEventListener('click', function() {
    currentView = 'list';
    document.querySelector('.view-btn.active')?.classList.remove('active');
    this.classList.add('active');
    document.getElementById('petsGrid').classList.add('list-view');
    renderPets();
  });
  
  // Quick filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      // Toggle active state
      this.classList.toggle('active');
      
      // Apply filter based on pill text
      const filterText = this.textContent.toLowerCase();
      
      if (filterText === 'all pets') {
        clearAllFilters();
        document.querySelectorAll('.filter-pill').forEach(p => {
          p.classList.remove('active');
        });
        this.classList.add('active');
      } else if (filterText === 'dogs') {
        toggleSpeciesFilter('dog');
      } else if (filterText === 'cats') {
        toggleSpeciesFilter('cat');
      } else if (filterText === 'puppies') {
        toggleAgeFilter('baby', 'dog');
      } else if (filterText === 'kittens') {
        toggleAgeFilter('baby', 'cat');
      } else if (filterText === 'senior pets') {
        toggleAgeFilter('senior');
      } else if (filterText === 'urgent') {
        toggleSpecialFilter('urgent');
      }
      
      renderPets();
    });
  });
}

// Toggle filters
function toggleSpeciesFilter(species) {
  const index = currentFilters.species.indexOf(species);
  if (index > -1) {
    currentFilters.species.splice(index, 1);
  } else {
    currentFilters.species.push(species);
  }
  
  // Update checkbox
  const checkbox = document.querySelector(`input[name="species"][value="${species}"]`);
  if (checkbox) checkbox.checked = index === -1;
}

function toggleAgeFilter(age, species = null) {
  const index = currentFilters.age.indexOf(age);
  if (index > -1) {
    currentFilters.age.splice(index, 1);
  } else {
    currentFilters.age.push(age);
  }
  
  if (species) {
    toggleSpeciesFilter(species);
  }
  
  // Update checkbox
  const checkbox = document.querySelector(`input[name="age"][value="${age}"]`);
  if (checkbox) checkbox.checked = index === -1;
}

function toggleSpecialFilter(special) {
  const index = currentFilters.special.indexOf(special);
  if (index > -1) {
    currentFilters.special.splice(index, 1);
  } else {
    currentFilters.special.push(special);
  }
  
  // Update checkbox
  const checkbox = document.querySelector(`input[name="special"][value="${special}"]`);
  if (checkbox) checkbox.checked = index === -1;
}

// Clear all filters
function clearAllFilters() {
  currentFilters = {
    species: [],
    age: [],
    size: [],
    gender: [],
    goodWith: [],
    special: [],
    search: ''
  };
  
  // Clear checkboxes
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Clear search
  const searchInput = document.getElementById('searchPets');
  if (searchInput) searchInput.value = '';
  
  // Reset pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  document.querySelector('.filter-pill')?.classList.add('active');
  
  currentPage = 1;
  renderPets();
}

// Update pagination
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationNumbers = document.querySelector('.pagination-numbers');
  if (!paginationNumbers) return;
  
  paginationNumbers.innerHTML = '';
  
  // Previous button
  const prevBtn = document.querySelector('.pagination-btn');
  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }
  
  // Page numbers
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  if (startPage > 1) {
    addPageButton(1);
    if (startPage > 2) {
      paginationNumbers.innerHTML += '<span class="pagination-dots">...</span>';
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i);
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationNumbers.innerHTML += '<span class="pagination-dots">...</span>';
    }
    addPageButton(totalPages);
  }
  
  // Next button
  const nextBtn = document.querySelectorAll('.pagination-btn')[1];
  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }
  
  function addPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.className = 'pagination-number';
    if (pageNum === currentPage) btn.classList.add('active');
    btn.textContent = pageNum;
    btn.onclick = () => {
      currentPage = pageNum;
      renderPets();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    paginationNumbers.appendChild(btn);
  }
}

// Initialize mobile filters
function initializeMobileFilters() {
  const mobileToggle = document.getElementById('mobileFilterToggle');
  const sidebar = document.querySelector('.filters-sidebar');
  
  if (mobileToggle && sidebar) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    document.body.appendChild(overlay);
    
    mobileToggle.addEventListener('click', function() {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Add close button to sidebar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-ghost';
    closeBtn.innerHTML = '× Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.onclick = function() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    sidebar.insertBefore(closeBtn, sidebar.firstChild);
  }
}

// Update favorite count
function updateFavoriteCount(isAdding) {
  const badge = document.querySelector('.navbar-actions .badge');
  if (badge) {
    let count = parseInt(badge.textContent) || 0;
    count = isAdding ? count + 1 : Math.max(0, count - 1);
    badge.textContent = count;
  }
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}