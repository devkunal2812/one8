'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SneakerProxy
 * A stylized 3D proxy for the shoe since we don't have a real .glb.
 * Replace with: useGLTF('/models/shoe.glb') when you have the asset.
 */
function SneakerProxy() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    // Continuous Y rotation + subtle bobbing
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Sole */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.25, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Midsole */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[2.2, 0.2, 0.8]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Upper – main body */}
      <mesh position={[0.1, 0.2, 0]} castShadow>
        <boxGeometry args={[2.0, 0.5, 0.75]} />
        <MeshDistortMaterial
          color="#111111"
          roughness={0.6}
          metalness={0.1}
          distort={0.05}
          speed={2}
        />
      </mesh>

      {/* Toe box */}
      <mesh position={[0.95, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </mesh>

      {/* Heel counter */}
      <mesh position={[-1.0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.3, 0.45, 0.72]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Laces */}
      {[-0.3, 0.0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.46, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 6]} />
          <meshStandardMaterial color="#E8E8E8" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* ONE8 logo plate */}
      <mesh position={[0, 0.0, 0.41]} castShadow>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  )
}

/**
 * Shoe3D – Three.js canvas for the hero 3D sneaker
 */
export default function Shoe3D() {
  return (
    <div className="w-full h-full" aria-label="3D sneaker viewer">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#E8E8E8"
          castShadow
        />
        <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#C0C0C0" />

        {/* Environment for reflections */}
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>

        {/* Sneaker with Float animation */}
        <Float
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <SneakerProxy />
        </Float>

        {/* Shadow plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#0A0A0A" transparent opacity={0} />
        </mesh>
      </Canvas>
    </div>
  )
}
