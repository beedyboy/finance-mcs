import { Router, Request, Response } from "express";
import { ResponseEntity } from "../../utils/ResponseEntity";
import { AccountController } from "../controllers/AccountController";
import { CreateAccountDTO } from "../types/account";

const Controller = new AccountController();
const accountRouter = Router()
  .post(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
      const payload: CreateAccountDTO = req.body;
      return await Controller.create(payload).then((result) => {
        if (result) {
          return res
            .status(200)
            .json(
              new ResponseEntity("Enrolment created", result, true)
                .body()
                .linkTo("acountCreated")
                .toUri()
                .build()
            );
        } else {
          return res
            .status(400)
            .json(
              new ResponseEntity("Account not created", result, false).body()
            );
        }
      });
    }
  )
  .get(
    "/student/:studentId",
    async (req: Request, res: Response): Promise<Response> => {
      const { studentId } = req.params;
      return await Controller.getStudentAccount(studentId).then((result) => {
        if (result) {
          return res
            .status(200)
            .json(
              new ResponseEntity("Account information", result, true)
                .body()
                // .linkTo("acountCreated")
                .toUri()
                .build()
            );
        } else {
          return res
            .status(400)
            .json(
              new ResponseEntity("Account not found", result, false).body()
            );
        }
      });
    }
  );

export default accountRouter;
