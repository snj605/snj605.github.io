'use client'

import { Environment, Stars } from '@react-three/drei'

export default function EnvironmentLights() {
  return (
    <>
      {/* Deep space ambient */}
      <ambientLight intensity={0.15} color="#0a0f1e" />

      {/* Primary cyan key light from top-right */}
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.5}
        color="#38bdf8"
        castShadow={false}
      />

      {/* Purple fill from bottom-left */}
      <pointLight position={[-6, -4, -3]} intensity={2} color="#818cf8" distance={20} />

      {/* Warm rim from back */}
      <pointLight position={[0, 3, -8]} intensity={1.2} color="#c084fc" distance={15} />

      {/* Star field for depth */}
      <Stars
        radius={80}
        depth={50}
        count={4000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.4}
      />

      {/* Reflection environment */}
      <Environment preset="night" />
    </>
  )
}
