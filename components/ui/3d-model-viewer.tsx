"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function NeuralNetwork({ layers = [10, 6, 4, 2] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {layers.map((neurons, layerIndex) => {
        const layerSpacing = 2
        const neuronSpacing = 0.5

        return Array.from({ length: neurons }).map((_, neuronIndex) => {
          const x = layerIndex * layerSpacing - (layers.length * layerSpacing) / 2
          const y = neuronIndex * neuronSpacing - (neurons * neuronSpacing) / 2

          return (
            <mesh key={`${layerIndex}-${neuronIndex}`} position={[x, y, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color="#4f46e5" />
            </mesh>
          )
        })
      })}
    </group>
  )
}

export function ModelViewer3D() {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <NeuralNetwork />
      </Canvas>
    </div>
  )
}

