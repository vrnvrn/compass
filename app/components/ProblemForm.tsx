'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormData, ProblemBrief } from '@/lib/types'
import { Shield, CheckCircle2, Loader2, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

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
    }
    
    onSubmit(problem)
    
    // Reset form after successful submission
    reset({
      title: '',
      description: '',
      email: '',
      emailVerified: false,
    })
    toast.success('Problem submitted successfully!')
  }

  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg shadow-gray-100/50">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
        <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
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
                className={`bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 ${
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
                  className="h-7 px-2 text-gray-500 hover:text-indigo-600"
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
                className={`bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 min-h-[120px] ${
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
                  className="h-7 px-2 text-gray-500 hover:text-indigo-600"
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

          <div className="space-y-3">
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register('email')}
                  className={`pl-9 bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
                  } ${emailVerified ? 'pr-28' : ''}`}
                />
                {emailVerified && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-2 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </span>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {email && !emailVerified && (
              <Button
                type="button"
                onClick={verifyEmail}
                disabled={verifying}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity"
              >
                {verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying with Vlayer...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify Email with Vlayer
                  </>
                )}
              </Button>
            )}

            {emailVerified && (
              <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-2.5 text-sm text-emerald-700">
                <p className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Email verified through Vlayer
                </p>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            disabled={!emailVerified}
            size="lg"
          >
            Submit Problem
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 