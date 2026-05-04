import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeButton, drawPanel } from './UIHelper.js';

export class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    // Background
    const bg = this.add.image(width/2, height/2, 'porch-bg')
      .setDisplaySize(width, height);

    // Dim overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, AM.highContrast ? 0.7 : 0.35);
    overlay.fillRect(0, 0, width, height);

    // Logo
    const logo = this.add.image(width/2, height * 0.16, 'porch-logo')
      .setDisplaySize(width * 0.72, width * 0.72 * (473/682));

    // Mascot
    const mascot = this.add.image(width * 0.82, height * 0.72, 'mascot')
      .setDisplaySize(width * 0.26, width * 0.26 * (1062/520));

    // Gentle idle bob (if motion allowed)
    if (!AM.reducedMotion) {
      this.tweens.add({
        targets: mascot, y: height * 0.72 - 8,
        duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
      });
    }

    // Greeting
    const greeting = this._getGreeting();
    this.add.text(width/2, height * 0.30, greeting, {
      fontFamily: 'Lora, serif',
      fontSize: AM.fs(20) + 'px',
      fontStyle: 'italic',
      color: c.accent,
      align: 'center',
      wordWrap: { width: width * 0.78 },
    }).setOrigin(0.5);

    // Progress text
    const prog = GS.completedCount;
    const total = GS.puzzleTypes.length;
    this.add.text(width/2, height * 0.37, `Today: ${prog} of ${total} puzzles done  ⭐×${GS.totalStars}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(17) + 'px',
      fontStyle: 'bold',
      color: c.text,
    }).setOrigin(0.5);

    // Puzzle selection grid
    this._buildPuzzleGrid(width, height, c);

    // Bottom toolbar
    this._buildToolbar(width, height, c);

    // Welcome narration
    AM.speak(`Welcome to Puzzle Porch! You've completed ${prog} of ${total} puzzles today. Choose a puzzle to begin.`);

    // Handle resize
    this.scale.on('resize', () => this.scene.restart());
  }

  _getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning! The porch is ready for you.';
    if (h < 17) return 'Good afternoon! Come sit a spell.';
    return 'Good evening! A peaceful puzzle awaits.';
  }

  _buildPuzzleGrid(width, height, c) {
    const puzzles = GS.puzzleTypes;
    const btnW = Math.min((width - 60) / 2 - 8, 180);
    const btnH = 76;
    const cols = 2;
    const startY = height * 0.47;
    const gapY = btnH + 16;
    const colGap = btnW + 20;
    const startX = width/2 - colGap/2;

    puzzles.forEach((type, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const bx = startX + col * colGap;
      const by = startY + row * gapY;
      const done = GS.isCompleted(type);
      const label = GS.puzzleLabels[type];
      const emoji = GS.puzzleEmojis[type];
      const btnColor = done
        ? (AM.highContrast ? 0x005500 : 0x5ba35b)
        : (AM.highContrast ? 0xcc9900 : c.btnPrimary);
      const txtColor = AM.highContrast ? (done ? '#ffffff' : '#000000') : c.btnText;

      const { container, label: lbl } = makeButton(
        this, bx, by, btnW, btnH,
        `${emoji}\n${label}${done ? ' ✓' : ''}`,
        btnColor, txtColor, 16
      );
      lbl.setStyle({ fontSize: AM.fs(15) + 'px', align: 'center' });

      container.on('pointerdown', () => {
        AM.speak(`Opening ${label}`);
        this.scene.start(this._sceneFor(type));
      });
    });
  }

  _buildToolbar(width, height, c) {
    const toolY = height * 0.93;
    const tools = [
      { icon: AM.highContrast ? '🌑' : '🌕', label: 'Contrast', action: () => { AM.toggleHighContrast(); this.scene.restart(); } },
      { icon: AM.reducedMotion ? '🐢' : '🌀', label: 'Motion', action: () => { AM.toggleReducedMotion(); this.scene.restart(); } },
      { icon: AM.voiceEnabled ? '🔊' : '🔇', label: 'Voice', action: () => { AM.toggleVoice(); this.scene.restart(); } },
      { icon: '❓', label: 'Help', action: () => this._showHelp() },
    ];

    const gap = width / (tools.length + 1);
    tools.forEach((t, i) => {
      const tx = gap * (i + 1);
      const btn = this.add.container(tx, toolY);
      const bg = this.add.graphics();
      bg.fillStyle(c.panel, 0.85);
      bg.fillRoundedRect(-42, -42, 84, 84, 42);
      const icon = this.add.text(0, -10, t.icon, { fontSize: '28px' }).setOrigin(0.5);
      const lbl = this.add.text(0, 20, t.label, {
        fontFamily: 'Nunito', fontSize: AM.fs(13) + 'px', color: c.text
      }).setOrigin(0.5);
      btn.add([bg, icon, lbl]);
      btn.setSize(84, 84).setInteractive({ useHandCursor: true });
      btn.on('pointerdown', () => {
        if (!AM.reducedMotion) this.tweens.add({ targets: btn, scaleX: 0.9, scaleY: 0.9, duration: 80, yoyo: true });
        t.action();
      });
    });
  }

  _showHelp() {
    const { width, height } = this.scale;
    const c = AM.colors;
    const pw = Math.min(width * 0.9, 380);
    const ph = 380;

    const overlay = this.add.graphics().setDepth(40);
    overlay.fillStyle(0x000000, 0.6);
    overlay.fillRect(0, 0, width, height);
    overlay.setInteractive();

    const panel = this.add.graphics().setDepth(41);
    panel.fillStyle(AM.highContrast ? 0x000000 : 0x3d2200, 1);
    panel.fillRoundedRect(width/2 - pw/2, height/2 - ph/2, pw, ph, 20);
    panel.lineStyle(3, c.border, 1);
    panel.strokeRoundedRect(width/2 - pw/2, height/2 - ph/2, pw, ph, 20);

    const helpText = `Welcome to Puzzle Porch!\n\n🔤 Word Match – pair words with their meanings\n🖼️ Picture Pairs – find matching images\n💡 Gentle Trivia – relaxed questions\n🔢 Number Tiles – arrange numbers in order\n🧩 Easy Jigsaw – gentle puzzle pieces\n\nNo timers. No penalties.\nTap 💡 Hint anytime!\nUse the toolbar to adjust\ncontrast, motion & voice.`;

    this.add.text(width/2, height/2 - 40, helpText, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(15) + 'px',
      color: c.text,
      align: 'center',
      lineSpacing: 6,
      wordWrap: { width: pw - 40 },
    }).setOrigin(0.5).setDepth(42);

    AM.speak('Help: Choose any puzzle. No timers, no penalties. Tap hint any time.');

    const { container: closeBtn } = makeButton(this, width/2, height/2 + 145, 160, 56, 'Got it ✓', c.btnPrimary, c.btnText);
    closeBtn.setDepth(42);
    closeBtn.on('pointerdown', () => {
      overlay.destroy(); panel.destroy();
      this.children.each(ch => { if (ch.depth >= 41) ch.destroy(); });
    });
  }

  _sceneFor(type) {
    return {
      'word-match':    'WordMatch',
      'picture-pairs': 'PicturePairs',
      'trivia':        'Trivia',
      'number-tiles':  'NumberTiles',
      'jigsaw':        'Jigsaw',
    }[type] ?? 'Home';
  }
}
