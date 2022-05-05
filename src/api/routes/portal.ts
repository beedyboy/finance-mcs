
   
import { Router, Request, Response} from 'express'
import { PortalController } from '../controllers/PortalController';  

const Controller =  new PortalController();  
    const portalRouter = Router(); 
    portalRouter.get('/', Controller.showPortal) 
    portalRouter.get('/invoice', Controller.showPortal) 
    .post('/invoice', Controller.findInvoiceThroughPortal)
    .post('/pay', Controller.payInvoice) 

    export default portalRouter;