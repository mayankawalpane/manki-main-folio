// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, .nav-arrow, .section-dot');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.border = '1px solid rgba(108, 99, 255, 0.6)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        });
    });

    
    
    // Navigation menu functionality
    const menuLinks = document.querySelectorAll('.menu-link');
    const sectionContents = document.querySelectorAll('.section-content');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Update active link
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding content
            const targetSection = link.getAttribute('data-section');
            
            sectionContents.forEach(section => {
                section.classList.add('hidden');
            });
            
            document.getElementById(`${targetSection}-content`).classList.remove('hidden');
            
            // Go to first section for work
            if (targetSection === 'work') {
                goToPage(0);
            }
            
            // Animate skill bars if skills section
            if (targetSection === 'skills') {
                animateSkillBars();
            }
        });
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = 0;
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // NEW IMPLEMENTATION: Panorama navigation with direct DOM manipulation
    const panoramaImage = document.querySelector('.panorama-image');
    const projectCards = document.querySelectorAll('.project-card');
    const sectionDots = document.querySelectorAll('.section-dot');
    const totalPages = 5; // Five sections in our panoramic image
    let currentPage = 0;
    let isScrolling = false;
    
    // Update pagination indicator
    const paginationIndicator = document.querySelector('.pagination-indicator');
    
    function updatePagination() {
        paginationIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
        
        // Update section dots
        sectionDots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Function to navigate to a specific page
    function goToPage(pageIndex) {
        if (isScrolling) return;
        isScrolling = true;
        
        // Update current page index with boundary checks
        currentPage = Math.max(0, Math.min(totalPages - 1, pageIndex));
        
        // Calculate percentage to move (each section is 20% of the total)
        const percentage = -(currentPage * 20);
        
        // Apply the transform directly to move the panorama image
        panoramaImage.style.transform = `translateX(${percentage}%)`;
        
        // Update project cards
        projectCards.forEach((card, index) => {
            if (index === currentPage) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 300);
            } else {
                card.classList.remove('active');
            }
        });
        
        // Update pagination and indicators
        updatePagination();
        
        // Set work section as active if navigating through projects
        if (currentPage >= 0 && currentPage < totalPages) {
            menuLinks.forEach(item => {
                if (item.getAttribute('data-section') === 'work') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            sectionContents.forEach(section => {
                section.classList.add('hidden');
            });
            
            document.getElementById('work-content').classList.remove('hidden');
        }
        
        // Reset scrolling flag after transition completes
        setTimeout(() => {
            isScrolling = false;
        }, 800); // Match this with the CSS transition duration
    }
    
    // Initialize navigation
    updatePagination();
    
    // Make sure the panorama is properly positioned at start
    panoramaImage.style.transform = 'translateX(0%)';
    
    // Navigation arrows
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    prevArrow.addEventListener('click', () => {
        goToPage(currentPage - 1);
    });
    
    nextArrow.addEventListener('click', () => {
        goToPage(currentPage + 1);
    });
    
    // Section dots navigation
    sectionDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToPage(index);
        });
    });
    
    // Mouse wheel navigation - DIRECT IMPLEMENTATION
    document.addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent default scrolling
        
        if (isScrolling) return;
        
        // Determine scroll direction
        if (e.deltaY > 0) {
            // Scroll down - next page
            goToPage(currentPage + 1);
        } else {
            // Scroll up - previous page
            goToPage(currentPage - 1);
        }
    }, { passive: false }); // Important for preventing default scroll
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            goToPage(currentPage + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            goToPage(currentPage - 1);
        }
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        
        // Determine swipe direction with a threshold
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next page
                goToPage(currentPage + 1);
            } else {
                // Swipe right - previous page
                goToPage(currentPage - 1);
            }
        }
    });
    
    // Hide scroll indicator after a while
    setTimeout(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        }
    }, 5000);
    
    // Initial animations
    const tl = gsap.timeline();
    
    tl.from('.logo', { y: -20, opacity: 0, duration: 0.8 })
      .from('.animated-text', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.intro p', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.menu', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('#about-content', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('.navigation-controls', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('.section-indicators', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.project-card.active', { y: 30, opacity: 0, duration: 0.8 }, '-=0.2');
});

// Ensure image is fully loaded
window.addEventListener('load', () => {
    // Force recalculation and positioning of panorama after full load
    const panoramaImage = document.querySelector('.panorama-image');
    panoramaImage.style.transform = 'translateX(0%)';
});