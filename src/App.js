/* global L */
import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Add this line
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Add this line

function App() {

    
      // Manual carousel control (fallback)
  const setupCarouselControls = () => {
    const carousel = document.getElementById('projectMiniCarousel');
    if (!carousel) return;

    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicators button');
    
    let currentIndex = 0;

    const showSlide = (index) => {
      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      
      items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) item.classList.add('active');
      });
      
      indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) indicator.classList.add('active');
      });
      
      currentIndex = index;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex + 1);
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(index);
      });
    });

    // Auto advance every 5 seconds
    setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  };

  setupCarouselControls();
  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    // Scroll animation for fade-in elements
    const checkFadeIn = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    // Smooth scrolling for navigation links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });
          anchor.classList.add('active');
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    // Create floating code elements
    const createCodeElements = () => {
      const container = document.querySelector('.animated-bg');
      if (!container) return;
      
      const codeSnippets = [
        'function optimize() { return data; }',
        'class Developer { code() {} }',
        'const api = new RestAPI();',
        'data.analyze().visualize();',
        'db.query().optimize();',
        'app.build().deploy();',
        'const solution = new Solution();',
        'async function process() {}'
      ];
      
      for (let i = 0; i < 10; i++) {
        const codeEl = document.createElement('div');
        codeEl.className = 'code-element';
        codeEl.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 20 + Math.random() * 20;
        
        codeEl.style.left = `${left}%`;
        codeEl.style.top = `${top}%`;
        codeEl.style.animationDelay = `${delay}s`;
        codeEl.style.animationDuration = `${duration}s`;
        
        container.appendChild(codeEl);
      }
    };

    // Initialize Leaflet map
    const initMap = () => {
      if (window.L) {
        const map = L.map('mountAyliffMap').setView([-30.813345, 29.381691], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        const customIcon = L.divIcon({
          html: '<i class="fas fa-map-pin" style="color: #0066CC; font-size: 32px;"></i>',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
        
        const marker = L.marker([-30.813345, 29.381691], { icon: customIcon }).addTo(map);
        
        marker.bindPopup(`
          <strong>Mount Ayliff, Eastern Cape</strong><br>
          <small>My Hometown</small><br>
          <hr style="margin: 5px 0;">
          <i class="fas fa-info-circle"></i> Alfred Nzo District<br>
          <i class="fas fa-code"></i> Remote Work Ready
        `).openPopup();
        
        L.circle([-30.813345, 29.381691], {
          color: '#0066CC',
          fillColor: 'rgba(0, 102, 204, 0.1)',
          fillOpacity: 0.3,
          radius: 2000
        }).addTo(map);
      }
    };

    // Load Leaflet and initialize
    const loadLeaflet = () => {
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    // Set current year in footer
    const setCurrentYear = () => {
      const yearElement = document.querySelector('.footer-content small');
      if (yearElement) {
        yearElement.innerHTML = `© ${new Date().getFullYear()} Khwezi Sokanyile. All rights reserved.`;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', () => {
      handleScroll();
      checkFadeIn();
    });
    
    document.addEventListener('click', handleAnchorClick);
    
    // Initial calls
    createCodeElements();
    checkFadeIn();
    setCurrentYear();
    loadLeaflet();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', checkFadeIn);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-grid"></div>
      </div>

      {/* Floating Code Elements - These will be generated by JavaScript */}
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="section hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 hero-content fade-in">
                <h1 className="hero-title animate__animated animate__fadeInUp">
                  Hi, I'm <span style={{color: '#0066CC'}}>Khwezi Sokanyile</span>
                </h1>
                <h2 className="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
                  Full-Stack Developer & Data Analyst
                </h2>
                <p className="hero-description animate__animated animate__fadeInUp animate__delay-2s">
                  I create innovative software solutions and transform complex data into actionable insights. 
                  With expertise in ASP.NET, Python, and modern web technologies, I build scalable systems 
                  that drive business transformation and deliver exceptional user experiences.
                </p>
                <div className="hero-cta animate__animated animate__fadeInUp animate__delay-3s">
                  <a href="#contact" className="cta-button cta-button-primary me-3 mb-3">
                    <i className="fas fa-paper-plane"></i> Get In Touch
                  </a>
                  <a href="#projects" className="cta-button cta-button-secondary mb-3">
                    <i className="fas fa-code"></i> View Projects
                  </a>
                  <a href="/Files/Sokanyile_Khwezi_Developer.pdf" download="Sokanyile_Khwezi_Developer.pdf"
                     className="cta-button cta-button-secondary mb-3">
                    <i className="fas fa-download me-2"></i> Download CV (PDF)
                  </a>
                </div>
              </div>
              <div className="col-lg-6 text-center fade-in">
                <div className="profile-container">
                  <div className="profile-frame">
                    <img src="/videos/me2.jpeg" className="profile-img" alt="Khwezi Sokanyile" />
                  </div>
                  <div className="mt-4">
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <span className="badge bg-primary py-2 px-3">ASP.NET Core</span>
                      <span className="badge bg-primary py-2 px-3">C#</span>
                      <span className="badge bg-primary py-2 px-3">Python</span>
                      <span className="badge bg-primary py-2 px-3">Power BI</span>
                      <span className="badge bg-primary py-2 px-3">SQL Server</span>
                      <span className="badge bg-primary py-2 px-3">Data Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section" style={{background: 'var(--lighter-blue)'}}>
          <div className="container">
            <h2 className="section-title fade-in">Professional Profile</h2>
            <p className="section-subtitle fade-in">
              Combining software engineering expertise with data analytics proficiency to deliver comprehensive solutions
            </p>
            
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="info-card fade-in">
                  <div className="card-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h3 className="mb-3" style={{color: 'var(--secondary-blue)'}}>About Me</h3>
                  <p className="mb-4" style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light)'}}>
                    Recent Information Technology graduate specializing in Software Development from Nelson Mandela University. 
                    I bring strong theoretical knowledge and practical experience in full-stack web development, data analytics, 
                    and database management. My passion lies in creating efficient, scalable solutions that solve real-world problems.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Full-Stack Development</li>
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Data Analysis & Visualization</li>
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Database Design & Optimization</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Authentication & Authorization Systems</li>
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Entity Framework Core & LINQ</li>
                        <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Object-Oriented Programming Principles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title fade-in">Education & Certifications</h2>
            <p className="section-subtitle fade-in">Academic background and professional certifications</p>
            
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="timeline fade-in">
                  <div className="timeline-item">
                    <h4 style={{color: 'var(--secondary-blue)'}}>Diploma in Information Technology (Software Development)</h4>
                    <p className="text-muted mb-2">Nelson Mandela University | Completed 2025</p>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-book text-primary me-2"></i> Software Engineering & Object-Oriented Programming</li>
                      <li><i className="fas fa-database text-primary me-2"></i> Database Systems & Design</li>
                      <li><i className="fas fa-code text-primary me-2"></i> Web Development & Advanced Programming</li>
                    </ul>
                  </div>
                  
                  <div className="timeline-item">
                    <h4 style={{color: 'var(--secondary-blue)'}}>Higher Certificate in Information Technology</h4>
                    <p className="text-muted mb-2">Nelson Mandela University | Completed 2022</p>
                  </div>
                  
                  <div className="timeline-item">
                    <h4 style={{color: 'var(--secondary-blue)'}}>Professional Certifications</h4>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-certificate text-primary me-2"></i> CCNAv7: Introduction to Networks — Cisco</li>
                      <li><i className="fas fa-certificate text-primary me-2"></i> I2C Digital & Technical Skills Certification</li>
                      <li><i className="fas fa-certificate text-primary me-2"></i> Student Leadership Training Certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section" style={{background: 'var(--lighter-blue)'}}>
          <div className="container">
            <h2 className="section-title fade-in">Technical Expertise</h2>
            <p className="section-subtitle fade-in">Comprehensive skillset in modern software development and data analytics</p>
            
            <div className="row">
              {/* Programming Languages */}
              <div className="col-lg-4 fade-in">
                <div className="skill-category">
                  <h4 className="mb-4" style={{color: 'var(--secondary-blue)'}}>
                    <i className="fas fa-code me-2"></i> Programming
                  </h4>
                  <div className="skill-item">
                    <span className="skill-name">C#</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Python (Data Analysis)</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">JavaScript</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">React</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Frameworks & Tools */}
              <div className="col-lg-4 fade-in">
                <div className="skill-category">
                  <h4 className="mb-4" style={{color: 'var(--secondary-blue)'}}>
                    <i className="fas fa-tools me-2"></i> Frameworks & Tools
                  </h4>
                  <div className="skill-item">
                    <span className="skill-name">ASP.NET MVC</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '94%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Entity Framework</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Git & GitHub</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Data Analytics */}
              <div className="col-lg-4 fade-in">
                <div className="skill-category">
                  <h4 className="mb-4" style={{color: 'var(--secondary-blue)'}}>
                    <i className="fas fa-chart-bar me-2"></i> Data Analytics
                  </h4>
                  <div className="skill-item">
                    <span className="skill-name">Power BI</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">SQL Server</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Data Cleaning & Transformation</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '82%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Data Visualization</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title fade-in">Featured Projects</h2>
            <p className="section-subtitle fade-in">Real-world applications demonstrating technical capabilities</p>
            
            {/* Projects Section - Two Cards Side by Side */}
<div className="row g-4">
  {/* HealthOps Project - First Column */}
  <div className="col-lg-6 fade-in">
    <div className="project-card">
      <div className="project-content">
        <h3 className="mb-3" style={{color: 'var(--secondary-blue)'}}>HealthOps Hospital Management System</h3>
        <p className="text-muted mb-4">
          Comprehensive healthcare management platform featuring patient appointment booking, doctor panels,
          AI-powered assistant (Bonfire), real-time monitoring, and efficient healthcare operations tracking.
        </p>
        <div className="mb-4">
          <span className="badge bg-primary me-2">ASP.NET MVC</span>
          <span className="badge bg-primary me-2">SQL Server</span>
          <span className="badge bg-primary me-2">Entity Framework</span>
          <span className="badge bg-primary me-2">AI Integration</span>
          <span className="badge bg-primary">Healthcare Tech</span>
        </div>
        <ul className="list-unstyled">
          <li><i className="fas fa-check text-primary me-2"></i> AI-powered assistant (Bonfire) for patient support</li>
          <li><i className="fas fa-check text-primary me-2"></i> Doctor panel & staff management system</li>
          <li><i className="fas fa-check text-primary me-2"></i> Secure appointment booking & scheduling</li>
          <li><i className="fas fa-check text-primary me-2"></i> Medical records & patient data management</li>
          <li><i className="fas fa-check text-primary me-2"></i> Real-time healthcare operations tracking</li>
        </ul>
        
        {/* Add Live Demo Button for HealthOps (optional) */}
      
      </div>
    </div>
  </div>

  {/* React Todo App - Second Column (INSIDE THE SAME ROW) */}
  <div className="col-lg-6 fade-in">
    <div className="project-card">
      <div className="project-content">
        <h3 className="mb-3" style={{color: 'var(--secondary-blue)'}}>React To-do Application</h3>
        <p className="text-muted mb-4">
          A modern, feature-rich todo application built with React. Features include task management, 
          categories, due dates, and a clean, intuitive user interface for efficient productivity tracking.
        </p>
        <div className="mb-4">
          <span className="badge bg-primary me-2">React</span>
          <span className="badge bg-primary me-2">JavaScript</span>
          <span className="badge bg-primary me-2">CSS3</span>
          <span className="badge bg-primary me-2">LocalStorage</span>
          <span className="badge bg-primary">Responsive</span>
        </div>
        <ul className="list-unstyled">
          <li><i className="fas fa-check text-primary me-2"></i> Create, edit, and delete tasks</li>
          <li><i className="fas fa-check text-primary me-2"></i> Mark tasks as complete/incomplete</li>
          <li><i className="fas fa-check text-primary me-2"></i> Filter tasks by status (All/Active/Completed)</li>
          <li><i className="fas fa-check text-primary me-2"></i> Persistent storage with browser LocalStorage</li>
          <li><i className="fas fa-check text-primary me-2"></i> Clean and responsive user interface</li>
        </ul>
        
        {/* Live Demo Button for Todo App */}
        <div className="mt-4">
          <a href="https://github.com/khwezisoks/react-todo" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="btn btn-primary me-2" 
             style={{borderRadius: '50px', padding: '0.5rem 1.5rem'}}>
            <i className="fab fa-github me-2"></i>View Code
          </a>
          <a href="https://react-todo-ph9zo86qc-khwezisoks-projects.vercel.app" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="btn btn-outline-primary" 
             style={{borderRadius: '50px', padding: '0.5rem 1.5rem'}}>
            <i className="fas fa-external-link-alt me-2"></i>Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</div> {/* This closes the row properly */}


            <br /><br />

            {/* Project Carousel */}
            <div className="project-mini-carousel position-relative" style={{height: '600px', maxWidth: '1000px', margin: '0 auto'}}>
              <div id="projectMiniCarousel" className="carousel slide h-100" data-bs-ride="carousel">
                <div className="carousel-inner h-100">
                  {/* Slide 1 */}
                  <div className="carousel-item active h-100">
                    <img src="/videos/screenshot (806).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Dashboard View"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Dashboard</small>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (807).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Appointment System"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Appointment System</small>
                    </div>
                  </div>

                  {/* Slide 3 - Video */}
                  <div className="carousel-item h-100">
                    <video className="d-block w-100 h-100 object-fit-contain" controls style={{backgroundColor: '#f5f5f5'}}>
                      <source src="/videos/WhatsApp Video 2025-11-25 at 02.13.24.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="carousel-caption mini-caption">
                      <small>System Demo</small>
                    </div>
                  </div>

                  {/* Slide 4 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (808).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Doctors Management"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Doctors Management</small>
                    </div>
                  </div>

                  {/* Slide 5 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (809).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Features"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>System Features</small>
                    </div>
                  </div>

                  {/* Slide 6 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (810).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Interface"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>User Interface</small>
                    </div>
                  </div>

                  {/* Slide 7 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (811).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Admin Panel"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Admin Panel</small>
                    </div>
                  </div>

                  {/* Slide 8 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (812).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Reports"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Reporting</small>
                    </div>
                  </div>

                  {/* Slide 9 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (813).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Analytics"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Analytics</small>
                    </div>
                  </div>

                  {/* Slide 10 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (814).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Settings"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Settings</small>
                    </div>
                  </div>

                  {/* Slide 11 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (815).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Mobile View"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Mobile View</small>
                    </div>
                  </div>

                  {/* Slide 12 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (816).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Dashboard 2"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Dashboard Overview</small>
                    </div>
                  </div>

                  {/* Slide 13 */}
                  <div className="carousel-item h-100">
                    <img src="/videos/screenshot (817).png"
                         className="d-block w-100 h-100 object-fit-contain"
                         alt="Final View"
                         style={{backgroundColor: '#f5f5f5'}} />
                    <div className="carousel-caption mini-caption">
                      <small>Final Overview</small>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button className="carousel-control-prev mini-arrow"
                        type="button"
                        data-bs-target="#projectMiniCarousel"
                        data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next mini-arrow"
                        type="button"
                        data-bs-target="#projectMiniCarousel"
                        data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>

                {/* Indicators */}
                <div className="carousel-indicators mini-indicators">
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="2"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="3"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="4"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="5"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="6"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="7"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="8"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="9"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="10"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="11"></button>
                  <button type="button" data-bs-target="#projectMiniCarousel" data-bs-slide-to="12"></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section" style={{background: 'var(--lighter-blue)'}}>
          <div className="container">
            <h2 className="section-title fade-in">Professional Experience</h2>
            <p className="section-subtitle fade-in">Leadership roles and practical experience</p>
            
            <div className="row">
              <div className="col-lg-6 fade-in">
                <div className="info-card h-100">
                  <div className="card-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4 className="mb-3" style={{color: 'var(--secondary-blue)'}}>Student Recruitment</h4>
                  <p className="text-muted mb-2">My Student House | 2 Months</p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-caret-right text-primary me-2"></i> Frontline administrative support</li>
                    <li className="mb-2"><i className="fas fa-caret-right text-primary me-2"></i> Student advisory and onboarding systems</li>
                    <li><i className="fas fa-caret-right text-primary me-2"></i> Worked with Modus and HubSpot platforms</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-6 fade-in">
                <div className="info-card h-100">
                  <div className="card-icon">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <h4 className="mb-3" style={{color: 'var(--secondary-blue)'}}>Residence Student Leader</h4>
                  <p className="text-muted mb-2">Easy Accommodation – NMU | 1 Year</p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-caret-right text-primary me-2"></i> Student mentorship and support</li>
                    <li className="mb-2"><i className="fas fa-caret-right text-primary me-2"></i> Communication and problem-solving leadership</li>
                    <li><i className="fas fa-caret-right text-primary me-2"></i> Student engagement and guidance programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title fade-in">Let's Connect</h2>
            <p className="section-subtitle fade-in">Open to exciting opportunities and meaningful collaborations</p>
            
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="info-card fade-in">
                  <h3 className="text-center mb-4" style={{color: 'var(--secondary-blue)'}}>Get In Touch</h3>
                  
                  <div className="contact-info">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">Email</h5>
                      <a href="mailto:khwezisoks@gmail.com" className="text-decoration-none" style={{color: '#0066CC'}}>
                        khwezisoks@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">Phone</h5>
                      <a href="tel:+27653537476" className="text-decoration-none" style={{color: '#0066CC'}}>
                        065 353 7476
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">Location</h5>
                      <p className="mb-0" style={{color: 'var(--text-light)'}}>Mount Ayliff, Eastern Cape</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <div className="social-links">
                      <a href="https://www.linkedin.com/in/khwezi-sokanyile-226150361" 
                         target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="https://github.com/khwezisoks" 
                         target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href="mailto:khwezisoks@gmail.com" className="social-link">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <div className="col-lg-12 fade-in">
          <div className="info-card">
            <h3 className="mb-4" style={{color: 'var(--secondary-blue)', textAlign: 'center'}}>
              <i className="fas fa-map-marked-alt me-2"></i>Location: Mount Ayliff, Eastern Cape
            </h3>

            <div id="mountAyliffMap" style={{height: '400px', borderRadius: '15px', overflow: 'hidden'}}></div>

            <div className="mt-3 p-3" style={{background: 'var(--light-blue)', borderRadius: '10px'}}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5 style={{color: 'var(--primary-blue)'}}>📍 Mount Ayliff, Eastern Cape</h5>
                  <p className="mb-0 text-muted">
                    Situated in the picturesque Alfred Nzo District Municipality,
                    known for its beautiful landscapes and strong community spirit.
                    Ready to collaborate with teams worldwide through remote work capabilities.
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <a href="https://goo.gl/maps/YourMapLink" target="_blank" rel="noopener noreferrer"
                     className="cta-button cta-button-secondary btn-sm">
                    <i className="fas fa-external-link-alt me-2"></i>Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <h3 className="mb-3">Khwezi Sokanyile</h3>
            <p className="mb-4">Full-Stack Developer & Data Analyst</p>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/in/khwezi-sokanyile-226150361" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/khwezisoks" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:khwezisoks@gmail.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            
            <div className="mt-4 pt-3 border-top border-white-10">
              <small>© {new Date().getFullYear()} Khwezi Sokanyile. All rights reserved.</small>
              <p className="mt-2" style={{opacity: 0.8, fontSize: '0.9rem'}}>
                Built with React, Bootstrap 5, and modern web technologies
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;