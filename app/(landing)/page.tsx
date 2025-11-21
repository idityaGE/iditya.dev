import { Bento } from '@/components/landing/bento'
import { Hero } from '@/components/landing/hero'

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="border-b border-black/5 dark:border-white/10 w-full" />
      <Bento />
    </div>
  )
}

export default Home
