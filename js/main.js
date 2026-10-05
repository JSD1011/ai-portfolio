/**
 * Jaymin Dabhi — AI Engineer Portfolio
 * Main Application Controller
 * Handles Project Filtering, Comprehensive 10-Point Modal Generation, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. PROJECT FILTERING (All, RAG, Multi-Agent & SQL)
  // =========================================================================
  const filterButtons = document.querySelectorAll('.btn-filter');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 2. PROJECT DETAIL MODAL (Strictly rendering all 10 architectural points)
  // =========================================================================
  const deepDiveButtons = document.querySelectorAll('.btn-deep-dive');
  const modalEl = document.getElementById('projectDeepDiveModal');
  const modalTitle = document.getElementById('deepDiveModalLabel');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalId = document.getElementById('modalProjectId');
  const modalBody = document.getElementById('modalBodyContent');

  let bootstrapModalInstance = null;
  if (modalEl && typeof bootstrap !== 'undefined') {
    bootstrapModalInstance = new bootstrap.Modal(modalEl);
  }

  function openProjectModal(projectId) {
    const project = PORTFOLIO_DATA.projects[projectId];
    if (!project) return;

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalCategory) modalCategory.textContent = project.category;
    if (modalId) modalId.textContent = `PROJECT ${project.number}`;

    const points = project.points;

    // Render Full 10-Point Architecture Breakdown
    if (modalBody) {
      modalBody.innerHTML = `
        <!-- PROMINENT HIGHLIGHT: WHAT I PERSONALLY BUILT -->
        <div class="mb-5 p-4 rounded-3 bg-panel-darker border-left-cyan border border-subtle">
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="badge bg-cyan text-dark font-mono text-xs">CRITICAL EVIDENCE · POINT 04</span>
            <h3 class="h5 mb-0 text-light">What I Personally Built & Contributed</h3>
          </div>
          <p class="text-xs text-cyan mb-3 font-mono">Direct engineering ownership over workflows, models, and retrieval components:</p>
          <ul class="contribution-list text-sm text-secondary mb-0">
            ${points.myContribution.map(item => `<li class="mb-2">${item}</li>`).join('')}
          </ul>
        </div>

        <div class="row g-4 mb-4">
          <!-- Point 1: Problem -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-muted mb-2">POINT 01 · PROBLEM</span>
              <h4 class="h6 text-light mb-2">The Engineering Problem</h4>
              <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.problem}</p>
            </div>
          </div>

          <!-- Point 2: Architecture -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-cyan mb-2">POINT 02 · ARCHITECTURE</span>
              <h4 class="h6 text-light mb-2">System Architecture Pipeline</h4>
              <div class="p-2 rounded bg-black-subtle font-mono text-xs text-light border border-subtle mb-0">
                ${points.architecture}
              </div>
            </div>
          </div>
        </div>

        <div class="row g-4 mb-4">
          <!-- Point 3: Agent / Workflow Design -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-indigo mb-2">POINT 03 · WORKFLOW DESIGN</span>
              <h4 class="h6 text-light mb-2">Agent & Workflow Design</h4>
              <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.workflowDesign}</p>
            </div>
          </div>

          <!-- Point 5: Technologies / Frameworks -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-muted mb-2">POINT 05 · TECHNOLOGIES</span>
              <h4 class="h6 text-light mb-2">Technologies & Frameworks</h4>
              <p class="text-xs text-secondary mb-3">${points.technologiesUsed}</p>
              <div class="d-flex flex-wrap gap-1">
                ${project.technologies.map(t => `<span class="badge tech-pill">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Point 6: Important Engineering Decisions -->
        <div class="mb-4 p-4 rounded-3 bg-panel-darker border border-subtle border-top-cyan">
          <span class="badge bg-dark border border-subtle font-mono text-xs text-cyan mb-2">POINT 06 · ENGINEERING DECISIONS</span>
          <h4 class="h6 text-light mb-2">Important Engineering Decisions</h4>
          <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.engineeringDecisions}</p>
        </div>

        <div class="row g-4 mb-4">
          <!-- Point 7: Challenges -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100 border-top-amber">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-amber mb-2">POINT 07 · CHALLENGES</span>
              <h4 class="h6 text-light mb-2">Challenges Encountered</h4>
              <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.challenges}</p>
            </div>
          </div>

          <!-- Point 8: How System Works Internally -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100 border-top-indigo">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-indigo mb-2">POINT 08 · INTERNAL MECHANICS</span>
              <h4 class="h6 text-light mb-2">How the System Works Internally</h4>
              <pre class="font-mono text-xs text-muted-custom mb-0 p-2 rounded bg-black-subtle border border-subtle whitespace-pre-wrap">${points.internalMechanics}</pre>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Point 9: Learnings -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100 border-top-emerald">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-emerald mb-2">POINT 09 · WHAT I LEARNED</span>
              <h4 class="h6 text-light mb-2">What I Learned</h4>
              <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.learnings}</p>
            </div>
          </div>

          <!-- Point 10: Future Improvements -->
          <div class="col-md-6">
            <div class="p-4 rounded-3 bg-panel-darker border border-subtle h-100 border-top-violet">
              <span class="badge bg-dark border border-subtle font-mono text-xs text-violet mb-2">POINT 10 · PRODUCTION IMPROVEMENTS</span>
              <h4 class="h6 text-light mb-2">Potential Production Improvements</h4>
              <p class="text-xs text-muted-custom mb-0 leading-relaxed">${points.futureImprovements}</p>
            </div>
          </div>
        </div>
      `;
    }

    if (!bootstrapModalInstance && typeof bootstrap !== 'undefined' && bootstrap.Modal && modalEl) {
      bootstrapModalInstance = new bootstrap.Modal(modalEl);
    }

    if (bootstrapModalInstance) {
      bootstrapModalInstance.show();
    } else if (modalEl) {
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      modalEl.removeAttribute('aria-hidden');
      modalEl.setAttribute('aria-modal', 'true');
      document.body.classList.add('modal-open');
      let backdrop = document.querySelector('.modal-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
    }
  }

  function closeProjectModal() {
    if (bootstrapModalInstance) {
      bootstrapModalInstance.hide();
    } else if (modalEl) {
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  }

  // Bind close buttons for fallback
  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
    btn.addEventListener('click', closeProjectModal);
  });

  deepDiveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });

  // =========================================================================
  // 3. NAVBAR GLASS ON SCROLL & MOBILE CLOSE
  // =========================================================================
  const mainNav = document.getElementById('mainNav');
  const navCollapse = document.getElementById('navContent');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNav.classList.add('nav-scrolled');
    } else {
      mainNav.classList.remove('nav-scrolled');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

});
