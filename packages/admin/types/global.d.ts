interface TUser {
  id: string
  name: string
  email: string
  token: string
  createdAt: Date
  updatedAt: Date
  emailVerified: boolean
  image?: string | null // Optional
}
