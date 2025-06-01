'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, PlusCircle, ListChecks } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
            Building Local Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hackathons drive innovation, strengthen communities, and create solutions for local needs. 
            Join us in building a better future through technology.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Link href="/submit" className="block">
            <Button
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity h-16 text-lg"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Submit a Problem
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/problems" className="block">
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition-opacity h-16 text-lg"
              size="lg"
            >
              <ListChecks className="mr-2 h-5 w-5" />
              View Problems & Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 