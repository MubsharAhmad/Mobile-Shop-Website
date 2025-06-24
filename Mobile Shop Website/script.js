// Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance carousel
        setInterval(nextSlide, 5000);
        
        // Modal functionality
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stats-counter');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (counter.textContent.includes('K')) {
                        displayValue = Math.floor(current / 1000) + 'K+';
                    } else if (counter.textContent.includes('/')) {
                        displayValue = Math.floor(current) + '/7';
                    } else {
                        displayValue = Math.floor(current);
                    }
                    
                    counter.textContent = displayValue;
                }, 50);
            });
        }
        
        // Trigger counter animation when section is visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe the stats section
        const statsSection = document.querySelector('.stats-counter').closest('section');
        if (statsSection) {
            observer.observe(statsSection);
        }
        
        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });
        
        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
        
        // Add to cart functionality
        document.querySelectorAll('[data-action="add-to-cart"]').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product-card').querySelector('h3').textContent;
                alert(`${productName} added to cart!`);
            });
        });
        
        // Search functionality
        function searchProducts() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
        
        // Price range filter
        function filterByPrice(minPrice, maxPrice) {
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const priceText = product.querySelector('.price-badge').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                if (price >= minPrice && price <= maxPrice) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
        
        // Lazy loading for images
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Add click tracking for analytics
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn-royal')) {
                console.log('CTA button clicked:', e.target.textContent);
            }
        });
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('King Me website loaded successfully!');
        });
