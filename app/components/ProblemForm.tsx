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
    <Card>
      <CardHeader>
        <CardTitle>Submit a Local Problem</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Problem Title"
              {...register('title')}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the problem..."
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Your Email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="button"
              onClick={verifyEmail}
              disabled={!email || verifying || emailVerified}
            >
              {verifying ? 'Verifying...' : emailVerified ? 'Verified ✓' : 'Verify Email with Vlayer'}
            </Button>
          </div>
          <Button type="submit" className="w-full" disabled={!emailVerified}>
            Submit Problem
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 