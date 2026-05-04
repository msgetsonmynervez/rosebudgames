import * as THREE from 'three';
import { createCube } from 'components/Cube.js';
import { aiHelper } from './utils/AIHelper.js';
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0015);
// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
// Create the mystical orb (crystal ball effect)
const cube = createCube();
scene.add(cube);
// Add mystical glow
const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x9370db,
    transparent: true,
    opacity: 0.1,
    wireframe: false
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glow);
// Add point light for mystical effect
const light = new THREE.PointLight(0xd4af37, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);
// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the mystical orb slowly
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.008;
    
    // Pulse the glow
    glow.rotation.x += 0.003;
    glow.rotation.y += 0.004;
    const pulseScale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    glow.scale.set(pulseScale, pulseScale, pulseScale);
    
    // Animate light intensity
    light.intensity = 1 + Math.sin(Date.now() * 0.002) * 0.3;
    
    renderer.render(scene, camera);
}
// Fortune teller functionality
const questionInput = document.getElementById('question-input');
const submitBtn = document.getElementById('submit-btn');
const predictionBox = document.getElementById('prediction-box');
submitBtn.addEventListener('click', async () => {
    const question = questionInput.value.trim();
    
    if (!question) {
        predictionBox.textContent = '✨ Please ask a question first... ✨';
        predictionBox.classList.add('show');
        return;
    }
    
    // Disable input and button during prediction
    submitBtn.disabled = true;
    questionInput.disabled = true;
    
    // Show loading state
    predictionBox.innerHTML = '<span class="loading pulse">🔮 Gazing into the cosmic realm...</span>';
    predictionBox.classList.add('show');
    
    try {
        // Get prediction from AI
        const prediction = await aiHelper.ask(question);
        
        if (prediction) {
            predictionBox.innerHTML = `<strong>🔮 The Oracle Speaks:</strong><br><br>${prediction}`;
        } else {
            predictionBox.innerHTML = '✨ The spirits are unclear at this moment. Try asking again... ✨';
        }
    } catch (error) {
        predictionBox.innerHTML = '✨ The cosmic energies are disrupted. Please try again... ✨';
        console.error('Fortune telling error:', error);
    } finally {
        // Re-enable input and button
        submitBtn.disabled = false;
        questionInput.disabled = false;
    }
});
// Allow Enter key to submit (Shift+Enter for new line)
questionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
    }
});
// Start the animation
animate();