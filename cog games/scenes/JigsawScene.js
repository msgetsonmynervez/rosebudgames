import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeTopBar, makeHintButton, showCompleteBanner } from './UIHelper.js';

// 3×3 easy jigsaw using emoji icons on a grid
const JIGSAW_IMAGES = [
  { emoji: '🌸', label: 'Flower' },
  { emoji: '🌿', label: 'Leaf' },
  { emoji: '☀️', label: 'Sun' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🐝', label: 'Bee' },
  { emoji: '🌻', label: 'Sunflower' },
  { emoji: '🍃', label: 'Leaves' },
  { emoji: '🐦', label: 'Bird' },
  { emoji: '🌼', label: 'Daisy' },
];

export class JigsawScene extends Phaser.Scene {
  constructor() { super('Jigsaw'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    this._selected   = null;
    this._placed     = new Array(9).fill(false);
    this._pieces     = [];

    // BG
    this.add.image(width/2, height/2, 'porch-bg').setDisplaySize(width, height).setAlpha(0.28);
    const ov = this.add.graphics();
    ov.fillStyle(AM.highContrast ? 0x000000 : 0x1a0d00, AM.highContrast ? 1 : 0.75);
    ov.fillRect(0, 0, width, height);

    makeTopBar(this, '🧩 Easy Jigsaw', () => this.scene.start('Home'));

    this.add.text(width/2, 104, 'Tap a piece, then tap its matching outline to place it!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(15) + 'px',
      color: c.accent,
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5);

    this._buildPuzzle(width, height, c);
    makeHintButton(this, width/2, height * 0.91, () => this._doHint());

    AM.speak('Easy Jigsaw. Tap a piece from the tray below, then tap its correct spot on the board above to place it.');
  }

  _buildPuzzle(width, height, c) {
    const cols = 3;
    const boardW = Math.min(width * 0.82, 300);
    const cellSize = Math.floor(boardW / cols);
    const boardLeft = (width - boardW) / 2;
    const boardTop  = height * 0.18;

    this._cellSize  = cellSize;
    this._boardLeft = boardLeft;
    this._boardTop  = boardTop;
    this._cols      = cols;

    // Draw board grid (target slots)
    const boardBg = this.add.graphics();
    boardBg.fillStyle(AM.highContrast ? 0x111111 : 0x3d2200, 0.85);
    boardBg.fillRoundedRect(boardLeft - 6, boardTop - 6, boardW + 12, boardW + 12, 14);

    this._slots = [];
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const sx = boardLeft + col * cellSize + cellSize / 2;
      const sy = boardTop  + row * cellSize + cellSize / 2;

      // Slot outline
      const slotGfx = this.add.graphics();
      slotGfx.lineStyle(3, AM.highContrast ? 0x888888 : 0xc8860a, 0.5);
      slotGfx.strokeRoundedRect(sx - cellSize/2 + 3, sy - cellSize/2 + 3, cellSize - 6, cellSize - 6, 8);

      // Ghost label (what goes here)
      const ghost = this.add.text(sx, sy, JIGSAW_IMAGES[i].emoji, {
        fontSize: AM.fs(Math.round(cellSize * 0.38)) + 'px',
        alpha: 0.18,
      }).setOrigin(0.5);

      this._slots.push({ x: sx, y: sy, gfx: slotGfx, ghost, idx: i, filled: false });

      // Slot is interactive
      const slotZone = this.add.zone(sx, sy, cellSize - 4, cellSize - 4).setInteractive();
      slotZone.setData('slotIdx', i);
      slotZone.on('pointerdown', () => this._onSlotTap(i, c));
    }

    // Build piece tray (shuffled)
    const indices = Phaser.Utils.Array.Shuffle([0,1,2,3,4,5,6,7,8]);
    this._pieceOrder = indices;

    const trayY = boardTop + boardW + 30;
    const trayPieceSize = Math.min(Math.floor((width - 30) / 5), cellSize - 4);
    const visibleCount = 5;
    this._trayY        = trayY;
    this._trayPieceSize = trayPieceSize;
    this._trayStartX   = width / 2 - ((visibleCount - 1) * (trayPieceSize + 8)) / 2;
    this._trayGap      = trayPieceSize + 8;
    this._trayOffset   = 0; // which index we start showing from

    this._drawTray(c, width);
  }

  _drawTray(c, width) {
    // Clear old tray objects
    if (this._trayObjects) this._trayObjects.forEach(o => o.destroy());
    this._trayObjects = [];

    const remaining = this._pieceOrder.filter(i => !this._placed[i]);
    if (remaining.length === 0) return;

    const show = remaining.slice(0, 5);
    const size = this._trayPieceSize;
    const startX = width / 2 - ((Math.min(show.length, 5) - 1) * (size + 8)) / 2;

    show.forEach((pieceIdx, j) => {
      const px = startX + j * (size + 8);
      const py = this._trayY + size / 2;

      const cont = this.add.container(px, py);
      const bg = this.add.graphics();
      const isSelected = this._selected === pieceIdx;
      bg.fillStyle(
        isSelected
          ? (AM.highContrast ? 0x0000cc : 0xe8a020)
          : (AM.highContrast ? 0x444400 : 0xe8b04a),
        1
      );
      bg.fillRoundedRect(-size/2, -size/2, size, size, 10);
      bg.lineStyle(isSelected ? 4 : 2, AM.highContrast ? 0xffffff : 0xc8860a, isSelected ? 1 : 0.5);
      bg.strokeRoundedRect(-size/2, -size/2, size, size, 10);

      const emojiTxt = this.add.text(0, -size * 0.05, JIGSAW_IMAGES[pieceIdx].emoji, {
        fontSize: AM.fs(Math.round(size * 0.42)) + 'px',
      }).setOrigin(0.5);
      const labelTxt = this.add.text(0, size * 0.34, JIGSAW_IMAGES[pieceIdx].label, {
        fontFamily: 'Nunito', fontSize: AM.fs(10) + 'px',
        color: AM.highContrast ? '#ffffff' : '#3d2200',
      }).setOrigin(0.5);

      cont.add([bg, emojiTxt, labelTxt]);
      cont.setSize(size, size).setInteractive({ useHandCursor: true });
      cont.setData('pieceIdx', pieceIdx);
      cont.on('pointerdown', () => this._onPieceTap(pieceIdx, c, width));

      this._trayObjects.push(cont);
    });

    // Row label
    const remaining2 = this._pieceOrder.filter(i => !this._placed[i]).length;
    const rowLbl = this.add.text(width/2, this._trayY + size + 20, `${remaining2} piece${remaining2!==1?'s':''} remaining`, {
      fontFamily: 'Nunito', fontSize: AM.fs(14) + 'px', color: c.accent
    }).setOrigin(0.5);
    this._trayObjects.push(rowLbl);
  }

  _onPieceTap(pieceIdx, c, width) {
    if (this._placed[pieceIdx]) return;
    this._selected = pieceIdx;
    AM.speak(`Selected: ${JIGSAW_IMAGES[pieceIdx].label}`);
    AM.showToast(`Selected: ${JIGSAW_IMAGES[pieceIdx].label} – now tap its spot`);
    this._drawTray(c, width);
  }

  _onSlotTap(slotIdx, c) {
    const { width } = this.scale;
    if (this._slots[slotIdx].filled) {
      AM.speak('This spot is already filled.');
      return;
    }
    if (this._selected === null) {
      AM.speak('Pick a piece from the tray first.');
      AM.showToast('Tap a piece below first');
      return;
    }

    const pieceIdx = this._selected;
    const correct  = pieceIdx === slotIdx;

    if (correct) {
      // Place piece
      const slot = this._slots[slotIdx];
      slot.filled = true;
      slot.ghost.setAlpha(0);

      // Draw placed piece in slot
      const placed = this.add.container(slot.x, slot.y);
      const bg = this.add.graphics();
      bg.fillStyle(AM.highContrast ? 0x005500 : 0x5ba35b, 1);
      bg.fillRoundedRect(-this._cellSize/2 + 3, -this._cellSize/2 + 3, this._cellSize - 6, this._cellSize - 6, 8);
      const em = this.add.text(0, -this._cellSize * 0.05, JIGSAW_IMAGES[pieceIdx].emoji, {
        fontSize: AM.fs(Math.round(this._cellSize * 0.42)) + 'px',
      }).setOrigin(0.5);
      const lbl = this.add.text(0, this._cellSize * 0.32, JIGSAW_IMAGES[pieceIdx].label, {
        fontFamily: 'Nunito', fontSize: AM.fs(10) + 'px',
        color: '#ffffff',
      }).setOrigin(0.5);
      placed.add([bg, em, lbl]);

      if (!AM.reducedMotion) {
        placed.setScale(0.7);
        this.tweens.add({ targets: placed, scaleX: 1, scaleY: 1, duration: 200, ease: 'Back.easeOut' });
      }

      this._placed[pieceIdx] = true;
      this._selected = null;
      AM.speak(`Placed! ${JIGSAW_IMAGES[pieceIdx].label}`);
      AM.showToast('✓ Placed!');

      this._drawTray(c, width);

      // Check complete
      if (this._placed.every(Boolean)) {
        this.time.delayedCall(600, () => {
          GS.completeToday('jigsaw');
          showCompleteBanner(this, 'Puzzle complete!\nLovely work! 🧩🌸', () => this.scene.start('Home'));
        });
      }
    } else {
      AM.speak(`That piece doesn't go there. Try another spot.`);
      AM.showToast('Not quite – try another spot');
      if (!AM.reducedMotion) {
        // Shake the slot
        const slot = this._slots[slotIdx];
        this.tweens.add({ targets: slot.ghost, x: slot.x + 6, duration: 50, yoyo: true, repeat: 2 });
      }
    }
  }

  _doHint() {
    if (this._selected === null) {
      // Pick first unplaced piece and suggest
      const first = this._pieceOrder.find(i => !this._placed[i]);
      if (first === undefined) return;
      AM.speak(`Hint: try placing the ${JIGSAW_IMAGES[first].label} piece.`);
      AM.showToast(`Try placing: ${JIGSAW_IMAGES[first].emoji} ${JIGSAW_IMAGES[first].label}`);
    } else {
      const idx = this._selected;
      AM.speak(`Hint: the ${JIGSAW_IMAGES[idx].label} goes in slot ${idx + 1}.`);
      AM.showToast(`Place it in spot ${idx + 1} on the board`);
      // Flash the correct slot
      const slot = this._slots[idx];
      if (slot && !slot.filled && !AM.reducedMotion) {
        this.tweens.add({ targets: slot.ghost, alpha: 0.7, duration: 250, yoyo: true, repeat: 3 });
      }
    }
  }
}
