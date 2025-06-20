'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Text, Line } from '@react-three/drei'
import * as THREE from 'three'

// NLP Pipeline Visualization Component
function NLPPipeline() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      title: "Natural Language Input",
      description: "User query received",
      code: '"free queer workshops near me"',
      color: "#ffffff",
      icon: "🗣️"
    },
    {
      title: "Tokenization & Preprocessing", 
      description: "Text → structured tokens",
      code: '["free", "queer", "workshops", "near", "me"]',
      color: "#00ccff",
      icon: "🔤"
    },
    {
      title: "BERT Embeddings",
      description: "Tokens → 768-dimensional vectors",
      code: 'tensor([0.23, -0.45, 0.67, ...768 dims])',
      color: "#00ff88",
      icon: "🧠"
    },
    {
      title: "Semantic Understanding",
      description: "Context-aware interpretation",
      code: 'query_intent: "cultural_workshop_lgbtq"',
      color: "#ff6b6b",
      icon: "💡"
    },
    {
      title: "Vector Search",
      description: "Similarity matching in vector space",
      code: 'cosine_similarity(query_vec, event_vecs)',
      color: "#ffd93d",
      icon: "🔍"
    },
    {
      title: "Results Ranking",
      description: "Relevance + location + time scoring",
      code: 'ranked_results = sort(scores, reverse=True)',
      color: "#6bcf7f",
      icon: "📊"
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [steps.length])
  
  return (
    <div className="bg-neural-gray/20 backdrop-blur-sm border border-neural-green/30 rounded-2xl p-8">
      <h3 className="text-3xl font-bold neural-text text-center mb-8">
        NLP Pipeline in Real-Time
      </h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
              currentStep === index 
                ? 'bg-neural-gray/50 border-l-4 border-neural-green' 
                : 'opacity-50'
            }`}
            animate={{
              scale: currentStep === index ? 1.02 : 1,
              backgroundColor: currentStep === index ? 'rgba(0, 255, 136, 0.1)' : 'transparent'
            }}
          >
            <div className="text-3xl">{step.icon}</div>
            
            <div className="flex-1">
              <h4 className="font-bold text-lg" style={{ color: step.color }}>
                {step.title}
              </h4>
              <p className="text-neural-accent text-sm mb-2">{step.description}</p>
              <code className="text-xs font-mono bg-neural-dark/50 px-2 py-1 rounded">
                {step.code}
              </code>
            </div>
            
            {currentStep === index && (
              <motion.div
                className="w-2 h-2 bg-neural-green rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 3D Vector Space Visualization
function VectorSpace() {
  const groupRef = useRef<THREE.Group>(null)
  const [activeVector, setActiveVector] = useState(0)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })
  
  // Simulate word embeddings in 3D space
  const wordVectors = [
    { word: "workshop", position: [2, 1, 0] as [number, number, number], color: "#00ff88" },
    { word: "queer", position: [1, 2, 1] as [number, number, number], color: "#00ccff" },
    { word: "art", position: [0, 1, 2] as [number, number, number], color: "#ff6b6b" },
    { word: "music", position: [-1, 0, 1] as [number, number, number], color: "#ffd93d" },
    { word: "dance", position: [1, -1, 0] as [number, number, number], color: "#6bcf7f" },
    { word: "gallery", position: [-2, 1, -1] as [number, number, number], color: "#ff9ff3" },
    { word: "party", position: [0, 0, -2] as [number, number, number], color: "#54a0ff" },
    { word: "community", position: [2, -1, 1] as [number, number, number], color: "#5f27cd" }
  ]
  
  return (
    <group ref={groupRef}>
      {/* 3D Grid */}
      <gridHelper args={[10, 10, '#333333', '#333333']} />
      
      {/* Word vectors as spheres */}
      {wordVectors.map((vector, index) => (
        <group key={index}>
          <Sphere
            position={vector.position}
            args={[0.15, 16, 16]}
            onClick={() => setActiveVector(index)}
          >
            <meshStandardMaterial
              color={vector.color}
              emissive={vector.color}
              emissiveIntensity={activeVector === index ? 0.5 : 0.2}
              transparent
              opacity={0.8}
            />
          </Sphere>
          
          {/* Word labels */}
          <Text
            position={[vector.position[0], vector.position[1] + 0.3, vector.position[2]]}
            fontSize={0.2}
            color={vector.color}
            anchorX="center"
            anchorY="middle"
          >
            {vector.word}
          </Text>
          
          {/* Connection lines to origin */}
          <Line
            points={[[0, 0, 0], vector.position]}
            color={vector.color}
            lineWidth={activeVector === index ? 3 : 1}
            transparent
            opacity={0.4}
          />
        </group>
      ))}
      
      {/* Origin point */}
      <Sphere position={[0, 0, 0]} args={[0.1, 16, 16]}>
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} />
      </Sphere>
    </group>
  )
}

// Data Sources Animation
function DataSources() {
  const [activeSource, setActiveSource] = useState(0)
  
  const sources = [
    { name: "Eventbrite API", type: "REST", count: "12.5K", color: "#00ff88" },
    { name: "Facebook Events", type: "Graph API", count: "8.2K", color: "#00ccff" },
    { name: "Instagram Scraper", type: "Custom", count: "15.7K", color: "#ff6b6b" },
    { name: "Meetup API", type: "REST", count: "5.3K", color: "#ffd93d" },
    { name: "Berlin.de", type: "XML Feed", count: "3.1K", color: "#6bcf7f" },
    { name: "Telegram Channels", type: "Bot API", count: "9.4K", color: "#ff9ff3" }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSource((prev) => (prev + 1) % sources.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [sources.length])
  
  return (
    <div className="bg-neural-gray/20 backdrop-blur-sm border border-neural-blue/30 rounded-2xl p-8">
      <h3 className="text-3xl font-bold neural-text text-center mb-8">
        Multi-Source Data Ingestion
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-500 ${
              activeSource === index 
                ? 'border-neural-green bg-neural-gray/30' 
                : 'border-neural-gray/50'
            }`}
            animate={{
              scale: activeSource === index ? 1.05 : 1,
              borderColor: activeSource === index ? source.color : 'rgba(255,255,255,0.1)'
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="font-bold text-sm">{source.name}</span>
            </div>
            
            <div className="text-xs text-neural-accent mb-1">{source.type}</div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold" style={{ color: source.color }}>
                {source.count}
              </span>
              {activeSource === index && (
                <motion.div
                  className="text-xs text-neural-green"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  LIVE
                </motion.div>
              )}
            </div>
            
            {/* Data flow animation */}
            {activeSource === index && (
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-neural-green to-transparent mt-2 rounded"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-2xl font-bold neural-text">54.2K Events/Week</div>
        <div className="text-neural-accent">Processed & Indexed</div>
      </div>
    </div>
  )
}

// Real-time Performance Metrics
function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    responseTime: 89,
    accuracy: 94.7,
    throughput: 1250,
    uptime: 99.94
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        responseTime: 85 + Math.random() * 10,
        accuracy: 94 + Math.random() * 2,
        throughput: 1200 + Math.random() * 100,
        uptime: 99.9 + Math.random() * 0.09
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <motion.div
        className="bg-neural-gray/30 backdrop-blur-sm border border-neural-green/30 rounded-xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-3xl font-black neural-text mb-2">
          {metrics.responseTime.toFixed(0)}ms
        </div>
        <div className="text-neural-accent">Response Time</div>
                 <div className="text-xs text-neural-blue mt-1">{'< 100ms SLA'}</div>
      </motion.div>
      
      <motion.div
        className="bg-neural-gray/30 backdrop-blur-sm border border-neural-blue/30 rounded-xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-3xl font-black neural-text mb-2">
          {metrics.accuracy.toFixed(1)}%
        </div>
        <div className="text-neural-accent">Semantic Accuracy</div>
        <div className="text-xs text-neural-blue mt-1">Human-validated</div>
      </motion.div>
      
      <motion.div
        className="bg-neural-gray/30 backdrop-blur-sm border border-neural-green/30 rounded-xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-3xl font-black neural-text mb-2">
          {metrics.throughput.toFixed(0)}
        </div>
        <div className="text-neural-accent">Queries/Min</div>
        <div className="text-xs text-neural-blue mt-1">Peak capacity</div>
      </motion.div>
      
      <motion.div
        className="bg-neural-gray/30 backdrop-blur-sm border border-neural-blue/30 rounded-xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-3xl font-black neural-text mb-2">
          {metrics.uptime.toFixed(2)}%
        </div>
        <div className="text-neural-accent">Uptime</div>
        <div className="text-xs text-neural-blue mt-1">Last 30 days</div>
      </motion.div>
    </div>
  )
}

