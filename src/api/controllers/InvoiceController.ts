import { InvoiceService } from "../services/InvoiceService";
import { InvoiceCreationAttributes } from "../../db/models/Invoice";
export class InvoiceController {
  private service: InvoiceService;
  constructor() {
    this.service = new InvoiceService();
  }
  public create = async (invoice: InvoiceCreationAttributes) => {
    try {
      if ( await !this.service.isInvoiceProcessable(invoice)) {
        console.log("You can't create an invoice without a valid student ID.");
        throw new Error(
          "You can't create an invoice without a valid student ID."
        );
      }

      return await this.service.createNewInvoice(invoice);
    } catch (error) {
      console.log("controller", error);
    }
  };
  public all = async () => {
    try {
      return await this.service.getAllInvoices();
    } catch (error) {
      console.log({error})
    }
  }
  public getInvoiceById = async (id: number) => {
    try {
      return await this.service.getInvoiceById(id);
    } catch (error) {
      console.log({error})
    }
  }
  public one = async (reference: string) => {
    try {
      return await this.service.getInvoiceByReference(reference);
    } catch (error) {
      console.log({error})
    }
  }
  public pay = async (reference: string) => {
    try {
      return await this.service.pay(reference);
    } catch (error) {
      console.log({error})
    }
  }
  public cancel = async (reference: string) => {
    try {
      return await this.service.cancel(reference);
    } catch (error) {
      console.log({error})
    }
  }
}
