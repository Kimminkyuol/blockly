'use strict';

// Config
const CONFIG = {
  pluginName: 'MyPlugin',
  groupId: 'com.example',
  mode: 'event',
};

let workspace = null;
let currentMode = 'event';
let isResizing = false;
let resizeStartX = 0;
let resizePanelWidth = 0;

// Dark theme definition
function buildDarkTheme() {
  if (!Blockly.Theme) return undefined;
  try {
    return Blockly.Theme.defineTheme('plocky_dark', {
      base: Blockly.Themes && Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: '#0a0a12',
        toolboxBackgroundColour: '#0f0f1a',
        toolboxForegroundColour: '#b8b8d8',
        flyoutBackgroundColour: '#14141e',
        flyoutForegroundColour: '#c0c0e0',
        flyoutOpacity: 1,
        scrollbarColour: '#3a3a5c',
        insertionMarkerColour: '#6366f1',
        markerColour: '#6366f1',
        cursorColour: '#6366f1',
      },
      fontStyle: {
        family: "'JetBrains Mono', monospace",
        size: 11,
      },
    });
  } catch (e) {
    return undefined;
  }
}

function initWorkspace() {
  const toolboxEl = document.getElementById('toolbox-event');

  workspace = Blockly.inject('blockly-div', {
    toolbox: toolboxEl,
    theme: buildDarkTheme(),
    grid: { spacing: 24, length: 2, colour: '#1e1e38', snap: true },
    move: { scrollbars: true, drag: true, wheel: true },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.9,
      maxScale: 4,
      minScale: 0.2,
      scaleSpeed: 1.1,
    },
    trashcan: true,
  });

  workspace.addChangeListener(Blockly.Events.disableOrphans);
  workspace.addChangeListener(onWorkspaceChange);
}

function onWorkspaceChange() {
  const blocks = workspace.getAllBlocks(false);
  document.getElementById('status-blocks').textContent = blocks.length + ' block' + (blocks.length !== 1 ? 's' : '');
  generateCode();
}

function generateCode() {
  const codeContent = document.getElementById('code-content');
  const codePlaceholder = document.getElementById('code-placeholder');
  const blocks = workspace.getTopBlocks(true);

  if (blocks.length === 0) {
    codeContent.textContent = '';
    codePlaceholder.style.display = 'flex';
    return;
  }

  try {
    let code = Blockly.Java.workspaceToCode(
      workspace,
      currentMode,
      CONFIG.groupId + '.' + currentMode,
      CONFIG.pluginName + (currentMode === 'event' ? 'Event' : 'Command')
    );
    code = code
      .replace(/MainPluginName/g, CONFIG.pluginName)
      .replace(/MainPluginPath/g, CONFIG.groupId);

    codePlaceholder.style.display = 'none';
    codeContent.innerHTML = hljs.highlight(code, { language: 'java' }).value;
  } catch (e) {
    codePlaceholder.style.display = 'none';
    codeContent.textContent = '// Error generating code:\n// ' + e.message;
  }
}

function switchMode(mode) {
  currentMode = mode;
  const tabs = document.querySelectorAll('.mode-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  const toolboxEl = document.getElementById('toolbox-' + mode);
  workspace.updateToolbox(toolboxEl);
  workspace.clear();

  const modeLabel = mode === 'event' ? 'Event Listener' : 'Command Handler';
  document.getElementById('status-mode').textContent = modeLabel;
  document.getElementById('code-filename').textContent =
    CONFIG.pluginName + (mode === 'event' ? 'Event' : 'Command') + '.java';

  generateCode();
}

function clearWorkspace() {
  if (workspace.getAllBlocks().length === 0) return;
  if (confirm('Clear all blocks?')) {
    workspace.clear();
  }
}

function copyCode() {
  const code = document.getElementById('code-content').textContent;
  if (!code.trim()) return;

  navigator.clipboard.writeText(code).then(() => {
    const feedback = document.getElementById('copy-feedback');
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 2000);
  }).catch(() => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
}

// Resize handle
function setupResize() {
  const handle = document.getElementById('resize-handle');
  const panel = document.getElementById('code-panel');
  const main = document.getElementById('main');

  handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    resizeStartX = e.clientX;
    resizePanelWidth = panel.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const delta = resizeStartX - e.clientX;
    const newWidth = Math.max(200, Math.min(resizePanelWidth + delta, main.offsetWidth * 0.6));
    panel.style.width = newWidth + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      Blockly.svgResize(workspace);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initWorkspace();
  setupResize();
  document.getElementById('code-filename').textContent = CONFIG.pluginName + 'Event.java';
  generateCode();
});

window.addEventListener('resize', () => {
  if (workspace) Blockly.svgResize(workspace);
});

// Expose for HTML onclick handlers
window.switchMode = switchMode;
window.clearWorkspace = clearWorkspace;
window.copyCode = copyCode;
