'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// Floating tech label that orbits around the core
function TechOrb({
  label,
  orbitRadius,
  speed,
  phase,
  color,
}: {
  label: string
  orbitRadius: number
  speed: number
  phase: number
  color: string
}) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime() * speed + phase
    groupRef.current.position.x = Math.cos(t) * orbitRadius
    groupRef.current.position.y = Math.sin(t * 0.7) * orbitRadius * 0.4
    groupRef.current.position.z = Math.sin(t) * orbitRadius * 0.5
    // Always face camera
    groupRef.current.lookAt(state.camera.position)
  })

  return (
    <group ref={groupRef}>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Label */}
      <Text
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.22, 0]}
        font="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2"
      >
        {label}
      </Text>
    </group>
  )
}

export default function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const wireRef = useRef<THREE.Mesh>(null!)
  const { mouse } = useThree()

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.5, 0.04)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.04)
    meshRef.current.rotation.z += delta * 0.06

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.1
      wireRef.current.rotation.x += delta * 0.05
    }
  })

  const techOrbs = [
    { label: 'Java', orbitRadius: 2.8, speed: 0.4, phase: 0, color: '#f97316' },
    { label: 'Kafka', orbitRadius: 3.0, speed: 0.3, phase: 2.1, color: '#38bdf8' },
    { label: 'Spring', orbitRadius: 2.6, speed: 0.5, phase: 4.2, color: '#86efac' },
    { label: 'Docker', orbitRadius: 3.2, speed: 0.35, phase: 1.0, color: '#60a5fa' },
    { label: 'Redis', orbitRadius: 2.5, speed: 0.45, phase: 3.1, color: '#f87171' },
    { label: 'Azure', orbitRadius: 3.1, speed: 0.28, phase: 5.0, color: '#818cf8' },
  ]

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Primary transmissive glass icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          roughness={0.02}
          transmission={0.95}
          ior={1.6}
          color="#38bdf8"
          attenuationColor="#818cf8"
          attenuationDistance={2.5}
          chromaticAberration={0.08}
          anisotropicBlur={0.08}
        />
      </mesh>

      {/* Outer rotating wireframe icosahedron */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 8, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.008, 8, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
      </mesh>

      {/* Tech orb labels */}
      {techOrbs.map((orb) => (
        <TechOrb key={orb.label} {...orb} />
      ))}

      {/* Core point glow */}
      <pointLight intensity={5} distance={6} color="#38bdf8" />
      <pointLight intensity={2} distance={5} color="#c084fc" position={[0, 2, 0]} />
    </Float>
  )
}
