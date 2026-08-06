import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LegalCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6;
      ringRef.current.rotation.z -= delta * 0.35;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.4} rotationIntensity={0.45} floatIntensity={0.8}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#1d7bff"
            emissive="#0d3f7a"
            emissiveIntensity={0.9}
            roughness={0.24}
            metalness={0.32}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.06, 24, 100]} />
        <meshStandardMaterial
          color="#7db4f5"
          emissive="#7db4f5"
          emissiveIntensity={0.85}
          roughness={0.18}
        />
      </mesh>

      <mesh ref={orbitRef} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 80]} />
        <meshStandardMaterial
          color="#74f2c3"
          emissive="#74f2c3"
          emissiveIntensity={0.55}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <octahedronGeometry args={[0.42]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#a4d9ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.92}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>
    </group>
  );
}

export function DashboardScene() {
  return (
    <div className="dashboard-scene" aria-label="Interactive 3D dashboard preview">
      <Canvas camera={{ position: [0, 1.2, 6], fov: 44 }}>
        <color attach="background" args={["#f4f8fe"]} />
        <fog attach="fog" args={["#f4f8fe", 6, 16]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#8ed7ff" />
        <pointLight position={[-3, 2, -2]} intensity={10} color="#1769d2" />
        <pointLight position={[3, 2, 3]} intensity={9} color="#74f2c3" />

        <Stars radius={6} depth={28} count={220} factor={4} saturation={0} fade speed={1.2} />
        <Sparkles count={90} scale={3.4} size={2.8} speed={0.35} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.6, 64]} />
          <meshStandardMaterial
            color="#dceeff"
            emissive="#dceeff"
            emissiveIntensity={0.4}
            transparent
            opacity={0.95}
          />
        </mesh>

        <LegalCore />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
          <ringGeometry args={[2.1, 2.55, 64]} />
          <meshBasicMaterial color="#1769d2" transparent opacity={0.16} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
