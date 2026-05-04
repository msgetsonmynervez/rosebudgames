import * as THREE from 'three';

export class EnemyManager {
  constructor(scene, loader) {
    this.scene = scene;
    this.loader = loader;
    this.enemies = [];
    this.enemyModels = {};
  }

  async init() {
    // Load enemy models
    const dragonGltf = await this.loader.loadAsync('https://play.rosebud.ai/assets/Dragon.glb?kOJ9');
    this.enemyModels.dragon = dragonGltf.scene;
    
    const demonGltf = await this.loader.loadAsync('https://play.rosebud.ai/assets/Demon.glb?BtzJ');
    this.enemyModels.demon = demonGltf.scene;
  }

  spawnEnemyAtPosition(zPosition) {
    this.createEnemy(zPosition);
  }

  createEnemy(zPosition = -20) {
    
    // Enemies spawn in the center of the runway
    const xPos = 0;
    
    // Random army size for enemy
    const armySize = Math.floor(Math.random() * 20) + 10;
    
    const group = new THREE.Group();
    
    // Store pips array for battle system
    const pips = [];
    
    // Add enemy pips in formation
    const rowSize = 8;
    
    for (let i = 0; i < armySize; i++) {
      const pipGeometry = new THREE.SphereGeometry(0.25, 12, 12);
      const pipMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5252,
        emissive: 0xd32f2f,
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.7
      });
      
      const pip = new THREE.Mesh(pipGeometry, pipMaterial);
      pip.castShadow = true;
      
      const row = Math.floor(i / rowSize);
      const col = i % rowSize;
      const offsetX = (col - (rowSize - 1) / 2) * 0.4;
      const offsetZ = (row - Math.floor(armySize / rowSize) / 2) * 0.4;
      
      pip.position.set(offsetX, 0.25, offsetZ);
      
      group.add(pip);
      pips.push(pip);
    }

    // Add army count text
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff5252';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${armySize}`, 128, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const textMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(textMaterial);
    sprite.scale.set(2.5, 1.5, 1);
    sprite.position.y = 2.5;
    group.add(sprite);

    group.position.set(xPos, 0, zPosition);
    
    this.scene.add(group);
    const enemy = {
      group,
      armySize,
      pips,
      sprite,
      defeated: false,
      bobOffset: Math.random() * Math.PI * 2
    };
    this.enemies.push(enemy);
  }

  animatePipDestruction(pip) {
    // Quick destruction animation - pop upward
    const startTime = Date.now();
    const duration = 250;
    const startY = pip.position.y;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (pip.parent) {
        // Pop up and fade
        pip.position.y = startY + Math.sin(progress * Math.PI) * 1.5;
        pip.scale.multiplyScalar(0.92);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          pip.parent.remove(pip);
        }
      }
    };
    
    animate();
  }

  updateEnemyCount(enemy) {
    // Update the count sprite
    if (enemy.sprite) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ff5252';
      ctx.font = 'bold 100px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${enemy.armySize}`, 128, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      enemy.sprite.material.map = texture;
      enemy.sprite.material.needsUpdate = true;
    }
  }

  update(deltaTime, gameSpeed) {
    // Move and animate enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      
      if (!enemy.defeated) {
        enemy.group.position.z += gameSpeed * deltaTime;
        
        // Gentle bob animation for pips
        enemy.bobOffset += deltaTime * 2;
        enemy.group.position.y = Math.sin(enemy.bobOffset) * 0.05;
      } else {
        // Death animation
        enemy.group.position.y -= deltaTime * 3;
        enemy.group.rotation.x += deltaTime * 5;
        enemy.group.scale.multiplyScalar(0.95);
        
        if (enemy.group.position.y < -5) {
          this.scene.remove(enemy.group);
          this.enemies.splice(i, 1);
        }
      }
      
      // Remove if too far
      if (enemy.group.position.z > 15 && !enemy.defeated) {
        this.scene.remove(enemy.group);
        this.enemies.splice(i, 1);
      }
    }
  }

  checkCollision(playerPos) {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      
      if (!enemy.defeated) {
        const dz = playerPos.z - enemy.group.position.z;
        const distance = Math.abs(dz);
        
        // Check if armies are close enough to engage
        if (distance < 6) {
          return enemy;
        }
      }
    }
    return null;
  }



  reset() {
    this.enemies.forEach(enemy => this.scene.remove(enemy.group));
    this.enemies = [];
  }
}
