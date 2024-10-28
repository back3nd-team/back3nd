import { Hono } from 'hono'
import { EntityFieldsController } from '../controllers/entityFieldsController'

const entityFieldsRoutes = new Hono()

entityFieldsRoutes.get('/:entityID', EntityFieldsController.list)
entityFieldsRoutes.post('/', EntityFieldsController.create)

export default entityFieldsRoutes
