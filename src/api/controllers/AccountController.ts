import "reflect-metadata";
import { AccountInput } from "../../db/models/Account";
import { AccountService } from "../services/AccountService";
import { AccountDAO } from '../daos/AccountDAO';
export class AccountController { 
//   constructor(private service: AccountService) {}
private service: AccountService;
constructor(){
    this.service = new AccountService();
}
  public create = async (payload: AccountInput) => {
    return await this.service.createAccount(payload);
  };
  public getStudentAccount = async (studentId: string) => {
    return await this.service.getAccountByStudentId(studentId);
  };
}
// export default AccountController;
