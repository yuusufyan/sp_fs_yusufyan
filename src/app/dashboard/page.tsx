// src/app/dashboard/page.tsx
import { decodeToken } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await decodeToken()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Selamat datang, {user.email}</h1>

      {user.role === "OWNER" && (
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Dashboard Owner</h2>
          <p className="text-gray-700">Lihat semua aktivitas tim, kelola member, dan konfigurasi sistem.</p>
        </div>
      )}

      {user.role === "MEMBER" && (
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Dashboard Member</h2>
          <p className="text-gray-700">Cek tugas kamu, kirim laporan, dan pantau progres tim.</p>
        </div>
      )}
    </div>
  )
}
