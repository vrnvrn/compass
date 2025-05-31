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
import { Shield, CheckCircle2, Loader2 } from 'lucide-react'

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
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailVerified: false,
    },
  })

  const email = watch('email')
  const emailVerified = watch('emailVerified')

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
            <Input
              placeholder="Problem Title"
              {...register('title')}
              className={`bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 ${
                errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the problem..."
              {...register('description')}
              className={`bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 min-h-[120px] ${
                errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
              rows={4}
            />
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