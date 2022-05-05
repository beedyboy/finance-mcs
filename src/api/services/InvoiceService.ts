import { Account} from '../../db/models/Account'; 
import { InvoiceDAO } from '../daos/InvoiceDAO';
import { Invoice, InvoiceCreationAttributes } from '../../db/models/Invoice';
import { Status } from '../../db/enums/Status';  
import helper from '../../utils/helper'; 

export class InvoiceService {
  
   private DAO: InvoiceDAO = new InvoiceDAO(); 
   
    public createNewInvoice = async (payload: InvoiceCreationAttributes): Promise<Invoice> => {
      try {
        const {studentId} = payload.account;
        const account  = await Account.findOne({where: {studentId: studentId}});
        payload.accountId = account.id;  
        payload.status= Status.OUTSTANDING;
        payload.reference = await helper.populateReference();
         return await this.DAO.createNewInvoice(payload).then(newInvoice=>{ 
        return newInvoice;
        })
      } catch (error) {
          console.log('service', error);
      }
    }
    public isInvoiceProcessable = async (invoice: InvoiceCreationAttributes): Promise<Boolean> => {
        return await this.DAO.isInvoiceProcessable(invoice);
    }
    public getAllInvoices = async () => {
        return await this.DAO.getAllInvoices();
    }
    public getInvoiceById = async (id: number) => {
        return await this.DAO.getInvoiceById(id);
    }
    public getInvoiceByReference = async (reference: string) => {
        return await this.DAO.getInvoiceByReference(reference);
    }
    public pay = async (reference: string) => {
        return await this.DAO.processPayment(reference);
    }
    public cancel = async (reference: string) => {
        return await this.DAO.cancel(reference);
    }
 
}