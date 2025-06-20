'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Particle system for emotional connections
function EmotionalParticles() {
  const groupRef = useRef<THREE.Group>(null)
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }, (_, i) => (
        <Sphere key={i} position={[
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]} args={[0.05, 8, 8]}>
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#00ff88" : "#00ccff"}
            emissive={Math.random() > 0.5 ? "#00ff88" : "#00ccff"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  )
}

// Photo gallery with diverse people at events
const culturalPhotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1541532713592-79a0317b6b52?w=400&h=600&fit=crop",
    alt: "Diverse group dancing at underground techno event",
    caption: "Berlin Underground",
    location: "Berghain"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    alt: "Multi-ethnic friends at art gallery opening",
    caption: "Gallery Opening",
    location: "Kreuzberg"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
    alt: "Young diverse crowd at outdoor festival",
    caption: "Street Festival",
    location: "Friedrichshain"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1516824711773-c1c9c7bb30ed?w=400&h=600&fit=crop",
    alt: "Queer people celebrating at pride event",
    caption: "Pride Celebration",
    location: "Warschauer Str"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    alt: "International students at workshop",
    caption: "Creative Workshop",
    location: "Prenzlauer Berg"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&h=600&fit=crop",
    alt: "Multicultural group at rooftop party",
    caption: "Rooftop Gathering",
    location: "Mitte"
  }
]

// FOMO to Discovery transformation component
function FOMOTransformation() {
  const [stage, setStage] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  const stages = [
    {
      title: "FOMO",
      subtitle: "Fear of Missing Out",
      color: "#ff0064",
      description: "69% experience anxiety about missed events",
      visual: "😰"
    },
    {
      title: "SEARCH",
      subtitle: "Semantic Understanding",
      color: "#00ccff", 
      description: "Natural language → 768-dimensional vectors",
      visual: "🔍"
    },
    {
      title: "DISCOVERY",
      subtitle: "Cultural Connection",
      color: "#00ff88",
      description: "Perfect events found, community built",
      visual: "✨"
    }
  ]
  
  return (
    <div className="relative h-64 flex items-center justify-center">
      <motion.div
        key={stage}
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-6xl mb-4">{stages[stage].visual}</div>
        <h3 
          className="text-4xl font-bold mb-2"
          style={{ color: stages[stage].color }}
        >
          {stages[stage].title}
        </h3>
        <p className="text-lg text-neural-accent mb-4">
          {stages[stage].subtitle}
        </p>
        <p className="text-sm text-neural-blue max-w-md">
          {stages[stage].description}
        </p>
      </motion.div>
    </div>
  )
}

// Emotional journey visualization
function EmotionalJourney() {
  const emotions = [
    { emotion: "Lonely", intensity: 90, color: "#ff0064" },
    { emotion: "Curious", intensity: 70, color: "#00ccff" },
    { emotion: "Excited", intensity: 95, color: "#00ff88" },
    { emotion: "Connected", intensity: 100, color: "#00ff88" },
  ]
  
  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-bold neural-text text-center mb-8">
        The Emotional Journey
      </h4>
      {emotions.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="w-24 text-right text-neural-accent">
            {item.emotion}
          </span>
          <div className="flex-1 h-4 bg-neural-gray rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.intensity}%` }}
              transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
          <span className="text-neural-blue w-12 text-left">
            {item.intensity}%
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default function HumanElement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  return (
    <section ref={ref} className="min-h-screen bg-neural-gradient-reverse py-20 relative overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <EmotionalParticles />
        </Canvas>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-black mb-6">
            <span className="text-white">Behind every</span>
            <br />
            <span className="neural-text">search query</span>
            <br />
            <span className="text-white">is a human seeking</span>
            <br />
            <span className="neural-text">connection.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-accent max-w-4xl mx-auto">
            Our algorithms don't just find events. They preserve culture. 
            They build community. They prevent isolation.
          </p>
          
          <div className="mt-8 text-3xl font-bold neural-text">
            69% experience FOMO. We eliminate it.
          </div>
        </motion.div>
        
        {/* Cultural Photo Gallery */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 neural-text">
            Culture Happens Everywhere
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {culturalPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="relative group overflow-hidden rounded-xl aspect-[3/4]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neural-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {photo.caption}
                    </h4>
                    <p className="text-neural-green text-sm">
                      📍 {photo.location}
                    </p>
                  </div>
                </div>
                
                {/* Neural glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neural-green/50 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Two Column Layout: FOMO Transformation + Emotional Journey */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* FOMO to Discovery Transformation */}
          <motion.div
            className="bg-neural-gray/20 backdrop-blur-sm border border-neural-green/20 rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold neural-text text-center mb-8">
              The Transformation
            </h3>
            <FOMOTransformation />
          </motion.div>
          
          {/* Emotional Journey */}
          <motion.div
            className="bg-neural-gray/20 backdrop-blur-sm border border-neural-blue/20 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <EmotionalJourney />
          </motion.div>
        </div>
        
        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-neural-gray/30 backdrop-blur-sm border border-neural-green/30 rounded-xl p-6">
            <div className="text-4xl font-black neural-text mb-2">84%</div>
            <div className="text-neural-accent">Germans participate in cultural activities</div>
          </div>
          
          <div className="bg-neural-gray/30 backdrop-blur-sm border border-neural-blue/30 rounded-xl p-6">
            <div className="text-4xl font-black neural-text mb-2">35%</div>
            <div className="text-neural-accent">Berlin residents are international</div>
          </div>
          
          <div className="bg-neural-gray/30 backdrop-blur-sm border border-neural-green/30 rounded-xl p-6">
            <div className="text-4xl font-black neural-text mb-2">45K</div>
            <div className="text-neural-accent">Cultural events per year in Berlin</div>
          </div>
        </motion.div>
        
        {/* Bottom Message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-2xl md:text-3xl font-light text-neural-accent">
            Every search creates connections.
            <br />
            <span className="neural-text font-bold">Every connection builds culture.</span>
            <br />
            Every culture shapes the future.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 