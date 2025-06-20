'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Neural Network 3D Component
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (groupRef.current) {
      // Animate the neural network rotation
      const animate = () => {
        if (groupRef.current) {
          groupRef.current.rotation.y += 0.005
          groupRef.current.rotation.x += 0.003
        }
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [])

  // Create neural nodes
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
    size: Math.random() * 0.3 + 0.1,
  }))

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      {nodes.map((node) => (
        <Sphere key={node.id} position={node.position} args={[node.size, 16, 16]}>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
      
      {/* Connection lines */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((otherNode, j) => {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
            Math.pow(node.position[1] - otherNode.position[1], 2) +
            Math.pow(node.position[2] - otherNode.position[2], 2)
          )
          
          if (distance < 3) {
            const midPoint = [
              (node.position[0] + otherNode.position[0]) / 2,
              (node.position[1] + otherNode.position[1]) / 2,
              (node.position[2] + otherNode.position[2]) / 2,
            ] as [number, number, number]
            
            return (
              <Box 
                key={`${i}-${j}`}
                position={midPoint}
                args={[distance, 0.02, 0.02]}
                lookAt={otherNode.position}
              >
                <meshStandardMaterial
                  color="#00ccff"
                  emissive="#00ccff"
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.6}
                />
              </Box>
            )
          }
          return null
        })
      )}
    </group>
  )
}

// Typing animation component
function TypingAnimation() {
  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const phrases = [
    'free queer workshops near me',
    'techno events this weekend',
    'art galleries opening tonight',
    'startup meetups in Kreuzberg',
    'cultural events tomorrow'
  ]
  
  const [currentPhrase, setCurrentPhrase] = useState(0)
  
  useEffect(() => {
    const currentText = phrases[currentPhrase]
    
    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setText(currentText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Wait then move to next phrase
      const timer = setTimeout(() => {
        setCurrentIndex(0)
        setText('')
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, currentPhrase, phrases])
  
  return (
    <span className="font-mono text-neural-green">
      "{text}"
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Code snippet component
function FloatingCode() {
  const codeSnippets = [
    'GET /api/events/semantic',
    'vector_search(query_embedding)',
    'neural_ranking(results)',
    'return filtered_events'
  ]
  
  return (
    <div className="absolute top-20 right-10 space-y-4">
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          className="code-block px-4 py-2 text-sm text-neural-blue"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.5, duration: 0.8 }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  )
}

// Events counter component
function EventsCounter() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <motion.div
      className="absolute bottom-20 left-10 bg-neural-gray/50 backdrop-blur-sm border border-neural-green/30 rounded-lg p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="text-3xl font-bold neural-text">
        {(45000 + count).toLocaleString()}
      </div>
      <div className="text-neural-accent">Events Discovered</div>
      <div className="text-sm text-neural-blue mt-2">
        Real-time across 20+ sources
      </div>
    </motion.div>
  )
}

export default function NeuralEntry() {
  return (
    <section className="min-h-screen bg-neural-gradient flex items-center justify-center relative overflow-hidden">
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <NeuralNetwork />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      {/* Floating Code Snippets */}
      <FloatingCode />
      
      {/* Events Counter */}
      <EventsCounter />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo */}
          <div className="text-4xl font-bold mb-6 neural-text">
            LocX
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">We don't build</span>
            <br />
            <span className="neural-text">event apps.</span>
            <br />
            <span className="text-white">We build the</span>
            <br />
            <span className="neural-text">intelligence</span>
            <br />
            <span className="text-white">that makes events</span>
            <br />
            <span className="neural-text">discoverable.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-neural-accent mb-12 max-w-4xl mx-auto">
            LocX is semantic search infrastructure for the fragmented cultural ecosystem.
            <br />
            Events are just what we make possible.
          </p>
          
          {/* Search Demo */}
          <div className="bg-neural-gray/30 backdrop-blur-sm border border-neural-green/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="text-lg text-neural-accent mb-4">
              Natural Language → Semantic Understanding
            </div>
            <div className="text-2xl">
              <TypingAnimation />
            </div>
            <div className="text-sm text-neural-blue mt-4">
              → 768-dimensional embeddings → Vector similarity search → Ranked results
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              className="bg-gradient-to-r from-neural-green to-neural-blue text-neural-dark px-8 py-4 rounded-full font-bold text-lg interactive-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore the API
            </motion.button>
            <motion.button
              className="border-2 border-neural-green text-neural-green px-8 py-4 rounded-full font-bold text-lg interactive-hover hover:bg-neural-green hover:text-neural-dark transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See the Intelligence
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neural-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neural-green rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
} 