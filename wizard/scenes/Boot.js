import Phaser from 'phaser';
import { MANIFEST } from '../manifest.js';

export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Load assets from Manifest
        // We use the keys defined in manifest.images as the Phaser cache keys
        Object.entries(MANIFEST.images).forEach(([key, url]) => {
            this.load.image(key, url);
        });
    }

    create() {
        this.scene.start('Game');
    }
}
