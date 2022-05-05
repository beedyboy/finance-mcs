export class ResponseEntity {
  private status;
  private message;
  private data;
  private error;
  private _links = Object();

  constructor(
    message: string = "",
    data: any = null,
    isSuccess: boolean = false
  ) {
    this.status = isSuccess;
    this.message = message;
    switch (isSuccess) {
      case true:
        this.data = data;
        break;
      case false:
        this.error = data;
        break;
      default:
        break;
    }
  }
  public body() {
    return this;
  }
  public linkTo(type: string) {
    switch (type) {
      case "createNewInvoice":
      case "single": 
        this.createLink(
          process.env.BASE_URL + "invoices/reference/" + this.data.reference,
          "self"
        );
        this.createLink(process.env.BASE_URL + "invoices", "invoices");
        this.createLink(
          process.env.BASE_URL + "invoices/" + this.data.reference + "/pay",
          "pay"
        );
        this.createLink(
          process.env.BASE_URL + "invoices/" + this.data.reference + "/cancel",
          "cancel"
        );
        break;
      case "acountCreated": 
        this.createLink(
          process.env.BASE_URL + "accounts/student/" + this.data.dataValues.studentId, "self" );
        this.createLink(process.env.BASE_URL + "accounts", "accounts");
        
        break;
      case "pay":
      case "cancel":
        this.createLink(
          process.env.BASE_URL + "invoices/reference/" + this.data.reference,
          "self"
        );

        break;
      default:
        break;
    }
    return this;
  }

  public createLink(link: any, name: string) {
    this._links[name] = { href: link };
  }
  public toUri() {
    console.log(this._links);
    return this;
  }
  public build() {
    const result = {
      message: this.message,
      ...this.data.dataValues,
      _links: this._links,
    };
    console.log({...result});
    return { ...result };
  }
}
