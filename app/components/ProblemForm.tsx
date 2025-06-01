'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormData, ProblemBrief, PROBLEM_SCOPES, ISSUE_SPACES, URGENCY_LEVELS } from '@/lib/types'
import { Shield, CheckCircle2, Loader2, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Custom error class for better error handling
class GenerationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'GenerationError';
  }
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  email: z.string().email('Invalid email address'),
  emailVerified: z.boolean(),
  scope: z.string().min(1, 'Scope is required'),
  issueSpace: z.string().min(1, 'Issue space is required'),
  urgency: z.string().min(1, 'Urgency level is required'),
})

interface ProblemFormProps {
  onSubmit: (problem: ProblemBrief) => void
}

export default function ProblemForm({ onSubmit }: ProblemFormProps) {
  const [verifying, setVerifying] = useState(false)
  const [generatingTitle, setGeneratingTitle] = useState(false)
  const [generatingDescription, setGeneratingDescription] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailVerified: false,
      scope: PROBLEM_SCOPES[0],
      issueSpace: ISSUE_SPACES[0],
      urgency: URGENCY_LEVELS[1], // Default to 'Critical'
    },
  })

  const email = watch('email')
  const emailVerified = watch('emailVerified')
  const currentTitle = watch('title')

  const generateText = async (type: 'title' | 'description') => {
    const setGenerating = type === 'title' ? setGeneratingTitle : setGeneratingDescription;
    
    try {
      setGenerating(true);

      let prompt = '';
      if (type === 'title') {
        prompt = `Generate a realistic and meaningful local community problem title. 
The title should be:
1. Concise (max 10 words)
2. Specific to a local community issue
3. Action-oriented
4. Engaging and clear

Format: Return only the title text, nothing else.`;
      } else {
        prompt = `Generate a realistic and meaningful description for this local community problem title: "${currentTitle}"

The description should:
1. Be 2-3 sentences long
2. Clearly explain the problem's impact on the community
3. Be specific and actionable
4. Use clear, non-technical language
5. Focus on real issues that could be addressed with technology
6. Directly relate to and expand upon the provided title

Format: Return only the description text, nothing else.`;
      }

      const response = await fetch('/api/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          type,
          prompt,
          systemPrompt: "You are a local community problem expert who helps identify and articulate meaningful community issues that could be solved with technology."
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new GenerationError(data.error || 'Failed to generate text', data.details);
      }

      setValue(type, data.text);
      toast.success(`Generated ${type} successfully!`);

    } catch (error) {
      console.error('Error generating text:', error);
      const errorMessage = error instanceof GenerationError 
        ? error.message 
        : 'An unexpected error occurred while generating text';
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  const verifyEmail = async () => {
    setVerifying(true)
    // TODO: Implement actual email verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    setValue('emailVerified', true)
    setValue('verifiedDomain', email.split('@')[1])
    setVerifying(false)
  }

  const onSubmitForm = (data: FormData) => {
    if (!data.emailVerified) return
    
    const problem: ProblemBrief = {
      title: data.title,
      description: data.description,
      email: data.email,
      verifiedDomain: email.split('@')[1],
      scope: data.scope,
      issueSpace: data.issueSpace,
      urgency: data.urgency,
    }
    
    onSubmit(problem)
    
    // Reset form after successful submission
    reset({
      title: '',
      description: '',
      email: '',
      emailVerified: false,
      scope: PROBLEM_SCOPES[0],
      issueSpace: ISSUE_SPACES[0],
      urgency: URGENCY_LEVELS[1],
    })
    toast.success('Problem submitted successfully!')
  }

  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg shadow-[#7B9E82]/10">
      <CardHeader className="border-b border-[#7B9E82]/10 bg-gradient-to-r from-[#F2EEE3] to-[#F2EEE3]">
        <CardTitle className="text-xl text-[#2D2D2A]">
          Submit a Local Problem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Problem Title"
                {...register('title')}
                className={`bg-[#F2EEE3]/50 border-[#7B9E82]/20 focus:border-[#7B9E82] focus:ring-[#7B9E82]/20 ${
                  errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
                } pr-[100px]`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateText('title')}
                  disabled={generatingTitle}
                  className="h-7 px-2 text-[#2D2D2A] hover:text-[#7B9E82]"
                >
                  {generatingTitle ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Textarea
                placeholder="Describe the problem..."
                {...register('description')}
                className={`bg-[#F2EEE3]/50 border-[#7B9E82]/20 focus:border-[#7B9E82] focus:ring-[#7B9E82]/20 min-h-[120px] ${
                  errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
                } pr-[100px]`}
                rows={4}
              />
              <div className="absolute right-2 top-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateText('description')}
                  disabled={generatingDescription}
                  className="h-7 px-2 text-[#2D2D2A] hover:text-[#7B9E82]"
                >
                  {generatingDescription ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Select
                value={watch('scope')}
                onValueChange={(value) => setValue('scope', value)}
              >
                <SelectTrigger className="w-full bg-[#F2EEE3]/50">
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
              {errors.scope && (
                <p className="text-red-500 text-sm">{errors.scope.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Select
                value={watch('issueSpace')}
                onValueChange={(value) => setValue('issueSpace', value)}
              >
                <SelectTrigger className="w-full bg-[#F2EEE3]/50">
                  <SelectValue placeholder="Select issue space" />
                </SelectTrigger>
                <SelectContent>
                  {ISSUE_SPACES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.issueSpace && (
                <p className="text-red-500 text-sm">{errors.issueSpace.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Select
                value={watch('urgency')}
                onValueChange={(value) => setValue('urgency', value)}
              >
                <SelectTrigger className="w-full bg-[#F2EEE3]/50">
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
              {errors.urgency && (
                <p className="text-red-500 text-sm">{errors.urgency.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Your Email"
                {...register('email')}
                className={`bg-[#F2EEE3]/50 border-[#7B9E82]/20 focus:border-[#7B9E82] focus:ring-[#7B9E82]/20 ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
                } pr-[100px]`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={verifyEmail}
                  disabled={!email || verifying || emailVerified}
                  className={`h-7 px-2 ${
                    emailVerified
                      ? 'text-[#7B9E82]'
                      : 'text-[#2D2D2A] hover:text-[#7B9E82]'
                  }`}
                >
                  {emailVerified ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : verifying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Shield className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!emailVerified}
            className="w-full bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]"
          >
            Submit Problem
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 