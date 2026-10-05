/**
 * Jaymin Dabhi — AI Engineer Portfolio
 * Hero Canvas: Subtle Animated Agent Network & Token Packet Simulation
 * Professional, calm, system-oriented visualization
 */

(function () {
  const canvas = document.getElementById('agentNetworkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Agent Node Definitions
  const baseNodes = [
    { id: 'query', label: 'User Query', xRel: 0.12, yRel: 0.35, color: '#94a3b8', type: 'input' },
    { id: 'router', label: 'Router Agent', xRel: 0.32, yRel: 0.35, color: '#38bdf8', type: 'agent' },
    { id: 'rag', label: 'RAG Retriever', xRel: 0.55, yRel: 0.20, color: '#818cf8', type: 'service' },
    { id: 'qdrant', label: 'Qdrant Vector DB', xRel: 0.78, yRel: 0.20, color: '#a855f7', type: 'db' },
    { id: 'sqlagent', label: 'SQL Agent', xRel: 0.55, yRel: 0.52, color: '#34d399', type: 'agent' },
    { id: 'postgres', label: 'PostgreSQL DB', xRel: 0.78, yRel: 0.52, color: '#3b82f6', type: 'db' },
    { id: 'val', label: 'Validation Layer', xRel: 0.70, yRel: 0.75, color: '#10b981', type: 'guard' },
    { id: 'synthesis', label: 'Response Synthesis', xRel: 0.90, yRel: 0.65, color: '#38bdf8', type: 'output' }
  ];

  // Edges connecting nodes
  const edges = [
    { from: 'query', to: 'router' },
    { from: 'router', to: 'rag' },
    { from: 'rag', to: 'qdrant' },
    { from: 'qdrant', to: 'rag' },
    { from: 'router', to: 'sqlagent' },
    { from: 'sqlagent', to: 'postgres' },
    { from: 'postgres', to: 'val' },
    { from: 'rag', to: 'synthesis' },
    { from: 'val', to: 'synthesis' }
  ];

  // Moving token packets
  let packets = [];
  const MAX_PACKETS = 8;

  function resizeCanvas() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function spawnPacket() {
    if (packets.length >= MAX_PACKETS) return;
    const edge = edges[Math.floor(Math.random() * edges.length)];
    packets.push({
      edge: edge,
      progress: 0,
      speed: 0.005 + Math.random() * 0.005,
      size: 2.5 + Math.random() * 1.5,
      color: edge.from === 'router' || edge.to === 'sqlagent' ? '#38bdf8' : '#818cf8'
    });
  }

  function getNodePos(nodeId) {
    const node = baseNodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: node.xRel * width,
      y: node.yRel * height
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Edges
    ctx.lineWidth = 1;
    edges.forEach(edge => {
      const p1 = getNodePos(edge.from);
      const p2 = getNodePos(edge.to);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // 2. Draw & Update Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        packets.splice(i, 1);
        continue;
      }

      const p1 = getNodePos(p.edge.from);
      const p2 = getNodePos(p.edge.to);
      const curX = p1.x + (p2.x - p1.x) * p.progress;
      const curY = p1.y + (p2.y - p1.y) * p.progress;

      // Glow around packet
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // 3. Draw Nodes
    baseNodes.forEach(node => {
      const pos = getNodePos(node.id);

      // Node outer subtle ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 7, 0, Math.PI * 2);
      ctx.stroke();

      // Node inner core
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Node label
      if (width > 600) {
        ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, pos.x, pos.y + 18);
      }
    });

    if (Math.random() < 0.04) {
      spawnPacket();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Init
  resizeCanvas();
  for (let i = 0; i < 4; i++) {
    spawnPacket();
  }
  draw();
})();
