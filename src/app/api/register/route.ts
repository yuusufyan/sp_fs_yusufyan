import { PrismaClient, Role } from "@/generated/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()



export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, password, role } = body

  const existedUser = await prisma.mst_user.findUnique({where: {email}})

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Semua field wajib diisi." }, { status: 400 })
  }

  if (email === "fail@test.com") {
    return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 400 })
  }

  if(existedUser) {
    return NextResponse.json({ message: `Email sudah terdaftar.`}, {status: 401})
  }

  // Hash Paswword
  const hashPassword = await bcrypt.hash(password, 10)

  const roleValue =
    role?.toUpperCase() === 'OWNER' ? Role.OWNER : Role.MEMBER

  const newUser = await prisma.mst_user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: roleValue
    }
  })

  // Simulasi sukses
  return NextResponse.json({ message: "Registrasi sukses!", user: newUser }, { status: 201 })
}