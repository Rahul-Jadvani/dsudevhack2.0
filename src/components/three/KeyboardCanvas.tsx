import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../lib/theme-context';

interface KeyProps {
  position: [number, number, number];
  color: string;
  letter?: string;
  size?: number;
  textColor: string;
}

const Key = ({ position, color, letter, size = 1, textColor }: KeyProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (hovered) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size, size, size * 0.5]} />
        <meshStandardMaterial color={color} />
        {letter && (
          <Text
            position={[0, 0, 0.26]}
            fontSize={size * 0.7}
            color={textColor}
            anchorX="center"
            anchorY="middle"
          >
            {letter}
          </Text>
        )}
      </mesh>
    </Float>
  );
};

interface KeyboardCanvasProps {
  className?: string;
  theme?: string;
}

export const KeyboardCanvas = ({ className, theme: themeProp }: KeyboardCanvasProps) => {
  const themeContext = useTheme();
  const theme = themeProp || themeContext.theme;
  const [keyColors, setKeyColors] = useState<
    Array<{ position: [number, number, number]; color: string; letter: string }>
  >([]);

  useEffect(() => {
    const darkColors = {
      orange: "#FF7849",
      purple: "#D8B4FE",
      blue: "#33C3F0",
      yellow: "#FFDB4D",
      white: "#FFFFFF",
      gray: "#EEEEEE"
    };

    const lightColors = {
      orange: "#FF4500",
      purple: "#9370DB",
      blue: "#1E90FF",
      yellow: "#FFD700",
      white: "#F5F5F5",
      gray: "#E0E0E0"
    };

    const colors = theme === 'dark' ? lightColors : darkColors;

    setKeyColors([
      { position: [-2, 1, 0], color: colors.orange, letter: "O" },
      { position: [-1, 0.5, 0], color: colors.purple, letter: "V" },
      { position: [0, 0.7, 0], color: colors.purple, letter: "E" },
      { position: [1, 0.3, 0], color: colors.blue, letter: "R" },
      { position: [-1, -0.5, 0], color: colors.blue, letter: "F" },
      { position: [0, -0.2, 0], color: colors.yellow, letter: "L" },
      { position: [1, -0.6, 0], color: colors.orange, letter: "O" },
      { position: [2, -0.4, 0], color: colors.purple, letter: "W" },
      { position: [-2, -1.5, 0], color: colors.white, letter: "[ ]" },
      { position: [2, 1.5, 0], color: colors.gray, letter: "{ }" }
    ]);
  }, [theme]);

  const textColor = theme === 'dark' ? '#000000' : '#ffffff';

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={theme === 'dark' ? 1 : 1.2} />
        <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.5 : 0.8} />

        {keyColors.map((key, index) => (
          <Key
            key={index}
            position={key.position}
            color={key.color}
            letter={key.letter}
            size={1}
            textColor={textColor}
          />
        ))}
      </Canvas>
    </div>
  );
};
