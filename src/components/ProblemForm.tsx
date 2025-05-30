'use client'

import { useState } from 'react'
import { ProblemBrief } from '@/lib/types'

export default function ProblemForm({ onSubmit }: { onSubmit: (p: ProblemBrief) => void }) {
  const [form, setForm] = useState<ProblemBrief>({
    title: '',
    description: '',
    submittedBy: '',
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
        setForm({ title: '', description: '', submittedBy: '' })
      }}
      className="space-y-4 border p-4 rounded-xl bg-white shadow"
    >
      <h2 className="text-xl font-semibold">Submit a Community Problem</h2>
      <input
        className="w-full border rounded p-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Your Email"
        type="email"
        value={form.submittedBy}
        onChange={(e) => setForm({ ...form, submittedBy: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  )
}