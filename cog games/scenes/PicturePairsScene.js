import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeTopBar, makeHintButton, showCompleteBanner } from './UIHelper.js';

// Emoji-based picture pairs (drawn on canvas textures)
const PAIR_ITEMS = [
  { id: 'flower', emoji: '🌸', label: 'Flower' },
  { id: 'sun',    emoji: '☀️', label: 'Sun' },
  { id: 'bird',   emoji: '🐦', label: 'Bird' },
  { id: 'leaf',   emoji: '🍃', label: 'Leaf' },
  { id: 'cup',    emoji: '☕', label: 'Cup' },
  { id: 'cat',    emoji: '🐱', label: 'Cat' },
];

export class PicturePairsScene extends Phaser.Scene {
  constructor() { super('PicturePairs'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    this._flipped  = [];
    this._matched  = [];
    this._canFlip  = true;
    this._cards    = [];

    // BG
    this.add.image(width/2, height/2, 'porch-bg').setDisplaySize(width, height).setAlpha(0.28);
    const ov = this.add.graphics();
    ov.fillStyle(AM.highContrast ? 0x000000 : 0x1a0d00, AM.highContrast ? 1 : 0.75);
    ov.fillRect(0, 0, width, height);

    makeTopBar(this, '🖼️ Picture Pairs', () => this.scene.start('Home'));

    this.add.text(width/2, 104, 'Tap cards to flip and find matching pairs!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(16) + 'px',
      color: c.accent,
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5);

    this._buildGrid(width, height, c);
    makeHintButton(this, width/2, height * 0.9, () => this._doHint());

    AM.speak('Picture Pairs. Tap a card to flip it over. Find two cards that look the same to make a match!');
  }

  _buildGrid(width, height, c) {
    // Pick 4 pairs (8 cards) → 4×2 grid
    const selected = Phaser.Utils.Array.Shuffle([...PAIR_ITEMS]).slice(0, 4);
    const deck = Phaser.Utils.Array.Shuffle([...selected, ...selected]);

    const cols = 4;
    const rows = 2;
    const padding = 14;
    const cardW = (width - padding * (cols + 1)) / cols;
    const cardH = cardW * 1.1;
    const startX = padding + cardW / 2;
    const startY = height * 0.22 + cardH / 2;
    const gapX = cardW + padding;
    const gapY = cardH + padding;

    deck.forEach((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = startX + col * gapX;
      const cy = startY + row * gapY;
      const card = this._makeCard(cx, cy, cardW, cardH, item, c);
      this._cards.push(card);
    });
  }

  _makeCard(x, y, w, h, item, c) {
    const container = this.add.container(x, y);
    container.setData({ item, revealed: false, matched: false });

    // Back face
    const back = this.add.graphics();
    back.fillStyle(AM.highContrast ? 0x223366 : 0xc8860a, 1);
    back.fillRoundedRect(-w/2, -h/2, w, h, 12);
    back.lineStyle(3, AM.highContrast ? 0xffffff : 0xfff5cc, 0.6);
    back.strokeRoundedRect(-w/2, -h/2, w, h, 12);
    const backIcon = this.add.text(0, 0, '?', {
      fontFamily: 'Lora, serif',
      fontSize: AM.fs(Math.round(w * 0.45)) + 'px',
      fontStyle: 'bold',
      color: AM.highContrast ? '#ffffff' : '#fffaf0',
    }).setOrigin(0.5);

    // Front face
    const front = this.add.graphics().setVisible(false);
    front.fillStyle(AM.highContrast ? 0x111111 : 0xfffaf0, 1);
    front.fillRoundedRect(-w/2, -h/2, w, h, 12);
    front.lineStyle(3, AM.highContrast ? 0xffff00 : 0xe8b04a, 1);
    front.strokeRoundedRect(-w/2, -h/2, w, h, 12);
    const emoji = this.add.text(0, -h*0.1, item.emoji, {
      fontSize: AM.fs(Math.round(w * 0.48)) + 'px',
    }).setOrigin(0.5).setVisible(false);
    const label = this.add.text(0, h*0.32, item.label, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(13) + 'px',
      fontStyle: 'bold',
      color: AM.highContrast ? '#ffffff' : '#3d2200',
    }).setOrigin(0.5).setVisible(false);

    container.add([back, backIcon, front, emoji, label]);
    container.setSize(w, h).setInteractive({ useHandCursor: true });

    container.on('pointerdown', () => this._onCardTap(container, back, backIcon, front, emoji, label, w, h, c));
    return { container, back, backIcon, front, emoji, label, w, h };
  }

