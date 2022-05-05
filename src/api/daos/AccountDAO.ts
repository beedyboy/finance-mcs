import { Status } from '../../db/enums/Status';
import { Account, AccountInput, AccountOuput } from '../../db/models/Account';
import { Invoice } from '../../db/models/Invoice';


export class AccountDAO {
    // private _model: Account = Account;
    public create = async (payload:AccountInput): Promise<AccountOuput> => {
     const account = await Account.create(payload);  
     return account;
    }
    public getAccountByStudentId = async (studentId: string): Promise<any> => {  
        return await Account.findOne({
            include:[Invoice
           ], where: {
                    studentId: studentId
                }
        }).then((studentAccount) => {
            // throw new AccountNotFoundException(studentId);
          return  this.populateOutstandingBalance(studentAccount)
        })
    }
     

    private  populateOutstandingBalance = async(account: Account) => { 
        if (account != null) {
          await  account.$get('invoiceList').then(async(invoices) => { 
                if(invoices != null && invoices.length > 0){  
                    account.hasOutstandingBalance = await invoices.filter(x=> x.status === Status.OUTSTANDING).length > 0;
                   await account.save();
            }
            }) 
        } 
        return account;
    }
}