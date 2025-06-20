import NeuralEntry from '@/components/sections/NeuralEntry'
import HumanElement from '@/components/sections/HumanElement'
import HowTheMachineWorks from '@/components/sections/HowTheMachineWorks'

export default function Home() {
  return (
    <div className="min-h-screen">
      <NeuralEntry />
      <HumanElement />
      <HowTheMachineWorks />
    </div>
  )
}
