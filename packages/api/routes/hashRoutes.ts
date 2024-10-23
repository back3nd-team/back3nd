import { Hono } from 'hono'
import { hashPassword } from '../controllers/hashController'

const hashRoutes = new Hono()

hashRoutes.post('/hash-password', hashPassword)

export default hashRoutes