import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeButton, makeTopBar, makeHintButton, showCompleteBanner, drawPanel } from './UIHelper.js';

const WORD_PAIRS = [
  { word: 'Serene',    meaning: 'Calm & peaceful' },
  { word: 'Porch',     meaning: 'Covered entrance' },
  { word: 'Dusk',      meaning: 'Evening twilight' },
  { word: 'Bloom',     meaning: 'Flower opening' },
  { word: 'Gentle',    meaning: 'Kind & soft' },
  { word: 'Rocking',   meaning: 'Back-and-forth' },
  { word: 'Lemonade',  meaning: 'Cool sweet drink' },
  { word: 'Meadow',    meaning: 'Open grassy field' },
];

export class WordMatchScene extends Phaser.Scene {
  constructor() { super('WordMatch'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    this._selected = null;
    this._matched  = [];
    this._hintUsed = false;

    // Background
    this.add.image(width/2, height/2, 'porch-bg').setDisplaySize(width, height).setAlpha(0.28);
    const ov = this.add.graphics();
    ov.fillStyle(AM.highContrast ? 0x000000 : 0x1a0d00, AM.highContrast ? 1 : 0.75);
    ov.fillRect(0, 0, width, height);

    makeTopBar(this, '🔤 Word Match', () => this.scene.start('Home'));

    // Instructions
    this.add.text(width/2, 104, 'Tap a word, then tap its meaning to match!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(16) + 'px',
      color: c.accent,
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5);

    // Pick 4 random pairs
    const shuffled = Phaser.Utils.Array.Shuffle([...WORD_PAIRS]);
    this._pairs = shuffled.slice(0, 4);
    this._buildCards(width, height, c);

    // Hint button
    makeHintButton(this, width/2, height * 0.9, () => this._doHint());

    AM.speak('Word Match. Tap a word on the left, then tap its meaning on the right to make a pair.');
  }

  _buildCards(width, height, c) {
    const pairs = this._pairs;
    const cardW = (width - 60) / 2 - 6;
    const cardH = 68;
    const startY = height * 0.21;
    const gap = cardH + 14;
    const lx = 20 + cardW / 2;
    const rx = width - 20 - cardW / 2;

    // Shuffle meanings independently
    const words    = pairs.map(p => p.word);
    const meanings = Phaser.Utils.Array.Shuffle(pairs.map(p => p.meaning));

    this._wordCards    = [];
    this._meaningCards = [];
    this._wordData     = words;
    this._meaningData  = meanings;
    this._pairMap      = {};
    pairs.forEach(p => { this._pairMap[p.word] = p.meaning; });

    words.forEach((w, i) => {
      const card = this._makeCard(lx, startY + i * gap, cardW, cardH, w, 'word', i, c);
      this._wordCards.push(card);
    });
    meanings.forEach((m, i) => {
      const card = this._makeCard(rx, startY + i * gap, cardW, cardH, m, 'meaning', i, c);
      this._meaningCards.push(card);
    });
  }

  _makeCard(x, y, w, h, text, side, idx, c) {
    const container = this.add.container(x, y);
    const bg = this.add.graphics();
    this._drawCardBg(bg, w, h, c.tileA, false, false);
    const lbl = this.add.text(0, 0, text, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(17) + 'px',
      fontStyle: 'bold',
      color: AM.highContrast ? '#000000' : '#3d2200',
      align: 'center',
      wordWrap: { width: w - 16 },
    }).setOrigin(0.5);
    container.add([bg, lbl]);
    container.setSize(w, h).setInteractive({ useHandCursor: true });
    container.setData({ text, side, idx, matched: false });

    container.on('pointerdown', () => this._onCardTap(container, bg, w, h, c));
    return container;
  }

  _drawCardBg(g, w, h, color, selected, matched) {
    g.clear();
    if (matched) {
      g.fillStyle(AM.highContrast ? 0x00aa00 : 0x5ba35b, 1);
    } else if (selected) {
      g.fillStyle(AM.highContrast ? 0x0000ff : 0xe8a020, 1);
      g.lineStyle(4, AM.highContrast ? 0xffff00 : 0xffffff, 1);
    } else {
      g.fillStyle(color, 1);
    }
    g.fillRoundedRect(-w/2, -h/2, w, h, 14);
    if (selected && !matched) {
      g.lineStyle(4, AM.highContrast ? 0xffff00 : 0xffffff, 1);
      g.strokeRoundedRect(-w/2, -h/2, w, h, 14);
    }
    if (!matched && !selected) {
      g.lineStyle(2, AM.highContrast ? 0xffffff : 0xc8860a, 0.5);
      g.strokeRoundedRect(-w/2, -h/2, w, h, 14);
    }
  }

  _onCardTap(card, bg, w, h, c) {
    if (card.getData('matched')) return;
    const side = card.getData('side');
    const text = card.getData('text');

    AM.speak(text);

    if (side === 'word') {
      // Deselect previous word
      if (this._selected && this._selected !== card) {
        const prev = this._selected;
        this._drawCardBg(prev.getAt(0), w, h, c.tileA, false, false);
      }
      this._selected = card;
      this._drawCardBg(bg, w, h, c.tileA, true, false);
    } else {
      // Meaning tapped
      if (!this._selected) {
        // Select as "pending meaning" but we need a word first
        AM.speak('Please select a word first.');
        AM.showToast('Tap a word on the left first');
        return;
      }
      const wordText = this._selected.getData('text');
      const correct  = this._pairMap[wordText] === text;

      if (correct) {
        // Match!
        this._drawCardBg(this._selected.getAt(0), w, h, c.tileMatch, false, true);
        this._drawCardBg(bg, w, h, c.tileMatch, false, true);
        this._selected.setData('matched', true);
        card.setData('matched', true);
        this._matched.push(wordText);
        AM.speak(`Correct! ${wordText} means ${text}`);
        AM.showToast('✓ Matched!');

        if (!AM.reducedMotion) {
          this.tweens.add({ targets: [this._selected, card], scaleX: 1.06, scaleY: 1.06, duration: 120, yoyo: true });
        }
        this._selected = null;

        if (this._matched.length === this._pairs.length) {
          this.time.delayedCall(600, () => this._onComplete());
        }
      } else {
        // Wrong
        AM.speak('Not quite. Try another meaning.');
        AM.showToast('Try another pairing');
        if (!AM.reducedMotion) {
          this.tweens.add({ targets: card, x: card.x + 8, duration: 60, yoyo: true, repeat: 2 });
        }
        // Keep word selected
      }
    }
  }

  _doHint() {
    if (this._matched.length >= this._pairs.length) return;
    // Find first unmatched pair and highlight
    for (const pair of this._pairs) {
      if (!this._matched.includes(pair.word)) {
        AM.speak(`Hint: "${pair.word}" matches "${pair.meaning}"`);
        AM.showToast(`Hint: ${pair.word} → ${pair.meaning}`);
        // Briefly highlight
        const wCard = this._wordCards.find(c => c.getData('text') === pair.word && !c.getData('matched'));
        const mCard = this._meaningCards.find(c => c.getData('text') === pair.meaning && !c.getData('matched'));
        if (wCard && mCard && !AM.reducedMotion) {
          this.tweens.add({ targets: [wCard, mCard], alpha: 0.4, duration: 200, yoyo: true, repeat: 2 });
        }
        break;
      }
    }
  }

  _onComplete() {
    GS.completeToday('word-match');
    showCompleteBanner(this, 'Well done!\nAll words matched! 🌸', () => this.scene.start('Home'));
  }
}