export default function HowTheMachineWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  return (
    <section ref={ref} className="min-h-screen bg-neural-gradient py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-black mb-6">
            <span className="text-white">How the</span>
            <br />
            <span className="neural-text">machine</span>
            <br />
            <span className="text-white">understands</span>
            <br />
            <span className="neural-text">culture.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-accent max-w-4xl mx-auto mb-8">
            Semantic Understanding at Scale
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-bold neural-text">768</div>
              <div className="text-sm text-neural-accent">Dimensional Embeddings</div>
            </div>
            <div>
              <div className="text-2xl font-bold neural-text">20+</div>
              <div className="text-sm text-neural-accent">Data Sources</div>
            </div>
            <div>
              <div className="text-2xl font-bold neural-text">{'<100ms'}</div>
              <div className="text-sm text-neural-accent">Query Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold neural-text">99.9%</div>
              <div className="text-sm text-neural-accent">Uptime SLA</div>
            </div>
          </div>
        </motion.div>
        
        {/* Two Column Layout: NLP Pipeline + Vector Space */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <NLPPipeline />
          </motion.div>
          
          <motion.div
            className="bg-neural-gray/20 backdrop-blur-sm border border-neural-blue/30 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold neural-text text-center mb-8">
              Vector Space Visualization
            </h3>
            <div className="h-96">
              <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <VectorSpace />
              </Canvas>
            </div>
            <p className="text-center text-neural-accent text-sm mt-4">
              Words with similar meanings cluster in vector space
            </p>
          </motion.div>
        </div>
        
        {/* Data Sources */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <DataSources />
        </motion.div>
        
        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold neural-text text-center mb-12">
            Real-Time Performance
          </h3>
          <PerformanceMetrics />
        </motion.div>
        
        {/* Technical Philosophy */}
        <motion.div
          className="text-center mt-16 bg-neural-gray/10 backdrop-blur-sm border border-neural-green/20 rounded-2xl p-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold neural-text mb-6">
            Not Keyword Matching. Intelligence.
          </h3>
          <p className="text-xl text-neural-accent max-w-4xl mx-auto mb-8">
            Traditional search fails because it treats language as keywords. 
            We understand meaning, context, and cultural nuance through neural embeddings.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="code-block p-6">
              <h4 className="text-neural-green font-bold mb-3">❌ Traditional Search:</h4>
              <code className="text-sm">
                query = "workshop"<br/>
                results = exact_match("workshop")<br/>
                # Misses: "class", "session", "tutorial"
              </code>
            </div>
            
            <div className="code-block p-6">
              <h4 className="text-neural-green font-bold mb-3">✅ LocX Semantic:</h4>
              <code className="text-sm">
                embedding = bert_encode(query)<br/>
                results = cosine_similarity(embedding)<br/>
                # Finds: workshops, classes, sessions, tutorials
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 