/**
 * BALA YAAMINI RAVINDRAN — EDITORIAL PORTFOLIO INTERACTIONS
 * Includes:
 * 1. Subtle Interactive Architectural Vector Field Canvas in Hero
 * 2. Avento Architectural Stage Tab Switcher
 * 3. IEEE ICOEI 2026 DOI Copy & Citation Drawer Toggle
 * 4. Interactive Technical Skills Matrix Filter & Context Inspector
 * 5. Smooth Scroll Reveal & Navigation Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. SUBTLE INTERACTIVE HERO ARCHITECTURAL VECTOR FIELD CANVAS
     ======================================================================== */
  const canvas = document.getElementById('heroFieldCanvas');
  const container = document.getElementById('heroCanvasContainer');

  if (canvas && container) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let time = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    });

    const renderField = () => {
      ctx.clearRect(0, 0, width, height);
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;
      time += 0.012;

      const spacing = 44;
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      ctx.strokeStyle = 'rgba(20, 20, 19, 0.13)';
      ctx.lineWidth = 0.85;

      for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 190);

          const baseAngle = Math.sin(c * 0.25 + time) * 0.35 + Math.cos(r * 0.25 + time) * 0.35;
          const cursorAngle = Math.atan2(dy, dx);
          const angle = baseAngle * (1 - influence) + cursorAngle * influence;

          const len = 7 + influence * 10;
          const x2 = x + Math.cos(angle) * len;
          const y2 = y + Math.sin(angle) * len;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          if (influence > 0.35) {
            ctx.fillStyle = 'rgba(140, 59, 43, 0.38)';
            ctx.beginPath();
            ctx.arc(x2, y2, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(renderField);
    };

    requestAnimationFrame(renderField);
  }

  /* ========================================================================
     2. AVENTO INTERACTIVE STAGE TAB SWITCHER
     ======================================================================== */
  const stageTabs = document.querySelectorAll('.stage-tab');
  const stagePanels = document.querySelectorAll('.stage-view-panel');

  stageTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-stage-target');

      stageTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      stagePanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });

  /* ========================================================================
     3. IEEE ICOEI 2026 DOI COPY & CITATION DRAWER
     ======================================================================== */
  const copyDoiBtn = document.getElementById('copyDoiBtn');
  const toggleCitationBtn = document.getElementById('toggleCitationBtn');
  const citationDrawer = document.getElementById('citationDrawer');

  if (copyDoiBtn) {
    copyDoiBtn.addEventListener('click', async () => {
      const doi = '10.1109/ICOEI68323.2026.11541631';
      try {
        await navigator.clipboard.writeText(doi);
        const orig = copyDoiBtn.textContent;
        copyDoiBtn.textContent = 'DOI Copied ✓';
        setTimeout(() => {
          copyDoiBtn.textContent = orig;
        }, 2000);
      } catch {
        copyDoiBtn.textContent = doi;
      }
    });
  }

  if (toggleCitationBtn && citationDrawer) {
    toggleCitationBtn.addEventListener('click', () => {
      const isOpen = citationDrawer.classList.toggle('open');
      toggleCitationBtn.textContent = isOpen ? 'Hide Citation −' : 'IEEE Citation +';
    });
  }

  /* ========================================================================
     4. INTERACTIVE TECHNICAL SKILLS MATRIX & INSPECTOR
     ======================================================================== */
  const skillDataMap = {
    'React.js': {
      cat: 'FRONTEND ARCHITECTURE',
      desc: 'Used to build responsive, accessible component-driven interfaces—powering the Avento University Event Management Platform deployed live on Vercel.',
      applied: ['Avento — University Event Management Platform']
    },
    'Python': {
      cat: 'PROGRAMMING LANGUAGES',
      desc: 'Primary language for desktop GUI tools, spreadsheet automation, and AI/data science workflows—powering the Student Marks Evaluation System and Birthday Calendar Automation.',
      applied: [
        'Student Marks Evaluation System',
        'Birthday Calendar Automation',
        'Python Programming Certification (CodeChef)'
      ]
    },
    'Java': {
      cat: 'PROGRAMMING LANGUAGES',
      desc: 'Object-oriented programming foundation used in core computer science coursework, data structures, and certified through Infosys Springboard.',
      applied: ['Java Foundation Certification (Infosys Springboard)', 'B.Tech CSE Core Curriculum']
    },
    'C++': {
      cat: 'PROGRAMMING LANGUAGES',
      desc: 'Systems and algorithmic programming language applied in competitive coding challenges, ACM chapter events, and Data Structures & Algorithms.',
      applied: ['DSA Certification (CodeChef)', 'ACM Student Chapter Coding Challenges']
    },
    'Supabase': {
      cat: 'BACKEND & DATABASE',
      desc: 'Backend-as-a-Service platform providing real-time PostgreSQL database management and API access for the Avento University Event Management Platform.',
      applied: ['Avento — University Event Management Platform']
    },
    'PostgreSQL': {
      cat: 'BACKEND & DATABASE',
      desc: 'Relational database system used to design and implement normalized schemas via Supabase handling event, user, and registration data reliably.',
      applied: ['Avento — University Event Management Platform', 'DBMS Certifications (CodeChef & Scaler)']
    },
    'MySQL': {
      cat: 'BACKEND & DATABASE',
      desc: 'Relational database management system for structured query design, indexing, and transactional application storage.',
      applied: ['DBMS (CodeChef)', 'Operating Systems & DBMS (Scaler)']
    },
    'Tailwind CSS': {
      cat: 'FRONTEND ARCHITECTURE',
      desc: 'Utility-first CSS framework used alongside React.js to engineer a clean, responsive, and accessible UI for the Avento platform.',
      applied: ['Avento — University Event Management Platform']
    },
    'JavaScript': {
      cat: 'FRONTEND ARCHITECTURE',
      desc: 'Core client-side scripting language powering interactive UI state, asynchronous data fetching, and dynamic DOM interactions across web projects.',
      applied: ['Avento — University Event Management Platform', 'ACM Student Chapter Web Initiatives']
    },
    'HTML': {
      cat: 'FRONTEND ARCHITECTURE',
      desc: 'Semantic document structure and accessible web markup underpinning all full-stack web interfaces.',
      applied: ['Avento — University Event Management Platform', 'Web Master — ACM Student Chapter']
    },
    'CSS': {
      cat: 'FRONTEND ARCHITECTURE',
      desc: 'Responsive layout architecture, grid systems, and visual styling for modern web applications.',
      applied: ['Avento — University Event Management Platform']
    },
    'Tkinter': {
      cat: 'LIBRARIES & FRAMEWORKS',
      desc: 'Python GUI toolkit used to build the desktop interface for the Student Marks Evaluation System, enabling automated entrance exam score computation.',
      applied: ['Student Marks Evaluation System']
    },
    'OpenPyXL': {
      cat: 'LIBRARIES & FRAMEWORKS',
      desc: 'Python library used to programmatically parse, process, and read Excel (.xlsx) spreadsheets for automated exam score calculation and birthday record workflows.',
      applied: ['Student Marks Evaluation System', 'Birthday Calendar Automation']
    },
    'Git': {
      cat: 'TOOLS & PLATFORMS',
      desc: 'Distributed version control system used for source code management, branching, and collaborative software development.',
      applied: ['All Full-Stack & Python Automation Repositories']
    },
    'GitHub': {
      cat: 'TOOLS & PLATFORMS',
      desc: 'Code hosting and collaboration platform (@BalaYaamini) maintaining project repositories and version history.',
      applied: ['github.com/BalaYaamini — Project Portfolio']
    },
    'Visual Studio Code': {
      cat: 'TOOLS & PLATFORMS',
      desc: 'Primary integrated development environment configured for React.js, Python, and database-driven full-stack workflows.',
      applied: ['Full-Stack Web & Desktop Application Development']
    },
    'Postman': {
      cat: 'TOOLS & PLATFORMS',
      desc: 'API testing and inspection environment used to validate REST endpoints and database query payloads.',
      applied: ['Full-Stack Backend & API Testing']
    },
    'Vercel': {
      cat: 'TOOLS & PLATFORMS',
      desc: 'Cloud deployment platform hosting the production Avento University Event Management Platform for real-world student access.',
      applied: ['Avento Live Production Deployment (avento-seven.vercel.app)']
    }
  };

  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCells = document.querySelectorAll('.skill-cell');
  const skillCountLabel = document.getElementById('skillCountLabel');
  const inspectorCat = document.getElementById('inspectorCat');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorLinks = document.getElementById('inspectorLinks');

  const updateInspector = (skillName) => {
    const info = skillDataMap[skillName];
    if (!info) return;

    if (inspectorCat) inspectorCat.textContent = info.cat;
    if (inspectorTitle) inspectorTitle.textContent = skillName;
    if (inspectorDesc) inspectorDesc.textContent = info.desc;
    if (inspectorLinks) {
      inspectorLinks.innerHTML =
        `<span class="mono-label">APPLIED IN PORTFOLIO</span>` +
        info.applied
          .map(
            (item) =>
              `<p style="font-size: 0.88rem; color: var(--ink-black); font-weight: 500;">&bull; ${item}</p>`
          )
          .join('');
    }
  };

  skillCells.forEach((cell) => {
    const selectSkill = () => {
      skillCells.forEach((c) => c.classList.remove('selected'));
      cell.classList.add('selected');
      const skillName = cell.getAttribute('data-skill');
      updateInspector(skillName);
    };

    cell.addEventListener('mouseenter', selectSkill);
    cell.addEventListener('click', selectSkill);
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleCount = 0;
      let firstVisibleSkill = null;

      skillCells.forEach((cell) => {
        const cat = cell.getAttribute('data-category');
        const matches = filter === 'all' || cat === filter;

        if (matches) {
          cell.classList.remove('dimmed');
          visibleCount++;
          if (!firstVisibleSkill) {
            firstVisibleSkill = cell;
          }
        } else {
          cell.classList.add('dimmed');
          cell.classList.remove('selected');
        }
      });

      if (firstVisibleSkill) {
        skillCells.forEach((c) => c.classList.remove('selected'));
        firstVisibleSkill.classList.add('selected');
        updateInspector(firstVisibleSkill.getAttribute('data-skill'));
      }

      if (skillCountLabel) {
        skillCountLabel.textContent = `SHOWING ${visibleCount} / 18 TECHNOLOGIES`;
      }
    });
  });

  /* ========================================================================
     5. COPY EMAIL BUTTON, MOBILE MENU & SCROLL REVEAL / SPY
     ======================================================================== */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'balayaaminiravindran@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const orig = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Email Copied ✓';
        setTimeout(() => {
          copyEmailBtn.textContent = orig;
        }, 2000);
      } catch {
        copyEmailBtn.textContent = email;
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const primaryNav = document.getElementById('primaryNav');

  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenuBtn.textContent = isOpen ? 'Close ×' : 'Menu +';
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.textContent = 'Menu +';
      });
    });
  }

  // IntersectionObserver for subtle scroll-triggered reveal
  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('in-view'));
  }

  // Active Navigation Section Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.primary-nav .nav-link');

  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });
});

