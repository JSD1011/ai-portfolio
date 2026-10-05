/**
 * Jaymin Dabhi — AI Engineer Portfolio
 * Interactive Visualizers, Step Simulators & Dynamic Component Controllers
 */

// Global function for Text-to-SQL Agent Card Selection
function selectAgentInspector(agentKey) {
  const inspector = PORTFOLIO_DATA.agentInspectors[agentKey];
  if (!inspector) return;

  // Update UI Elements
  const titleEl = document.getElementById('agentInspTitle');
  const techEl = document.getElementById('agentInspTech');
  const descEl = document.getElementById('agentInspDesc');

  if (titleEl) titleEl.textContent = inspector.title;
  if (techEl) techEl.textContent = inspector.tech;
  if (descEl) descEl.textContent = inspector.desc;

  // Update active styling
  const cards = document.querySelectorAll('.agent-box');
  cards.forEach(card => card.classList.remove('active-pulse'));

  const activeMap = {
    router: 'agentCardRouter',
    column: 'agentCardColumn',
    sqlgen: 'agentCardGen',
    validation: 'agentCardVal',
    database: 'agentCardDb',
    response: 'agentCardResp'
  };

  const activeCard = document.getElementById(activeMap[agentKey]);
  if (activeCard) activeCard.classList.add('active-pulse');
}

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SECTION 2: INTERACTIVE PIPELINE CONTROLLER
  // =========================================================================
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  const inspectorBadge = document.getElementById('inspectorStepBadge');
  const inspectorFramework = document.getElementById('inspectorFramework');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorSnippet = document.getElementById('inspectorSnippet');

  pipelineNodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepKey = node.getAttribute('data-step');
      const stepData = PORTFOLIO_DATA.pipelineSteps[stepKey];
      if (!stepData) return;

      // Toggle active node
      pipelineNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Update inspector
      if (inspectorBadge) inspectorBadge.textContent = stepData.badge;
      if (inspectorFramework) inspectorFramework.textContent = stepData.framework;
      if (inspectorTitle) inspectorTitle.textContent = stepData.title;
      if (inspectorDesc) inspectorDesc.textContent = stepData.desc;
      if (inspectorSnippet) inspectorSnippet.textContent = stepData.snippet;
    });
  });

  // =========================================================================
  // 2. PROJECT 01: CONCEPTUAL RAG SIMULATOR ("Ask the System")
  // =========================================================================
  const btnRunRagSim = document.getElementById('btnRunRagSim');
  const ragSimOutput = document.getElementById('ragSimOutput');

  if (btnRunRagSim && ragSimOutput) {
    btnRunRagSim.addEventListener('click', () => {
      btnRunRagSim.disabled = true;
      ragSimOutput.innerHTML = '<span class="text-cyan font-mono">1/3 Ingesting query & generating dense vector embedding...</span>';

      setTimeout(() => {
        ragSimOutput.innerHTML = `
          <div class="mb-1"><span class="text-cyan font-mono">2/3 Qdrant Vector Retrieval:</span></div>
          <div class="text-muted ps-2 border-left-cyan mb-1">
            • [Doc: travel_policy_2024.pdf | Page 4 | Similarity: 0.89]<br>
            "Section 4.2: Employees are reimbursed for inter-office travel with prior department approval..."
          </div>
          <div class="text-indigo font-mono">3/3 Synthesizing grounded response via LLM...</div>
        `;
      }, 700);

      setTimeout(() => {
        ragSimOutput.innerHTML = `
          <div class="text-emerald font-mono mb-1">✓ Grounded Response Synthesized:</div>
          <div class="text-light p-2 rounded bg-dark border border-subtle">
            "Under the employee travel policy (Section 4.2), travel between regional offices is eligible for reimbursement provided prior departmental approval was submitted and documented."
          </div>
          <div class="mt-1 font-mono text-xs text-muted">Source: travel_policy_2024.pdf (Page 4) &middot; Hallucination Guard: Active</div>
        `;
        btnRunRagSim.disabled = false;
      }, 1500);
    });
  }

  // =========================================================================
  // 3. SECTION 4: INTERACTIVE TECH MAP INSPECTOR
  // =========================================================================
  const techNodes = document.querySelectorAll('.network-node');
  const techInspector = document.getElementById('techInspector');
  const techBadge = document.getElementById('techCategoryBadge');
  const techName = document.getElementById('techName');
  const techUsage = document.getElementById('techUsage');
  const techRole = document.getElementById('techRole');
  const techProject = document.getElementById('techProject');

  function updateTechInspector(techKey) {
    const data = PORTFOLIO_DATA.techMap[techKey];
    if (!data) return;

    techNodes.forEach(n => n.classList.remove('active'));
    const activeNode = document.querySelector(`.network-node[data-tech-id="${techKey}"]`);
    if (activeNode) activeNode.classList.add('active');

    if (techBadge) techBadge.textContent = data.category;
    if (techName) techName.textContent = data.name;
    if (techUsage) techUsage.textContent = data.usage;
    if (techRole) techRole.textContent = data.role;
    if (techProject) techProject.textContent = data.project;
  }

  techNodes.forEach(node => {
    node.addEventListener('click', () => {
      const techKey = node.getAttribute('data-tech-id');
      updateTechInspector(techKey);
    });

    node.addEventListener('mouseenter', () => {
      const techKey = node.getAttribute('data-tech-id');
      updateTechInspector(techKey);
    });
  });

  // Set default tech inspector to LangGraph
  updateTechInspector('langgraph');

  // =========================================================================
  // 4. SECTION 6: TECHNICAL DEEP DIVE TABS
  // =========================================================================
  const deepDiveTabs = document.querySelectorAll('.btn-deep-dive-tab');
  const deepDiveContentArea = document.getElementById('deepDiveContentArea');

  function renderDeepDiveTab(tabKey) {
    const data = PORTFOLIO_DATA.deepDive[tabKey];
    if (!data || !deepDiveContentArea) return;

    deepDiveContentArea.innerHTML = `
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2 mb-4 pb-3 border-bottom-subtle">
        <div>
          <span class="badge bg-cyan text-dark font-mono text-xs mb-1">ARCHITECTURAL SPECIFICATION</span>
          <h3 class="h3 text-light mb-1">${data.title}</h3>
          <p class="text-muted-custom text-sm mb-0">${data.subtitle}</p>
        </div>
      </div>

      <!-- Architecture Pipeline -->
      <div class="mb-4 p-3 rounded-3 bg-panel-darker border border-subtle">
        <span class="font-mono text-xs text-uppercase tracking-wider text-cyan d-block mb-2">End-to-End Pipeline:</span>
        <div class="p-2 rounded bg-black-subtle font-mono text-xs text-light border border-subtle overflow-x-auto">
          ${data.architecture}
        </div>
      </div>

      <!-- Tools & Frameworks -->
      <div class="mb-4">
        <span class="font-mono text-xs text-uppercase tracking-wider text-muted-custom d-block mb-2">Frameworks & Tools Utilized:</span>
        <div class="d-flex flex-wrap gap-2">
          ${data.tools.map(tool => `<span class="badge tech-pill">${tool}</span>`).join('')}
        </div>
      </div>

      <div class="row g-4">
        <!-- Key Design Decisions -->
        <div class="col-lg-4">
          <div class="p-4 rounded-3 bg-panel-darker h-100 border-top-cyan">
            <h4 class="h6 text-light font-mono text-uppercase mb-3">Key Design Decisions</h4>
            <ul class="text-xs text-muted-custom ps-3 mb-0">
              ${data.designDecisions.map(item => `<li class="mb-2">${item}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Challenges Encountered -->
        <div class="col-lg-4">
          <div class="p-4 rounded-3 bg-panel-darker h-100 border-top-amber">
            <h4 class="h6 text-light font-mono text-uppercase mb-3">Engineering Challenges</h4>
            <ul class="text-xs text-muted-custom ps-3 mb-0">
              ${data.challenges.map(item => `<li class="mb-2">${item}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Potential Improvements -->
        <div class="col-lg-4">
          <div class="p-4 rounded-3 bg-panel-darker h-100 border-top-emerald">
            <h4 class="h6 text-light font-mono text-uppercase mb-3">Potential Production Enhancements</h4>
            <ul class="text-xs text-muted-custom ps-3 mb-0">
              ${data.improvements.map(item => `<li class="mb-2">${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  deepDiveTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deepDiveTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      renderDeepDiveTab(tabKey);
    });
  });

  // Render initial deep dive tab
  renderDeepDiveTab('rag');
});
