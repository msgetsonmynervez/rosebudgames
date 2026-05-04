import Phaser from 'phaser';
import { Boot } from './scenes/Boot.js';
import { Game } from './scenes/Game.js';

// Detect portrait mobile - use a function to ensure proper detection
function detectPortraitMobile() {
    // Always use window.innerWidth/Height for responsive testing
    // This allows testing on desktop by resizing browser window
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;
    const isMobileWidth = width <= 768;
    
    console.log('Viewport detection:', { 
        width, 
        height, 
        isPortrait, 
        isMobileWidth,
        result: isMobileWidth && isPortrait
    });
    
    return isMobileWidth && isPortrait;
}

const isPortraitMobile = detectPortraitMobile();

// Set game dimensions based on orientation
let gameWidth, gameHeight;
if (isPortraitMobile) {
    // Portrait mobile: narrower width, taller height
    gameWidth = 720;
    gameHeight = 1280;
    console.log('Using PORTRAIT mobile layout');
} else {
    // Desktop/landscape: standard 16:9
    gameWidth = 1920;
    gameHeight = 1080;
    console.log('Using DESKTOP/landscape layout');
}

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    parent: 'game-container',
    backgroundColor: '#000000',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    },
    scene: [Boot, Game]
};

new Phaser.Game(config);
