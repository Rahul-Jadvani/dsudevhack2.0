import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Cube = ({
  position,
  color,
  size = 1,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  rotation?: [number, number, number];
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const generateRandomPositions = (count: number) => {
  const positions: [number, number, number][] = [];
  const colors = ['#33C3F0', '#8B5CF6', '#FF7849', '#FFDB4D', '#38CC77', '#F472B6'];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 5 - 2;
    positions.push([x, y, z]);
  }

  return { positions, colors };
};

const CubesCluster = () => {
  const { positions, colors } = generateRandomPositions(20);

  return (
    <>
      {positions.map((position, index) => (
        <Float
          key={index}
          speed={1}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <Cube
            position={position}
            color={colors[index % colors.length]}
            size={Math.random() * 0.5 + 0.5}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            ]}
          />
        </Float>
      ))}
    </>
  );
};

type ThreeBackgroundProps = {
  variant?: 'default' | 'light';
};

export const ThreeBackground = ({ variant = 'light' }: ThreeBackgroundProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Always use light variant
  const getBgOpacity = () => {
    return 'opacity-50 bg-hackathon-navy';
  };

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-[-1] ${getBgOpacity()}`}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <CubesCluster />
      </Canvas>
    </div>
  );
};
