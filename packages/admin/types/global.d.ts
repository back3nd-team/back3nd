export interface TUser {
  id: string
  name: string
  email: string
  token: string
  createdAt: Date
  updatedAt: Date
  emailVerified: boolean
  image?: string | null // Optional
}

export interface TOrganization {
  id: string
  name: string
  slug: string
  logo?: string
  createdAt: string
  metadata?: any
  members?: Array<{
    id: string
    role: string
    user: {
      email: string
      name: string
    }
  }>
}
