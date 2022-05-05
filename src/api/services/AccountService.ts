import { Account, AccountInput, AccountOuput } from '../../db/models/Account';
import { AccountDAO } from '../daos/AccountDAO';

export class AccountService {
   private DAO: AccountDAO = new AccountDAO(); 
   
    public createAccount = async (payload: AccountInput): Promise<any> => {
       const exist =  await Account.findOne({where:{
            studentId: payload.studentId
        }});
        if(exist){
            // throw Error("Student already exist");
            return {exist};
        }
        return this.DAO.create(payload);
        // await this._model.
    }
  getAccountByStudentId = async(studentId: string) => {
    return this.DAO.getAccountByStudentId(studentId); 
  }
}