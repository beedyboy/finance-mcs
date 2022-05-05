export class BaseError extends Error {
    statusCode: number;
    data: any;
    constructor(statusCode: number, message: string, data: any={}) { 
      super(message)
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = Error.name
      this.statusCode = statusCode;
      this.data = data
      Error.captureStackTrace(this);
  }
} 