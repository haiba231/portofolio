document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close sidebar when clicking a nav item on mobile
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Active Navigation Update on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 3. Skills Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            tabBtns.forEach(b => b.classList.remove('active'));
            skillCategories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding category
            const targetId = btn.getAttribute('data-target');
            const targetCategory = document.getElementById(targetId);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Retrigger progress bar animation for the active category
                setTimeout(() => {
                    animateProgressBars(targetCategory);
                }, 50);
            }
        });
    });

    // 4. Progress Bar Animation on Scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    let animatedCategories = new Set();

    function animateProgressBars(container) {
        const bars = container.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    // Intersection Observer for Skills Section
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeCategory = document.querySelector('.skill-category.active');
                    if (activeCategory) {
                        animateProgressBars(activeCategory);
                    }
                    // Optional: Unobserve after first animation
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    // 5. Contact Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Karena ini mailto, kita biarkan aksi default berjalan.
            // Namun kita reset isi form beberapa saat kemudian agar terlihat sudah terkirim.
            setTimeout(() => {
                contactForm.reset();
                
                // Memberikan feedback visual ke pengguna
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-check"></i> Pesan Disiapkan!';
                btn.style.backgroundColor = '#25D366'; // Warna hijau success
                btn.style.borderColor = '#25D366';
                
                // Kembalikan tombol seperti semula setelah 3 detik
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 3000);
            }, 500);
        });
    }
});
