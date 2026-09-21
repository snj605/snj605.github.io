'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
}

export default function AntigravityParticles({ count = 250 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const geoRef = useRef<THREE.BufferGeometry>(null!)

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const phs = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
      spd[i] = 0.008 + Math.random() * 0.015
      phs[i] = Math.random() * Math.PI * 2
    }
    return [pos, spd, phs]
  }, [count])

  // Imperatively set buffer attribute — avoids R3F v9 bufferAttribute args requirement
  useEffect(() => {
    if (!geoRef.current) return
    const attr = new THREE.BufferAttribute(positions, 3)
    geoRef.current.setAttribute('position', attr)
  }, [positions])

  useFrame((state) => {
    if (!pointsRef.current || !geoRef.current) return
    const posAttr = geoRef.current.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const idxY = i * 3 + 1
      const idxX = i * 3
      const idxZ = i * 3 + 2

      posArray[idxY] += speeds[i]
      posArray[idxX] += Math.sin(time * 0.5 + phases[i]) * 0.003
      posArray[idxZ] += Math.cos(time * 0.4 + phases[i]) * 0.003

      if (posArray[idxY] > 8) {
        posArray[idxY] = -8
        posArray[idxX] = (Math.random() - 0.5) * 18
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.06}
        color="#38bdf8"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
