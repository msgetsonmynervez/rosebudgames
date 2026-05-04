import * as THREE from 'three';

export function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}