import { Hono } from 'hono'
import { PrismaFileController } from '../controllers/prismaFileController'

const prismaFileRoutes = new Hono()

prismaFileRoutes.get('/', PrismaFileController.list)
prismaFileRoutes.get('/:filename', PrismaFileController.read)
prismaFileRoutes.post('/:filename', PrismaFileController.update)

export default prismaFileRoutes
