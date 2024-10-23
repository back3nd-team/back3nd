import { Hono } from 'hono'
import { CollectionController } from '../controllers/collectionController'

const collectionRoutes = new Hono()

collectionRoutes.get('/', CollectionController.list)
collectionRoutes.get('/:collection', CollectionController.getDetails)
collectionRoutes.post('/', CollectionController.create)
collectionRoutes.put('/:collection', CollectionController.update)
collectionRoutes.delete('/:collection', CollectionController.delete)

export default collectionRoutes
