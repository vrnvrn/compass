'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, PlusCircle, ListChecks, Sparkles, Github, Presentation, Users, Info } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2EEE3] to-[#7B9E82]/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/compass-logo.png"
              alt="Compass Logo"
              width={400}
              height={400}
              priority
            />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-[#2D2D2A] mb-4">
            Compass
          </h1>
          <p className="text-xl text-[#2D2D2A] max-w-2xl mx-auto">
          Reorienting global hackathons toward grounded, collective impact.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Stakeholder Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2D2D2A] text-center">For Stakeholders</h2>
            <p className="text-center text-[#2D2D2A]/80 mb-4">
              Organizations and individuals with real-world problems to solve
            </p>
            <Link href="/submit" className="block">
              <Button
                className="w-full bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 transition-opacity h-16 text-lg text-[#F2EEE3]"
                size="lg"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit a Problem
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Builders Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2D2D2A] text-center">For Builders</h2>
            <p className="text-center text-[#2D2D2A]/80 mb-4">
              Developers, designers, and innovators ready to create impact
            </p>
            <div className="space-y-4">
              <Link href="/problems" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-[#7B9E82]/70 via-[#7B9E82]/90 to-[#7B9E82]/70 hover:opacity-90 transition-opacity h-16 text-lg text-[#F2EEE3]"
                  size="lg"
                >
                  <ListChecks className="mr-2 h-5 w-5" />
                  View Problems
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/ideas" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-[#7B9E82]/70 via-[#7B9E82]/90 to-[#7B9E82]/70 hover:opacity-90 transition-opacity h-16 text-lg text-[#F2EEE3]"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Project Ideas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hackathon Organizers Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2D2D2A] text-center">For Hackathon Organizers</h2>
            <p className="text-center text-[#2D2D2A]/80 mb-4">
              Event organizers and community leaders shaping the future of hackathons
            </p>
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-[#7B9E82]/40 via-[#7B9E82]/60 to-[#7B9E82]/40 cursor-not-allowed opacity-70 h-16 text-lg text-[#F2EEE3]"
                size="lg"
                disabled
              >
                Admin Dashboard (Coming Soon)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8">
            <Link 
              href="/about"
              className="text-[#2D2D2A] hover:text-[#7B9E82] transition-colors"
            >
              <Info className="h-8 w-8" />
            </Link>
            <a 
              href="https://github.com/vrnvrn/compass" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-8 w-8 text-[#2D2D2A] hover:text-[#7B9E82] transition-colors" />
            </a>
            <a 
              href="https://www.canva.com/design/DAGpA7CIkkI/pwE_ue6ab69tMFyLTodhaQ/view?utm_content=DAGpA7CIkkI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfdc6cb2884" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Presentation className="h-8 w-8 text-[#2D2D2A] hover:text-[#7B9E82] transition-colors" />
            </a>
            <a 
              href="https://github.com/vrnvrn/compass/graphs/contributors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Users className="h-8 w-8 text-[#2D2D2A] hover:text-[#7B9E82] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 