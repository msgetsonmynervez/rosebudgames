import Phaser from 'phaser';
import { BootScene }        from './scenes/BootScene.js';
import { HomeScene }        from './scenes/HomeScene.js';
import { WordMatchScene }   from './scenes/WordMatchScene.js';
import { PicturePairsScene } from './scenes/PicturePairsScene.js';
import { TriviaScene }      from './scenes/TriviaScene.js';
import { NumberTilesScene } from './scenes/NumberTilesScene.js';
import { JigsawScene }      from './scenes/JigsawScene.js';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#2a1a0a',
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: document.body,
    width: '100%',
    height: '100%',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    HomeScene,
    WordMatchScene,
    PicturePairsScene,
    TriviaScene,
    NumberTilesScene,
    JigsawScene,
  ],
};

new Phaser.Game(config);
