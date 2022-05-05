
import {  Request, Response} from 'express'
import { InvoiceService } from '../services/InvoiceService';
export class PortalController {  
  private service: InvoiceService;
  constructor() {
    this.service = new InvoiceService();
  }
  public showPortal = async (req:Request, res: Response) => { 
    res.render("portal", {error: ""}); 
  };
  public findInvoiceThroughPortal = async (req:Request, res: Response) => { 
    const reference = req.body.reference;
    await  this.service.getInvoiceByReference(reference).then((invoice) => {
      console.log('invoice', invoice)
      if(invoice === null) {
        
         res.render("portal", {error: "Invoice not found!!! Please check the reference and try again..."}); 
      }
      res.render("invoice", {invoice: invoice, message: ""});
    }) 
  };
  public payInvoice = async (req:Request, res: Response) => { 
    const reference = req.body.reference; 
    await  this.service.pay(reference).then((invoice) => {
      // console.log({invoice})
      if(invoice){ 
        res.render("invoice", {invoice: invoice, message: "invoice paid"});
      } else {

        res.render("invoice", {invoice: invoice});
      }
    }).catch((error) => {
      // console.log({error})
      res.render("invoice", {invoice: error.data, message: error.message});
    })
  };
} 
