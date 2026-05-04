import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState } from '../GameState.js';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    // Background fill while loading
    const { width, height } = this.scale;
    const bg = this.add.graphics();
    bg.fillStyle(0x2a1a0a, 1);
    bg.fillRect(0, 0, width, height);

    // Loading text
    this.loadText = this.add.text(width/2, height/2 - 20, 'Setting up the porch…', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#f5c842',
    }).setOrigin(0.5);

    this.loadBar = this.add.graphics();

    this.load.on('progress', (v) => {
      this.loadBar.clear();
      this.loadBar.fillStyle(0xc8860a, 1);
      this.loadBar.fillRoundedRect(width/2 - 150, height/2 + 20, 300 * v, 20, 10);
      this.loadBar.lineStyle(2, 0xf5c842, 0.5);
      this.loadBar.strokeRoundedRect(width/2 - 150, height/2 + 20, 300, 20, 10);
    });

    // Load all assets
    this.load.image('porch-bg',      'assets/porch-background.webp');
    this.load.image('porch-logo',    'assets/porch-logo.webp');
    this.load.image('tile-wood',     'assets/tile-wood.webp');
    this.load.image('tile-back',     'assets/tile-back.webp');
    this.load.image('hint-btn',      'assets/hint-button.webp');
    this.load.image('narrate-btn',   'assets/narration-button.webp');
    this.load.image('check-icon',    'assets/check-icon.webp');
    this.load.image('mascot',        'assets/porch-mascot.webp');
  }

  create() {
    AM.init();
    GameState.init();
    this.scene.start('Home');
  }
}
