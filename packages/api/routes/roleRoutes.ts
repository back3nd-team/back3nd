import { Hono } from 'hono'
import { createRole, deleteRole, getRole, listRoles, updateRole } from '../controllers/roleController'

const roleRoutes = new Hono()

roleRoutes.post('/', createRole)
roleRoutes.get('/', listRoles)
roleRoutes.get('/:role_id', getRole)
roleRoutes.put('/:role_id', updateRole)
roleRoutes.delete('/:role_id', deleteRole)

export default roleRoutes