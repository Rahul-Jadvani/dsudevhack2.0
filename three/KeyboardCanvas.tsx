// src/three/KeyboardCanvas.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Keyboard = () => {
    const keyMaterial = new THREE.MeshStandardMaterial({ color: '#555' });
    const keys = [];

    const rows = 4;
    const cols = 10;
    const spacing = 1.2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            keys.push(
                <mesh
                    key={`${row}-${col}`}
                    position={[col * spacing, 0, row * spacing]}
                    material={keyMaterial}
                >
                    <boxGeometry args={[1, 0.3, 1]} />
                </mesh>
            );
        }
    }

    return <group position={[-6, 0, -2]}>{keys}</group>;
};

export const KeyboardCanvas = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Keyboard />
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};
