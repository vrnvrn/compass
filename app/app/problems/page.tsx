'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react'
import ProblemCard from '@/components/ProblemCard'
import { getStoredProblems } from '@/lib/storage'
import { ProblemBrief, PROBLEM_SCOPES, ISSUE_SPACES, URGENCY_LEVELS } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Problems() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [filteredProblems, setFilteredProblems] = useState<ProblemBrief[]>([])
  const [scope, setScope] = useState<string>(PROBLEM_SCOPES[0])
  const [issueSpace, setIssueSpace] = useState<string>(ISSUE_SPACES[0])
  const [urgency, setUrgency] = useState<string>(URGENCY_LEVELS[0])

  useEffect(() => {
    const loadedProblems = getStoredProblems()
    setProblems(loadedProblems)
    setFilteredProblems(loadedProblems)
  }, [])

  useEffect(() => {
    let filtered = [...problems]

    if (scope) {
      filtered = filtered.filter(p => !p.scope || p.scope === scope)
    }

    if (issueSpace && issueSpace !== 'All Issues') {
      filtered = filtered.filter(p => !p.issueSpace || p.issueSpace === issueSpace)
    }

    if (urgency && urgency !== 'All Levels') {
      filtered = filtered.filter(p => !p.urgency || p.urgency === urgency)
    }

    setFilteredProblems(filtered)
  }, [problems, scope, issueSpace, urgency])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2EEE3] to-[#7B9E82]/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#2D2D2A] hover:text-[#7B9E82]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex gap-4">
            <Link href="/ideas">
              <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
                <Sparkles className="mr-2 h-4 w-4" />
                View Project Ideas
              </Button>
            </Link>
            <Link href="/submit">
              <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Another Problem
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {problems.length > 0 ? (
            <section className="space-y-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-[#2D2D2A]">
                    Local Issues
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#2D2D2A]/70">Scope:</span>
                      <Select value={scope} onValueChange={setScope}>
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROBLEM_SCOPES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#2D2D2A]/70">Category:</span>
                      <Select value={issueSpace} onValueChange={setIssueSpace}>
                        <SelectTrigger className="w-[160px] bg-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {ISSUE_SPACES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#2D2D2A]/70">Urgency:</span>
                      <Select value={urgency} onValueChange={setUrgency}>
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {URGENCY_LEVELS.map((u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredProblems.map((p, idx) => (
                    <div key={idx} className="transform transition-all hover:scale-[1.02]">
                      <ProblemCard problem={p} />
                    </div>
                  ))}
                  {filteredProblems.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-[#2D2D2A] text-lg">
                        No issues match the selected filters
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#2D2D2A] text-lg mb-6">
                No issues submitted yet
              </p>
              <Link href="/submit">
                <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Submit Your First Issue
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 