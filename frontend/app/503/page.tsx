/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ihtg1WBPvGC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Progress } from "@/components/ui/progress"
import { onest } from "@/font/font"
import React from "react"
export default function UnderMaintenance() {
    const [progress, setProgress] = React.useState(13)
 
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
  return (
    <div className={`flex flex-col items-center justify-center h-[100vh] bg-background px-6 ${onest.className}`}>
      <img src="/maintenance.png" alt="maintain" className="w-60 h-40"/>
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-primary">Application Under Development</h1>
        <p className="text-lg text-muted-foreground">
          Our team is working hard to bring you an exceptional experience.
        </p>
      </div>
      <div className="w-full max-w-md mt-8">
      <Progress value={progress} className="w-[60%]" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">We appreciate your patience and understanding.</p>
    </div>
  )
}