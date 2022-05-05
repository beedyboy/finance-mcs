import { Router } from 'express'
import accountRouter from './account' 
import invoiceRouter from './invoice'
import portalRouter from './portal'

const router = Router()

router.use('/accounts', accountRouter)
router.use('/invoices', invoiceRouter)
router.use('/portal', portalRouter) 

export default router