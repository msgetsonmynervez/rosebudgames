import * as THREE from 'three';

export class PowerupManager {
  constructor(scene, loader) {
    this.scene = scene;
    this.loader = loader;
    this.powerups = [];
    this.powerupModel = null;
  }

  async init() {
    // Load goblin model for powerups
    const gltf = await this.loader.loadAsync('https://play.rosebud.ai/assets/Goblin.glb?6jn0');
    this.powerupModel = gltf.scene;
  }

  createGate(xPosition, operation, value) {
    const group = new THREE.Group();
    
    const pillarGeometry = new THREE.BoxGeometry(0.4, 4, 0.8);
    const pillarMaterial = new THREE.MeshStandardMaterial({ 
      color: operation.color,
      emissive: operation.color,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.7
    });
    
    // Gate width is 5 units (wider for wider track)
    const gateWidth = 5;
    
    // Left pillar
    const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    leftPillar.position.set(-gateWidth / 2, 2, 0);
    leftPillar.castShadow = true;
    group.add(leftPillar);
    
    // Right pillar
    const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    rightPillar.position.set(gateWidth / 2, 2, 0);
    rightPillar.castShadow = true;
    group.add(rightPillar);
    
    // Top bar
    const barGeometry = new THREE.BoxGeometry(gateWidth, 0.4, 0.8);
    const bar = new THREE.Mesh(barGeometry, pillarMaterial);
    bar.position.set(0, 4, 0);
    bar.castShadow = true;
    group.add(bar);
    
    // Create text display
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = this.colorToHex(operation.color);
    ctx.fillRect(0, 0, 512, 256);
    
    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 492, 236);
    
    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${operation.symbol}${value}`, 256, 128);
    
    const texture = new THREE.CanvasTexture(canvas);
    const signGeometry = new THREE.PlaneGeometry(2.5, 1.5);
    const signMaterial = new THREE.MeshStandardMaterial({ 
      map: texture,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, 2.5, 0);
    group.add(sign);

    group.position.set(xPosition, 0, 0);
    return { group, value, operation: operation.type };
  }

  spawnGateAtPosition(zPosition) {
    this.createPowerup(zPosition);
  }

  createPowerup(zPosition = -20) {
    // Create a pair of gates for player to choose between
    const gateSet = new THREE.Group();
    
    // Only positive operations
    const operations = [
      { type: 'add', min: 5, max: 20, color: 0x4fc3f7, symbol: '+' },
      { type: 'multiply', min: 2, max: 3, color: 0x66bb6a, symbol: 'x' }
    ];
    
    // Pick operations for left and right gates
    const leftOp = operations[Math.floor(Math.random() * operations.length)];
    const rightOp = operations[Math.floor(Math.random() * operations.length)];
    
    const leftValue = Math.floor(Math.random() * (leftOp.max - leftOp.min + 1)) + leftOp.min;
    const rightValue = Math.floor(Math.random() * (rightOp.max - rightOp.min + 1)) + rightOp.min;
    
    // Create left gate at x = -3
    const leftGate = this.createGate(-3, leftOp, leftValue);
    gateSet.add(leftGate.group);
    
    // Create right gate at x = 3
    const rightGate = this.createGate(3, rightOp, rightValue);
    gateSet.add(rightGate.group);
    
    // Add divider in the middle
    const dividerGeometry = new THREE.BoxGeometry(0.3, 2, 1);
    const dividerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x666666,
      metalness: 0.5,
      roughness: 0.5
    });
    const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
    divider.position.set(0, 1, 0);
    divider.castShadow = true;
    gateSet.add(divider);

    gateSet.position.set(0, 0, zPosition);
    
    this.scene.add(gateSet);
    this.powerups.push({
      group: gateSet,
      leftGate,
      rightGate,
      collected: false
    });
  }

  colorToHex(color) {
    const hex = color.toString(16).padStart(6, '0');
    return '#' + hex;
  }

  update(deltaTime, gameSpeed) {
    // Move gates
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i];
      
      if (!powerup.collected) {
        powerup.group.position.z += gameSpeed * deltaTime;
      }
      
      // Remove if too far
      if (powerup.group.position.z > 15) {
        this.scene.remove(powerup.group);
        this.powerups.splice(i, 1);
      }
    }
  }

  checkCollision(playerPos) {
    for (let i = 0; i < this.powerups.length; i++) {
      const powerup = this.powerups[i];
      
      if (!powerup.collected) {
        const dz = playerPos.z - powerup.group.position.z;
        
        // Check if player passed through a gate
        if (Math.abs(dz) < 0.8) {
          powerup.collected = true;
          
          // Determine which gate was hit based on player X position
          const selectedGate = playerPos.x < 0 ? powerup.leftGate : powerup.rightGate;
          
          this.animateCollection(powerup.group);
          this.powerups.splice(i, 1);
          return selectedGate;
        }
      }
    }
    return null;
  }

  animateCollection(group) {
    const startTime = Date.now();
    const duration = 400;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      // Flash and fade effect
      group.traverse((child) => {
        if (child.material) {
          child.material.opacity = 1 - progress;
          child.material.transparent = true;
          if (child.material.emissiveIntensity !== undefined) {
            child.material.emissiveIntensity = 0.8 * (1 - progress);
          }
        }
      });
      
      group.scale.set(1 + progress * 0.3, 1 + progress * 0.3, 1 + progress * 0.3);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.scene.remove(group);
      }
    };
    
    animate();
  }

  reset() {
    this.powerups.forEach(powerup => this.scene.remove(powerup.group));
    this.powerups = [];
  }
}
