import Link from 'next/link'
import { getUserTags } from '@/auth/actions'
import logo from '../app/assets/images/logo.svg'
import archive from '../app/assets/images/icon-tag.svg'
import rightArrow from '../app/assets/images/icon-chevron-right.svg'
import Image from 'next/image'

export default async function Sidebar() {
  const tags = await getUserTags()

  return (
    <div className="w-64 border-r border-neutral-200 h-full flex flex-col pt-6 px-4">
      {/* Logo */}
      <div className="w-[5.938rem] h-7 mb-7">
        <Image src={logo} alt='Notes app logo' className='w-full h-full object-cover'/>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="space-y-1 pb-2 border-b border-neutral-200">
          <Link 
            href="/"
            className="flex items-center gap-2 pl-3 pr-4 py-2.5 text-preset-4 text-neutral-700 rounded-[.5rem] hover:bg-neutral-100 hover:text-neutral-950 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className='fill-current group-hover:fill-blue-500 transition-colors'>
                <path fillRule="evenodd" d="M4.496 8.025a.75.75 0 0 1 .75.75v8.675a2.314 2.314 0 0 0 2.314 2.314h8.88a2.314 2.314 0 0 0 2.313-2.314V8.775a.75.75 0 0 1 1.5 0v8.675a3.814 3.814 0 0 1-3.814 3.814H7.56a3.814 3.814 0 0 1-3.814-3.814V8.775a.75.75 0 0 1 .75-.75Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M10.06 3.41a3.127 3.127 0 0 1 3.88 0l7.525 5.958a.75.75 0 1 1-.93 1.176l-7.526-5.957a1.628 1.628 0 0 0-2.018 0l-7.525 5.957a.75.75 0 1 1-.931-1.176L10.06 3.41Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M17.668 4.193a.75.75 0 0 1 .75.75v2.354a.75.75 0 0 1-1.5 0V4.943a.75.75 0 0 1 .75-.75ZM11.974 13.688h.055c.377 0 .702 0 .97.02.283.022.565.071.838.203a2.25 2.25 0 0 1 1.05 1.05c.131.272.18.554.202.837.02.268.02.593.02.97v3.746a.75.75 0 0 1-1.5 0v-3.718c0-.412 0-.678-.015-.881-.016-.195-.041-.268-.059-.303a.75.75 0 0 0-.35-.35c-.035-.017-.108-.043-.302-.058a12.747 12.747 0 0 0-.881-.017c-.412 0-.679.001-.881.017-.195.015-.268.04-.303.058a.75.75 0 0 0-.35.35c-.017.035-.043.108-.058.303-.016.203-.016.469-.016.88v3.72a.75.75 0 0 1-1.5 0v-3.747c0-.377 0-.702.02-.97.022-.283.071-.565.203-.838a2.25 2.25 0 0 1 1.05-1.05c.273-.131.554-.18.837-.202.268-.02.593-.02.97-.02Z" clipRule="evenodd"/>
            </svg>

            <span className='flex-1'> All Notes</span>
            
            <Image src={rightArrow} alt='right arrow icon' className='hidden group-hover:block'/>
          </Link>

          <Link 
            href="/archived"
           className="flex items-center gap-2 pl-3 pr-4 py-2.5 text-preset-4 text-neutral-700 rounded-[.5rem] hover:bg-neutral-100 hover:text-neutral-950 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className='stroke-current group-hover:stroke-blue-500 transition-colors'>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"/>
            </svg>
           
            <span className='flex-1'> Archived Notes</span>

            <Image src={rightArrow} alt='right arrow icon' className='hidden group-hover:block'/>
          </Link>
        </div>

        {/* Tags Section */}
        <div className="pt-2">
          <h3 className="px-2 text-preset-4 text-neutral-500">
            Tags
          </h3>
          <div className="mt-2 space-y-1">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.name}`}
               className="flex items-center gap-2 pl-3 pr-4 py-2.5 text-preset-4 text-neutral-700 rounded-[.5rem] hover:bg-neutral-100 hover:text-neutral-950 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className='stroke-current group-hover:stroke-blue-500 transition-colors'>
                    <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z" clip-rule="evenodd"/>
                    <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z" clip-rule="evenodd"/>
                </svg>

                <span className='flex-1'>{tag.name}</span>

                <Image src={rightArrow} alt='right arrow icon' className='hidden group-hover:block'/>
            
              </Link>
            ))}

            {tags.length === 0 && (
              <p className="px-3 py-2 text-sm text-gray-400">
                No tags yet
              </p>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
