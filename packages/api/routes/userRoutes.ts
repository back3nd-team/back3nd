import { Hono } from 'hono'
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../controllers/userController'

const userRoutes = new Hono()

userRoutes.post('/', createUser)
userRoutes.get('/', listUsers)
userRoutes.get('/:user_id', getUser)
userRoutes.put('/:user_id', updateUser)
userRoutes.delete('/:user_id', deleteUser)

export default userRoutes
