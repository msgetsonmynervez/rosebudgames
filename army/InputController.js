import * as THREE from 'three';

export class InputController {
  constructor(canvas) {
    this.canvas = canvas;
    this.input = { x: 0 };
    this.keys = {};
    this.isMouseDown = false;
    this.isTouchActive = false;
    this.lastMouseX = 0;
    this.lastTouchX = 0;
    
    this.setupKeyboard();
    this.setupMouse();
    this.setupTouch();
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  setupMouse() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.lastMouseX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isMouseDown) {
        const deltaX = e.clientX - this.lastMouseX;
        this.input.x = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 0.05, 1);
        this.lastMouseX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      if (!this.isTouchActive) {
        this.input.x = 0;
      }
    });
  }

  setupTouch() {
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.isTouchActive = true;
      this.lastTouchX = e.touches[0].clientX;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.isTouchActive) {
        const deltaX = e.touches[0].clientX - this.lastTouchX;
        this.input.x = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 0.05, 1);
        this.lastTouchX = e.touches[0].clientX;
      }
    });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.isTouchActive = false;
      if (!this.isMouseDown) {
        this.input.x = 0;
      }
    });
  }

  getInput() {
    let x = 0;

    // Keyboard input
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      x = -1;
    } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      x = 1;
    }

    // Mouse/touch input overrides keyboard
    if (this.isMouseDown || this.isTouchActive) {
      x = this.input.x;
    }

    return { x };
  }
}
