import Phaser from 'phaser';
import { manifest } from '../manifest.js';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('title_bg', 'assets/first_symptoms.png');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        const bg = this.add.image(width / 2, height / 2, 'title_bg');
        const scaleX = width / bg.width;
        const scaleY = height / bg.height;
        bg.setScale(Math.max(scaleX, scaleY));

        // Dark overlay for readability
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55);

        // Teal top accent line
        this.add.rectangle(width / 2, 0, width, 3, 0x2eb8b8).setOrigin(0.5, 0);

        // Subtitle above title
        this.add.text(width / 2, height * 0.28, 'AN MS JOURNEY', {
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '14px',
            color: '#2eb8b8',
            letterSpacing: 6,
        }).setOrigin(0.5);

        // Main title
        this.add.text(width / 2, height * 0.38, 'Signal & Noise', {
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: width < 600 ? '36px' : '52px',
            color: '#ffffff',
            stroke: '#0d1a2e',
            strokeThickness: 6,
            shadow: { offsetX: 0, offsetY: 2, color: '#2eb8b8', blur: 20, fill: true },
        }).setOrigin(0.5);

        // Tagline
        this.add.text(width / 2, height * 0.54, '"You are not doing this alone."', {
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '15px',
            color: '#a8e6e6',
            fontStyle: 'italic',
        }).setOrigin(0.5);

        // Start button
        const btnW = 220;
        const btnH = 52;
        const btnX = width / 2;
        const btnY = height * 0.70;

        const btnBg = this.add.rectangle(btnX, btnY, btnW, btnH, 0x0e4a4a)
            .setStrokeStyle(2, 0x2eb8b8)
            .setInteractive({ useHandCursor: true });

        const btnText = this.add.text(btnX, btnY, 'Begin Your Journey', {
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '15px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Hover states
        btnBg.on('pointerover', () => {
            btnBg.setFillStyle(0x1a6a6a);
            btnBg.setStrokeStyle(2, 0x5ed8d8);
            btnText.setColor('#2eb8b8');
        });

        btnBg.on('pointerout', () => {
            btnBg.setFillStyle(0x0e4a4a);
            btnBg.setStrokeStyle(2, 0x2eb8b8);
            btnText.setColor('#ffffff');
        });

        btnBg.on('pointerdown', () => this.startGame());
        btnText.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.startGame());

        // Pulsing continue hint
        const hint = this.add.text(width / 2, height * 0.88, 'tap anywhere to start', {
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '12px',
            color: '#5ed8d8',
            alpha: 0.7,
        }).setOrigin(0.5);

        this.tweens.add({
            targets: hint,
            alpha: 0,
            duration: 900,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });

        // Tap anywhere also starts
        this.input.once('pointerdown', () => this.startGame());

        // Teal bottom accent line
        this.add.rectangle(width / 2, height, width, 3, 0x2eb8b8).setOrigin(0.5, 1);

        // Version / credit line
        this.add.text(width - 10, height - 8, 'Signal & Noise v1.0', {
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '10px',
            color: '#2eb8b8',
            alpha: 0.5,
        }).setOrigin(1, 1);
    }

    startGame() {
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('AdventureScene');
        });
    }
}
