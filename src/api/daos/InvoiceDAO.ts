 
import { Status } from '../../db/enums/Status';
import { Account } from '../../db/models/Account';
import { Invoice, InvoiceCreationAttributes, InvoiceOuput } from '../../db/models/Invoice'; 
import { PaymentError } from '../exceptions/PaymentError';

export class InvoiceDAO { 
    public createNewInvoice = async (payload:InvoiceCreationAttributes): Promise<any> => { 
 return await   Account.sequelize.transaction(async transaction => {
      return  await Account.findByPk(payload.accountId, {include:[Invoice]}).then(async(account) => { 
    return await account.$create('invoiceList', payload, {transaction}).then(invoice => {

         account.hasOutstandingBalance = true;
         account.save();  
         return invoice;
        })
         });
         });
  
    }  
    public  isInvoiceProcessable = async (invoice: InvoiceCreationAttributes): Promise<Boolean> => {  
        return  await Account.findOne({where:{studentId: invoice.account.studentId}}).then(account => { 
              return invoice != null  && account  != null
            })
                
    }
public getAllInvoices = async() => {
    return await Invoice.findAll({ include:[Account]});
}
public getInvoiceById= async(id: number) => {
    return await Invoice.findByPk(id,{ include:[Account]});
}
public getInvoiceByReference= async(reference: string) => {
    try {
        
        return await Invoice.findOne({ where:{reference: reference}, include:[Account]});
    } catch (error) {
        
        throw  new PaymentError('Cancel invoice', "Invalid Reference Number", {});
  
    }
}
   
public cancel= async(reference: string) => {
    const invoice = await this.getInvoiceByReference(reference); 
    if (invoice == null) { 
           throw  new PaymentError('Cancel invoice', "Invalid Reference Number", {});
  
    }

    if (invoice.status == Status.OUTSTANDING) {
        invoice.status =  Status.CANCELLED;
        return await invoice.save();
    } else { 
        throw  new PaymentError('Cancel Invoice', "You can't cancel an invoice that is in the " + invoice.status + " status", {...invoice});
  
    }    
}
    

public  processPayment = async(reference: string)  => { 
    const invoice = await this.getInvoiceByReference(reference); 
    if (invoice == null) {
        throw new Error(reference);
    }

    if (invoice.status == Status.OUTSTANDING) {
         invoice.status=Status.PAID;
        
        return await invoice.save();
    } else { 
        throw  new PaymentError('Pay Invoice', "You can't pay an invoice that is in the " + invoice.status + " status", {...invoice});
    }
}
 
}