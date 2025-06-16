import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'


export const SeeAllBlogs = () => {
  return (
    <div className="flex items-center justify-start mt-4">
      <Link href="/blogs" className={cn(buttonVariants({ variant: 'ghost' }), 'text-sm')}>
        <ArrowLeft className="mr-2" />
        See all blogs
      </Link>
    </div>
  )
}
