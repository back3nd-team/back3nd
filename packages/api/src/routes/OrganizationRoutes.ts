import { Hono } from 'hono'
import { OrganizationController } from '../controllers/OrganizationController'

const organizationRoutes = new Hono()

organizationRoutes.post('/add-member', OrganizationController.addMember)

export default organizationRoutes
