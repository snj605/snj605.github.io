'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import AntigravityParticles from './AntigravityParticles'
import FloatingCore from './FloatingCore'
import EnvironmentLights from './EnvironmentLights'

// Scroll-linked camera dolly
function ScrollCamera() {
  const { camera } = useThree()

  useFrame(() => {
    const scrollY = window.scrollY
    const targetZ = 7 + scrollY * 0.003
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.min(targetZ, 12), 0.05)
  })

  return null
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />

      <Suspense fallback={null}>
        <ScrollCamera />
        <EnvironmentLights />
        <FloatingCore />
        <AntigravityParticles count={400} />

        {/* Post-processing FX */}
        <EffectComposer multisampling={4}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0008, 0.0008)}
            blendFunction={BlendFunction.NORMAL}
          />
          <Vignette
            offset={0.3}
            darkness={0.6}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
