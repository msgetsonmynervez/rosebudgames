import * as THREE from 'three';

export class Player {
  constructor(scene, loader) {
    this.scene = scene;
    this.loader = loader;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3(0, 0, 5);
    this.targetX = 0;
    this.moveSpeed = 8;
    this.armySize = 5;
    this.maxArmySize = 200;
    this.troops = [];
    this.model = null;
    this.mixer = null;
  }

  async init() {
    // Create pip-based character representation
    this.createPlayerPip();
    
    this.group.position.copy(this.position);
    this.scene.add(this.group);
    
    // Create initial army
    console.log('Initializing player with army size:', this.armySize);
    this.addToArmy(this.armySize - 1);
    console.log('After init - troops length:', this.troops.length);
  }

  createPlayerPip() {
    // Main player pip (slightly larger)
    const pipGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const pipMaterial = new THREE.MeshStandardMaterial({
      color: 0x4fc3f7,
      emissive: 0x2196f3,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.7
    });
    
    this.model = new THREE.Mesh(pipGeometry, pipMaterial);
    this.model.position.y = 0.3;
    this.model.castShadow = true;
    this.group.add(this.model);
  }

  update(deltaTime, input, inBattle = false) {
    // Horizontal movement
    this.targetX += input.x * this.moveSpeed * deltaTime;
    this.targetX = Math.max(-5.5, Math.min(5.5, this.targetX));
    
    // Smooth lerp to target position
    this.position.x += (this.targetX - this.position.x) * 10 * deltaTime;
    this.group.position.x = this.position.x;

    // Bobbing animation for player pip
    this.model.position.y = 0.3 + Math.sin(Date.now() * 0.005) * 0.08;

    // Update troop positions to follow in formation (but not during battle)
    if (!inBattle) {
      this.updateTroopFormation(deltaTime);
    }
  }

  updateTroopFormation(deltaTime) {
    const spacing = 0.4;
    const rowSize = 12; // Wider rows for wider track
    const trackBoundary = 5.8; // Keep pips within track
    
    this.troops.forEach((troop, index) => {
      const row = Math.floor(index / rowSize);
      const col = index % rowSize;
      
      let targetX = this.position.x + (col - (rowSize - 1) / 2) * spacing;
      const targetZ = this.position.z - (row + 1) * 0.5;  // Behind the player
      
      // Clamp to track boundaries
      targetX = Math.max(-trackBoundary, Math.min(trackBoundary, targetX));
      
      // Smooth follow
      troop.position.x += (targetX - troop.position.x) * 8 * deltaTime;
      troop.position.z += (targetZ - troop.position.z) * 8 * deltaTime;
      
      // Bobbing animation for troops
      troop.position.y = 0.2 + Math.sin(Date.now() * 0.005 + index * 0.1) * 0.05;
    });
  }

  addToArmy(count) {
    const actualCount = Math.min(count, this.maxArmySize - 1 - this.troops.length);
    const trackBoundary = 5.8;
    
    for (let i = 0; i < actualCount; i++) {
      // Create pip for troop - make them very bright and visible
      const pipGeometry = new THREE.SphereGeometry(0.25, 12, 12);
      const pipMaterial = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        emissive: 0x2196f3,
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.7
      });
      
      const troop = new THREE.Mesh(pipGeometry, pipMaterial);
      troop.castShadow = true;
      
      const rowSize = 12;
      const currentIndex = this.troops.length;
      const row = Math.floor(currentIndex / rowSize);
      const col = currentIndex % rowSize;
      
      // Position relative to player - BEHIND them
      let posX = this.position.x + (col - (rowSize - 1) / 2) * 0.4;
      posX = Math.max(-trackBoundary, Math.min(trackBoundary, posX));
      
      troop.position.set(
        posX,
        0.2,
        this.position.z - (row + 1) * 0.5  // Negative Z to put them behind in world space
      );
      
      this.scene.add(troop);
      this.troops.push(troop);

      // Make visible immediately
      troop.scale.set(1, 1, 1);
    }
    
    // Update army size after all troops added
    this.armySize = this.troops.length + 1; // +1 for the main pip
  }

  removeFromArmy(count) {
    const actualRemove = Math.min(count, this.troops.length);
    
    for (let i = 0; i < actualRemove; i++) {
      const troop = this.troops.pop();
      if (troop) {
        this.animateDeath(troop);
      }
    }
    
    // Update army size after removal
    this.armySize = this.troops.length + 1; // +1 for the main pip
  }

  animateSpawn(troop) {
    const targetScale = 1.0;
    const startTime = Date.now();
    const duration = 300;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const scale = progress * targetScale;
      
      troop.scale.set(scale, scale, scale);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  battle(enemyHealth) {
    const damage = this.armySize;
    
    if (damage >= enemyHealth) {
      // Victory
      return { won: true, remaining: this.armySize };
    } else {
      // Defeat - lose troops
      const troopsLost = Math.min(enemyHealth, this.armySize - 1);
      
      for (let i = 0; i < troopsLost; i++) {
        const troop = this.troops.pop();
        if (troop) {
          this.animateDeath(troop);
          this.armySize--;
        }
      }
      
      return { won: false, remaining: this.armySize };
    }
  }

  animateDeath(troop) {
    const startTime = Date.now();
    const duration = 500;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      troop.position.y = Math.sin(progress * Math.PI) * 2;
      troop.rotation.x = progress * Math.PI * 2;
      troop.scale.multiplyScalar(0.95);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.scene.remove(troop);
      }
    };
    
    animate();
  }

  getPosition() {
    return this.position;
  }

  reset() {
    this.position.set(0, 0, 5);
    this.targetX = 0;
    this.group.position.copy(this.position);
    
    // Remove all troops
    this.troops.forEach(troop => this.scene.remove(troop));
    this.troops = [];
    this.armySize = 5;
    
    // Recreate initial army
    this.addToArmy(this.armySize - 1);
  }
}
