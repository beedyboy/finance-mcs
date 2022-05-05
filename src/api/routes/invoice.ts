import { Router, Request, Response } from "express";
import { ResponseEntity } from "../../utils/ResponseEntity";
import { InvoiceController } from "../controllers/InvoiceController";
import { CreateInvoiceDTO } from "../types/invoice";

const Controller = new InvoiceController();
const invoiceRouter = Router()
.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const payload: CreateInvoiceDTO = req.body; 
      return await Controller.create(payload).then((result) => {
        // console.log({ result });
        if (result) { 
      return res
            .status(200)
            .json(new ResponseEntity("Invoice created", result, true)
            .body()
            .linkTo("createNewInvoice")
            .toUri().build());
        } else {
          return res
            .status(400)
            .json(
              new ResponseEntity("Invoice not created", result, false).body()
            );
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
  }
)
.get('/',  async (req: Request, res: Response) => {
    try {
        return await Controller.all().then((result) => {
            console.log({ result });
            if (result) {
              return res
                .status(200)
                .json(
                  new ResponseEntity("Invoice list", result, true)
                    .body()
                    .linkTo("allInvoices")
                    .toUri()
                );
            } else {
              return res
                .status(400)
                .json(
                  new ResponseEntity("List of Invoices not found!!", result, false).body()
                );
            }
          });
    } catch (error) {
        return res .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
})
.get('/:id',  async (req: Request, res: Response) => {
    try {
        return await Controller.getInvoiceById(parseInt(req.params.id)).then((result) => {
            console.log({ result });
            if (result) {
              return res
                .status(200)
                .json(
                 new ResponseEntity("Invoice details", result, true)
                    .body()
                    .linkTo("single")
                    .toUri().build()
                );
            } else {
              return res
                .status(400)
                .json(
                  new ResponseEntity("Invoice not found!!", result, false).body()
                );
            }
          });
    } catch (error) {
        return res .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
})
.get('/reference/:reference',  async (req: Request, res: Response) => {
    try {
        return await Controller.one(req.params.reference).then((result) => {
            console.log({ result });
            if (result) {
              return res
                .status(200)
                .json(
                  new ResponseEntity("Invoice record", result, true)
                    .body()
                    .linkTo("single")
                    .toUri().build()
                );
            } else {
              return res
                .status(400)
                .json(
                  new ResponseEntity("Invoice not found!!", result, false).body()
                );
            }
          });
    } catch (error) {
        return res .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
})
.get('/:reference/pay',  async (req: Request, res: Response) => {
    try {
        return await Controller.pay(req.params.reference).then((result) => {
            console.log({ result });
            if (result) {
              return res
                .status(200)
                .json(
                  new ResponseEntity("Invoice updated record", result, true)
                    .body()
                    .linkTo("pay")
                    .toUri().build()
                );
            } else {
              return res
                .status(400)
                .json(
                  new ResponseEntity("Invoice not found!!", result, false).body()
                );
            }
          });
    } catch (error) {
        return res .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
})
.get('/:reference/cancel',  async (req: Request, res: Response) => {
    try {
        return await Controller.cancel(req.params.reference).then((result) => {
            console.log({ result });
            if (result) {
              return res
                .status(200)
                .json(
                  new ResponseEntity("Invoice updated record", result, true)
                    .body()
                    .linkTo("cancel")
                    .toUri().build()
                );
            } else {
              return res
                .status(400)
                .json(
                  new ResponseEntity("Invoice not found!!", result, false).body()
                );
            }
          });
    } catch (error) {
        return res .status(500)
        .json(new ResponseEntity("Server error", error, true));
    }
})

export default invoiceRouter;
