'use client'

//Import Needed Icons
import { EmojiSad } from "iconsax-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <main className="h-full min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center text-center p-8">
              <EmojiSad size="60" className="text-slate-800"/>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-8">Page is not found</h1>
              <div className="mt-8 text-sm md:text-base xl:text-lg font-medium">
                 <p>An error was encountered.</p>
                  <p className="mt-2">Kindly go back</p> 
              </div>
        </main>
      </body>
    </html>
  )
}