  _onCardTap(container, back, backIcon, front, emoji, label, w, h, c) {
    if (!this._canFlip) return;
    if (container.getData('revealed')) return;
    if (container.getData('matched')) return;

    this._reveal(container, back, backIcon, front, emoji, label);

    const item = container.getData('item');
    AM.speak(item.label);
    // Store all needed refs so we can act on them later
    this._flipped.push({ container, item, front, back, backIcon, emoji, label, w, h });

    if (this._flipped.length === 2) {
      this._canFlip = false;
      const [a, b] = this._flipped;

      if (a.item.id === b.item.id) {
        // Match!
        this.time.delayedCall(AM.reducedMotion ? 0 : 400, () => {
          [a, b].forEach((card) => {
            card.container.setData('matched', true);
            card.front.clear();
            card.front.fillStyle(AM.highContrast ? 0x005500 : 0x5ba35b, 1);
            card.front.fillRoundedRect(-card.w/2, -card.h/2, card.w, card.h, 12);
          });
          this._matched.push(a.item.id);
          AM.speak(`Match! ${a.item.label}!`);
          AM.showToast('✓ Match found!');
          this._flipped = [];
          this._canFlip = true;
          if (this._matched.length * 2 === this._cards.length) {
            this.time.delayedCall(600, () => this._onComplete());
          }
        });
      } else {
        // Flip back
        this.time.delayedCall(AM.reducedMotion ? 0 : 900, () => {
          [a, b].forEach((card) => {
            card.container.setData('revealed', false);
            card.back.setVisible(true);
            card.backIcon.setVisible(true);
            card.front.setVisible(false);
            card.emoji.setVisible(false);
            card.label.setVisible(false);
          });
          AM.speak('Not a match. Try again.');
          this._flipped = [];
          this._canFlip = true;
        });
      }
    }
  }

  _reveal(container, back, backIcon, front, emoji, label) {
    container.setData('revealed', true);
    back.setVisible(false);
    backIcon.setVisible(false);
    front.setVisible(true);
    emoji.setVisible(true);
    label.setVisible(true);
  }

  _doHint() {
    const unmatched = this._cards.filter(({ container: c }) => !c.getData('matched') && !c.getData('revealed'));
    if (unmatched.length < 2) { AM.speak('No more hints needed!'); return; }
    // Find two with same ID
    for (let i = 0; i < unmatched.length; i++) {
      for (let j = i+1; j < unmatched.length; j++) {
        if (unmatched[i].container.getData('item').id === unmatched[j].container.getData('item').id) {
          const item = unmatched[i].container.getData('item');
          AM.speak(`Hint: look for two ${item.label} cards.`);
          AM.showToast(`Find the two: ${item.emoji} ${item.label}`);
          if (!AM.reducedMotion) {
            [unmatched[i].container, unmatched[j].container].forEach(c =>
              this.tweens.add({ targets: c, alpha: 0.5, duration: 200, yoyo: true, repeat: 2 })
            );
          }
          return;
        }
      }
    }
  }

  _onComplete() {
    GS.completeToday('picture-pairs');
    showCompleteBanner(this, 'Beautiful!\nAll pairs found! 🌻', () => this.scene.start('Home'));
  }
}
