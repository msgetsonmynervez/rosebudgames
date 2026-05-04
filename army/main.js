import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Player } from './Player.js';
import { PowerupManager } from './PowerupManager.js';
import { EnemyManager } from './EnemyManager.js';
import { InputController } from './InputController.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    
    this.loader = new GLTFLoader();
    this.clock = new THREE.Clock();
    
    this.player = null;
    this.powerupManager = null;
    this.enemyManager = null;
    this.inputController = null;
    
    this.gameSpeed = 8;
    this.isGameOver = false;
    this.lastSpawnZ = -20; // Track last spawn position
    this.spawnQueue = []; // Queue of what to spawn next
    this.inBattle = false;
    this.battleTimer = 0;
    this.currentEnemy = null;
    
    this.init();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas, 
      antialias: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  setupScene() {
    this.scene = new THREE.Scene();
    
    // Beautiful gradient background (blue to purple)
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#f093fb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    this.scene.background = texture;
    
    // Create runway
    this.createRunway();
  }

  createRunway() {
    const runwayLength = 300;
    const runwayGeometry = new THREE.PlaneGeometry(12, runwayLength);
    const runwayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      roughness: 0.8,
      metalness: 0.2
    });
    this.runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
    this.runway.rotation.x = -Math.PI / 2;
    this.runway.position.z = -runwayLength / 2 + 50; // Extend forward
    this.runway.receiveShadow = true;
    this.scene.add(this.runway);

    // Side borders
    const borderGeometry = new THREE.BoxGeometry(0.5, 1, runwayLength);
    const borderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x666666 
    });
    
    const leftBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    leftBorder.position.set(-6.25, 0.5, -runwayLength / 2 + 50);
    leftBorder.castShadow = true;
    this.scene.add(leftBorder);
    
    const rightBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    rightBorder.position.set(6.25, 0.5, -runwayLength / 2 + 50);
    rightBorder.castShadow = true;
    this.scene.add(rightBorder);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(25, runwayLength);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.01, -runwayLength / 2 + 50);
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, 10);
    this.camera.lookAt(0, 0, -3);
  }

  setupLights() {
    // Ambient light for overall brightness
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light for shadows
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 15, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);

    // Rim light for depth
    const rimLight = new THREE.DirectionalLight(0x9c6fff, 0.4);
    rimLight.position.set(-5, 5, -5);
    this.scene.add(rimLight);
  }

  async init() {
    this.player = new Player(this.scene, this.loader);
    await this.player.init();
    
    this.powerupManager = new PowerupManager(this.scene, this.loader);
    await this.powerupManager.init();
    
    this.enemyManager = new EnemyManager(this.scene, this.loader);
    await this.enemyManager.init();
    
    this.inputController = new InputController(this.canvas);
    
    // Initialize spawn queue with alternating pattern
    this.initializeSpawnQueue();
    
    document.getElementById('restartBtn').addEventListener('click', () => {
      this.restart();
    });
    
    window.addEventListener('resize', () => this.onResize());
    
    this.animate();
  }

  initializeSpawnQueue() {
    // Create a pattern: gate, gate, enemy, gate, gate, enemy, etc.
    this.spawnQueue = ['gate', 'gate', 'enemy', 'gate', 'gate', 'enemy'];
    this.spawnIndex = 0;
  }

  restart() {
    this.isGameOver = false;
    this.gameSpeed = 8;
    this.lastSpawnZ = -20;
    this.inBattle = false;
    this.battleTimer = 0;
    this.currentEnemy = null;
    
    this.player.reset();
    this.powerupManager.reset();
    this.enemyManager.reset();
    this.initializeSpawnQueue();
    
    this.updateUI();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
  }

  updateUI() {
    document.getElementById('armyCount').textContent = `Army: ${this.player.armySize}`;
  }

  handleSpawning(deltaTime) {
    // Move the spawn tracker forward with game speed
    this.lastSpawnZ += this.gameSpeed * deltaTime;
    
    // Check if we should spawn the next object
    const minSpawnDistance = -10; // Spawn when tracker reaches this position
    
    if (this.lastSpawnZ >= minSpawnDistance) {
      const spawnType = this.spawnQueue[this.spawnIndex % this.spawnQueue.length];
      
      if (spawnType === 'gate') {
        this.powerupManager.spawnGateAtPosition(-25);
      } else if (spawnType === 'enemy') {
        this.enemyManager.spawnEnemyAtPosition(-25);
      }
      
      // Reset spawn tracker to negative position
      this.lastSpawnZ = -25;
      this.spawnIndex++;
    }
  }

  checkCollisions() {
    // Don't check collisions during battle
    if (this.inBattle) return;
    
    // Check powerup gate collisions
    const collectedPowerup = this.powerupManager.checkCollision(this.player.getPosition());
    if (collectedPowerup) {
      const currentArmySize = this.player.armySize;
      let newArmySize = currentArmySize;
      
      switch(collectedPowerup.operation) {
        case 'add':
          newArmySize = currentArmySize + collectedPowerup.value;
          break;
        case 'multiply':
          newArmySize = currentArmySize * collectedPowerup.value;
          break;
      }
      
      const troopsToAdd = newArmySize - currentArmySize;
      
      if (troopsToAdd > 0) {
        this.player.addToArmy(troopsToAdd);
      }
      
      this.updateUI();
    }

    // Check enemy collisions
    const hitEnemy = this.enemyManager.checkCollision(this.player.getPosition());
    if (hitEnemy) {
      this.startBattle(hitEnemy);
    }
  }

  startBattle(enemy) {
    // Check if player can win
    if (this.player.armySize <= enemy.armySize) {
      // Instant defeat - game over
      this.gameOver(false);
      return;
    }
    
    // Pause game and start battle
    this.inBattle = true;
    this.currentEnemy = enemy;
    this.battleTimer = 0;
    
    // Calculate meeting point between the two armies
    const playerFrontZ = this.player.position.z - this.player.troops.length * 0.05;
    const enemyFrontZ = enemy.group.position.z;
    const meetingPointZ = (playerFrontZ + enemyFrontZ) / 2;
    
    // Store battle positions
    enemy.battleStartZ = enemy.group.position.z;
    enemy.battleTargetZ = meetingPointZ + 1; // Enemy side of meeting point
    this.playerBattleTargetZ = meetingPointZ - 1; // Player side of meeting point
  }

  updateBattle(deltaTime) {
    if (!this.inBattle || !this.currentEnemy) return;
    
    // Move armies toward each other to meeting point (only if not there yet)
    const moveSpeed = 3 * deltaTime;
    
    // Move enemy toward meeting point
    if (this.currentEnemy.group.position.z < this.currentEnemy.battleTargetZ - 0.1) {
      this.currentEnemy.group.position.z = Math.min(
        this.currentEnemy.group.position.z + moveSpeed * 2,
        this.currentEnemy.battleTargetZ
      );
    } else {
      // Keep at target position
      this.currentEnemy.group.position.z = this.currentEnemy.battleTargetZ;
    }
    
    // Don't move player during battle - let them stay where they engaged
    
    this.battleTimer += deltaTime;
    
    // Battle tick every 0.12 seconds (fast but visible)
    const battleTickRate = 0.12;
    
    if (this.battleTimer >= battleTickRate) {
      this.battleTimer = 0;
      
      // Remove 1 pip from back of enemy army (front troops fighting)
      if (this.currentEnemy.pips && this.currentEnemy.pips.length > 0) {
        const pip = this.currentEnemy.pips.shift(); // Take from front
        this.enemyManager.animatePipDestruction(pip);
        this.currentEnemy.armySize--;
        this.enemyManager.updateEnemyCount(this.currentEnemy);
        
        // Push enemy back slightly as they lose troops
        this.currentEnemy.battleTargetZ -= 0.05;
      }
      
      // Remove 1 pip from back of player army (front troops fighting)
      if (this.player.troops.length > 0) {
        const troopIndex = this.player.troops.length - 1; // Take from back (front of formation)
        const troop = this.player.troops[troopIndex];
        this.player.animateDeath(troop);
        this.player.troops.splice(troopIndex, 1);
        this.player.armySize = this.player.troops.length + 1;
        this.updateUI();
        
        // Push player back slightly as they lose troops
        this.playerBattleTargetZ += 0.05;
      }
      
      // Check if enemy defeated
      if (this.currentEnemy.armySize <= 0) {
        this.currentEnemy.defeated = true;
        this.inBattle = false;
        this.currentEnemy = null;
      }
      
      // Check if player lost (shouldn't happen but safety check)
      if (this.player.armySize <= 1) {
        this.gameOver(false);
        this.inBattle = false;
      }
    }
  }





  gameOver(won) {
    this.isGameOver = true;
    document.getElementById('gameOverText').textContent = won ? 'VICTORY!' : 'DEFEATED!';
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('instructions').style.display = 'none';
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.isGameOver) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    
    const deltaTime = this.clock.getDelta();
    
    // Update player movement
    const input = this.inputController.getInput();
    this.player.update(deltaTime, input, this.inBattle);
    
    // Update battle if in progress
    if (this.inBattle) {
      this.updateBattle(deltaTime);
    } else {
      // Only move track and spawn when not in battle
      this.powerupManager.update(deltaTime, this.gameSpeed);
      this.enemyManager.update(deltaTime, this.gameSpeed);
      this.handleSpawning(deltaTime);
      this.checkCollisions();
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

new Game();
