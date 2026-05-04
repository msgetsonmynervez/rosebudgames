import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeTopBar, makeHintButton, showCompleteBanner } from './UIHelper.js';

export class NumberTilesScene extends Phaser.Scene {
  constructor() { super('NumberTiles'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    this._tiles       = [];
    this._selected    = null;
    this._moves       = 0;
    this._size        = 3; // 3×3 grid (8 tiles + blank)
    this._correctCount = 0;

    this.add.image(width/2, height/2, 'porch-bg').setDisplaySize(width, height).setAlpha(0.28);
    const ov = this.add.graphics();
    ov.fillStyle(AM.highContrast ? 0x000000 : 0x1a0d00, AM.highContrast ? 1 : 0.75);
    ov.fillRect(0, 0, width, height);

    makeTopBar(this, '🔢 Number Tiles', () => this.scene.start('Home'));

    this.add.text(width/2, 104, 'Arrange numbers 1–8 in order. Tap a tile next to the blank space to move it.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(15) + 'px',
      color: c.accent,
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5);

    this._buildGrid(width, height, c);
    makeHintButton(this, width/2, height * 0.9, () => this._doHint());

    AM.speak('Number Tiles. Arrange tiles 1 through 8 in order from top-left to bottom-right. Tap any tile next to the empty space to slide it.');
  }

  _buildGrid(width, height, c) {
    const size = this._size;
    const gridW = Math.min(width * 0.82, 340);
    const tileSize = Math.floor(gridW / size);
    const gridLeft = (width - gridW) / 2;
    const gridTop  = height * 0.22;

    // Generate solved order then shuffle (with solvability check)
    // 0 = blank
    let arr = [];
    for (let i = 1; i <= size*size - 1; i++) arr.push(i);
    arr.push(0);
    arr = this._shuffleSolvable(arr, size);

    this._grid      = arr; // flat array, row-major
    this._gridLeft  = gridLeft;
    this._gridTop   = gridTop;
    this._tileSize  = tileSize;
    this._gridW     = gridW;

    // Draw background grid
    const gridBg = this.add.graphics();
    gridBg.fillStyle(AM.highContrast ? 0x111111 : 0x3d2200, 0.8);
    gridBg.fillRoundedRect(gridLeft - 8, gridTop - 8, gridW + 16, gridW + 16, 14);

    this._tileObjects = [];
    arr.forEach((val, i) => {
      if (val === 0) { this._tileObjects.push(null); return; }
      const row = Math.floor(i / size);
      const col = i % size;
      const tx = gridLeft + col * tileSize + tileSize/2;
      const ty = gridTop  + row * tileSize + tileSize/2;
      const tileObj = this._createTile(tx, ty, tileSize - 6, val, i, c);
      this._tileObjects.push(tileObj);
    });

    // Move count display
    this._moveTxt = this.add.text(width/2, gridTop + gridW + 22, 'Moves: 0', {
      fontFamily: 'Nunito', fontSize: AM.fs(16) + 'px', color: c.text
    }).setOrigin(0.5);
  }

  _createTile(tx, ty, tileSize, val, gridIdx, c) {
    const isCorrect = (val === gridIdx + 1) || (val === 9 && gridIdx === 8);
    const container = this.add.container(tx, ty);
    const bg = this.add.graphics();
    this._drawTileBg(bg, tileSize, isCorrect, false, c);
    const lbl = this.add.text(0, 0, String(val), {
      fontFamily: 'Lora, serif',
      fontSize: AM.fs(Math.round(tileSize * 0.42)) + 'px',
      fontStyle: 'bold',
      color: AM.highContrast ? '#000000' : '#3d2200',
    }).setOrigin(0.5);
    container.add([bg, lbl]);
    container.setSize(tileSize, tileSize).setInteractive({ useHandCursor: true });
    container.setData({ val, gridIdx });
    container.on('pointerdown', () => this._onTileTap(container, c));
    return container;
  }

  _drawTileBg(g, size, correct, selected, c) {
    g.clear();
    const color = correct
      ? (AM.highContrast ? 0x005500 : 0x7cb87c)
      : selected
        ? (AM.highContrast ? 0x0044cc : 0xe8a020)
        : (AM.highContrast ? 0xaa7700 : 0xe8b04a);
    g.fillStyle(color, 1);
    g.fillRoundedRect(-size/2, -size/2, size, size, 10);
    g.lineStyle(2, AM.highContrast ? 0xffffff : 0xc8860a, 0.6);
    g.strokeRoundedRect(-size/2, -size/2, size, size, 10);
  }

  _onTileTap(tileObj, c) {
    const idx = tileObj.getData('gridIdx');
    const blankIdx = this._grid.indexOf(0);
    const size = this._size;

    // Check adjacency
    const ri = Math.floor(idx / size), ci = idx % size;
    const rb = Math.floor(blankIdx / size), cb = blankIdx % size;
    const adjacent = (Math.abs(ri - rb) + Math.abs(ci - cb)) === 1;

    if (!adjacent) {
      AM.speak('Tap a tile next to the empty space');
      if (!AM.reducedMotion) this.tweens.add({ targets: tileObj, x: tileObj.x + 6, duration: 50, yoyo: true, repeat: 1 });
      return;
    }

    AM.speak(String(tileObj.getData('val')));

    // Swap in grid
    this._grid[blankIdx] = this._grid[idx];
    this._grid[idx] = 0;

    // Move tile visually
    const newRow = Math.floor(blankIdx / size);
    const newCol = blankIdx % size;
    const newX = this._gridLeft + newCol * this._tileSize + this._tileSize/2;
    const newY = this._gridTop  + newRow * this._tileSize + this._tileSize/2;

    if (AM.reducedMotion) {
      tileObj.setPosition(newX, newY);
    } else {
      this.tweens.add({ targets: tileObj, x: newX, y: newY, duration: 150, ease: 'Power2' });
    }

    tileObj.setData('gridIdx', blankIdx);
    this._tileObjects[blankIdx] = tileObj;
    this._tileObjects[idx] = null;

    this._moves++;
    this._moveTxt.setText(`Moves: ${this._moves}`);

    // Refresh correct-state color on all tiles
    this._tileObjects.forEach((t, i) => {
      if (!t) return;
      const val = t.getData('val');
      const correct = (val === i + 1);
      this._drawTileBg(t.getAt(0), this._tileSize - 6, correct, false, c);
    });

    // Check solved
    if (this._isSolved()) {
      this.time.delayedCall(400, () => {
        GS.completeToday('number-tiles');
        showCompleteBanner(this, `Puzzle solved!\nIn ${this._moves} moves 🌟`, () => this.scene.start('Home'));
      });
    }
  }

  _isSolved() {
    for (let i = 0; i < this._size * this._size - 1; i++) {
      if (this._grid[i] !== i + 1) return false;
    }
    return this._grid[this._size * this._size - 1] === 0;
  }

  _shuffleSolvable(arr, size) {
    let a = [...arr];
    // Perform 80 random valid moves to shuffle (always solvable)
    let blankIdx = a.indexOf(0);
    for (let m = 0; m < 80; m++) {
      const neighbors = this._getNeighbors(blankIdx, size);
      const swap = neighbors[Math.floor(Math.random() * neighbors.length)];
      a[blankIdx] = a[swap];
      a[swap] = 0;
      blankIdx = swap;
    }
    return a;
  }

  _getNeighbors(idx, size) {
    const r = Math.floor(idx / size), col = idx % size;
    const result = [];
    if (r > 0)        result.push(idx - size);
    if (r < size - 1) result.push(idx + size);
    if (col > 0)      result.push(idx - 1);
    if (col < size-1) result.push(idx + 1);
    return result;
  }

  _doHint() {
    // Find a tile that is NOT in its correct position and suggest moving it
    for (let i = 0; i < this._grid.length - 1; i++) {
      const val = this._grid[i];
      if (val === 0) continue;
      if (val !== i + 1) {
        AM.speak(`Hint: tile number ${val} should go to position ${val}.`);
        const tileObj = this._tileObjects[i];
        if (tileObj && !AM.reducedMotion) {
          this.tweens.add({ targets: tileObj, alpha: 0.4, duration: 200, yoyo: true, repeat: 2 });
        }
        AM.showToast(`Tile ${val} needs to move`);
        return;
      }
    }
    AM.speak('Almost done! Keep going!');
  }
}
