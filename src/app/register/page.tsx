"use client"
import Card from "@/components/Card"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import { useState } from "react"
import Modal from "@/components/Modal"
import { useRouter } from "next/navigation"



export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handlerRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError("Semua field wajib diisi.")
      return
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.")
      return
    }

    setError("")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registrasi gagal.")
        return
      }

      // ✅ Kalau sukses, bisa redirect atau tampilkan pesan
      // alert("Registrasi berhasil!")
      setSuccess(true)
      // router.push("/login")
    } catch (err) {
      console.error("Register error:", err)
      setError("Terjadi kesalahan server.")
    }

    console.log("Register Form: ", { name, email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <Card className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-600">Register</h1>
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handlerRegister}>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Nama</label>
            <Input type="text" className="text-gray-500" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <Input type="email" className="text-gray-500" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <Input type="password" className="text-gray-500" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="text-center text-sm text-gray-700">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Masuk di sini
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-fit px-6 py-3 justify-center hover:bg-blue-800 rounded-xl">
              Daftar
            </Button>
          </div>
        </form>
      </Card>

      <Modal
        open={success}
        title="Registrasi Berhasil!"
        onClose={() => {
          setSuccess(false)
          router.push("/login")
        }}
      >
        <p className="text-sm text-gray-600">Akun kamu sudah dibuat.</p>
      </Modal>
    </div>
  )
}
