import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground p-4">
      <div
        className="text-center"
      >
        <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
        <div className="h-px w-24 mx-auto bg-muted-foreground/50 my-4" />
        <p className="text-muted-foreground mb-8">This page doesn't exist</p>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }),
            "group inline-flex items-center text-sm font-medium transition-colors"
          )}
        >
          <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
