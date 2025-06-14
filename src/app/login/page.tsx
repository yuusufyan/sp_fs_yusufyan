"use client"
import Card from "@/components/Card"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    // redirect ke dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <Card className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-600">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <Input type="email" className="text-gray-500" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <Input type="password" className="text-gray-500" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="text-center text-sm text-gray-700">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </Link>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-fit px-6 py-3 justify-center hover:bg-blue-800 rounded-xl">Masuk</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
