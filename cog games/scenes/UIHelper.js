// Puzzle Porch – Shared UI Helper for Phaser Scenes
import { AccessibilityManager as AM } from '../accessibility.js';

/**
 * Draw a rounded rectangle panel
 */
export function drawPanel(scene, x, y, w, h, color, alpha = 1, radius = 20) {
  const g = scene.add.graphics();
  g.fillStyle(color, alpha);
  g.fillRoundedRect(x - w/2, y - h/2, w, h, radius);
  return g;
}

/**
 * Draw a large accessible button with label
 * Returns { bg, label, container }
 */
export function makeButton(scene, x, y, w, h, text, colorHex, textColor = '#ffffff', radius = 18) {
  const container = scene.add.container(x, y);
  const bg = scene.add.graphics();
  bg.fillStyle(colorHex, 1);
  bg.fillRoundedRect(-w/2, -h/2, w, h, radius);
  bg.lineStyle(3, 0x000000, 0.15);
  bg.strokeRoundedRect(-w/2, -h/2, w, h, radius);

  const label = scene.add.text(0, 0, text, {
    fontFamily: 'Nunito, sans-serif',
    fontSize: AM.fs(22) + 'px',
    fontStyle: 'bold',
    color: textColor,
    align: 'center',
    wordWrap: { width: w - 20 },
  }).setOrigin(0.5);

  container.add([bg, label]);

  // Touch-friendly hit area
  container.setSize(w, h);
  container.setInteractive({ useHandCursor: true });

  // Visual feedback
  container.on('pointerover', () => {
    bg.clear();
    bg.fillStyle(colorHex, 0.85);
    bg.fillRoundedRect(-w/2, -h/2, w, h, radius);
  });
  container.on('pointerout', () => {
    bg.clear();
    bg.fillStyle(colorHex, 1);
    bg.fillRoundedRect(-w/2, -h/2, w, h, radius);
    bg.lineStyle(3, 0x000000, 0.15);
    bg.strokeRoundedRect(-w/2, -h/2, w, h, radius);
    if (!AM.reducedMotion) scene.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 100 });
    else { container.setScale(1); }
  });
  container.on('pointerdown', () => {
    if (!AM.reducedMotion) {
      scene.tweens.add({ targets: container, scaleX: 0.95, scaleY: 0.95, duration: 80 });
    }
  });

  return { bg, label, container };
}

/**
 * Draw top bar with back button + title
 */
export function makeTopBar(scene, title, onBack) {
  const { width } = scene.scale;
  const c = AM.colors;

  // Panel
  const bar = scene.add.graphics();
  bar.fillStyle(c.panel, 0.95);
  bar.fillRect(0, 0, width, 80);
  bar.setDepth(10);

  // Back button
  const backBtn = scene.add.text(20, 40, '← Back', {
    fontFamily: 'Nunito, sans-serif',
    fontSize: AM.fs(20) + 'px',
    fontStyle: 'bold',
    color: c.accent,
  }).setOrigin(0, 0.5).setDepth(11).setInteractive({ useHandCursor: true });

  backBtn.on('pointerdown', () => {
    AM.speak('Going back');
    if (AM.tapConfirmEnabled) {
      AM.confirm('Leave this puzzle?', (yes) => { if (yes) onBack(); });
    } else {
      onBack();
    }
  });

  // Title
  scene.add.text(width / 2, 40, title, {
    fontFamily: 'Lora, serif',
    fontSize: AM.fs(24) + 'px',
    fontStyle: 'bold',
    color: c.text,
  }).setOrigin(0.5).setDepth(11);

  return { bar, backBtn };
}

/**
 * Hint button (lantern icon + text)
 */
export function makeHintButton(scene, x, y, onHint) {
  const c = AM.colors;
  const container = scene.add.container(x, y).setDepth(12);

  const bg = scene.add.graphics();
  bg.fillStyle(c.btnPrimary, 1);
  bg.fillRoundedRect(-70, -30, 140, 60, 30);
  container.add(bg);

  const label = scene.add.text(0, 0, '💡 Hint', {
    fontFamily: 'Nunito, sans-serif',
    fontSize: AM.fs(20) + 'px',
    fontStyle: 'bold',
    color: c.btnText,
  }).setOrigin(0.5);
  container.add(label);

  container.setSize(140, 60).setInteractive({ useHandCursor: true });
  container.on('pointerdown', () => {
    AM.speak('Hint requested');
    if (!AM.reducedMotion) scene.tweens.add({ targets: container, scaleX: 0.93, scaleY: 0.93, duration: 80, yoyo: true });
    onHint();
  });

  return container;
}

/**
 * Draw a star row (progress indicator)
 */
export function drawStars(scene, x, y, total, filled) {
  const gap = 44;
  const startX = x - ((total - 1) * gap) / 2;
  for (let i = 0; i < total; i++) {
    scene.add.text(startX + i * gap, y, i < filled ? '⭐' : '☆', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(28) + 'px',
      color: i < filled ? '#f5c842' : '#888',
    }).setOrigin(0.5);
  }
}

/**
 * Show a celebratory completion banner
 */
export function showCompleteBanner(scene, message, onContinue) {
  const { width, height } = scene.scale;
  const c = AM.colors;

  const overlay = scene.add.graphics().setDepth(50);
  overlay.fillStyle(0x000000, 0.55);
  overlay.fillRect(0, 0, width, height);

  const panel = scene.add.graphics().setDepth(51);
  const pw = Math.min(width * 0.88, 400);
  const ph = 280;
  panel.fillStyle(AM.highContrast ? 0x000000 : 0x3d2200, 0.98);
  panel.fillRoundedRect(width/2 - pw/2, height/2 - ph/2, pw, ph, 24);
  panel.lineStyle(4, c.border, 1);
  panel.strokeRoundedRect(width/2 - pw/2, height/2 - ph/2, pw, ph, 24);

  scene.add.text(width/2, height/2 - 70, '⭐', {
    fontFamily: 'Nunito', fontSize: '56px'
  }).setOrigin(0.5).setDepth(52);

  scene.add.text(width/2, height/2 - 5, message, {
    fontFamily: 'Lora, serif',
    fontSize: AM.fs(24) + 'px',
    fontStyle: 'bold',
    color: c.accent,
    align: 'center',
    wordWrap: { width: pw - 40 },
  }).setOrigin(0.5).setDepth(52);

  const btn = makeButton(scene, width/2, height/2 + 80, 200, 60, 'Continue →',
    c.btnPrimary, c.btnText);
  btn.container.setDepth(52);
  btn.container.on('pointerdown', () => {
    AM.speak('Continue');
    onContinue();
  });

  AM.speak(message + '. Press Continue to go back to the porch.');

  if (!AM.reducedMotion) {
    scene.tweens.add({ targets: [panel, overlay], alpha: { from: 0, to: 1 }, duration: 300 });
  }
}
