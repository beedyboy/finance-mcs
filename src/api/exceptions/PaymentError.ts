import { BaseError } from "./BaseError";

export class PaymentError extends BaseError {
    propertyName: string;
    statusCode: number;
    data: any;
    constructor(propertyName: string, message: string, data: any) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(404, message)
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = Error.name 
      this.propertyName = propertyName
      this.data = data?.dataValues
      Error.captureStackTrace(this);
  }
} 
